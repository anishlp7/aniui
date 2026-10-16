import React, { useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate, runOnJS } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface SwipeDeckProps<T> extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  onSwipeLeft?: (item: T, index: number) => void;
  onSwipeRight?: (item: T, index: number) => void;
  /** Fired after the last card is swiped away. */
  onEmpty?: () => void;
}

export function SwipeDeck<T>({
  className, data, renderCard, onSwipeLeft, onSwipeRight, onEmpty, onLayout, ...props
}: SwipeDeckProps<T>) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  const advance = (dir: 1 | -1) => {
    const item = data[index];
    (dir === 1 ? onSwipeRight : onSwipeLeft)?.(item, index);
    tx.value = 0;
    ty.value = 0;
    const next = index + 1;
    setIndex(next);
    if (next >= data.length) onEmpty?.();
  };

  const gesture = Gesture.Pan()
    .enabled(index < data.length && width > 0)
    .onUpdate((e) => { tx.value = e.translationX; ty.value = e.translationY; })
    .onEnd((e) => {
      const threshold = width * 0.35;
      if (Math.abs(tx.value) > threshold || Math.abs(e.velocityX) > 900) {
        const dir: 1 | -1 = tx.value > 0 || (Math.abs(tx.value) <= threshold && e.velocityX > 0) ? 1 : -1;
        tx.value = withTiming(dir * width * 1.4, { duration: 200 }, () => runOnJS(advance)(dir));
        ty.value = withTiming(ty.value + e.velocityY * 0.05, { duration: 200 });
      } else {
        tx.value = withSpring(0);
        ty.value = withSpring(0);
      }
    });

  const topStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${interpolate(tx.value, [-width || -1, width || 1], [-12, 12])}deg` },
    ],
  }));
  // The card behind grows into place as the top card is dragged away.
  const nextStyle = useAnimatedStyle(() => {
    const progress = Math.min(1, Math.abs(tx.value) / ((width || 1) * 0.5));
    return { transform: [{ scale: 0.95 + 0.05 * progress }, { translateY: 8 - 8 * progress }] };
  });

  const top = data[index];
  const next = data[index + 1];

  return (
    <View
      className={cn("w-full", className)}
      onLayout={(e) => { setWidth(e.nativeEvent.layout.width); onLayout?.(e); }}
      {...props}
    >
      {next !== undefined && (
        <Animated.View className="absolute inset-0" style={nextStyle} pointerEvents="none">
          {renderCard(next, index + 1)}
        </Animated.View>
      )}
      {top !== undefined && (
        <GestureDetector gesture={gesture}>
          <Animated.View style={topStyle} accessible={true} accessibilityLabel={`Card ${index + 1} of ${data.length}`}>
            {renderCard(top, index)}
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}
