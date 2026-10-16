import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { useReducedMotion } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // A static dim instead of a pulsing loop — still reads as "loading"
      // without the motion a reduced-motion user asked to avoid.
      opacity.value = 0.6;
      return;
    }
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );
    return () => cancelAnimation(opacity);
  }, [opacity, reducedMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className={cn("rounded-md bg-muted", className)}
      style={animatedStyle}
      {...props}
    />
  );
}
