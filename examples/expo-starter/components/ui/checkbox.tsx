import React from "react";
import { Pressable, View, Text } from "react-native";
import { cn } from "../../lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked = false, onCheckedChange, className, disabled, ...props }: CheckboxProps) {
  return (
    <Pressable
      className="min-h-12 min-w-12 items-center justify-center"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked, disabled: !!disabled }}
      accessible={true}
      onPress={() => onCheckedChange?.(!checked)}
      disabled={disabled}
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
        {checked && <Text className="text-xs text-primary-foreground font-bold">✓</Text>}
      </View>
    </Pressable>
  );
}
