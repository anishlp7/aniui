import React from "react";
import { RefreshControl as RNRefreshControl } from "react-native";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface RefreshControlProps extends React.ComponentPropsWithoutRef<typeof RNRefreshControl> {
  refreshing: boolean;
  onRefresh: () => void;
  tintColor?: string;
  colors?: string[];
}

export function RefreshControl({ refreshing, onRefresh, tintColor, colors, ...props }: RefreshControlProps) {
  const themeColors = useThemeColors();
  const tint = tintColor ?? themeColors.foreground;

  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tint}
      colors={colors ?? [tint]}
      {...props}
    />
  );
}
