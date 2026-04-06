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
          false: "#e4e4e7",
          true: "#18181b",
        }}
        thumbColor={Platform.OS === "android" ? "#ffffff" : undefined}
        ios_backgroundColor="#e4e4e7"
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}
