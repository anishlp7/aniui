import { useCallback } from "react";
import {
  Easing,
  FadeIn, FadeOut,
  FadeInUp, FadeInDown, FadeOutUp, FadeOutDown,
  SlideInUp, SlideInDown, SlideInLeft, SlideInRight,
  SlideOutUp, SlideOutDown,
  ZoomIn, ZoomOut,
  BounceIn,
  FlipInXUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  type WithSpringConfig,
} from "react-native-reanimated";

// ── Spring Presets (iOS-quality physics) ──────────────────────
export const springs: Record<string, WithSpringConfig> = {
  bouncy:  { damping: 12, stiffness: 150, mass: 0.5 },
  snappy:  { damping: 18, stiffness: 250, mass: 0.8 },
  gentle:  { damping: 20, stiffness: 120, mass: 1 },
  stiff:   { damping: 26, stiffness: 350, mass: 1 },
  default: { damping: 15, stiffness: 180, mass: 0.8 },
};

// ── Layout Animation Presets (entering) ───────────────────────
export const entering = {
  fadeIn:       FadeIn.duration(200),
  fadeInUp:     FadeInUp.duration(250).springify().damping(18),
  fadeInDown:   FadeInDown.duration(250).springify().damping(18),
  slideInUp:    SlideInUp.duration(300).springify(),
  slideInDown:  SlideInDown.duration(300).springify(),
  slideInLeft:  SlideInLeft.duration(300).springify(),
  slideInRight: SlideInRight.duration(300).springify(),
  zoomIn:       ZoomIn.duration(250).springify().damping(15),
  bounceIn:     BounceIn.duration(400),
  flipInX:      FlipInXUp.duration(400),
};

// ── Layout Animation Presets (exiting) ────────────────────────
export const exiting = {
  fadeOut:      FadeOut.duration(150),
  fadeOutUp:    FadeOutUp.duration(200),
  fadeOutDown:  FadeOutDown.duration(200),
  slideOutUp:   SlideOutUp.duration(200),
  slideOutDown: SlideOutDown.duration(200),
  zoomOut:      ZoomOut.duration(200),
};

// ── Duration Presets (ms) ─────────────────────────────────────
export const duration = {
  fast:   150,
  normal: 250,
  slow:   400,
  slower: 600,
};

// ── Easing Presets ────────────────────────────────────────────
export const easing = {
  easeOut:   Easing.out(Easing.cubic),
  easeIn:    Easing.in(Easing.cubic),
  easeInOut: Easing.inOut(Easing.cubic),
  spring:    Easing.bezier(0.175, 0.885, 0.32, 1.275),
  bounce:    Easing.bounce,
};

// ── Hooks ─────────────────────────────────────────────────────

/** Spring-based scale for press feedback. Attach onPressIn/onPressOut to Pressable. */
export function usePressAnimation(scale = 0.96) {
  const pressed = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed.value }],
  }));
  const onPressIn = useCallback(() => {
    pressed.value = withSpring(scale, springs.snappy);
  }, [scale, pressed]);
  const onPressOut = useCallback(() => {
    pressed.value = withSpring(1, springs.snappy);
  }, [pressed]);
  return { animatedStyle, onPressIn, onPressOut };
}

/** Staggered delay for child entrance animations. Returns delay(ms) for index. */
export function stagger(index: number, interval = 50) {
  return withDelay(index * interval, withTiming(1, { duration: duration.normal }));
}
