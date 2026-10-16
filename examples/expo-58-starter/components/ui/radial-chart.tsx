import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import Animated, {
  Easing,
  cancelAnimation,
  clamp,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

export interface RadialChartSegment {
  value: number;
  maxValue?: number;
  color: string;
  label?: string;
}

export interface RadialChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: RadialChartSegment[];
  height?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  startAngle?: number;
  endAngle?: number;
  centerText?: string;
  centerSubText?: string;
  onRingChange?: (segment: RadialChartSegment, index: number) => void;
}

const GROW_DURATION = 900;
const MORPH_DURATION = 550;
const STAGGER = 0.08;
const RING_PITCH_GAP = 6;
const SPRING_CONFIG = { damping: 20, stiffness: 260, mass: 1 };

function lerpNum(from: number, to: number, progress: number): number {
  "worklet";
  return from + (to - from) * progress;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  "worklet";
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  "worklet";
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const sweep = end - start;
  const large = sweep > 180 ? 1 : 0;
  return `M${s.x},${s.y} A${r},${r} 0 ${large} 1 ${e.x},${e.y}`;
}

function staggeredProgress(progress: number, index: number, spread: number): number {
  "worklet";
  const delay = Math.min(index * spread, 0.8);
  return clamp((progress - delay) / Math.max(1 - delay, 0.2), 0, 1);
}

function angleForPoint(x: number, y: number, cx: number, cy: number): number {
  "worklet";
  const rad = Math.atan2(y - cy, x - cx);
  const deg = (rad * 180) / Math.PI + 90;
  return ((deg % 360) + 360) % 360;
}

function isWithinSweep(angle: number, startAngle: number, range: number): boolean {
  "worklet";
  if (range >= 360) return true;
  const relative = (((angle - startAngle) % 360) + 360) % 360;
  return relative <= range;
}

function ringIndexForDistance(distance: number, maxR: number, strokeWidth: number, gap: number, count: number): number {
  "worklet";
  const pitch = strokeWidth + gap;
  if (pitch <= 0) return -1;
  const idx = Math.round((maxR - distance) / pitch);
  if (idx < 0 || idx >= count) return -1;
  const center = maxR - idx * pitch;
  return Math.abs(distance - center) <= strokeWidth / 2 + 2 ? idx : -1;
}

// Shared by onBegin/onUpdate: maps a touch point to the nearest ring index,
// or -1 if it falls outside the sweep window or every ring's stroke band.
function ringIndexForTouch(
  x: number,
  y: number,
  cx: number,
  cy: number,
  startAngle: number,
  range: number,
  maxR: number,
  strokeWidth: number,
  count: number
): number {
  "worklet";
  const distance = Math.hypot(x - cx, y - cy);
  const angle = angleForPoint(x, y, cx, cy);
  return isWithinSweep(angle, startAngle, range)
    ? ringIndexForDistance(distance, maxR, strokeWidth, RING_PITCH_GAP, count)
    : -1;
}

interface RadialRingProps {
  index: number;
  cx: number;
  cy: number;
  radius: number;
  color: string;
  startAngle: number;
  range: number;
  strokeWidth: number;
  animatedFractions: SharedValue<number[]>;
  selectedIndex: SharedValue<number>;
  isActive: SharedValue<number>;
}

// Selection feedback: widens the stroke on the active ring rather than
// interpolating a synthetic "lighter" color, since ring colors are arbitrary
// user-supplied hex values with no guaranteed lighter/darker counterpart.
const RadialRing = memo(function RadialRing({
  index,
  cx,
  cy,
  radius,
  color,
  startAngle,
  range,
  strokeWidth,
  animatedFractions,
  selectedIndex,
  isActive,
}: RadialRingProps) {
  const selection = useDerivedValue(
    () => withSpring(selectedIndex.value === index ? 1 : 0, SPRING_CONFIG),
    [index]
  );

  const path = useDerivedValue<string>(() => {
    const fraction = animatedFractions.value[index] ?? 0;
    const sweep = fraction * range;
    if (sweep <= 0) return "M 0 0";
    const safeEnd = sweep >= 360 ? startAngle + 359.99 : startAngle + sweep;
    return arcPath(cx, cy, radius, startAngle, safeEnd);
  }, [cx, cy, radius, startAngle, range]);

  const animatedStrokeWidth = useDerivedValue(
    () => strokeWidth + selection.value * isActive.value * 2,
    [strokeWidth]
  );

  return <Path path={path} color={color} style="stroke" strokeWidth={animatedStrokeWidth} strokeCap="round" />;
});

