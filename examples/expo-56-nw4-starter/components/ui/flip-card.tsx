import React, { useEffect, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const FLIP_SPRING = { dampingRatio: 0.72, duration: 600 } as const;
const PRESS_SPRING = { damping: 18, stiffness: 320, mass: 0.5 } as const;

export type FlipCardAnimation = "horizontal" | "vertical" | "depth";

/** Per-face 3D transform for a given flip mode. `offsetDeg` is 0 for the front face, 180 for the back. */
function faceTransform(mode: FlipCardAnimation, progressValue: number, offsetDeg: 0 | 180, scaleValue: number) {
  "worklet";
  const angle = offsetDeg + progressValue * 180;
  const midFlipBulge = Math.sin(Math.PI * progressValue);

  if (mode === "vertical") {
    return [{ perspective: 1000 }, { rotateX: `${angle}deg` }, { scale: scaleValue }];
  }
  if (mode === "depth") {
    return [
      { perspective: 850 },
      { translateY: -24 * midFlipBulge },
      { rotateY: `${angle}deg` },
      { scale: scaleValue * (1 - 0.15 * midFlipBulge) },
    ];
  }
  return [{ perspective: 1000 }, { rotateY: `${angle}deg` }, { scale: scaleValue }];
}

export interface FlipCardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  front: React.ReactNode;
  back: React.ReactNode;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  /** 3D rotation axis used for the flip. Defaults to the classic horizontal card flip. */
  animation?: FlipCardAnimation;
}

export function FlipCard({ className, front, back, flipped, onFlip, animation = "horizontal", ...props }: FlipCardProps) {
  const [internal, setInternal] = useState(false);
  const isFlipped = flipped ?? internal;
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(isFlipped ? 1 : 0, FLIP_SPRING);
  }, [isFlipped, progress]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: faceTransform(animation, progress.value, 0, scale.value),
    opacity: progress.value < 0.5 ? 1 : 0,
  }));
  const backStyle = useAnimatedStyle(() => ({
    transform: faceTransform(animation, progress.value, 180, scale.value),
    opacity: progress.value >= 0.5 ? 1 : 0,
  }));
  const edgeBlurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 1, 0], Extrapolation.CLAMP),
  }));

  const toggle = () => {
    const next = !isFlipped;
    if (flipped === undefined) setInternal(next);
    onFlip?.(next);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onPressIn = () => {
    scale.value = withSpring(0.96, PRESS_SPRING);
  };
  const onPressOut = () => {
    scale.value = withSpring(1, PRESS_SPRING);
  };

  return (
    <Pressable
      onPress={toggle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ expanded: isFlipped }}
      className={cn("min-h-12 min-w-12", className)}
      {...props}
    >
      <View style={{ transform: [{ perspective: 1000 }] }}>
        <Animated.View style={[{ backfaceVisibility: "hidden" }, frontStyle]}>
          {front}
          {Platform.OS === "ios" && (
            <AnimatedBlurView tint="light" intensity={90} pointerEvents="none" style={[{ position: "absolute", inset: 0 }, edgeBlurStyle]} />
          )}
        </Animated.View>
        <Animated.View style={[{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }, backStyle]}>
          {back}
          {Platform.OS === "ios" && (
            <AnimatedBlurView tint="light" intensity={90} pointerEvents="none" style={[{ position: "absolute", inset: 0 }, edgeBlurStyle]} />
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
}
