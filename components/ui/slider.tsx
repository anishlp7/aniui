import React from "react";
import { View } from "react-native";
import * as SliderPrimitive from "@rn-primitives/slider";
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
  return (
    <SliderPrimitive.Root
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(val) => onValueChange?.(typeof val === "number" ? val : val[0])}
      asChild
    >
      <View
        className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityValue={{ min, max, now: value }}
        {...props}
      >
        <SliderPrimitive.Track className="h-1.5 w-full rounded-full bg-secondary">
          <SliderPrimitive.Range className="h-full rounded-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="h-5 w-5 rounded-full border-2 border-primary bg-background" />
      </View>
    </SliderPrimitive.Root>
  );
}
