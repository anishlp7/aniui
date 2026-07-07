import React from "react";
import { RefreshControl as RNRefreshControl, useColorScheme } from "react-native";

export interface RefreshControlProps extends React.ComponentPropsWithoutRef<typeof RNRefreshControl> {
  refreshing: boolean;
  onRefresh: () => void;
  tintColor?: string;
  colors?: string[];
}

export function RefreshControl({ refreshing, onRefresh, tintColor, colors, ...props }: RefreshControlProps) {
  const dark = useColorScheme() === "dark";
  const tint = tintColor ?? (dark ? "#fafafa" : "#18181b");

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
