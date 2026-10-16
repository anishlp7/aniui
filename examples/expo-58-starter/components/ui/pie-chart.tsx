import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import Animated, {
  Easing,
  cancelAnimation,
  clamp,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

export interface PieChartSegment {
  value: number;
  color: string;
  label?: string;
}

export interface PieChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: PieChartSegment[];
  height?: number;
  innerRadius?: number;
  showLabels?: boolean;
  startAngle?: number;
  endAngle?: number;
  onSliceChange?: (segment: PieChartSegment, index: number) => void;
}

// Entrance/morph state machine + drag-select tuning — mirrors the other
// Skia-driven charts in this effort: a shared "grow" value gates how much of
// the pie is revealed (mount / slice-count change), a shared "morph" value
// blends between old and new sweep fractions (same-count value change).
const GROW_DURATION = 900;
const MORPH_DURATION = 550;
const SPRING_CONFIG = { damping: 20, stiffness: 260, mass: 1 };
const ACTIVE_OFFSET = 10;
const TAU = Math.PI * 2;
const ANGLE_ORIGIN = -Math.PI / 2; // 0 rad points at 12 o'clock, not 3 o'clock
const EPSILON = 1e-4;

interface PieArc {
  start: number;
  end: number;
  mid: number;
}

interface PieSlice {
  value: number;
  fraction: number;
}

function lerp(from: number, to: number, progress: number): number {
  "worklet";
  return from + (to - from) * progress;
}

function toRadians(deg: number): number {
  "worklet";
  return (deg * Math.PI) / 180;
}

function normalizeAngle(angle: number): number {
  "worklet";
  const wrapped = angle % TAU;
  return wrapped < 0 ? wrapped + TAU : wrapped;
}

function polarPoint(cx: number, cy: number, r: number, angle: number) {
  "worklet";
  const theta = ANGLE_ORIGIN + angle;
  return { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) };
}

// Same washer/pie arc technique as the original static file, just rebuilt
// from animated angles every frame instead of once. A slice whose sweep
// covers the whole visible range is drawn as two half-arcs since SVG (and
// Skia's SVG-string Path parser) can't express a true 360 degree single arc.
function buildSlicePath(cx: number, cy: number, outerR: number, innerR: number, start: number, end: number): string {
  "worklet";
  const sweep = end - start;
  if (outerR <= 0 || sweep <= EPSILON) return "M 0 0";
  const inner = Math.min(Math.max(innerR, 0), outerR);

  if (sweep >= TAU - EPSILON) {
    const outerTop = polarPoint(cx, cy, outerR, 0);
    const outerBottom = polarPoint(cx, cy, outerR, Math.PI);
    let path =
      `M ${outerTop.x} ${outerTop.y} ` +
      `A ${outerR} ${outerR} 0 1 1 ${outerBottom.x} ${outerBottom.y} ` +
      `A ${outerR} ${outerR} 0 1 1 ${outerTop.x} ${outerTop.y} Z`;
    if (inner > 0) {
      const innerTop = polarPoint(cx, cy, inner, 0);
      const innerBottom = polarPoint(cx, cy, inner, Math.PI);
      path +=
        ` M ${innerTop.x} ${innerTop.y} ` +
        `A ${inner} ${inner} 0 1 0 ${innerBottom.x} ${innerBottom.y} ` +
        `A ${inner} ${inner} 0 1 0 ${innerTop.x} ${innerTop.y} Z`;
    }
    return path;
  }

  const large = sweep > Math.PI ? 1 : 0;
  const outerStart = polarPoint(cx, cy, outerR, start);
  const outerEnd = polarPoint(cx, cy, outerR, end);

  if (inner <= 0) {
    return (
      `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} ` +
      `A ${outerR} ${outerR} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} Z`
    );
  }

  const innerEnd = polarPoint(cx, cy, inner, end);
  const innerStart = polarPoint(cx, cy, inner, start);
  return (
    `M ${outerStart.x} ${outerStart.y} ` +
    `A ${outerR} ${outerR} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y} ` +
    `L ${innerEnd.x} ${innerEnd.y} ` +
    `A ${inner} ${inner} 0 ${large} 0 ${innerStart.x} ${innerStart.y} Z`
  );
}

function indexForAngle(spans: number[], angle: number): number {
  "worklet";
  for (let i = 0; i < spans.length - 1; i++) {
    if (angle >= spans[i] && angle < spans[i + 1]) return i;
  }
  return -1;
}

