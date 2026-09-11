import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const TILT = -2;
const LIFT = 6;
const LIFT_SPRING = { damping: 16, stiffness: 220, mass: 0.6 };

export interface PolaroidTapeProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
}

// Decorative "washi tape" strip straddling the top edge of a Polaroid. Purely
// visual, so it must never intercept touches or be announced by a screen reader.
export function PolaroidTape({ className, width = 96, height = 28, rotate = -3, ...props }: PolaroidTapeProps) {
  return (
    <View
      className={cn("absolute z-10 rounded-sm border border-amber-200/70 bg-amber-100/90", className)}
      style={{ top: -12, left: "50%", marginLeft: -width / 2, width, height, transform: [{ rotate: `${rotate}deg` }] }}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...props}
    />
  );
}

export interface PolaroidProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  source: { uri: string } | number;
  caption?: string;
  /** Small mono stamp under the caption, e.g. a date or location. */
  meta?: string;
  /** Resting tilt in degrees; straightens toward 0deg at full press. */
  tilt?: number;
  /** Renders a built-in <PolaroidTape /> across the top edge. */
  tape?: boolean;
  /** Called on press. Omit for a static, non-interactive card. */
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Polaroid({ className, source, caption, meta, tilt = TILT, tape, onPress, ...props }: PolaroidProps) {
  const pressed = useSharedValue(0);

  const liftStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -LIFT * pressed.value }, { rotate: `${tilt * (1 - pressed.value)}deg` }],
  }));

  const content = (
    <>
      {tape ? <PolaroidTape /> : null}
      <Image source={source} className="w-full aspect-square rounded-sm bg-muted" resizeMode="cover" accessibilityIgnoresInvertColors />
      {caption ? <Text className="mt-3 text-center text-sm text-muted-foreground font-medium">{caption}</Text> : null}
      {meta ? <Text className="mt-0.5 text-center text-[11px] text-muted-foreground/70 font-mono">{meta}</Text> : null}
    </>
  );

  if (!onPress) {
    return (
      <Animated.View
        className={cn("rounded-sm bg-card p-3 pb-8 shadow-sm border border-border", className)}
        style={liftStyle}
        accessibilityRole="image"
        accessibilityLabel={caption ?? "Polaroid photo"}
        {...props}
      >
        {content}
      </Animated.View>
    );
  }

  return (
    <AnimatedPressable
      className={cn("min-h-12 min-w-12 rounded-sm bg-card p-3 pb-8 shadow-sm border border-border", className)}
      style={liftStyle}
      accessibilityRole="button"
      accessible
      accessibilityLabel={caption ?? "Polaroid photo"}
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withSpring(1, LIFT_SPRING);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, LIFT_SPRING);
      }}
      {...props}
    >
      {content}
    </AnimatedPressable>
  );
}
