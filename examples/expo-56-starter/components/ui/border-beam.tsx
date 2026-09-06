import React, { useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import {
  Canvas,
  RoundedRect,
  SweepGradient,
  BlurMask,
  vec,
  useClock,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#ff3c78", "#ff9a3c", "#7cf25a", "#28c8ff", "#7a5cff", "#ff3c78"];
const AMBIENT_BLUR = 14;
const HALO_BLUR = 9;

export interface BorderBeamProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  borderRadius?: number;
  duration?: number;
  borderWidth?: number;
  /** Palette the sweeping beam cycles through. Defaults to a vibrant multi-hue sweep. */
  colors?: string[];
  /** Fraction (0-1) of the ring's circumference the bright beam window covers. */
  beamLength?: number;
  /** Overall brightness multiplier applied to the sweeping beam. */
  intensity?: number;
  /** Opacity of the always-on ambient glow that sits behind the beam. */
  ambient?: number;
}

export function BorderBeam({
  className,
  children,
  borderRadius = 12,
  duration = 3500,
  borderWidth = 2,
  colors = DEFAULT_COLORS,
  beamLength = 0.32,
  intensity = 1,
  ambient = 0.18,
  onLayout,
  ...props
}: BorderBeamProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const clock = useClock();

  // Extra canvas padding lets the blurred glow bloom bleed past the wrapped element's edges.
  const pad = AMBIENT_BLUR * 2 + borderWidth + 8;
  const cx = pad + size.width / 2;
  const cy = pad + size.height / 2;
  const arcHalf = Math.max(beamLength, 0.02) * 180;

  // Sweep start/end (in degrees) define a moving window; SweepGradient clamps to the
  // first/last color outside [start, end], so a "transparent" edge color turns the
  // rest of the ring invisible and only this window reads as a bright traveling arc.
  const sweepStart = useDerivedValue(() => {
    const t = (clock.value % duration) / duration;
    return t * 360 - arcHalf;
  }, [clock, duration, arcHalf]);

  const sweepEnd = useDerivedValue(() => {
    const t = (clock.value % duration) / duration;
    return t * 360 + arcHalf;
  }, [clock, duration, arcHalf]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
    onLayout?.(e);
  };

  const rectX = pad + borderWidth / 2;
  const rectY = pad + borderWidth / 2;
  const rectW = size.width - borderWidth;
  const rectH = size.height - borderWidth;
  const beamColors = ["transparent", ...colors, "transparent"];

  return (
    <View className={cn("relative", className)} onLayout={handleLayout} {...props}>
      {size.width > 0 && size.height > 0 && (
        <Canvas
          style={{
            position: "absolute",
            top: -pad,
            left: -pad,
            width: size.width + pad * 2,
            height: size.height + pad * 2,
          }}
          pointerEvents="none"
        >
          {/* Ambient base glow: soft, dim, always-on multi-hue halo around the full ring. */}
          <RoundedRect
            x={rectX}
            y={rectY}
            width={rectW}
            height={rectH}
            r={borderRadius}
            style="stroke"
            strokeWidth={borderWidth * 4}
            opacity={ambient}
          >
            <SweepGradient c={vec(cx, cy)} colors={colors} />
            <BlurMask blur={AMBIENT_BLUR} style="normal" />
          </RoundedRect>
          {/* Beam halo: wide, blurred bloom confined to the sweeping arc window. */}
          <RoundedRect
            x={rectX}
            y={rectY}
            width={rectW}
            height={rectH}
            r={borderRadius}
            style="stroke"
            strokeWidth={borderWidth * 3}
            opacity={intensity * 0.7}
          >
            <SweepGradient c={vec(cx, cy)} colors={beamColors} start={sweepStart} end={sweepEnd} />
            <BlurMask blur={HALO_BLUR} style="normal" />
          </RoundedRect>
          {/* Beam core: crisp bright line, same arc window as the halo above. */}
          <RoundedRect
            x={rectX}
            y={rectY}
            width={rectW}
            height={rectH}
            r={borderRadius}
            style="stroke"
            strokeWidth={borderWidth}
            opacity={intensity}
          >
            <SweepGradient c={vec(cx, cy)} colors={beamColors} start={sweepStart} end={sweepEnd} />
            <BlurMask blur={1} style="solid" />
          </RoundedRect>
        </Canvas>
      )}
      <View className="p-4">{children}</View>
    </View>
  );
}