function computeSlices(data: PieChartSegment[]): PieSlice[] {
  let total = 0;
  for (const d of data) total += Math.max(d.value, 0);
  const safeTotal = total || 1;
  return data.map((d) => {
    const value = Math.max(d.value, 0);
    return { value, fraction: value / safeTotal };
  });
}

interface PieSliceViewProps {
  index: number;
  color: string;
  centerX: number;
  centerY: number;
  outerRadius: number;
  innerRadius: number;
  arcs: SharedValue<PieArc[]>;
  selectedIndex: SharedValue<number>;
  isActive: SharedValue<number>;
}

// One memoized Path per slice: reads its own angle span out of the shared
// `arcs` array every frame and, when selected, slides its effective center
// outward along its own bisector before rebuilding the arc path.
const PieSliceView = memo(function PieSliceView({
  index,
  color,
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  arcs,
  selectedIndex,
  isActive,
}: PieSliceViewProps) {
  const selection = useDerivedValue(() => withSpring(selectedIndex.value === index ? 1 : 0, SPRING_CONFIG), [index]);

  const path = useDerivedValue<string>(() => {
    const arc = arcs.value[index];
    if (!arc) return "M 0 0";
    const push = selection.value * isActive.value * ACTIVE_OFFSET;
    const theta = ANGLE_ORIGIN + arc.mid;
    const cx = centerX + Math.cos(theta) * push;
    const cy = centerY + Math.sin(theta) * push;
    return buildSlicePath(cx, cy, outerRadius, innerRadius, arc.start, arc.end);
  }, [index, centerX, centerY, outerRadius, innerRadius]);

  return <Path path={path} color={color} />;
});

