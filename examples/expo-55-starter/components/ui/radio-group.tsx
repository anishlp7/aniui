import React, { createContext, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { cn } from "../../lib/utils";

const RadioGroupContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({ value: "", onValueChange: () => {} });

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View className={cn("gap-3", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  label?: string;
}

export function RadioGroupItem({ value, label, className, ...props }: RadioGroupItemProps) {
  const { value: selected, onValueChange } = useContext(RadioGroupContext);
  const isSelected = value === selected;

  return (
    <Pressable
      className={cn("flex-row items-center gap-3 min-h-12 min-w-12", className)}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessible={true}
      onPress={() => onValueChange(value)}
      {...props}
    >
      <View className={cn(
        "h-5 w-5 rounded-full border-2 items-center justify-center",
        isSelected ? "border-primary" : "border-input"
      )}>
        {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </View>
      {label && <Text className="text-base text-foreground">{label}</Text>}
    </Pressable>
  );
}
