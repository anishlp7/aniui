import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const numberVariants = cva("flex-row items-center rounded-md border", {
  variants: {
    variant: {
      default: "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
      ghost: "border-transparent bg-transparent",
    },
    size: {
      sm: "min-h-9 px-2",
      md: "min-h-12 px-3",
      lg: "min-h-14 px-4",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface NumberInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "value" | "onChangeText">,
    VariantProps<typeof numberVariants> {
  className?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  variant,
  size,
  className,
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 999999,
  step = 1,
  ...props
}: NumberInputProps) {
  const [internal, setInternal] = useState(controlledValue ?? min);
  const value = controlledValue ?? internal;

  const update = useCallback(
    (next: number) => {
      const clamped = Math.min(max, Math.max(min, next));
      setInternal(clamped);
      onValueChange?.(clamped);
    },
    [min, max, onValueChange]
  );

  return (
    <View className={cn(numberVariants({ variant, size }), className)}>
      <Pressable
        onPress={() => update(value - step)}
        disabled={value <= min}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Text className={cn("text-lg font-bold", value <= min ? "text-zinc-100 dark:text-zinc-800" : "text-zinc-950 dark:text-zinc-50")}>−</Text>
      </Pressable>
      <TextInput
        className="flex-1 text-center text-zinc-950 dark:text-zinc-50 text-base p-0"
        keyboardType="number-pad"
        value={String(value)}
        onChangeText={(t) => update(Number(t) || min)}
        accessibilityLabel="Number value"
        {...props}
      />
      <Pressable
        onPress={() => update(value + step)}
        disabled={value >= max}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Text className={cn("text-lg font-bold", value >= max ? "text-zinc-100 dark:text-zinc-800" : "text-zinc-950 dark:text-zinc-50")}>+</Text>
      </Pressable>
    </View>
  );
}
