import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent, useColorScheme } from "react-native";
import { Canvas, Circle, Group, LinearGradient, Path, vec } from "@shopify/react-native-skia";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "@/components/ui/chart-tooltip";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  curved?: boolean;
  series?: { data: AreaChartDataPoint[]; color: string }[];
  onPointChange?: (point: AreaChartDataPoint, index: number) => void;
}

type PixelPoint = { x: number; y: number };
type CurveFrame = { points: PixelPoint[]; tangents: number[] };
type Padding = { top: number; right: number; bottom: number; left: number };

const DRAW_DURATION = 900;
const MORPH_DURATION = 550;
const SPRING_CONFIG = { damping: 20, stiffness: 300, mass: 1 };
const MAX_MORPH_SAMPLES = 160;

function lerpNum(from: number, to: number, t: number): number {
  "worklet";
  return from + (to - from) * t;
}

// Plain-JS (JS-thread only) mapping of data values into plot-space pixels.
function computePixelPoints(points: AreaChartDataPoint[], maxVal: number, pad: Padding, plotWidth: number, plotHeight: number): PixelPoint[] {
  const n = points.length;
  return points.map((p, i) => ({
    x: pad.left + (n > 1 ? (i / (n - 1)) * plotWidth : 0),
    y: pad.top + plotHeight - (p.value / Math.max(maxVal, 1)) * plotHeight,
  }));
}

// Fritsch-Carlson monotone cubic Hermite tangents, clamped so a segment's
// tangent/slope ratio never exceeds magnitude 3 (prevents overshoot).
function computeMonotoneTangents(points: PixelPoint[]): number[] {
  "worklet";
  const n = points.length;
  if (n < 2) return points.map(() => 0);

  const slopes: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const run = points[i + 1]!.x - points[i]!.x;
    slopes.push(run === 0 ? 0 : (points[i + 1]!.y - points[i]!.y) / run);
  }

  const tangents: number[] = [slopes[0]!];
  for (let i = 1; i < n - 1; i++) {
    const a = slopes[i - 1]!;
    const b = slopes[i]!;
    tangents.push(a * b <= 0 ? 0 : (a + b) / 2);
  }
  tangents.push(slopes[n - 2]!);

  for (let i = 0; i < n - 1; i++) {
    const slope = slopes[i]!;
    if (slope === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i]! / slope;
    const b = tangents[i + 1]! / slope;
    const magnitude = a * a + b * b;
    if (magnitude > 9) {
      const scale = 3 / Math.sqrt(magnitude);
      tangents[i] = scale * a * slope;
      tangents[i + 1] = scale * b * slope;
    }
  }
  return tangents;
}

function tangentsForCurve(points: PixelPoint[], curved: boolean): number[] {
  "worklet";
  return curved ? computeMonotoneTangents(points) : [];
}

function buildCurvePath(points: PixelPoint[], tangents: number[], curved: boolean): string {
  "worklet";
  if (points.length === 0) return "M 0 0";
  if (points.length === 1) return `M ${points[0]!.x} ${points[0]!.y}`;

  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i]!;
    const to = points[i + 1]!;
    if (!curved) {
      d += ` L ${to.x} ${to.y}`;
      continue;
    }
    const run = (to.x - from.x) / 3;
    const c1x = from.x + run;
    const c1y = from.y + tangents[i]! * run;
    const c2x = to.x - run;
    const c2y = to.y - tangents[i + 1]! * run;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${to.x} ${to.y}`;
  }
  return d;
}

// Line path + close down to the baseline — the standard "append L/L/Z"
// technique for turning a line path into a filled area beneath it.
function buildFillPath(points: PixelPoint[], tangents: number[], curved: boolean, baselineY: number): string {
  "worklet";
  if (points.length < 2) return "M 0 0";
  const line = buildCurvePath(points, tangents, curved);
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return `${line} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;
}

