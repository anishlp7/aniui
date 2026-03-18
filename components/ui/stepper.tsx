import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex-row items-center rounded-lg border border-input", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-11",
      lg: "h-13",
    },
  },
  defaultVariants: { size: "md" },
});

const btnSizes = { sm: "w-9", md: "w-11", lg: "w-13" } as const;

export interface StepperProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof stepperVariants> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Stepper({ size, className, value, onChange, min = 0, max = 99, step = 1, ...props }: StepperProps) {
  const s = size ?? "md";
  const canDec = value - step >= min;
  const canInc = value + step <= max;

  return (
    <View className={cn(stepperVariants({ size }), className)} accessibilityRole="adjustable" accessibilityValue={{ min, max, now: value }} {...props}>
      <Pressable
        className={cn("items-center justify-center border-r border-input", btnSizes[s], !canDec && "opacity-30")}
        onPress={() => canDec && onChange(value - step)}
        disabled={!canDec}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
      >
        <Text className="text-lg text-foreground">−</Text>
      </Pressable>
      <View className="flex-1 items-center justify-center px-3">
        <Text className="text-base font-medium text-foreground">{value}</Text>
      </View>
      <Pressable
        className={cn("items-center justify-center border-l border-input", btnSizes[s], !canInc && "opacity-30")}
        onPress={() => canInc && onChange(value + step)}
        disabled={!canInc}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
      >
        <Text className="text-lg text-foreground">+</Text>
      </Pressable>
    </View>
  );
}
