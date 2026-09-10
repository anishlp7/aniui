import React from "react";
import { View, Switch as RNSwitch } from "react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  className?: string;
  trackColorOff?: string;
  trackColorOn?: string;
  thumbColor?: string;
}

export function Switch({ className, trackColorOff, trackColorOn, thumbColor, value, ...props }: SwitchProps) {
  const colors = useThemeColors();
  const off = trackColorOff ?? colors.border;
  const on = trackColorOn ?? colors.foreground;
  // Thumb must contrast with the track in every state. In dark mode the ON
  // track is near-white, so a default white thumb would disappear on iOS.
  const thumb = thumbColor ?? colors.background;

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
