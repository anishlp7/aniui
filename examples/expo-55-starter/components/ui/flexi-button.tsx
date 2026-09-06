import React, { useCallback, useState } from "react";
import { Pressable, Text, type GestureResponderEvent, type LayoutChangeEvent } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate, Extrapolation } from "react-native-reanimated";
import { Bell } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface FlexiButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onLayout"> {
  className?: string;
  /** Shown while collapsed; falls back to a bell glyph. Never receives className. */
  icon?: React.ReactNode;
  label?: string;
  collapsedWidth?: number;
  expandedWidth?: number;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onDimensionsChange?: (dimensions: { width: number; height: number; x: number; y: number }) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Pill button that springs between an icon-only and a labeled width on press. */
export function FlexiButton({
  className,
  icon,
  label = "Clear all",
  collapsedWidth = 48,
  expandedWidth = 140,
  defaultExpanded = false,
  onExpandedChange,
  onDimensionsChange,
  onPress,
  ...props
}: FlexiButtonProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const progress = useSharedValue(defaultExpanded ? 1 : 0);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height, x, y } = e.nativeEvent.layout;
      onDimensionsChange?.({ width, height, x, y });
    },
    [onDimensionsChange]
  );

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      const next = !expanded;
      setExpanded(next);
      progress.value = withSpring(next ? 1 : 0, { damping: 16, stiffness: 180 });
      onExpandedChange?.(next);
      onPress?.(e);
    },
    [expanded, onExpandedChange, onPress, progress]
  );

  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [collapsedWidth, expandedWidth], Extrapolation.CLAMP),
  }));
  const iconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.3], [1, 0], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP) }],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.15, 1], [0, 1], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.85, 1], Extrapolation.CLAMP) }],
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      onLayout={handleLayout}
      style={containerStyle}
      accessibilityRole="button"
      accessibilityState={{ expanded }}
      accessibilityLabel={expanded ? label : undefined}
      accessible={true}
      className={cn("h-12 min-w-12 items-center justify-center overflow-hidden rounded-full bg-primary", className)}
      {...props}
    >
      <Animated.View style={iconStyle} className="h-5 w-5 items-center justify-center">
        {icon ?? <Bell size={18} color="#fff" />}
      </Animated.View>
      <Animated.View style={labelStyle} className="absolute inset-0 items-center justify-center px-3">
        <Text numberOfLines={1} className="text-sm font-semibold text-primary-foreground">
          {label}
        </Text>
      </Animated.View>
    </AnimatedPressable>
  );
}
