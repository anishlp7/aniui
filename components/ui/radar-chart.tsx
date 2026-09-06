import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, useColorScheme, type LayoutChangeEvent } from "react-native";
import { Canvas, Path, Circle } from "@shopify/react-native-skia";
import Animated, {
  Easing,
  cancelAnimation,
  clamp,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarChartSeries {
  data: RadarChartDataPoint[];
  color: string;
  fillOpacity?: number;
}

export interface RadarChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data?: RadarChartDataPoint[];
  height?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showDots?: boolean;
  showLabels?: boolean;
  gridLevels?: number;
  series?: RadarChartSeries[];
  onAxisChange?: (label: string, index: number) => void;
}

type Vertex = { x: number; y: number };

const TAU = Math.PI * 2;
const GROW_DURATION = 900;
const MORPH_DURATION = 550;
const STAGGER = 0.3;
const ROW_STAGGER = 55;
const SPRING_CONFIG = { damping: 22, stiffness: 300, mass: 1 };
const TOOLTIP_SPRING_CONFIG = { damping: 18, stiffness: 220, mass: 0.9 };
const DOT_RADIUS = 3;
const ACTIVE_DOT_RADIUS = 5;

function polar(cx: number, cy: number, r: number, angle: number): Vertex {
  "worklet";
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function lerp(a: number, b: number, t: number) {
  "worklet";
  return a + (b - a) * t;
}

function staggerProgress(progress: number, index: number, count: number, spread: number) {
  "worklet";
  if (count < 2 || spread <= 0) return clamp(progress, 0, 1);
  const window = 1 / (1 + (count - 1) * spread);
  const start = index * spread * window;
  return clamp((progress - start) / window, 0, 1);
}

function polygonPath(points: Vertex[]) {
  "worklet";
  if (points.length < 2) return "M 0 0";
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i]!.x} ${points[i]!.y}`;
  return `${d} Z`;
}

function indexForPoint(x: number, y: number, cx: number, cy: number, n: number) {
  "worklet";
  if (n < 1) return -1;
  const raw = Math.atan2(y - cy, x - cx) + Math.PI / 2;
  const angle = ((raw % TAU) + TAU) % TAU;
  return Math.round(angle / (TAU / n)) % n;
}

const RadarDot = React.memo(function RadarDot({
  vertices,
  seriesIndex,
  axisIndex,
  color,
  selectedIndex,
  isActive,
}: {
  vertices: SharedValue<Vertex[][]>;
  seriesIndex: number;
  axisIndex: number;
  color: string;
  selectedIndex: SharedValue<number>;
  isActive: SharedValue<number>;
}) {
  const cx = useDerivedValue(() => vertices.value[seriesIndex]?.[axisIndex]?.x ?? 0);
  const cy = useDerivedValue(() => vertices.value[seriesIndex]?.[axisIndex]?.y ?? 0);
  const r = useDerivedValue(() => {
    const selected = selectedIndex.value === axisIndex ? 1 : 0;
    return withSpring(DOT_RADIUS + (ACTIVE_DOT_RADIUS - DOT_RADIUS) * selected * isActive.value, SPRING_CONFIG);
  });
  return (
    <>
      <Circle cx={cx} cy={cy} r={r} color="white" />
      <Circle cx={cx} cy={cy} r={r} color={color} style="stroke" strokeWidth={2} />
    </>
  );
});

const RadarShape = React.memo(function RadarShape({
  vertices,
  seriesIndex,
  axisCount,
  color,
  fillOpacity,
  showDots,
  selectedIndex,
  isActive,
}: {
  vertices: SharedValue<Vertex[][]>;
  seriesIndex: number;
  axisCount: number;
  color: string;
  fillOpacity: number;
  showDots: boolean;
  selectedIndex: SharedValue<number>;
  isActive: SharedValue<number>;
}) {
  const path = useDerivedValue(() => {
    const row = vertices.value[seriesIndex];
    if (!row || row.length < 2) return "M 0 0";
    return polygonPath(row);
  });
  return (
    <>
      <Path path={path} color={color} opacity={fillOpacity} />
      <Path path={path} color={color} style="stroke" strokeWidth={2} strokeJoin="round" />
      {showDots &&
        Array.from({ length: axisCount }, (_, i) => (
          <RadarDot
            key={i}
            vertices={vertices}
            seriesIndex={seriesIndex}
            axisIndex={i}
            color={color}
            selectedIndex={selectedIndex}
            isActive={isActive}
          />
        ))}
    </>
  );
});

const TooltipRow = React.memo(function TooltipRow({
  index,
  isActive,
  children,
}: {
  index: number;
  isActive: SharedValue<number>;
  children: React.ReactNode;
}) {
  const entrance = useDerivedValue(() =>
    withDelay(index * ROW_STAGGER, withSpring(isActive.value, TOOLTIP_SPRING_CONFIG))
  );
  const style = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [{ translateY: (1 - entrance.value) * 8 }],
  }));
  return (
    <Animated.View style={style} className="flex-row items-center gap-2 py-0.5">
      {children}
    </Animated.View>
  );
});

const RadarTooltip = React.memo(function RadarTooltip({
  axisLabel,
  rows,
  anglesShared,
  selectedIndex,
  isActive,
  centerX,
  centerY,
  radius,
  width,
  height,
}: {
  axisLabel: string;
  rows: { label: string; value: number; color: string }[];
  anglesShared: SharedValue<number[]>;
  selectedIndex: SharedValue<number>;
  isActive: SharedValue<number>;
  centerX: number;
  centerY: number;
  radius: number;
  width: number;
  height: number;
}) {
  const cardWidth = useSharedValue(0);
  const cardHeight = useSharedValue(0);
  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      cardWidth.value = e.nativeEvent.layout.width;
      cardHeight.value = e.nativeEvent.layout.height;
    },
    [cardWidth, cardHeight]
  );

  const style = useAnimatedStyle(() => {
    const angle = anglesShared.value[selectedIndex.value];
    if (angle == null) return { opacity: 0, transform: [] };
    const point = polar(centerX, centerY, radius / 2, angle);
    const x = clamp(point.x - cardWidth.value / 2, 0, Math.max(width - cardWidth.value, 0));
    const y = clamp(point.y - cardHeight.value / 2, 0, Math.max(height - cardHeight.value, 0));
    const presence = withSpring(isActive.value, TOOLTIP_SPRING_CONFIG);
    return {
      opacity: presence,
      transform: [{ translateX: withSpring(x, SPRING_CONFIG) }, { translateY: withSpring(y, SPRING_CONFIG) }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      onLayout={onLayout}
      style={style}
      className="absolute top-0 left-0 rounded-lg border border-border bg-card px-3 py-2 shadow-sm"
    >
      <TooltipRow index={0} isActive={isActive}>
        <Text className="text-xs text-muted-foreground mb-1">{axisLabel}</Text>
      </TooltipRow>
      {rows.map((row, i) => (
        <TooltipRow key={row.label + i} index={i + 1} isActive={isActive}>
          <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
          <Text className="text-xs text-muted-foreground">{row.label}</Text>
          <Text className="text-xs font-medium text-foreground ms-auto">{row.value}</Text>
        </TooltipRow>
      ))}
    </Animated.View>
  );
});

export function RadarChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  fillOpacity = 0.2,
  showGrid = true,
  showDots = false,
  showLabels = true,
  gridLevels = 4,
  series,
  onAxisChange,
  ...props
}: RadarChartProps) {
  const [width, setWidth] = useState(0);
  const dark = useColorScheme() === "dark";
  const gridColor = dark ? "#27272a" : "#e5e7eb";
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const [selectedAxis, setSelectedAxis] = useState(-1);
  const hasEntered = useRef(false);

  const originValues = useSharedValue<number[][]>([]);
  const targetValues = useSharedValue<number[][]>([]);
  const morph = useSharedValue(1);
  const grow = useSharedValue(0);
  const isActive = useSharedValue(0);
  const selectedIndex = useSharedValue(-1);
  const anglesShared = useSharedValue<number[]>([]);
  const maxShared = useSharedValue(1);

  const size = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = size / 2 - (showLabels ? 30 : 10);
  const allSeries: RadarChartSeries[] = series ?? [{ data: data ?? [], color, fillOpacity }];
  const labels = allSeries[0]?.data ?? [];
  const n = labels.length;
  const maxVal = Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1);
  const seriesSignature = allSeries
    .map((s) => s.data.map((d) => `${d.label}:${d.value}`).join(","))
    .join("|");

  const angles = useMemo(() => Array.from({ length: n }, (_, i) => (TAU * i) / n - Math.PI / 2), [n]);

  useEffect(() => {
    anglesShared.value = angles;
  }, [angles]);

  useEffect(() => {
    maxShared.value = maxVal;
  }, [maxVal]);

  useEffect(() => {
    if (width === 0) return;
    const values = allSeries.map((s) => s.data.map((d) => d.value));
    const isEntrance = !hasEntered.current;
    hasEntered.current = true;

    const previous = targetValues.value;
    const isSameShape =
      !isEntrance &&
      previous.length === values.length &&
      previous.every((row, i) => row.length === (values[i]?.length ?? -1));

    if (isEntrance || !isSameShape) {
      originValues.value = values;
      targetValues.value = values;
      cancelAnimation(morph);
      morph.value = 1;
      cancelAnimation(grow);
      grow.value = 0;
      grow.value = withTiming(1, { duration: GROW_DURATION, easing: Easing.out(Easing.cubic) });
      return;
    }

    const from = originValues.value;
    const progress = morph.value;
    originValues.value = values.map((row, s) =>
      row.map((_, i) => lerp(from[s]?.[i] ?? 0, previous[s]?.[i] ?? 0, progress))
    );
    targetValues.value = values;
    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, seriesSignature]);

  const vertices = useDerivedValue<Vertex[][]>(() => {
    const angleList = anglesShared.value;
    const origin = originValues.value;
    const target = targetValues.value;
    const count = Math.max(origin.length, target.length);
    const max = maxShared.value;

    const out: Vertex[][] = [];
    for (let s = 0; s < count; s++) {
      const entrance = staggerProgress(grow.value, s, count, STAGGER);
      const row: Vertex[] = [];
      for (let i = 0; i < angleList.length; i++) {
        const value = lerp(origin[s]?.[i] ?? 0, target[s]?.[i] ?? 0, morph.value);
        const distance = clamp((value / max) * radius, 0, radius) * entrance;
        row.push(polar(centerX, centerY, distance, angleList[i]!));
      }
      out.push(row);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerX, centerY, radius]);

  const reportAxis = useCallback(
    (index: number) => {
      setSelectedAxis(index);
      const label = labels[index]?.label;
      if (label !== undefined) onAxisChange?.(label, index);
    },
    [labels, onAxisChange]
  );

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onBegin((event) => {
          "worklet";
          const index = indexForPoint(event.x, event.y, centerX, centerY, n);
          if (index >= 0 && index !== selectedIndex.value) {
            selectedIndex.value = index;
            runOnJS(reportAxis)(index);
          }
          isActive.value = withTiming(1, { duration: 140 });
        })
        .onUpdate((event) => {
          "worklet";
          const index = indexForPoint(event.x, event.y, centerX, centerY, n);
          if (index >= 0 && index !== selectedIndex.value) {
            selectedIndex.value = index;
            runOnJS(reportAxis)(index);
          }
        })
        .onFinalize(() => {
          "worklet";
          isActive.value = withTiming(0, { duration: 220 });
          selectedIndex.value = -1;
        }),
    [centerX, centerY, n, reportAxis, selectedIndex, isActive]
  );

  const gridPath = useMemo(() => {
    if (!showGrid || n < 2) return "";
    let path = "";
    for (let level = 0; level < gridLevels; level++) {
      const r = ((level + 1) / gridLevels) * radius;
      const pts = angles.map((a) => polar(centerX, centerY, r, a));
      path += `${polygonPath(pts)} `;
    }
    return path.trim();
  }, [showGrid, gridLevels, angles, centerX, centerY, radius, n]);

  const axesPath = useMemo(() => {
    if (!showGrid || n < 1) return "";
    let path = "";
    for (const a of angles) {
      const p = polar(centerX, centerY, radius, a);
      path += `M ${centerX} ${centerY} L ${p.x} ${p.y} `;
    }
    return path.trim();
  }, [showGrid, angles, centerX, centerY, radius, n]);

  const axisLabel = selectedAxis >= 0 ? labels[selectedAxis]?.label ?? "" : "";
  const tooltipRows =
    selectedAxis >= 0
      ? allSeries.map((s, i) => ({
          label: `Series ${i + 1}`,
          value: s.data[selectedAxis]?.value ?? 0,
          color: s.color,
        }))
      : [];

  if (width === 0) {
    return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;
  }

  return (
    <View
      className={cn("w-full", className)}
      onLayout={onLayout}
      style={{ height }}
      accessibilityRole="image"
      {...props}
    >
      <GestureDetector gesture={gesture}>
        <View className="flex-1">
          <Canvas style={{ width, height }}>
            {gridPath !== "" && <Path path={gridPath} color={gridColor} style="stroke" strokeWidth={1} />}
            {axesPath !== "" && <Path path={axesPath} color={gridColor} style="stroke" strokeWidth={1} />}
            {allSeries.map((s, i) => (
              <RadarShape
                key={i}
                vertices={vertices}
                seriesIndex={i}
                axisCount={n}
                color={s.color}
                fillOpacity={s.fillOpacity ?? fillOpacity}
                showDots={showDots}
                selectedIndex={selectedIndex}
                isActive={isActive}
              />
            ))}
          </Canvas>
          {showLabels && (
            <View pointerEvents="none" className="absolute inset-0">
              {labels.map((d, i) => {
                const angle = angles[i];
                if (angle === undefined) return null;
                const p = polar(centerX, centerY, radius + 14, angle);
                return (
                  <Text
                    key={i}
                    numberOfLines={1}
                    className="absolute text-center text-[11px] text-muted-foreground"
                    style={{ left: p.x - 40, top: p.y - 6, width: 80 }}
                  >
                    {d.label}
                  </Text>
                );
              })}
            </View>
          )}
          <RadarTooltip
            axisLabel={axisLabel}
            rows={tooltipRows}
            anglesShared={anglesShared}
            selectedIndex={selectedIndex}
            isActive={isActive}
            centerX={centerX}
            centerY={centerY}
            radius={radius}
            width={width}
            height={height}
          />
        </View>
      </GestureDetector>
    </View>
  );
}
