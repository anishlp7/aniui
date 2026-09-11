import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent, useColorScheme } from "react-native";
import { Canvas, Path, Circle, Group, DashPathEffect } from "@shopify/react-native-skia";
import Animated, {
  Easing,
  Extrapolation,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartSeries {
  data: LineChartDataPoint[];
  color: string;
  dashed?: boolean;
}

export interface LineChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data?: LineChartDataPoint[];
  height?: number;
  color?: string;
  showDots?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  curved?: boolean;
  series?: LineChartSeries[];
  onPointChange?: (point: LineChartDataPoint, index: number) => void;
}

interface Vec {
  x: number;
  y: number;
}
interface Frame {
  points: Vec[];
  tangents: number[];
}

const SPRING_CONFIG = { damping: 20, stiffness: 300, mass: 1 };
const DRAW_DURATION = 900;
const MORPH_DURATION = 550;
const INDICATOR_RADIUS = 5;
const INDICATOR_BORDER_MULTIPLIER = 1.9;
const PULSE_RADIUS_MULTIPLIER = 4;
const PULSE_DURATION = 1400;
const PULSE_DELAY = 600;
const MAX_MORPH_SAMPLES = 160;

function lerp(from: number, to: number, t: number): number {
  "worklet";
  return from + (to - from) * t;
}

// Fritsch-Carlson monotone cubic tangents: keeps the curve from overshooting
// past local min/max points the way a naive Catmull-Rom spline would.
function monotoneTangents(points: Vec[]): number[] {
  "worklet";
  const count = points.length;
  if (count < 2) return points.map(() => 0);
  const slopes: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    const run = points[i + 1].x - points[i].x;
    slopes.push(run === 0 ? 0 : (points[i + 1].y - points[i].y) / run);
  }
  const tangents: number[] = [slopes[0]];
  for (let i = 1; i < count - 1; i++) {
    const prev = slopes[i - 1];
    const next = slopes[i];
    tangents.push(prev * next <= 0 ? 0 : (prev + next) / 2);
  }
  tangents.push(slopes[count - 2]);
  for (let i = 0; i < count - 1; i++) {
    const slope = slopes[i];
    if (slope === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / slope;
    const b = tangents[i + 1] / slope;
    const magnitude = a * a + b * b;
    if (magnitude > 9) {
      const scale = 3 / Math.sqrt(magnitude);
      tangents[i] = scale * a * slope;
      tangents[i + 1] = scale * b * slope;
    }
  }
  return tangents;
}

function buildPath(points: Vec[], tangents: number[], curved: boolean): string {
  "worklet";
  if (points.length === 0) return "M 0 0";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i];
    const to = points[i + 1];
    if (!curved) {
      d += ` L ${to.x} ${to.y}`;
      continue;
    }
    const run = (to.x - from.x) / 3;
    const c1y = from.y + (tangents[i] ?? 0) * run;
    const c2y = to.y - (tangents[i + 1] ?? 0) * run;
    d += ` C ${from.x + run} ${c1y} ${to.x - run} ${c2y} ${to.x} ${to.y}`;
  }
  return d;
}

// Shared "which segment does x fall in" search used by both the position and
// slope evaluators below.
function findSegment(points: Vec[], x: number): number {
  "worklet";
  let idx = points.length - 2;
  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i].x && x <= points[i + 1].x) {
      idx = i;
      break;
    }
  }
  return idx;
}

function yForX(points: Vec[], tangents: number[], curved: boolean, x: number): number {
  "worklet";
  if (points.length === 0) return 0;
  if (points.length === 1) return points[0].y;
  if (x <= points[0].x) return points[0].y;
  const last = points[points.length - 1];
  if (x >= last.x) return last.y;
  const idx = findSegment(points, x);
  const from = points[idx];
  const to = points[idx + 1];
  const run = to.x - from.x;
  if (run === 0) return to.y;
  const t = (x - from.x) / run;
  if (!curved) return lerp(from.y, to.y, t);
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return h00 * from.y + h10 * run * (tangents[idx] ?? 0) + h01 * to.y + h11 * run * (tangents[idx + 1] ?? 0);
}

