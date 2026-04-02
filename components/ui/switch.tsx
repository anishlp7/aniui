import React from "react";
import { View, Switch as RNSwitch, Platform } from "react-native";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  className?: string;
}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <View className={cn("", className)}>
      <RNSwitch
        trackColor={{
          false: "hsl(var(--input))",
          true: "hsl(var(--primary))",
        }}
        thumbColor={Platform.OS === "android" ? "hsl(var(--background))" : undefined}
        ios_backgroundColor="hsl(var(--input))"
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}
