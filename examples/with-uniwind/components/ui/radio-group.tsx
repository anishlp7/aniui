import React from "react";
import { View, Pressable, Text } from "react-native";
import * as RadioGroupPrimitive from "@rn-primitives/radio-group";
import { cn } from "@/lib/utils";

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={onValueChange} asChild>
      <View className={cn("gap-3", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </RadioGroupPrimitive.Root>
  );
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  label?: string;
}

export function RadioGroupItem({ value, label, className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item value={value} asChild>
      <Pressable
        className={cn("flex-row items-center gap-3 min-h-12 min-w-12", className)}
        accessible={true}
        {...props}
      >
        <View className="h-5 w-5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 items-center justify-center">
          <RadioGroupPrimitive.Indicator>
            <View className="h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
          </RadioGroupPrimitive.Indicator>
        </View>
        {label && <Text className="text-base text-zinc-950 dark:text-zinc-50">{label}</Text>}
      </Pressable>
    </RadioGroupPrimitive.Item>
  );
}
