import React from "react";
import { View, Switch as RNSwitch, useColorScheme } from "react-native";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  className?: string;
  trackColorOff?: string;
  trackColorOn?: string;
  thumbColor?: string;
}

export function Switch({ className, trackColorOff, trackColorOn, thumbColor, value, ...props }: SwitchProps) {
  const dark = useColorScheme() === "dark";
  const off = trackColorOff ?? (dark ? "#27272a" : "#e4e4e7");
  const on = trackColorOn ?? (dark ? "#fafafa" : "#18181b");
  // Thumb must contrast with the track in every state. In dark mode the ON
  // track is near-white, so a default white thumb would disappear on iOS.
  const thumb = thumbColor ?? (value ? (dark ? "#18181b" : "#ffffff") : "#ffffff");

  return (
    <View className={cn("", className)}>
      <RNSwitch
        value={value}
        trackColor={{ false: off, true: on }}
        thumbColor={thumb}
        ios_backgroundColor={off}
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}
