import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent, useColorScheme } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Canvas, Path } from "@shopify/react-native-skia";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

const GROW_DURATION = 900;
const MORPH_DURATION = 550;
const STAGGER = 0.35;
const SPRING_CONFIG = { damping: 22, stiffness: 320, mass: 1 };
const PAD_WITH_LABELS = { top: 10, right: 10, bottom: 28, left: 36 };
const PAD_NO_LABELS = { top: 10, right: 10, bottom: 10, left: 10 };

function lerp(a: number, b: number, t: number): number {
  "worklet";
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number): number {
  "worklet";
  return Math.min(Math.max(v, lo), hi);
}

function staggerProgress(progress: number, index: number, count: number, spread: number): number {
  "worklet";
  if (count < 2 || spread <= 0) return clamp(progress, 0, 1);
  const window = 1 / (1 + (count - 1) * spread);
  const start = index * spread * window;
  return clamp((progress - start) / window, 0, 1);
}

function roundedRect(x: number, y: number, w: number, h: number, radius: number): string {
  "worklet";
  const r = Math.min(radius, w / 2, h / 2);
  const right = x + w;
  const bottom = y + h;
  return (
    `M ${x + r} ${y} L ${right - r} ${y} A ${r} ${r} 0 0 1 ${right} ${y + r} ` +
    `L ${right} ${bottom - r} A ${r} ${r} 0 0 1 ${right - r} ${bottom} ` +
    `L ${x + r} ${bottom} A ${r} ${r} 0 0 1 ${x} ${bottom - r} ` +
    `L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`
  );
}

function nearestTouchKey(targets: TouchTarget[], value: number): number {
  "worklet";
  if (targets.length === 0) return -1;
  let key = targets[0]!.key;
  let dist = Math.abs(targets[0]!.center - value);
  for (let i = 1; i < targets.length; i++) {
    const d = Math.abs(targets[i]!.center - value);
    if (d < dist) {
      dist = d;
      key = targets[i]!.key;
    }
  }
  return key;
}

interface SlotLayout { x: number; y: number; w: number; h: number }
interface TouchTarget { center: number; key: number }
interface BarRect { x: number; top: number; width: number; height: number }
interface Geometry {
  cw: number; ch: number; baselineX: number; baselineY: number; maxVal: number;
  slots: SlotLayout[]; touchTargets: TouchTarget[];
  barW: number; gap: number; groupW: number; barH: number;
}

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: BarChartDataPoint[];
  height?: number;
  color?: string;
  horizontal?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  barRadius?: number;
  grouped?: { key: string; color: string }[];
  groupedData?: { label: string; values: number[] }[];
  onBarChange?: (index: number) => void;
}

interface BarShapeProps {
  bars: SharedValue<BarRect[]>; index: number; color: string; radius: number;
  selectedIndex: SharedValue<number>; isActive: SharedValue<number>; highlightKey: number;
}

const BarShape = React.memo(function BarShape(
  { bars, index, color, radius, selectedIndex, isActive, highlightKey }: BarShapeProps
) {
  const path = useDerivedValue(() => {
    const bar = bars.value[index];
    if (!bar || bar.width <= 0.5 || bar.height <= 0.5) return "M 0 0";
    return roundedRect(bar.x, bar.top, bar.width, bar.height, radius);
  }, [index, radius]);
  const selection = useDerivedValue(() => withSpring(selectedIndex.value === highlightKey ? 1 : 0, SPRING_CONFIG), [highlightKey]);
  const opacity = useDerivedValue(() => 1 - isActive.value * 0.4 * (1 - selection.value));

  return <Path path={path} color={color} opacity={opacity} />;
});