function yAtX(points: PixelPoint[], tangents: number[], curved: boolean, x: number): number {
  "worklet";
  if (points.length === 0) return 0;
  if (points.length === 1) return points[0]!.y;
  if (x <= points[0]!.x) return points[0]!.y;
  const last = points[points.length - 1]!;
  if (x >= last.x) return last.y;

  let idx = 0;
  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i]!.x && x <= points[i + 1]!.x) {
      idx = i;
      break;
    }
  }
  const from = points[idx]!;
  const to = points[idx + 1]!;
  const run = to.x - from.x;
  if (run === 0) return to.y;

  const t = (x - from.x) / run;
  if (!curved) return lerpNum(from.y, to.y, t);

  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return h00 * from.y + h10 * run * (tangents[idx] ?? 0) + h01 * to.y + h11 * run * (tangents[idx + 1] ?? 0);
}

function slopeAtX(points: PixelPoint[], tangents: number[], curved: boolean, x: number): number {
  "worklet";
  if (points.length < 2) return 0;
  let idx = points.length - 2;
  for (let i = 0; i < points.length - 1; i++) {
    if (x >= points[i]!.x && x <= points[i + 1]!.x) {
      idx = i;
      break;
    }
  }
  const from = points[idx]!;
  const to = points[idx + 1]!;
  const run = to.x - from.x;
  if (run === 0) return 0;
  if (!curved) return (to.y - from.y) / run;

  const t = Math.min(Math.max((x - from.x) / run, 0), 1);
  const m0 = tangents[idx] ?? 0;
  const m1 = tangents[idx + 1] ?? 0;
  return ((6 * t * t - 6 * t) * (from.y - to.y)) / run + (3 * t * t - 4 * t + 1) * m0 + (3 * t * t - 2 * t) * m1;
}

// Entrance "draw-on": keep only the points left of the progress cutoff,
// synthesizing one extra point exactly at the cutoff so the reveal never jumps.
function cutAtProgress(points: PixelPoint[], tangents: number[], curved: boolean, progress: number): CurveFrame {
  "worklet";
  if (progress >= 1 || points.length < 2) return { points, tangents };
  const first = points[0]!;
  const last = points[points.length - 1]!;
  const cutoff = first.x + (last.x - first.x) * progress;
  if (cutoff <= first.x) return { points: [], tangents: [] };

  const kept: PixelPoint[] = [];
  const keptTangents: number[] = [];
  for (let i = 0; i < points.length; i++) {
    if (points[i]!.x > cutoff) break;
    kept.push(points[i]!);
    keptTangents.push(tangents[i] ?? 0);
  }
  const tail = kept[kept.length - 1];
  if (tail == null || tail.x < cutoff) {
    kept.push({ x: cutoff, y: yAtX(points, tangents, curved, cutoff) });
    keptTangents.push(slopeAtX(points, tangents, curved, cutoff));
  }
  return { points: kept, tangents: keptTangents };
}

// Point-by-point lerp — only valid once both frames share the same vertex
// count, which is guaranteed by the JS-side resampling done before a morph.
function interpolateFrames(fromPts: PixelPoint[], fromTans: number[], toPts: PixelPoint[], toTans: number[], progress: number, curved: boolean): CurveFrame {
  "worklet";
  if (progress >= 1 || fromPts.length !== toPts.length) return { points: toPts, tangents: toTans };
  const points: PixelPoint[] = [];
  const tangents: number[] = [];
  for (let i = 0; i < toPts.length; i++) {
    points.push({ x: toPts[i]!.x, y: lerpNum(fromPts[i]!.y, toPts[i]!.y, progress) });
    if (curved) tangents.push(lerpNum(fromTans[i] ?? 0, toTans[i] ?? 0, progress));
  }
  return { points, tangents };
}

function nearestIndex(points: PixelPoint[], x: number): number {
  "worklet";
  let nearest = 0;
  let shortest = Math.abs(points[0]!.x - x);
  for (let i = 1; i < points.length; i++) {
    const d = Math.abs(points[i]!.x - x);
    if (d < shortest) {
      shortest = d;
      nearest = i;
    }
  }
  return nearest;
}

// A shared x-sample grid along the NEW curve, capped at ~160 samples, dense
// enough that resampling the OLD curve at the same x's stays smooth.
function buildSampleGrid(fromPts: PixelPoint[], toPts: PixelPoint[], curved: boolean): number[] {
  if (!curved || toPts.length < 2) return toPts.map((p) => p.x);
  const segments = toPts.length - 1;
  const wanted = Math.min(MAX_MORPH_SAMPLES, Math.max(toPts.length, fromPts.length * 4));
  const factor = Math.min(8, Math.max(1, Math.round(wanted / segments)));
  if (factor <= 1) return toPts.map((p) => p.x);

  const xs: number[] = [];
  for (let i = 0; i < segments; i++) {
    const start = toPts[i]!.x;
    const step = (toPts[i + 1]!.x - start) / factor;
    for (let k = 0; k < factor; k++) xs.push(start + step * k);
  }
  xs.push(toPts[segments]!.x);
  return xs;
}