function slopeForX(points: Vec[], tangents: number[], curved: boolean, x: number): number {
  "worklet";
  if (points.length < 2) return 0;
  const idx = findSegment(points, x);
  const from = points[idx];
  const to = points[idx + 1];
  const run = to.x - from.x;
  if (run === 0) return 0;
  if (!curved) return (to.y - from.y) / run;
  const t = Math.min(Math.max((x - from.x) / run, 0), 1);
  const m0 = tangents[idx] ?? 0;
  const m1 = tangents[idx + 1] ?? 0;
  return ((6 * t * t - 6 * t) * (from.y - to.y)) / run + (3 * t * t - 4 * t + 1) * m0 + (3 * t * t - 2 * t) * m1;
}

// "Draw-on" reveal: keep only the points left of the animated x-cutoff and
// synthesize one extra vertex exactly at the cutoff so the tip never jumps.
function sliceCurve(points: Vec[], tangents: number[], curved: boolean, progress: number): Frame {
  "worklet";
  if (progress >= 1 || points.length < 2) return { points, tangents };
  const first = points[0];
  const last = points[points.length - 1];
  const cutoff = first.x + (last.x - first.x) * progress;
  if (cutoff <= first.x) return { points: [], tangents: [] };
  const kept: Vec[] = [];
  const keptTangents: number[] = [];
  for (let i = 0; i < points.length; i++) {
    if (points[i].x > cutoff) break;
    kept.push(points[i]);
    keptTangents.push(tangents[i] ?? 0);
  }
  const tail = kept[kept.length - 1];
  if (tail == null || tail.x < cutoff) {
    kept.push({ x: cutoff, y: yForX(points, tangents, curved, cutoff) });
    keptTangents.push(slopeForX(points, tangents, curved, cutoff));
  }
  return { points: kept, tangents: keptTangents };
}

function blendFrame(
  fromPoints: Vec[],
  fromTangents: number[],
  toPoints: Vec[],
  toTangents: number[],
  progress: number,
  curved: boolean
): Frame {
  "worklet";
  if (progress >= 1 || fromPoints.length !== toPoints.length) return { points: toPoints, tangents: toTangents };
  const points: Vec[] = [];
  const tangents: number[] = [];
  for (let i = 0; i < toPoints.length; i++) {
    points.push({ x: toPoints[i].x, y: lerp(fromPoints[i].y, toPoints[i].y, progress) });
    if (curved) tangents.push(lerp(fromTangents[i] ?? 0, toTangents[i] ?? 0, progress));
  }
  return { points, tangents };
}

function indexForX(points: Vec[], x: number): number {
  "worklet";
  if (points.length === 0) return -1;
  let nearest = 0;
  let shortest = Math.abs(points[0].x - x);
  for (let i = 1; i < points.length; i++) {
    const distance = Math.abs(points[i].x - x);
    if (distance < shortest) {
      shortest = distance;
      nearest = i;
    }
  }
  return nearest;
}

// JS-thread helpers (run once per data/layout change, not per-frame): build a
// shared sample grid along the NEW curve so an old and a new curve with a
// DIFFERENT point count can still be lerped index-for-index without glitching.
function morphGrid(from: Vec[], to: Vec[]): number[] {
  if (to.length < 2) return to.map((p) => p.x);
  const segments = to.length - 1;
  const wanted = Math.min(MAX_MORPH_SAMPLES, Math.max(to.length, from.length * 4));
  const factor = Math.min(8, Math.max(1, Math.round(wanted / segments)));
  if (factor <= 1) return to.map((p) => p.x);
  const xs: number[] = [];
  for (let i = 0; i < segments; i++) {
    const start = to[i].x;
    const step = (to[i + 1].x - start) / factor;
    for (let k = 0; k < factor; k++) xs.push(start + step * k);
  }
  xs.push(to[segments].x);
  return xs;
}

function sampleAt(points: Vec[], tangents: number[], curved: boolean, xs: number[]): Vec[] {
  return xs.map((x) => ({ x, y: yForX(points, tangents, curved, x) }));
}

function toPixelPoints(pts: LineChartDataPoint[], left: number, top: number, cw: number, ch: number, maxVal: number): Vec[] {
  return pts.map((d, i) => ({
    x: left + (i / Math.max(pts.length - 1, 1)) * cw,
    y: top + ch - (d.value / maxVal) * ch,
  }));
}

