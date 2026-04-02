import React from "react";
import { View, Text, Pressable } from "react-native";
import * as SelectPrimitive from "@rn-primitives/select";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

export function Select({ className, placeholder = "Select...", options, value, onValueChange, label }: SelectProps) {
  const selected = options.find((o) => o.value === value);

  return (
    <SelectPrimitive.Root
      value={selected ? { value: selected.value, label: selected.label } : undefined}
      onValueChange={(option) => option && onValueChange?.(option.value)}
    >
      <SelectPrimitive.Trigger asChild>
        <Pressable
          className={cn("flex-row items-center justify-between h-12 px-4 border border-input rounded-lg bg-background", className)}
          accessible={true} accessibilityRole="button" accessibilityLabel={label ?? placeholder}
        >
          <SelectPrimitive.Value placeholder={placeholder} asChild>
            <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
              {selected?.label ?? placeholder}
            </Text>
          </SelectPrimitive.Value>
          <Text className="text-xs text-muted-foreground">▾</Text>
        </Pressable>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay className="absolute inset-0" />
        <SelectPrimitive.Content sideOffset={4} avoidCollisions>
          <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
            <SelectPrimitive.Viewport className="rounded-lg border border-border bg-card p-1 shadow-lg">
              {options.map((o) => (
                <SelectPrimitive.Item key={o.value} value={o.value} label={o.label} asChild>
                  <Pressable
                    className={cn("flex-row items-center px-4 py-3 rounded-md", o.value === value && "bg-accent")}
                    accessible={true} accessibilityRole="button" accessibilityState={{ selected: o.value === value }}
                  >
                    <SelectPrimitive.ItemText asChild>
                      <Text className={cn("flex-1 text-base text-foreground", o.value === value && "font-semibold")}>{o.label}</Text>
                    </SelectPrimitive.ItemText>
                    {o.value === value && (
                      <SelectPrimitive.ItemIndicator>
                        <Text className="text-base text-primary font-bold">✓</Text>
                      </SelectPrimitive.ItemIndicator>
                    )}
                  </Pressable>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </Animated.View>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