function resamplePoints(points: PixelPoint[], tangents: number[], curved: boolean, xs: number[]): PixelPoint[] {
  return xs.map((x) => ({ x, y: yAtX(points, tangents, curved, x) }));
}

function toRgba(color: string, alpha: number): string {
  if (!color.startsWith("#")) return color;
  let hex = color.slice(1);
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Owns the draw-on / morph-on-data-change timeline for a single series: on
// first mount it reveals left-to-right, on later data changes with a
// different point count it resamples old+new onto a shared grid so the
// vertices line up before lerping between them.
function useCurveFrame(pixelPoints: PixelPoint[], curved: boolean, isMeasured: boolean) {
  const targetPoints = useSharedValue<PixelPoint[]>([]);
  const targetTangents = useSharedValue<number[]>([]);
  const originPoints = useSharedValue<PixelPoint[]>([]);
  const originTangents = useSharedValue<number[]>([]);
  const morph = useSharedValue(1);
  const draw = useSharedValue(0);
  const hasEntered = useRef(false);

  const frame = useDerivedValue<CurveFrame>(
    () => interpolateFrames(originPoints.value, originTangents.value, targetPoints.value, targetTangents.value, morph.value, curved),
    [curved]
  );

  const drawnFrame = useDerivedValue<CurveFrame>(
    () => cutAtProgress(frame.value.points, frame.value.tangents, curved, draw.value),
    [curved]
  );

  useEffect(() => {
    if (!isMeasured || pixelPoints.length < 2) return;
    const nextTangents = tangentsForCurve(pixelPoints, curved);
    const isEntrance = !hasEntered.current;
    hasEntered.current = true;

    if (isEntrance) {
      originPoints.value = pixelPoints;
      originTangents.value = nextTangents;
      targetPoints.value = pixelPoints;
      targetTangents.value = nextTangents;
      cancelAnimation(morph);
      morph.value = 1;
      cancelAnimation(draw);
      draw.value = 0;
      draw.value = withTiming(1, { duration: DRAW_DURATION, easing: Easing.out(Easing.cubic) });
      return;
    }

    const current = frame.value;
    const hasCurrent = current.points.length > 1;
    const source = hasCurrent ? current.points : targetPoints.value;
    const sourceTangents = hasCurrent ? current.tangents : targetTangents.value;

    const grid = buildSampleGrid(source, pixelPoints, curved);
    const origin = resamplePoints(source, sourceTangents, curved, grid);
    const target = resamplePoints(pixelPoints, nextTangents, curved, grid);

    originPoints.value = origin;
    originTangents.value = tangentsForCurve(origin, curved);
    targetPoints.value = target;
    targetTangents.value = tangentsForCurve(target, curved);

    cancelAnimation(morph);
    morph.value = 0;
    morph.value = withTiming(1, { duration: MORPH_DURATION, easing: Easing.inOut(Easing.cubic) });
  }, [pixelPoints, curved, isMeasured, frame, morph, draw, originPoints, originTangents, targetPoints, targetTangents]);

  return { frame, drawnFrame };
}

// Self-contained area+line for one extra series (index >= 1). The primary
// series (index 0) is rendered inline in AreaChart so its frame can drive
// the scrub crosshair without threading refs across components.
function SeriesLayer({
  data,
  color,
  fillOpacity,
  curved,
  maxVal,
  pad,
  plotWidth,
  plotHeight,
  canvasHeight,
  isMeasured,
}: {
  data: AreaChartDataPoint[];
  color: string;
  fillOpacity: number;
  curved: boolean;
  maxVal: number;
  pad: Padding;
  plotWidth: number;
  plotHeight: number;
  canvasHeight: number;
  isMeasured: boolean;
}) {
  const pixelPoints = useMemo(() => computePixelPoints(data, maxVal, pad, plotWidth, plotHeight), [data, maxVal, pad, plotWidth, plotHeight]);
  const baselineY = pad.top + plotHeight;
  const { drawnFrame } = useCurveFrame(pixelPoints, curved, isMeasured);

  const linePath = useDerivedValue(() => buildCurvePath(drawnFrame.value.points, drawnFrame.value.tangents, curved), [curved]);
  const areaPath = useDerivedValue(() => buildFillPath(drawnFrame.value.points, drawnFrame.value.tangents, curved, baselineY), [curved, baselineY]);

  return (
    <Group>
      <Path path={areaPath}>
        <LinearGradient start={vec(0, 0)} end={vec(0, canvasHeight)} colors={[toRgba(color, fillOpacity), toRgba(color, 0.02)]} />
      </Path>
      <Path path={linePath} color={color} style="stroke" strokeWidth={2} strokeCap="round" strokeJoin="round" />
    </Group>
  );
}

export function AreaChart({
  className,
  data,
  height = 200,
  color,
  fillOpacity = 0.3,
  showGrid = true,
  showLabels = false,
  curved = true,
  series,
  onPointChange,
  ...props
}: AreaChartProps) {
  const [width, setWidth] = useState(0);
  const dark = useColorScheme() === "dark";
  const colors = useThemeColors();
  const resolvedColor = color ?? colors.primary;
  const gridColor = colors.border;
  const labelColor = colors.mutedForeground;
  const onLayout = useCallback((e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width), []);

  const pad = useMemo<Padding>(
    () => (showLabels ? { top: 10, right: 10, bottom: 24, left: 36 } : { top: 10, right: 10, bottom: 10, left: 10 }),
    [showLabels]
  );
  const plotWidth = Math.max(width - pad.left - pad.right, 0);
  const plotHeight = Math.max(height - pad.top - pad.bottom, 0);
  const baselineY = pad.top + plotHeight;
  const isMeasured = width > 0 && height > 0;

  const allSeries = useMemo(() => series ?? [{ data, color: resolvedColor }], [series, data, resolvedColor]);
  const maxVal = useMemo(() => Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1), [allSeries]);
  const primary = allSeries[0]!;
  const restSeries = allSeries.slice(1);

  const primaryPoints = useMemo(
    () => computePixelPoints(primary.data, maxVal, pad, plotWidth, plotHeight),
    [primary.data, maxVal, pad, plotWidth, plotHeight]
  );
  const { frame, drawnFrame } = useCurveFrame(primaryPoints, curved, isMeasured);

  const primaryLinePath = useDerivedValue(() => buildCurvePath(drawnFrame.value.points, drawnFrame.value.tangents, curved), [curved]);
  const primaryAreaPath = useDerivedValue(
    () => buildFillPath(drawnFrame.value.points, drawnFrame.value.tangents, curved, baselineY),
    [curved, baselineY]
  );

  const isActive = useSharedValue(0);
  const cursorX = useSharedValue(0);
  const cursorY = useSharedValue(0);
  const selectedIndex = useSharedValue(-1);
  const tooltipWidth = useSharedValue(0);
  const tooltipHeight = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const reportPoint = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const point = primary.data[index];
      if (point != null) onPointChange?.(point, index);
    },
    [primary.data, onPointChange]
  );
  const clearPoint = useCallback(() => setActiveIndex(-1), []);

  const scrubTo = useCallback(
    (x: number) => {
      "worklet";
      const { points, tangents } = frame.value;
      if (points.length < 2) return;
      const clampedX = Math.min(Math.max(x, points[0]!.x), points[points.length - 1]!.x);
      cursorX.value = clampedX;
      cursorY.value = yAtX(points, tangents, curved, clampedX);
      const idx = nearestIndex(points, clampedX);
      if (idx !== selectedIndex.value) {
        selectedIndex.value = idx;
        runOnJS(reportPoint)(idx);
      }
    },
    [frame, curved, cursorX, cursorY, selectedIndex, reportPoint]
  );

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(0)
        .onBegin((e) => {
          "worklet";
          scrubTo(e.x);
          isActive.value = withTiming(1, { duration: 140 });
        })
        .onUpdate((e) => {
          "worklet";
          scrubTo(e.x);
        })
        .onFinalize(() => {
          "worklet";
          isActive.value = withTiming(0, { duration: 220 });
          selectedIndex.value = -1;
          runOnJS(clearPoint)();
        }),
    [scrubTo, isActive, selectedIndex, clearPoint]
  );

  const crosshairPath = useDerivedValue(() => `M ${cursorX.value} ${pad.top} L ${cursorX.value} ${baselineY}`, [pad.top, baselineY]);
  const cursorScale = useDerivedValue(() => withSpring(isActive.value, SPRING_CONFIG));
  const dotRadius = useDerivedValue(() => 5 * cursorScale.value);
  const dotBorderRadius = useDerivedValue(() => 8 * cursorScale.value);

  const tooltipStyle = useAnimatedStyle(() => {
    const half = tooltipWidth.value / 2;
    const translateX = Math.min(Math.max(cursorX.value - half, 0), Math.max(width - tooltipWidth.value, 0));
    const translateY = Math.max(cursorY.value - tooltipHeight.value - 14, 0);
    return { opacity: isActive.value, transform: [{ translateX }, { translateY }] };
  });

  if (width === 0) {
    return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;
  }

  const activePoint = activeIndex >= 0 ? primary.data[activeIndex] : undefined;
  const tooltipItems =
    allSeries.length > 1 && activeIndex >= 0
      ? allSeries.map((s) => ({ label: s.data[activeIndex]?.label ?? "", value: s.data[activeIndex]?.value ?? 0, color: s.color }))
      : undefined;

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <GestureDetector gesture={panGesture}>
        <Canvas style={{ width, height }}>
          {showGrid &&
            [0, 1, 2, 3].map((i) => {
              const y = pad.top + (i / 3) * plotHeight;
              return <Path key={i} path={`M ${pad.left} ${y} L ${pad.left + plotWidth} ${y}`} color={gridColor} style="stroke" strokeWidth={1} />;
            })}
          {restSeries.map((s, i) => (
            <SeriesLayer
              key={i}
              data={s.data}
              color={s.color}
              fillOpacity={fillOpacity}
              curved={curved}
              maxVal={maxVal}
              pad={pad}
              plotWidth={plotWidth}
              plotHeight={plotHeight}
              canvasHeight={height}
              isMeasured={isMeasured}
            />
          ))}
          <Path path={primaryAreaPath}>
            <LinearGradient start={vec(0, 0)} end={vec(0, height)} colors={[toRgba(primary.color, fillOpacity), toRgba(primary.color, 0.02)]} />
          </Path>
          <Path path={primaryLinePath} color={primary.color} style="stroke" strokeWidth={2} strokeCap="round" strokeJoin="round" />
          <Path path={crosshairPath} color={dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"} style="stroke" strokeWidth={1} opacity={isActive} />
          <Circle cx={cursorX} cy={cursorY} r={dotBorderRadius} opacity={isActive} color={colors.background} />
          <Circle cx={cursorX} cy={cursorY} r={dotRadius} opacity={isActive} color={primary.color} />
        </Canvas>
      </GestureDetector>
      {showLabels && (
        <>
          {data.map((d, i) => (
            <Text
              key={`x${i}`}
              style={{
                position: "absolute",
                left: pad.left + (data.length > 1 ? (i / (data.length - 1)) * plotWidth : 0) - 20,
                top: height - 18,
                width: 40,
                fontSize: 10,
                color: labelColor,
                textAlign: "center",
              }}
            >
              {d.label}
            </Text>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Text
              key={`y${i}`}
              style={{
                position: "absolute",
                left: 0,
                top: pad.top + ((3 - i) / 3) * plotHeight - 6,
                width: pad.left - 4,
                fontSize: 9,
                color: labelColor,
                textAlign: "right",
              }}
            >
              {Math.round((i / 3) * maxVal)}
            </Text>
          ))}
        </>
      )}
      <Animated.View
        pointerEvents="none"
        onLayout={(e) => {
          tooltipWidth.value = e.nativeEvent.layout.width;
          tooltipHeight.value = e.nativeEvent.layout.height;
        }}
        style={[{ position: "absolute", left: 0, top: 0 }, tooltipStyle]}
      >
        <ChartTooltip label={activePoint?.label} value={activePoint?.value} color={primary.color} items={tooltipItems} />
      </Animated.View>
    </View>
  );
}
