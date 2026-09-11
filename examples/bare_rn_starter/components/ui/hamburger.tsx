import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface HamburgerProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onPress"> {
  className?: string;
  /** Fully controlled, like AniUI's Toggle. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: number;
  color?: string;
}

/** Animated hamburger <-> close icon morph — three bars rearranging into an X. */
export function Hamburger({ className, open = false, onOpenChange, size = 28, color, ...props }: HamburgerProps) {
  const colors = useThemeColors();
  const tint = color ?? colors.foreground;
  const progress = useSharedValue(open ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, { duration: 280, easing: Easing.inOut(Easing.quad) });
  }, [open, progress]);

  const lineWidth = size * 0.72;
  const strokeWidth = Math.max(2, size * 0.08);
  const gap = size * 0.26;
  const lineStyle = { width: lineWidth, height: strokeWidth, backgroundColor: tint };

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [-gap, 0]) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg` },
    ],
  }));
  const middleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.6, 1], [1, 0, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 0]) }],
  }));
  const bottomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [gap, 0]) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, -45])}deg` },
    ],
  }));

  return (
    <Pressable
      onPress={() => onOpenChange?.(!open)}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      accessibilityLabel={open ? "Close menu" : "Open menu"}
      accessible={true}
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <Animated.View style={[{ position: "absolute", borderRadius: 999 }, lineStyle, topStyle]} />
      <Animated.View style={[{ position: "absolute", borderRadius: 999 }, lineStyle, middleStyle]} />
      <Animated.View style={[{ position: "absolute", borderRadius: 999 }, lineStyle, bottomStyle]} />
    </Pressable>
  );
}
