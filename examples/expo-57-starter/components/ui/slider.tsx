import React, { useCallback, useEffect } from "react";
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
  // The thumb/fill follow this shared value so they track the finger even if
  // the consumer doesn't echo `value` back synchronously.
  const pct = useSharedValue(max > min ? ((value - min) / (max - min)) * 100 : 0);
  const isDragging = useSharedValue(false);
  const thumbSize = size === "lg" ? 24 : size === "sm" ? 16 : 20;
  const dark = useColorScheme() === "dark";

  useEffect(() => {
    if (!isDragging.value) {
      pct.value = max > min ? ((value - min) / (max - min)) * 100 : 0;
    }
  }, [value, min, max, pct, isDragging]);

  const setFromX = useCallback((locationX: number) => {
    "worklet";
    const w = trackWidth.value;
    if (w <= 0) return;
    const ratio = Math.max(0, Math.min(1, locationX / w));
    const raw = min + ratio * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    pct.value = max > min ? ((clamped - min) / (max - min)) * 100 : 0;
    if (onValueChange) runOnJS(onValueChange)(clamped);
  }, [min, max, step, onValueChange, trackWidth, pct]);

  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .onBegin((e) => { isDragging.value = true; setFromX(e.x); })
    .onUpdate((e) => { setFromX(e.x); })
    .onFinalize(() => { isDragging.value = false; })
    .minDistance(0);

  // transform: scaleX instead of width — the fill's box is always full-width,
  // only its visual scale changes, so this never triggers a native layout
  // pass the way animating `width` on every drag frame would.
  const fillStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: pct.value / 100 }],
    transformOrigin: "left",
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: `${pct.value}%`,
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
          <Animated.View className="h-full w-full rounded-full bg-primary" style={fillStyle} />
        </View>
        <Animated.View style={thumbStyle} />
      </View>
    </GestureDetector>
  );
}
