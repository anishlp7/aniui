import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Minus, Plus } from "lucide-react-native";
import { cn } from "@/lib/utils";

const numberVariants = cva("flex-row items-center rounded-md border", {
  variants: {
    variant: {
      default: "border-input bg-background",
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

export const NumberInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  NumberInputProps
>(function NumberInput(
  { variant, size, className, value: controlledValue, onValueChange, min = 0, max = 999999, step = 1, onBlur, ...props },
  ref
) {
  const [internal, setInternal] = useState(controlledValue ?? min);
  const [text, setText] = useState<string | null>(null);
  const value = controlledValue ?? internal;
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  const mutedIcon = dark ? "#27272a" : "#f4f4f5";

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
        onPress={() => { setText(null); update(value - step); }}
        disabled={value <= min}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Minus size={18} color={value <= min ? mutedIcon : caret} strokeWidth={2.5} />
      </Pressable>
      <TextInput
        ref={ref}
        className="flex-1 text-foreground text-base p-0"
        textAlign="center"
        keyboardType="number-pad"
        keyboardAppearance={dark ? "dark" : "light"}
        selectionColor={caret}
        cursorColor={caret}
        value={text ?? String(value)}
        onChangeText={(t) => {
          setText(t);
          const n = Number(t);
          if (t.trim() !== "" && !Number.isNaN(n)) update(n);
        }}
        onBlur={(e) => { setText(null); onBlur?.(e); }}
        accessibilityLabel="Number value"
        {...props}
      />
      <Pressable
        onPress={() => { setText(null); update(value + step); }}
        disabled={value >= max}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Plus size={18} color={value >= max ? mutedIcon : caret} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
});
