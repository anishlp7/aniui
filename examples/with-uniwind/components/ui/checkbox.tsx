import React from "react";
import { Pressable, View, Text } from "react-native";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked = false, onCheckedChange, className, disabled, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      asChild
    >
      <Pressable
        className="min-h-12 min-w-12 items-center justify-center"
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: !!disabled }}
        onPress={() => !disabled && onCheckedChange?.(!checked)}
        {...props}
      >
        <View
          className={cn(
            "h-5 w-5 items-center justify-center rounded border",
            checked ? "border-zinc-900 dark:border-zinc-50 bg-zinc-900 dark:bg-zinc-50" : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
            disabled && "opacity-50",
            className
          )}
        >
          <CheckboxPrimitive.Indicator>
            <Text className="text-xs text-zinc-50 dark:text-zinc-900 font-bold">✓</Text>
          </CheckboxPrimitive.Indicator>
        </View>
      </Pressable>
    </CheckboxPrimitive.Root>
  );
}
