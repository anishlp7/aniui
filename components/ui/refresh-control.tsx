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
      tintColor="#18181b"
      colors={["#18181b"]}
      {...props}
    />
  );
}
