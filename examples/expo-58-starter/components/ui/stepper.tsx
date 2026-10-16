import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus, Plus } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

const stepperVariants = cva("flex-row items-center self-start rounded-lg border border-border", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-12",
      lg: "h-14",
    },
  },
  defaultVariants: { size: "md" },
});

const buttonVariants = cva("items-center justify-center border-border", {
  variants: {
    size: {
      sm: "w-9",
      md: "w-12",
      lg: "w-14",
    },
  },
  defaultVariants: { size: "md" },
});

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
  const colors = useThemeColors();
  const fg = colors.foreground;
  const canDec = value - step >= min;
  const canInc = value + step <= max;

  return (
    <View
      className={cn(stepperVariants({ size }), className)}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      {...props}
    >
      <Pressable
        className={cn(buttonVariants({ size }), "h-full border-e", !canDec && "opacity-30")}
        onPress={() => { if (canDec) onChange(value - step); }}
        disabled={!canDec}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
      >
        <Minus size={18} color={fg} />
      </Pressable>
      <View className="w-14 items-center justify-center">
        <Text className="text-base font-medium text-foreground">{value}</Text>
      </View>
      <Pressable
        className={cn(buttonVariants({ size }), "h-full border-s", !canInc && "opacity-30")}
        onPress={() => { if (canInc) onChange(value + step); }}
        disabled={!canInc}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
      >
        <Plus size={18} color={fg} />
      </Pressable>
    </View>
  );
}
