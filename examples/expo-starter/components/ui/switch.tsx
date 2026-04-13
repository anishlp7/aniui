import React from "react";
import { View, Switch as RNSwitch, Platform, useColorScheme } from "react-native";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  className?: string;
  trackColorOff?: string;
  trackColorOn?: string;
  thumbColorAndroid?: string;
}

export function Switch({ className, trackColorOff, trackColorOn, thumbColorAndroid, ...props }: SwitchProps) {
  const dark = useColorScheme() === "dark";
  const off = trackColorOff ?? (dark ? "#27272a" : "#e4e4e7");
  const on = trackColorOn ?? (dark ? "#fafafa" : "#18181b");
  const thumb = thumbColorAndroid ?? (dark ? "#18181b" : "#ffffff");

  return (
    <View className={cn("", className)}>
      <RNSwitch
        trackColor={{ false: off, true: on }}
        thumbColor={Platform.OS === "android" ? thumb : undefined}
        ios_backgroundColor={off}
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}
