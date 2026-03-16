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
          false: "hsl(240, 4.8%, 95.9%)",
          true: "hsl(240, 5.9%, 10%)",
        }}
        thumbColor={Platform.OS === "android" ? "hsl(0, 0%, 98%)" : undefined}
        ios_backgroundColor="hsl(240, 4.8%, 95.9%)"
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}