interface AnimatedCurveProps {
  points: Vec[];
  curved: boolean;
  color: string;
  dashed?: boolean;
  draw: SharedValue<number>;
  showDots: boolean;
  frameOut?: SharedValue<Frame>;
}

// Renders one series: handles its own entrance draw-on + morph-on-data-change
// animation, then draws the (possibly sliced) Skia path plus fading-in dots.
function AnimatedCurve({ points, curved, color, dashed, draw, showDots, frameOut }: AnimatedCurveProps) {
  const targetPoints = useSharedValue<Vec[]>(points);
  const targetTangents = useSharedValue<number[]>(curved ? monotoneTangents(points) : []);
  const originPoints = useSharedValue<Vec[]>(points);
  const originTangents = useSharedValue<number[]>(targetTangents.value);
  const morph = useSharedValue(1);
  const hasEntered = useRef(false);

  const frame = useDerivedValue<Frame>(
    () => blendFrame(originPoints.value, originTangents.value, targetPoints.value, targetTangents.value, morph.value, curved),
    [curved]
  );

  useEffect(() => {
    if (points.length === 0) return;
    const nextTangents = curved ? monotoneTangents(points) : [];

    if (!hasEntered.current) {
      hasEntered.current = true;
      originPoints.value = points;
      originTangents.value = nextTangents;
      targetPoints.value = points;
      targetTangents.value = nextTangents;
      cancelAnimation(morph);
      morph.value = 1;
      return;
    }

    const current = frame.value;
    const source = current.points.length > 1 ? current.points : targetPoints.value;
    const sourceTangents = current.points.length > 1 ? current.tangents : targetTangents.value;
    const grid = morphGrid(source, points);
    const origin = sampleAt(source, sourceTangents, curved, grid);
    const target = sampleAt(points, nextTangents, curved, grid);

    originPoints.value = origin;
    originTangents.value = curved ? monotoneTangents(origin) : [];
    targetPoints.value = target;
    targetTangents.value = curved ? monotoneTangents(target) : [];

    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, curved]);

  useAnimatedReaction(
    () => frame.value,
    (current) => {
      if (frameOut) frameOut.value = current;
    },
    [frameOut]
  );

  const drawn = useDerivedValue<Frame>(() => sliceCurve(frame.value.points, frame.value.tangents, curved, draw.value), [curved]);
  const path = useDerivedValue<string>(() => buildPath(drawn.value.points, drawn.value.tangents, curved), [curved]);
  const cutoff = useDerivedValue<number>(() => {
    const pts = frame.value.points;
    if (pts.length < 2) return 0;
    return pts[0].x + (pts[pts.length - 1].x - pts[0].x) * draw.value;
  });

  return (
    <>
      <Path path={path} color={color} style="stroke" strokeWidth={2} strokeJoin="round" strokeCap="round">
        {dashed ? <DashPathEffect intervals={[8, 6]} /> : null}
      </Path>
      {showDots &&
        points.map((p, i) => <SeriesDot key={i} x={p.x} y={p.y} color={color} cutoff={cutoff} />)}
    </>
  );
}

function SeriesDot({ x, y, color, cutoff }: { x: number; y: number; color: string; cutoff: SharedValue<number> }) {
  const opacity = useDerivedValue(() => (cutoff.value >= x ? 1 : 0));
  return (
    <Group opacity={opacity}>
      <Circle cx={x} cy={y} r={3} color="white" />
      <Circle cx={x} cy={y} r={3} style="stroke" strokeWidth={2} color={color} />
    </Group>
  );
}

