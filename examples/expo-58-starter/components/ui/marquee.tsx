import React, { useCallback, useState } from "react";
import { View, Pressable, LayoutChangeEvent } from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  type FrameInfo,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { useReducedMotion } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Content to tick — a single copy is measured and repeated to fill the track. */
  children: React.ReactNode;
  /** Pixels per second. */
  speed?: number;
  /** Gap between repeated copies, in pixels. */
  spacing?: number;
  /** Scroll right-to-left instead of the default left-to-right. */
  reverse?: boolean;
  /** Tap to pause/resume the ticker. */
  pauseOnPress?: boolean;
  /** Press-and-hold to fast-forward. Mutually exclusive with pauseOnPress's tap toggle. */
  holdToSpeedUp?: boolean;
  speedUpMultiplier?: number;
}

export function Marquee({
  className,
  children,
  speed = 50,
  spacing = 20,
  reverse = false,
  pauseOnPress = false,
  holdToSpeedUp = false,
  speedUpMultiplier = 3,
  ...props
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();
  const offset = useSharedValue(0);
  const isPaused = useSharedValue(false);
  const speedMultiplier = useSharedValue(1);
  const [trackWidth, setTrackWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const segmentWidth = contentWidth + spacing;
  // Enough copies to cover the visible track continuously, plus a couple of
  // spares so a wrap never exposes a gap at the track's edges.
  const copies =
    contentWidth > 0 && trackWidth > 0 ? Math.max(2, Math.ceil(trackWidth / segmentWidth) + 2) : 2;

  useFrameCallback((frameInfo: FrameInfo) => {
    "worklet";
    if (reducedMotion || isPaused.value || contentWidth === 0) return;
    const dt = frameInfo.timeSincePreviousFrame ?? 0;
    const distance = (speed * speedMultiplier.value * dt) / 1000;
    if (reverse) {
      offset.value -= distance;
      if (offset.value <= -segmentWidth) offset.value += segmentWidth;
    } else {
      offset.value += distance;
      if (offset.value >= segmentWidth) offset.value -= segmentWidth;
    }
  });

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: -offset.value }] }));

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width), []);
  const onContentLayout = useCallback((e: LayoutChangeEvent) => setContentWidth(e.nativeEvent.layout.width), []);

  const handlePress = () => {
    if (holdToSpeedUp) return;
    if (pauseOnPress) isPaused.value = !isPaused.value;
  };
  const handlePressIn = () => {
    if (holdToSpeedUp) speedMultiplier.value = speedUpMultiplier;
  };
  const handlePressOut = () => {
    if (holdToSpeedUp) speedMultiplier.value = 1;
  };

  // Bare strings can't be rendered directly inside a View/Pressable in RN.
  const content = typeof children === "string" ? <Text variant="p">{children}</Text> : children;
  const track = (
    <Animated.View className="flex-row" style={style}>
      {Array.from({ length: copies }).map((_, i) => (
        <View
          key={i}
          className="flex-row"
          style={i > 0 ? { marginLeft: spacing } : undefined}
          onLayout={i === 0 ? onContentLayout : undefined}
        >
          {content}
        </View>
      ))}
    </Animated.View>
  );

  const interactive = pauseOnPress || holdToSpeedUp;

  return (
    <View
      className={cn("w-full overflow-hidden", className)}
      onLayout={onTrackLayout}
      accessibilityRole={interactive ? undefined : "text"}
      {...props}
    >
      {interactive ? (
        <Pressable
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          hitSlop={{ top: 14, bottom: 14 }}
          accessible
          accessibilityRole="button"
          accessibilityLabel={pauseOnPress ? "Marquee, double tap to pause or resume" : "Marquee"}
        >
          {track}
        </Pressable>
      ) : (
        track
      )}
    </View>
  );
}