export function PieChart({
  className,
  data,
  height = 200,
  innerRadius = 0,
  showLabels = false,
  startAngle = 0,
  endAngle = 360,
  onSliceChange,
  ...props
}: PieChartProps) {
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const hasEntered = useRef(false);

  const size = Math.min(width, height);
  const centerX = width / 2;
  const centerY = height / 2;
  const outerR = Math.max(size / 2 - 10, 0);
  const innerRPx = outerR * innerRadius;
  const startRadians = toRadians(startAngle);
  const rangeRadians = toRadians(endAngle - startAngle);

  const slices = useMemo(() => computeSlices(data), [data]);
  const spans = useMemo(() => {
    const out: number[] = [0];
    let cursor = 0;
    for (const slice of slices) {
      cursor += slice.fraction * rangeRadians;
      out.push(cursor);
    }
    return out;
  }, [slices, rangeRadians]);

  const originFractions = useSharedValue<number[]>([]);
  const targetFractions = useSharedValue<number[]>([]);
  const spansShared = useSharedValue<number[]>([0]);
  const morph = useSharedValue(1);
  const grow = useSharedValue(0);
  const isActive = useSharedValue(0);
  const selectedIndex = useSharedValue(-1);
  const cardWidth = useSharedValue(0);
  const cardHeight = useSharedValue(0);

  useEffect(() => {
    spansShared.value = spans;
  }, [spans, spansShared]);

  const isMeasured = width > 0 && height > 0;

  useEffect(() => {
    if (!isMeasured || data.length === 0) return;
    const fractions = slices.map((s) => s.fraction);
    const isEntrance = !hasEntered.current;
    hasEntered.current = true;

    if (isEntrance || targetFractions.value.length !== fractions.length) {
      originFractions.value = fractions;
      targetFractions.value = fractions;
      cancelAnimation(morph);
      morph.value = 1;
      cancelAnimation(grow);
      grow.value = 0;
      grow.value = withTiming(1, { duration: GROW_DURATION, easing: Easing.out(Easing.cubic) });
      return;
    }

    const from = originFractions.value;
    const to = targetFractions.value;
    const progress = morph.value;
    originFractions.value = fractions.map((_, i) => lerp(from[i] ?? 0, to[i] ?? 0, progress));
    targetFractions.value = fractions;

    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isMeasured, slices]);

  const arcs = useDerivedValue<PieArc[]>(() => {
    const origin = originFractions.value;
    const target = targetFractions.value;
    const count = Math.max(origin.length, target.length);
    const limit = grow.value * rangeRadians;

    const out: PieArc[] = [];
    let cursor = 0;
    for (let i = 0; i < count; i++) {
      const sweep = lerp(origin[i] ?? 0, target[i] ?? 0, morph.value) * rangeRadians;
      const rawStart = cursor;
      const rawEnd = cursor + sweep;
      cursor = rawEnd;

      const start = Math.min(rawStart, limit);
      const end = Math.min(rawEnd, limit);
      out.push({
        start: startRadians + start,
        end: startRadians + end,
        mid: startRadians + (rawStart + rawEnd) / 2,
      });
    }
    return out;
  }, [rangeRadians, startRadians]);

  const reportSlice = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const segment = data[index];
      if (segment) onSliceChange?.(segment, index);
    },
    [data, onSliceChange]
  );

  const gesture = useMemo(() => {
    const resolveIndex = (x: number, y: number) => {
      "worklet";
      const distance = Math.hypot(x - centerX, y - centerY);
      const inside = distance >= innerRPx && distance <= outerR + ACTIVE_OFFSET;
      if (!inside) return -1;
      const angle = normalizeAngle(Math.atan2(y - centerY, x - centerX) - ANGLE_ORIGIN - startRadians);
      return indexForAngle(spansShared.value, angle);
    };

    return Gesture.Pan()
      .minDistance(0)
      .onBegin((e) => {
        "worklet";
        const index = resolveIndex(e.x, e.y);
        if (index !== selectedIndex.value) {
          selectedIndex.value = index;
          if (index >= 0) runOnJS(reportSlice)(index);
        }
        isActive.value = withTiming(index >= 0 ? 1 : 0, { duration: 140 });
      })
      .onUpdate((e) => {
        "worklet";
        const index = resolveIndex(e.x, e.y);
        if (index !== selectedIndex.value) {
          selectedIndex.value = index;
          if (index >= 0) runOnJS(reportSlice)(index);
          isActive.value = withTiming(index >= 0 ? 1 : 0, { duration: 140 });
        }
      })
      .onFinalize(() => {
        "worklet";
        isActive.value = withTiming(0, { duration: 220 });
        selectedIndex.value = -1;
      });
  }, [centerX, centerY, outerR, innerRPx, startRadians, spansShared, selectedIndex, isActive, reportSlice]);

  const onTooltipLayout = useCallback(
    (e: LayoutChangeEvent) => {
      cardWidth.value = e.nativeEvent.layout.width;
      cardHeight.value = e.nativeEvent.layout.height;
    },
    [cardWidth, cardHeight]
  );

  const tooltipStyle = useAnimatedStyle(() => {
    const arc = arcs.value[selectedIndex.value];
    if (!arc) return { opacity: 0 };

    const midRadius = (outerR + innerRPx) / 2;
    const point = polarPoint(centerX, centerY, midRadius, arc.mid);
    const x = clamp(point.x - cardWidth.value / 2, 0, Math.max(width - cardWidth.value, 0));
    const y = clamp(point.y - cardHeight.value / 2, 0, Math.max(height - cardHeight.value, 0));

    return {
      opacity: isActive.value,
      transform: [{ translateX: withSpring(x, SPRING_CONFIG) }, { translateY: withSpring(y, SPRING_CONFIG) }],
    };
  });

  if (width === 0) {
    return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;
  }

  const activeSegment = activeIndex >= 0 ? data[activeIndex] : undefined;
  const activeSlice = activeIndex >= 0 ? slices[activeIndex] : undefined;

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <GestureDetector gesture={gesture}>
        <View style={{ width, height }}>
          <Canvas style={{ width, height }}>
            {data.map((segment, i) => (
              <PieSliceView
                key={i}
                index={i}
                color={segment.color}
                centerX={centerX}
                centerY={centerY}
                outerRadius={outerR}
                innerRadius={innerRPx}
                arcs={arcs}
                selectedIndex={selectedIndex}
                isActive={isActive}
              />
            ))}
          </Canvas>
          {showLabels && (
            <View pointerEvents="none" className="absolute inset-0">
              {slices.map((slice, i) => {
                if (slice.fraction <= 0) return null;
                const mid = startRadians + (spans[i] + spans[i + 1]) / 2;
                const labelR = innerRPx > 0 ? (outerR + innerRPx) / 2 : outerR * 0.65;
                const point = polarPoint(centerX, centerY, labelR, mid);
                return (
                  <Text
                    key={i}
                    className="absolute text-[11px] font-semibold text-white"
                    style={{ left: point.x - 24, top: point.y - 8, width: 48, textAlign: "center" }}
                  >
                    {data[i]?.label ?? `${Math.round(slice.fraction * 100)}%`}
                  </Text>
                );
              })}
            </View>
          )}
          <Animated.View pointerEvents="none" onLayout={onTooltipLayout} style={[{ position: "absolute", top: 0, left: 0 }, tooltipStyle]}>
            {activeSegment && (
              <ChartTooltip
                label={activeSegment.label ?? `${Math.round((activeSlice?.fraction ?? 0) * 100)}%`}
                value={activeSegment.value}
                color={activeSegment.color}
              />
            )}
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
}