export function LineChart({
  className,
  data,
  height = 200,
  color,
  showDots = true,
  showGrid = true,
  showLabels = false,
  curved = true,
  series,
  onPointChange,
  ...props
}: LineChartProps) {
  const [width, setWidth] = useState(0);
  const [tooltipIndex, setTooltipIndex] = useState(-1);
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
  const seriesColor = color ?? colors.primary;
  const gridColor = colors.border;
  const labelColor = colors.mutedForeground;
  // Punch-through ring behind the trailing indicator dot — light side is "#ffffff",
  // not "#fafafa", so it doesn't cleanly match the primaryForeground pair; left
  // as-is rather than forcing a mapping (see report).
  const ringColor = dark ? "#18181b" : "#ffffff";
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  const allSeries: LineChartSeries[] = useMemo(() => series ?? [{ data: data ?? [], color: seriesColor }], [series, data, seriesColor]);
  const maxVal = useMemo(() => Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1), [allSeries]);
  const pad = showLabels ? { top: 10, right: 10, bottom: 24, left: 36 } : { top: 10, right: 10, bottom: 10, left: 10 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const pixelSeries = useMemo(
    () => allSeries.map((s) => toPixelPoints(s.data, pad.left, pad.top, cw, ch, maxVal)),
    [allSeries, cw, ch, maxVal, pad.left, pad.top]
  );
  const gridPath = useMemo(
    () => [3, 2, 1, 0].map((i) => `M ${pad.left} ${pad.top + (i / 3) * ch} L ${pad.left + cw} ${pad.top + (i / 3) * ch}`).join(" "),
    [pad.left, pad.top, cw, ch]
  );
  const primaryPoints = pixelSeries[0] ?? [];
  const labels = allSeries[0]?.data ?? [];
  const primaryColor = allSeries[0]?.color ?? seriesColor;

  const draw = useSharedValue(0);
  const isActive = useSharedValue(0);
  const cursorX = useSharedValue(0);
  const cursorY = useSharedValue(0);
  const selectedIndex = useSharedValue(-1);
  const dataPoints = useSharedValue<Vec[]>([]);
  const primaryFrame = useSharedValue<Frame>({ points: [], tangents: [] });
  const pulse = useSharedValue(0);
  const hasEnteredChart = useRef(false);
  const tooltipWidth = useSharedValue(0);
  const tooltipHeight = useSharedValue(0);

  useEffect(() => {
    if (width === 0 || primaryPoints.length === 0) return;
    dataPoints.value = primaryPoints;
    if (!hasEnteredChart.current) {
      hasEnteredChart.current = true;
      cancelAnimation(draw);
      draw.value = 0;
      draw.value = withTiming(1, { duration: DRAW_DURATION, easing: Easing.out(Easing.cubic) });
    }
  }, [primaryPoints, width]);

  useEffect(() => {
    pulse.value = withRepeat(
      withDelay(PULSE_DELAY, withSequence(withTiming(1, { duration: PULSE_DURATION }), withTiming(0, { duration: 0 }))),
      -1
    );
    return () => cancelAnimation(pulse);
  }, []);

  const reportPoint = useCallback(
    (index: number) => {
      setTooltipIndex(index);
      const point = labels[index];
      if (point) onPointChange?.(point, index);
    },
    [labels, onPointChange]
  );
  const clearPoint = useCallback(() => setTooltipIndex(-1), []);

  const gesture = useMemo(() => {
    const scrub = (x: number) => {
      "worklet";
      const { points, tangents } = primaryFrame.value;
      if (points.length < 2) return;
      const clampedX = Math.min(Math.max(x, points[0].x), points[points.length - 1].x);
      cursorX.value = clampedX;
      cursorY.value = yForX(points, tangents, curved, clampedX);
      const index = indexForX(dataPoints.value, clampedX);
      if (index !== selectedIndex.value) {
        selectedIndex.value = index;
        runOnJS(reportPoint)(index);
      }
    };
    return Gesture.Pan()
      .minDistance(0)
      .onBegin((e) => {
        "worklet";
        scrub(e.x);
        isActive.value = withTiming(1, { duration: 140 });
      })
      .onUpdate((e) => {
        "worklet";
        scrub(e.x);
      })
      .onFinalize(() => {
        "worklet";
        isActive.value = withTiming(0, { duration: 220 });
        selectedIndex.value = -1;
        runOnJS(clearPoint)();
      });
  }, [curved, reportPoint, clearPoint]);

  const lastX = useDerivedValue(() => {
    const pts = primaryFrame.value.points;
    return pts.length > 0 ? pts[pts.length - 1].x : 0;
  });
  const lastY = useDerivedValue(() => {
    const pts = primaryFrame.value.points;
    return pts.length > 0 ? pts[pts.length - 1].y : 0;
  });
  const indicatorOpacity = useDerivedValue(
    () => interpolate(draw.value, [0.85, 1], [0, 1], Extrapolation.CLAMP) * (1 - isActive.value)
  );
  const pulseRadius = useDerivedValue(() =>
    interpolate(pulse.value, [0, 1], [INDICATOR_RADIUS, INDICATOR_RADIUS * PULSE_RADIUS_MULTIPLIER])
  );
  const pulseOpacity = useDerivedValue(() => interpolate(pulse.value, [0, 1], [0.35, 0]) * indicatorOpacity.value);

  const cursorScale = useDerivedValue(() => withSpring(isActive.value, SPRING_CONFIG));
  const cursorDotRadius = useDerivedValue(() => 6 * cursorScale.value);
  const cursorBorderRadius = useDerivedValue(() => 6 * INDICATOR_BORDER_MULTIPLIER * cursorScale.value);
  const crosshairPath = useDerivedValue(
    () => `M ${cursorX.value} ${pad.top} L ${cursorX.value} ${pad.top + ch}`,
    [pad.top, ch]
  );

  const tooltipStyle = useAnimatedStyle(() => {
    const half = tooltipWidth.value / 2;
    const translateX = Math.min(Math.max(cursorX.value - half, 0), Math.max(width - tooltipWidth.value, 0));
    const translateY = Math.max(cursorY.value - tooltipHeight.value - 14, 0);
    return { opacity: isActive.value, transform: [{ translateX }, { translateY }] };
  });
  const onTooltipLayout = (e: LayoutChangeEvent) => {
    tooltipWidth.value = e.nativeEvent.layout.width;
    tooltipHeight.value = e.nativeEvent.layout.height;
  };
  const tooltipPoint = tooltipIndex >= 0 ? labels[tooltipIndex] : undefined;

  if (width === 0) {
    return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;
  }

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {showGrid && <Path path={gridPath} color={gridColor} style="stroke" strokeWidth={1} />}
          {allSeries.map((s, i) => (
            <AnimatedCurve
              key={i}
              points={pixelSeries[i]}
              curved={curved}
              color={s.color}
              dashed={s.dashed}
              draw={draw}
              showDots={showDots}
              frameOut={i === 0 ? primaryFrame : undefined}
            />
          ))}
          <Path path={crosshairPath} color={labelColor} style="stroke" strokeWidth={1} opacity={isActive} />
          <Circle cx={lastX} cy={lastY} r={pulseRadius} opacity={pulseOpacity} color={primaryColor} />
          <Circle cx={lastX} cy={lastY} r={INDICATOR_RADIUS * INDICATOR_BORDER_MULTIPLIER} opacity={indicatorOpacity} color={ringColor} />
          <Circle cx={lastX} cy={lastY} r={INDICATOR_RADIUS} opacity={indicatorOpacity} color={primaryColor} />
          <Circle cx={cursorX} cy={cursorY} r={cursorBorderRadius} opacity={isActive} color={ringColor} />
          <Circle cx={cursorX} cy={cursorY} r={cursorDotRadius} opacity={isActive} color={primaryColor} />
        </Canvas>
      </GestureDetector>
      {showLabels && (
        <View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, width, height }}>
          {labels.map((d, i) => (
            <Text
              key={i}
              className="absolute text-[10px]"
              style={{ left: pad.left + (i / Math.max(labels.length - 1, 1)) * cw - 20, top: height - 16, width: 40, textAlign: "center", color: labelColor }}
            >
              {d.label}
            </Text>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Text
              key={`y${i}`}
              className="absolute text-right text-[9px]"
              style={{ left: 0, top: pad.top + ((3 - i) / 3) * ch - 6, width: pad.left - 6, color: labelColor }}
            >
              {Math.round((i / 3) * maxVal)}
            </Text>
          ))}
        </View>
      )}
      <Animated.View
        pointerEvents="none"
        onLayout={onTooltipLayout}
        style={[{ position: "absolute", left: 0, top: 0 }, tooltipStyle]}
      >
        {tooltipPoint ? <ChartTooltip label={tooltipPoint.label} value={tooltipPoint.value} color={primaryColor} /> : null}
      </Animated.View>
    </View>
  );
}
