import React from "react";
import { Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked = false, onCheckedChange, className, disabled, ...props }: CheckboxProps) {
  return (
    <Pressable
      className={cn(
        "h-5 w-5 items-center justify-center rounded border min-h-12 min-w-12",
        checked ? "border-primary bg-primary" : "border-input bg-background",
        disabled && "opacity-50",
        className
      )}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessible={true}
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
      {...props}
    >
      {checked && <Text className="text-xs text-primary-foreground font-bold">✓</Text>}
    </Pressable>
  );
}