export function RadialChart({
  className,
  data,
  height = 200,
  strokeWidth = 12,
  showLabels = false,
  startAngle = 0,
  endAngle = 360,
  centerText,
  centerSubText,
  onRingChange,
  ...props
}: RadialChartProps) {
  const [width, setWidth] = useState(0);
  const colors = useThemeColors();
  const gridColor = colors.border;
  const labelColor = colors.mutedForeground;
  const centerColor = colors.foreground;
  const onLayout = useCallback((e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width), []);

  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const maxR = size / 2 - 10;
  const range = endAngle - startAngle;
  const ringCount = data.length;

  const ringRadii = useMemo(
    () => data.map((_, i) => maxR - i * (strokeWidth + RING_PITCH_GAP)),
    [ringCount, maxR, strokeWidth]
  );

  const trackPaths = useMemo(() => {
    const bgEnd = range >= 360 ? startAngle + 359.99 : startAngle + range;
    return ringRadii.map((r) => (r > 0 ? arcPath(cx, cy, r, startAngle, bgEnd) : null));
  }, [ringRadii, cx, cy, startAngle, range]);

  const currentFractions = useMemo(
    () => data.map((seg) => Math.min(Math.max(seg.value / (seg.maxValue ?? 100), 0), 1)),
    [data]
  );

  const originFractions = useSharedValue<number[]>([]);
  const targetFractions = useSharedValue<number[]>([]);
  const morph = useSharedValue(1);
  const grow = useSharedValue(0);
  const isActive = useSharedValue(0);
  const selectedIndex = useSharedValue(-1);
  const cardWidth = useSharedValue(0);
  const cardHeight = useSharedValue(0);
  const hasEntered = useRef(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (width === 0 || ringCount === 0) return;
    const fractions = currentFractions;
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
    originFractions.value = fractions.map((_, i) => lerpNum(from[i] ?? 0, to[i] ?? 0, progress));
    targetFractions.value = fractions;

    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
  }, [width, currentFractions, ringCount]);

  const animatedFractions = useDerivedValue<number[]>(() => {
    const origin = originFractions.value;
    const target = targetFractions.value;
    const count = Math.max(origin.length, target.length);
    const out: number[] = [];
    for (let i = 0; i < count; i++) {
      const fraction = lerpNum(origin[i] ?? 0, target[i] ?? 0, morph.value);
      out.push(fraction * staggeredProgress(grow.value, i, STAGGER));
    }
    return out;
  }, []);

  const reportRing = useCallback(
    (index: number) => {
      const seg = data[index];
      if (seg) onRingChange?.(seg, index);
    },
    [data, onRingChange]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onBegin((e) => {
          "worklet";
          const idx = ringIndexForTouch(e.x, e.y, cx, cy, startAngle, range, maxR, strokeWidth, ringCount);
          if (idx !== selectedIndex.value) {
            selectedIndex.value = idx;
            if (idx >= 0) runOnJS(reportRing)(idx);
          }
          isActive.value = withTiming(idx >= 0 ? 1 : 0, { duration: 140 });
        })
        .onUpdate((e) => {
          "worklet";
          const idx = ringIndexForTouch(e.x, e.y, cx, cy, startAngle, range, maxR, strokeWidth, ringCount);
          if (idx !== selectedIndex.value) {
            selectedIndex.value = idx;
            if (idx >= 0) runOnJS(reportRing)(idx);
            isActive.value = withTiming(idx >= 0 ? 1 : 0, { duration: 140 });
          }
        })
        .onFinalize(() => {
          "worklet";
          isActive.value = withTiming(0, { duration: 220 });
          selectedIndex.value = -1;
        }),
    [cx, cy, startAngle, range, maxR, strokeWidth, ringCount, selectedIndex, isActive, reportRing]
  );

  useAnimatedReaction(
    () => selectedIndex.value,
    (current, previous) => {
      if (current !== previous) runOnJS(setActiveIndex)(current);
    },
    []
  );

  const onTooltipLayout = useCallback(
    (e: LayoutChangeEvent) => {
      cardWidth.value = e.nativeEvent.layout.width;
      cardHeight.value = e.nativeEvent.layout.height;
    },
    [cardWidth, cardHeight]
  );

  const tooltipStyle = useAnimatedStyle(() => {
    const idx = selectedIndex.value;
    const r = ringRadii[idx];
    if (r == null || r <= 0) {
      return { opacity: isActive.value, transform: [{ translateX: 0 }, { translateY: 0 }] };
    }
    const fraction = animatedFractions.value[idx] ?? 0;
    const angleDeg = startAngle + fraction * range;
    const point = polarToCartesian(cx, cy, r, angleDeg);
    const x = clamp(point.x - cardWidth.value / 2, 0, Math.max(width - cardWidth.value, 0));
    const y = clamp(point.y - cardHeight.value / 2, 0, Math.max(height - cardHeight.value, 0));
    return { opacity: isActive.value, transform: [{ translateX: x }, { translateY: y }] };
  }, [ringRadii, cx, cy, startAngle, range, width, height]);

  const activeSeg = activeIndex >= 0 ? data[activeIndex] : undefined;

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      {width > 0 && (
        <GestureDetector gesture={panGesture}>
          <View style={{ width, height }}>
            <Canvas style={{ width, height }}>
              {data.map((seg, i) => {
                const r = ringRadii[i];
                if (r == null || r <= 0) return null;
                return (
                  <React.Fragment key={i}>
                    <Path path={trackPaths[i] ?? "M 0 0"} color={gridColor} style="stroke" strokeWidth={strokeWidth} strokeCap="round" />
                    <RadialRing
                      index={i}
                      cx={cx}
                      cy={cy}
                      radius={r}
                      color={seg.color}
                      startAngle={startAngle}
                      range={range}
                      strokeWidth={strokeWidth}
                      animatedFractions={animatedFractions}
                      selectedIndex={selectedIndex}
                      isActive={isActive}
                    />
                  </React.Fragment>
                );
              })}
            </Canvas>

            {(centerText || centerSubText) && (
              <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
                {centerText && <Text style={{ fontSize: 20, fontWeight: "700", color: centerColor }}>{centerText}</Text>}
                {centerSubText && <Text style={{ fontSize: 11, color: labelColor, marginTop: 2 }}>{centerSubText}</Text>}
              </View>
            )}

            {showLabels &&
              data.map((seg, i) => {
                const r = ringRadii[i];
                if (r == null || r <= 0) return null;
                const pos = polarToCartesian(cx, cy, r, startAngle - 10);
                return (
                  <Text
                    key={i}
                    style={{ position: "absolute", left: pos.x - 60, top: pos.y - 6, width: 56, textAlign: "right", fontSize: 9, color: labelColor }}
                  >
                    {seg.label ?? `${seg.value}`}
                  </Text>
                );
              })}

            <Animated.View pointerEvents="none" onLayout={onTooltipLayout} style={[{ position: "absolute", left: 0, top: 0 }, tooltipStyle]}>
              {activeSeg && <ChartTooltip label={activeSeg.label ?? String(activeSeg.value)} value={activeSeg.value} color={activeSeg.color} />}
            </Animated.View>
          </View>
        </GestureDetector>
      )}
    </View>
  );
}
