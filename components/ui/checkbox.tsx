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
        {...props}
      >
        <View
          className={cn(
            "h-5 w-5 items-center justify-center rounded border",
            checked ? "border-primary bg-primary" : "border-input bg-background",
            disabled && "opacity-50",
            className
          )}
        >
          <CheckboxPrimitive.Indicator>
            <Text className="text-xs text-primary-foreground font-bold">✓</Text>
          </CheckboxPrimitive.Indicator>
        </View>
      </Pressable>
    </CheckboxPrimitive.Root>
  );
}