export function BarChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  horizontal = false,
  showGrid = true,
  showLabels = false,
  barRadius = 4,
  grouped,
  groupedData,
  onBarChange,
  ...props
}: BarChartProps) {
  const [width, setWidth] = useState(0);
  const [selectedKey, setSelectedKey] = useState(-1);
  const dark = useColorScheme() === "dark";
  const gridColor = dark ? "#27272a" : "#e5e7eb";
  const labelColor = dark ? "#a1a1aa" : "#6b7280";
  const onLayout = useCallback((e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width), []);
  const isMeasured = width > 0;

  const isGrouped = !!(grouped && groupedData && grouped.length > 0 && groupedData.length > 0);
  const effectiveHorizontal = horizontal && !isGrouped;
  const pad = showLabels ? PAD_WITH_LABELS : PAD_NO_LABELS;
  const groupSize = grouped?.length ?? 1;

  const geometry = useMemo<Geometry>(() => {
    const cw = Math.max(width - pad.left - pad.right, 0);
    const ch = Math.max(height - pad.top - pad.bottom, 0);
    const baselineX = pad.left;
    const baselineY = pad.top + ch;
    const slots: SlotLayout[] = [];
    const touchTargets: TouchTarget[] = [];

    if (isGrouped && groupedData && grouped) {
      const maxVal = Math.max(...groupedData.flatMap((d) => d.values), 1);
      const groupW = groupedData.length > 0 ? cw / groupedData.length : 0;
      const barW = (groupW * 0.7) / grouped.length;
      groupedData.forEach((_, gi) => {
        grouped.forEach((_, bi) => {
          slots.push({ x: pad.left + gi * groupW + groupW * 0.15 + bi * barW, y: 0, w: barW * 0.85, h: 0 });
        });
        touchTargets.push({ center: pad.left + gi * groupW + groupW / 2, key: gi });
      });
      return { cw, ch, baselineX, baselineY, maxVal, slots, touchTargets, barW: barW * 0.85, gap: 0, groupW, barH: 0 };
    }

    const maxVal = Math.max(...data.map((d) => Math.abs(d.value)), 1);

    if (effectiveHorizontal) {
      const barH = data.length > 0 ? (ch / data.length) * 0.7 : 0;
      data.forEach((_, i) => {
        const y = pad.top + (i / data.length) * ch + (ch / data.length) * 0.15;
        slots.push({ x: 0, y, w: 0, h: barH });
        touchTargets.push({ center: y + barH / 2, key: i });
      });
      return { cw, ch, baselineX, baselineY, maxVal, slots, touchTargets, barW: 0, gap: 0, groupW: 0, barH };
    }

    const barW = data.length > 0 ? (cw / data.length) * 0.7 : 0;
    const gap = data.length > 0 ? (cw / data.length) * 0.3 : 0;
    data.forEach((_, i) => {
      const x = pad.left + i * (barW + gap) + gap / 2;
      slots.push({ x, y: 0, w: barW, h: 0 });
      touchTargets.push({ center: x + barW / 2, key: i });
    });
    return { cw, ch, baselineX, baselineY, maxVal, slots, touchTargets, barW, gap, groupW: 0, barH: 0 };
  }, [width, height, pad, isGrouped, groupedData, grouped, effectiveHorizontal, data]);

  const gridPath = useMemo(() => {
    if (!showGrid || effectiveHorizontal) return "";
    let d = "";
    for (let i = 0; i <= 3; i++) {
      const y = pad.top + (i / 3) * geometry.ch;
      d += `M ${pad.left} ${y} L ${pad.left + geometry.cw} ${y} `;
    }
    return d.trim();
  }, [showGrid, effectiveHorizontal, pad, geometry.ch, geometry.cw]);

  const barMeta = useMemo(() => {
    if (isGrouped && groupedData && grouped) {
      return groupedData.flatMap((_, gi) =>
        grouped.map((g) => ({ color: g.color ?? color, highlightKey: gi }))
      );
    }
    return data.map((d, i) => ({ color: d.color ?? color, highlightKey: i }));
  }, [isGrouped, groupedData, grouped, data, color]);

  const originValues = useSharedValue<number[]>([]);
  const targetValues = useSharedValue<number[]>([]);
  const morph = useSharedValue(1);
  const grow = useSharedValue(0);
  const slotsSV = useSharedValue<SlotLayout[]>([]);
  const touchTargetsSV = useSharedValue<TouchTarget[]>([]);
  const selectedIndex = useSharedValue(-1);
  const isActive = useSharedValue(0);
  const tooltipWidth = useSharedValue(0);
  const tooltipHeight = useSharedValue(0);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    slotsSV.value = geometry.slots;
    touchTargetsSV.value = geometry.touchTargets;
  }, [geometry, slotsSV, touchTargetsSV]);

  useEffect(() => {
    if (!isMeasured) return;
    const values = isGrouped && groupedData ? groupedData.flatMap((d) => d.values) : data.map((d) => d.value);
    const isEntrance = !hasEnteredRef.current;
    hasEnteredRef.current = true;

    if (isEntrance || targetValues.value.length !== values.length) {
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
    const to = targetValues.value;
    const progress = morph.value;
    originValues.value = values.map((_, i) => lerp(from[i] ?? 0, to[i] ?? 0, progress));
    targetValues.value = values;
    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
  }, [data, groupedData, isMeasured, isGrouped, morph, grow, originValues, targetValues]);

  const bars = useDerivedValue<BarRect[]>(() => {
    const slotList = slotsSV.value;
    const origin = originValues.value;
    const target = targetValues.value;
    const count = slotList.length;
    const out: BarRect[] = [];
    for (let i = 0; i < count; i++) {
      const slot = slotList[i]!;
      const value = lerp(origin[i] ?? 0, target[i] ?? 0, morph.value);
      const progress = staggerProgress(grow.value, i, count, STAGGER);
      if (effectiveHorizontal) {
        const length = (Math.abs(value) / geometry.maxVal) * geometry.cw * progress;
        out.push({ x: geometry.baselineX, top: slot.y, width: length, height: slot.h });
      } else {
        const length = (Math.abs(value) / geometry.maxVal) * geometry.ch * progress;
        const top = value >= 0 ? geometry.baselineY - length : geometry.baselineY;
        out.push({ x: slot.x, top, width: slot.w, height: length });
      }
    }
    return out;
  }, [effectiveHorizontal, geometry.maxVal, geometry.cw, geometry.ch, geometry.baselineX, geometry.baselineY]);

  const reportSelection = useCallback((key: number) => {
    setSelectedKey(key);
    onBarChange?.(key);
  }, [onBarChange]);

  const panGesture = useMemo(() => {
    const selectNearest = (e: { x: number; y: number }) => {
      "worklet";
      const key = nearestTouchKey(touchTargetsSV.value, effectiveHorizontal ? e.y : e.x);
      if (key >= 0 && key !== selectedIndex.value) {
        selectedIndex.value = key;
        runOnJS(reportSelection)(key);
      }
    };
    return Gesture.Pan()
      .minDistance(0)
      .onBegin((e) => {
        "worklet";
        selectNearest(e);
        isActive.value = withTiming(1, { duration: 140 });
      })
      .onUpdate((e) => {
        "worklet";
        selectNearest(e);
      })
      .onFinalize(() => {
        "worklet";
        isActive.value = withTiming(0, { duration: 220 });
        selectedIndex.value = -1;
      });
  }, [effectiveHorizontal, reportSelection, selectedIndex, isActive, touchTargetsSV]);

  const tooltipStyle = useAnimatedStyle(() => {
    const key = selectedIndex.value;
    const target = touchTargetsSV.value[key];
    if (key < 0 || !target) return { opacity: 0, transform: [{ translateX: 0 }, { translateY: 0 }] };

    if (effectiveHorizontal) {
      const rect = bars.value[key];
      const tipX = rect ? rect.x + rect.width : geometry.baselineX;
      const x = clamp(tipX + 12, 0, Math.max(width - tooltipWidth.value, 0));
      const y = clamp(target.center - tooltipHeight.value / 2, 0, Math.max(height - tooltipHeight.value, 0));
      return { opacity: isActive.value, transform: [{ translateX: x }, { translateY: y }] };
    }

    const start = isGrouped ? key * groupSize : key;
    let top = height;
    for (let i = start; i < start + groupSize; i++) {
      const rect = bars.value[i];
      if (rect && rect.top < top) top = rect.top;
    }
    const x = clamp(target.center - tooltipWidth.value / 2, 0, Math.max(width - tooltipWidth.value, 0));
    const y = clamp(top - tooltipHeight.value - 12, 0, Math.max(height - tooltipHeight.value, 0));
    return { opacity: isActive.value, transform: [{ translateX: x }, { translateY: y }] };
  }, [effectiveHorizontal, isGrouped, groupSize, width, height, geometry.baselineX]);

  const onTooltipLayout = useCallback((e: LayoutChangeEvent) => {
    tooltipWidth.value = e.nativeEvent.layout.width;
    tooltipHeight.value = e.nativeEvent.layout.height;
  }, [tooltipWidth, tooltipHeight]);

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      {isMeasured && (
        <GestureDetector gesture={panGesture}>
          <View style={{ flex: 1 }}>
            <Canvas style={{ width, height }}>
              {gridPath !== "" && <Path path={gridPath} color={gridColor} style="stroke" strokeWidth={1} />}
              {barMeta.map((m, i) => (
                <BarShape
                  key={i}
                  bars={bars}
                  index={i}
                  color={m.color}
                  radius={barRadius}
                  selectedIndex={selectedIndex}
                  isActive={isActive}
                  highlightKey={m.highlightKey}
                />
              ))}
            </Canvas>

            {showLabels && !effectiveHorizontal && !isGrouped && data.map((d, i) => (
              <Text key={i} style={{ position: "absolute", top: height - 18, left: geometry.slots[i]!.x + geometry.barW / 2 - 40, width: 80, textAlign: "center", fontSize: 10, color: labelColor }}>
                {d.label}
              </Text>
            ))}
            {showLabels && isGrouped && groupedData && groupedData.map((d, i) => (
              <Text key={i} style={{ position: "absolute", top: height - 18, left: pad.left + i * geometry.groupW, width: geometry.groupW, textAlign: "center", fontSize: 10, color: labelColor }}>
                {d.label}
              </Text>
            ))}
            {showLabels && effectiveHorizontal && data.map((d, i) => (
              <Text key={i} style={{ position: "absolute", top: geometry.slots[i]!.y + geometry.barH / 2 - 7, left: 0, width: Math.max(pad.left - 8, 0), textAlign: "right", fontSize: 10, color: labelColor }}>
                {d.label}
              </Text>
            ))}

            <Animated.View pointerEvents="none" onLayout={onTooltipLayout} style={[{ position: "absolute", top: 0, left: 0 }, tooltipStyle]}>
              {isGrouped && groupedData && grouped && groupedData[selectedKey] ? (
                <ChartTooltip
                  label={groupedData[selectedKey]!.label}
                  items={grouped.map((g, i) => ({ label: g.key, value: groupedData[selectedKey]!.values[i] ?? 0, color: g.color }))}
                />
              ) : !isGrouped && data[selectedKey] ? (
                <ChartTooltip label={data[selectedKey]!.label} value={data[selectedKey]!.value} color={data[selectedKey]!.color ?? color} />
              ) : null}
            </Animated.View>
          </View>
        </GestureDetector>
      )}
    </View>
  );
}
