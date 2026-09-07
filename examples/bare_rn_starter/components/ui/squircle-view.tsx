import React, { useCallback, useState } from "react";
import { View, type LayoutChangeEvent, type ViewProps } from "react-native";
import { Canvas, Path } from "@shopify/react-native-skia";
import Animated, { isSharedValue, useAnimatedStyle, useDerivedValue, type SharedValue } from "react-native-reanimated";
import { cn } from "@/lib/utils";

// Superellipse ("squircle") outline built as 4 cubic-bezier corners on an SVG
// path string. `CIRCULAR_KAPPA` is the constant that makes a cubic bezier
// trace a quarter-circle (a plain rounded rect); `SUPERELLIPSE_KAPPA` pulls
// the same control points further out along each tangent, flattening the
// sides so the curve reads as continuous-curvature (the iOS-icon look)
// instead of a circular arc. `smoothing` blends between the two AND grows a
// straight "shoulder" run before each curve starts, so higher smoothing
// widens the corner blend rather than just rounding it more — the same two
// knobs Figma's corner-smoothing slider exposes.
const CIRCULAR_KAPPA = 0.5519150244935105;
const SUPERELLIPSE_KAPPA = 0.9091;

function squirclePath(width: number, height: number, radius: number, smoothing: number): string {
  "worklet";
  const maxRadius = Math.min(width, height) / 2;
  const r = Math.min(Math.max(radius, 0), maxRadius);
  const s = Math.min(Math.max(smoothing, 0), 1);
  const shoulder = Math.min(r * s, Math.max(0, maxRadius - r));
  const kappa = CIRCULAR_KAPPA + s * (SUPERELLIPSE_KAPPA - CIRCULAR_KAPPA);
  const handle = (r + shoulder) * kappa;
  const cut = r + shoulder;

  return (
    `M ${cut} 0 L ${width - cut} 0 ` +
    `C ${width - cut + handle} 0 ${width} ${cut - handle} ${width} ${cut} ` +
    `L ${width} ${height - cut} ` +
    `C ${width} ${height - cut + handle} ${width - cut + handle} ${height} ${width - cut} ${height} ` +
    `L ${cut} ${height} ` +
    `C ${cut - handle} ${height} 0 ${height - cut + handle} 0 ${height - cut} ` +
    `L 0 ${cut} ` +
    `C 0 ${cut - handle} ${cut - handle} 0 ${cut} 0 Z`
  );
}

type NumberOrShared = number | SharedValue<number>;

function readNumber(value: NumberOrShared): number {
  "worklet";
  return isSharedValue<number>(value) ? value.value : value;
}

const DEFAULT_CORNER_RADIUS = 20;
const DEFAULT_CORNER_SMOOTHING = 0.6;

export interface SquircleViewProps extends Omit<ViewProps, "children"> {
  className?: string;
  children?: React.ReactNode;
  /** Fixed size in px. Omit to auto-size from layout (measured via `onLayout`). */
  width?: number;
  height?: number;
  /** Corner radius in px. Pass a Reanimated SharedValue to animate it. */
  cornerRadius?: NumberOrShared;
  /** 0 = plain rounded-rect corner, 1 = full superellipse squircle. Pass a SharedValue to animate it. */
  cornerSmoothing?: NumberOrShared;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

/** A true superellipse container — mathematically distinct from `borderRadius`
 * (which is a circular arc), not an approximation of one. The fill/stroke is
 * drawn as a path on a Skia `Canvas`, re-derived on the UI thread via
 * `useDerivedValue` so `cornerRadius`/`cornerSmoothing` accept either plain
 * numbers or Reanimated SharedValues for animation. `children` render as
 * ordinary React Native views on top, clipped by a plain-`borderRadius`
 * Animated.View — cheap GPU clipping that tracks the same radius and is
 * visually indistinguishable from the vector corner at typical smoothing. */
export function SquircleView({
  className,
  children,
  width: widthProp,
  height: heightProp,
  cornerRadius = DEFAULT_CORNER_RADIUS,
  cornerSmoothing = DEFAULT_CORNER_SMOOTHING,
  backgroundColor = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  style,
  ...props
}: SquircleViewProps) {
  const [measured, setMeasured] = useState({ w: 0, h: 0 });
  const isFixedSize = widthProp != null && heightProp != null;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setMeasured((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  }, []);

  const width = widthProp ?? measured.w;
  const height = heightProp ?? measured.h;
  const hasSize = width > 0 && height > 0;

  const path = useDerivedValue(() => {
    if (!hasSize) return "";
    return squirclePath(width, height, readNumber(cornerRadius), readNumber(cornerSmoothing));
  }, [width, height, cornerRadius, cornerSmoothing]);

  const clipStyle = useAnimatedStyle(() => ({
    borderRadius: readNumber(cornerRadius),
  }));

  return (
    <View
      onLayout={isFixedSize ? undefined : onLayout}
      className={cn(className)}
      style={[isFixedSize ? { width: widthProp, height: heightProp } : undefined, style]}
      {...props}
    >
      {hasSize && (
        <Canvas style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
          <Path path={path} color={backgroundColor} />
        </Canvas>
      )}
      <Animated.View className="overflow-hidden" style={clipStyle}>
        {children}
      </Animated.View>
      {/* Stroke is a separate, later Canvas so it draws on top of children
          instead of being covered by them — matching reacticx's fill-then-
          content-then-stroke order. */}
      {hasSize && borderWidth > 0 && (
        <Canvas style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
          <Path path={path} color={borderColor} style="stroke" strokeWidth={borderWidth * 2} />
        </Canvas>
      )}
    </View>
  );
}
