import React, { useEffect, useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useReducedMotion } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export type ShimmerVariant = "shimmer" | "pulse";
export type ShimmerDirection = "leftToRight" | "rightToLeft" | "topToBottom" | "bottomToTop";
export type ShimmerPreset = "default" | "neutral" | "inverted" | "brand" | "subtle";

// "container" = the placeholder's resting background; "highlight" = the
// moving (shimmer) or breathing (pulse) overlay drawn on top of it.
// "default"/"brand" ride the theme's CSS vars so they stay correct in dark
// mode automatically; the rest are fixed tones for a caller that wants a
// specific loading surface regardless of the app's color scheme.
const SHIMMER_PRESETS: Record<ShimmerPreset, { container: string; highlight: string }> = {
  default: { container: "bg-muted", highlight: "bg-foreground/20" },
  neutral: { container: "bg-zinc-200", highlight: "bg-white/70" },
  inverted: { container: "bg-zinc-900", highlight: "bg-white/25" },
  brand: { container: "bg-primary/10", highlight: "bg-primary/40" },
  subtle: { container: "bg-muted/50", highlight: "bg-foreground/10" },
};

export interface ShimmerProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** True (default) renders the placeholder. Flip to false once real content is ready. */
  isLoading?: boolean;
  /** Real content, faded in once `isLoading` becomes false. Ignored while loading. */
  children?: React.ReactNode;
  /** "shimmer" sweeps a highlight band across the placeholder; "pulse" breathes its opacity instead. */
  variant?: ShimmerVariant;
  /** Sweep axis + direction. Only affects the "shimmer" variant. */
  direction?: ShimmerDirection;
  preset?: ShimmerPreset;
}

export function Shimmer({
  className,
  onLayout,
  isLoading = true,
  children,
  variant = "shimmer",
  direction = "leftToRight",
  preset = "default",
  ...props
}: ShimmerProps) {
  const translate = useSharedValue(0);
  const pulse = useSharedValue(1);
  const reveal = useSharedValue(isLoading ? 0 : 1);
  const [size, setSize] = useState(0);
  const reducedMotion = useReducedMotion();
  const theme = SHIMMER_PRESETS[preset] ?? SHIMMER_PRESETS.default;
  const horizontal = direction === "leftToRight" || direction === "rightToLeft";
  const forward = direction === "leftToRight" || direction === "topToBottom";
  const sweeps = variant === "shimmer";

  useEffect(() => {
    if (!isLoading) {
      cancelAnimation(translate);
      cancelAnimation(pulse);
      reveal.value = withTiming(1, { duration: 400 });
      return;
    }
    reveal.value = 0;
    if (reducedMotion || !size) return;

    if (sweeps) {
      translate.value = forward ? -size * 0.5 : size * 1.5;
      translate.value = withRepeat(
        withTiming(forward ? size * 1.5 : -size * 0.5, { duration: 1200 }),
        -1,
        false
      );
      return () => cancelAnimation(translate);
    }
    pulse.value = withRepeat(
      withSequence(withTiming(0.4, { duration: 700 }), withTiming(1, { duration: 700 })),
      -1,
      false
    );
    return () => cancelAnimation(pulse);
  }, [isLoading, sweeps, forward, size, reducedMotion, translate, pulse, reveal]);

  const highlightStyle = useAnimatedStyle(() => ({
    transform: horizontal ? [{ translateX: translate.value }] : [{ translateY: translate.value }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({ opacity: pulse.value }));
  const revealStyle = useAnimatedStyle(() => ({ opacity: reveal.value }));

  const handleLayout = (e: LayoutChangeEvent) => {
    setSize(horizontal ? e.nativeEvent.layout.width : e.nativeEvent.layout.height);
    onLayout?.(e);
  };

  return (
    <View
      className={cn("overflow-hidden rounded-md", isLoading && theme.container, className)}
      onLayout={handleLayout}
      accessibilityRole={isLoading ? "progressbar" : "none"}
      accessibilityLabel={isLoading ? "Loading" : undefined}
      {...props}
    >
      {!isLoading && <Animated.View style={revealStyle}>{children}</Animated.View>}
      {isLoading && !reducedMotion && !sweeps && (
        <Animated.View className={cn("absolute inset-0", theme.highlight)} style={pulseStyle} />
      )}
      {isLoading && !reducedMotion && sweeps && size > 0 && (
        <Animated.View
          className={cn("absolute", horizontal ? "inset-y-0" : "inset-x-0", theme.highlight)}
          style={[horizontal ? { width: size * 0.5 } : { height: size * 0.5 }, highlightStyle]}
        />
      )}
    </View>
  );
}
