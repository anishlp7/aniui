import React, { useState } from "react";
import { View, PanResponder } from "react-native";
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
  const [trackWidth, setTrackWidth] = useState(0);
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const thumbSize = size === "lg" ? 24 : size === "sm" ? 16 : 20;

  const clampValue = (raw: number) => {
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  };

  const calcValue = (locationX: number) => {
    if (trackWidth <= 0) return value;
    const ratio = Math.max(0, Math.min(1, locationX / trackWidth));
    return clampValue(min + ratio * (max - min));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: (e) => {
      onValueChange?.(calcValue(e.nativeEvent.locationX));
    },
    onPanResponderMove: (e) => {
      onValueChange?.(calcValue(e.nativeEvent.locationX));
    },
  });

  return (
    <View
      className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
      {...props}
    >
      <View className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <View className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </View>
      <View
        style={{
          position: "absolute",
          left: `${pct}%`,
          marginLeft: -(thumbSize / 2),
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          borderWidth: 2,
          borderColor: "#18181b",
          backgroundColor: "#ffffff",
        }}
      />
    </View>
  );
}
