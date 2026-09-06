import React, { useState } from "react";
import { Pressable, Text, type LayoutChangeEvent, type GestureResponderEvent } from "react-native";
import {
  Canvas,
  Circle,
  RoundedRect,
  RadialGradient,
  SweepGradient,
  LinearGradient,
  Rect,
  Mask,
  Group,
  vec,
  useClock,
  BlurMask,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radiantButtonVariants = cva(
  "relative items-center justify-center overflow-hidden rounded-lg min-h-12 min-w-12 px-6 py-3 active:scale-95 active:opacity-90",
  {
    variants: {
      variant: { default: "bg-primary", secondary: "bg-secondary", destructive: "bg-destructive" },
      size: { sm: "px-4 py-2", md: "px-6 py-3", lg: "px-8 py-4" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const textVariants = cva("font-semibold z-10", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
    },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

const glowColors = {
  default: ["#fafafa", "#71717a", "transparent"],
  secondary: ["#e4e4e7", "#71717a", "transparent"],
  destructive: ["#fca5a5", "#ef4444", "transparent"],
} as const;

export interface RadiantButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof radiantButtonVariants> {
  className?: string;
  label: string;
  borderRadius?: number;
  borderWidth?: number;
  /** Duration (ms) for one full lap of the traveling border glow. */
  duration?: number;
  /** Fraction (0-1) of the border's perimeter the bright traveling glow window covers. */
  beamLength?: number;
}

export function RadiantButton({
  variant = "default",
  size = "md",
  className,
  label,
  borderRadius = 8,
  borderWidth = 2,
  duration = 2600,
  beamLength = 0.3,
  onLayout,
  onPressIn,
  onPressOut,
  ...props
}: RadiantButtonProps) {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [pressed, setPressed] = useState(false);
  const clock = useClock();
  const v = variant ?? "default";
  const [bright, mid] = glowColors[v];

  const pulse = useDerivedValue(() => {
    const t = (clock.value % 2400) / 2400;
    return 0.55 + Math.sin(t * Math.PI * 2) * 0.2;
  }, [clock]);

  const arcHalf = Math.max(beamLength, 0.02) * 180;

  // Same "SweepGradient clamped to a moving [start, end] window" technique as border-beam:
  // outside the window the gradient clamps to transparent, so only this arc reads as a
  // bright traveling glow instead of the shader-driven border-light reacticx uses.
  const sweepStart = useDerivedValue(() => {
    const t = (clock.value % duration) / duration;
    return t * 360 - arcHalf;
  }, [clock, duration, arcHalf]);

  const sweepEnd = useDerivedValue(() => {
    const t = (clock.value % duration) / duration;
    return t * 360 + arcHalf;
  }, [clock, duration, arcHalf]);

  const shimmerTransform = useDerivedValue(() => {
    const t = (clock.value % (duration * 1.6)) / (duration * 1.6);
    return [{ rotate: t * Math.PI * 2 }];
  }, [clock, duration]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setBox({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height });
    onLayout?.(e);
  };

  const handlePressIn = (e: GestureResponderEvent) => {
    setPressed(true);
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    setPressed(false);
    onPressOut?.(e);
  };

  const cx = box.width / 2;
  const cy = box.height / 2;
  const hasBorder = box.width > borderWidth * 2 && box.height > borderWidth * 2;
  const beamColors = ["transparent", bright, mid, bright, "transparent"];
  const shimmerColors = ["transparent", "transparent", bright, "transparent", "transparent"];
  const shimmerSize = Math.max(box.width, box.height) * 1.4;
  const bandWidth = pressed ? borderWidth * 3.4 : borderWidth * 2.2;

  return (
    <Pressable
      className={cn(radiantButtonVariants({ variant: v, size }), className)}
      onLayout={handleLayout}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      {...props}
    >
      {box.width > 0 && (
        <Canvas style={{ position: "absolute", top: 0, left: 0, width: box.width, height: box.height }} pointerEvents="none">
          <Group opacity={pulse}>
            <Circle cx={cx} cy={cy} r={Math.max(box.width, box.height) * 0.55}>
              <RadialGradient c={vec(cx, cy)} r={Math.max(box.width, box.height) * 0.55} colors={[bright, mid, "transparent"]} />
              <BlurMask blur={8} style="normal" />
            </Circle>
          </Group>
          {hasBorder && (
            <Mask
              mask={
                <Rect x={borderWidth} y={borderWidth} width={box.width - borderWidth * 2} height={box.height - borderWidth * 2} color="white" />
              }
            >
              <Group transform={shimmerTransform} origin={vec(cx, cy)} opacity={0.3}>
                <Rect x={cx - shimmerSize / 2} y={cy - shimmerSize / 2} width={shimmerSize} height={shimmerSize}>
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(shimmerSize, shimmerSize * 0.6)}
                    colors={shimmerColors}
                    positions={[0, 0.35, 0.5, 0.65, 1]}
                  />
                </Rect>
              </Group>
            </Mask>
          )}
          {hasBorder && (
            <>
              <RoundedRect
                x={borderWidth / 2}
                y={borderWidth / 2}
                width={box.width - borderWidth}
                height={box.height - borderWidth}
                r={borderRadius}
                style="stroke"
                strokeWidth={bandWidth}
                opacity={0.7}
              >
                <SweepGradient c={vec(cx, cy)} colors={beamColors} start={sweepStart} end={sweepEnd} />
                <BlurMask blur={6} style="normal" />
              </RoundedRect>
              <RoundedRect
                x={borderWidth / 2}
                y={borderWidth / 2}
                width={box.width - borderWidth}
                height={box.height - borderWidth}
                r={borderRadius}
                style="stroke"
                strokeWidth={borderWidth}
              >
                <SweepGradient c={vec(cx, cy)} colors={beamColors} start={sweepStart} end={sweepEnd} />
              </RoundedRect>
            </>
          )}
        </Canvas>
      )}
      <Text className={cn(textVariants({ variant: v, size }))}>{label}</Text>
    </Pressable>
  );
}
