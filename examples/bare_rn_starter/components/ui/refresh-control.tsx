import React from "react";
import { RefreshControl as RNRefreshControl } from "react-native";

export interface RefreshControlProps extends React.ComponentPropsWithoutRef<typeof RNRefreshControl> {
  refreshing: boolean;
  onRefresh: () => void;
}

export function RefreshControl({ refreshing, onRefresh, ...props }: RefreshControlProps) {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="hsl(240 5.9% 10%)"
      colors={["hsl(240 5.9% 10%)"]}
      {...props}
    />
  );
}
