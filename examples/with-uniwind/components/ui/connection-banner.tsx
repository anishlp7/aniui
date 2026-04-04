import React from "react";
import { Text } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
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
      entering={SlideInUp.duration(300)}
      exiting={SlideOutUp.duration(200)}
      className={cn(
        "px-4 py-2 items-center",
        connected ? "bg-green-600" : "bg-red-500 dark:bg-red-900",
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
