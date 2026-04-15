import React, { useCallback } from "react";
import { View, useColorScheme } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from "react-native-reanimated";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sliderVariants = cva("w-full justify-center", {
  variants: {
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof sliderVariants> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
}

export function Slider({
  value = 0, min = 0, max = 100, step = 1, disabled, size,
  onValueChange, className, ...props
}: SliderProps) {
  const trackWidth = useSharedValue(0);
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const thumbSize = size === "lg" ? 24 : size === "sm" ? 16 : 20;
  const dark = useColorScheme() === "dark";

  const emitValue = useCallback((locationX: number) => {
    "worklet";
    const w = trackWidth.value;
    if (w <= 0) return;
    const ratio = Math.max(0, Math.min(1, locationX / w));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    if (onValueChange) runOnJS(onValueChange)(clamped);
  }, [min, max, step, onValueChange, trackWidth]);

  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .onBegin((e) => { emitValue(e.x); })
    .onUpdate((e) => { emitValue(e.x); })
    .minDistance(0);

  const thumbStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: `${pct}%`,
    marginLeft: -(thumbSize / 2),
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    borderWidth: 2,
    borderColor: dark ? "#fafafa" : "#18181b",
    backgroundColor: dark ? "#18181b" : "#ffffff",
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityValue={{ min, max, now: value }}
        onLayout={(e) => { trackWidth.value = e.nativeEvent.layout.width; }}
        {...props}
      >
        <View className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <View className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </View>
        <Animated.View style={thumbStyle} />
      </View>
    </GestureDetector>
  );
}
