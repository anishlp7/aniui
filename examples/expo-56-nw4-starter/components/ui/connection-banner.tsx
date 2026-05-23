import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface ConnectionBannerProps {
  className?: string;
  connected: boolean;
  offlineText?: string;
  onlineText?: string;
}

export function ConnectionBanner({
  className,
  connected,
  offlineText = "No internet connection",
  onlineText = "Back online",
}: ConnectionBannerProps) {
  if (connected === undefined) return null;

  return (
    <Animated.View
      entering={entering.slideInDown}
      exiting={exiting.slideOutUp}
      className={cn(
        "px-4 py-2 items-center",
        connected ? "bg-green-600" : "bg-destructive",
        className
      )}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Text className="text-white text-sm font-medium">
        {connected ? onlineText : offlineText}
      </Text>
    </Animated.View>
  );
}
