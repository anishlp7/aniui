import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

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
  const [width, setWidth] = useState(0);
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handlePress = (e: { nativeEvent: { locationX: number } }) => {
    if (disabled) return;
    const raw = min + ((e.nativeEvent.locationX / width) * (max - min));
    const stepped = Math.round(raw / step) * step;
    onValueChange?.(Math.max(min, Math.min(max, stepped)));
  };

  return (
    <Pressable
      className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      disabled={disabled}
      {...props}
    >
      <View className="h-1.5 w-full rounded-full bg-secondary">
        <View className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </View>
      <View
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background"
        style={{ left: `${pct}%`, marginLeft: -10 }}
      />
    </Pressable>
  );
}
