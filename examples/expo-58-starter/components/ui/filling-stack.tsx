import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";
import { BlurView, type BlurViewProps } from "expo-blur";
import { cn } from "@/lib/utils";

export interface FillingStackProps<T> extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** How many cards peek behind the active one. */
  visibleCount?: number;
  cardHeight?: number;
  onIndexChange?: (index: number) => void;
}

const SPRING = { damping: 18, stiffness: 140, mass: 0.5 };
const STACK_OFFSET = 14;
const STACK_SCALE_STEP = 0.04;
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function FillingCard({
  position,
  total,
  visibleCount,
  cardHeight,
  progress,
  dark,
  children,
}: {
  position: number;
  total: number;
  visibleCount: number;
  cardHeight: number;
  progress: SharedValue<number>;
  dark: boolean;
  children: React.ReactNode;
}) {
  const back = Math.max(visibleCount - 1, 2);

  const cardStyle = useAnimatedStyle(() => {
    const depth = position - progress.value;
    const translateY = interpolate(depth, [-1, 0, 1, back], [-cardHeight * 1.25, 0, 0, -STACK_OFFSET * (back - 1)], Extrapolation.CLAMP);
    const scale = interpolate(depth, [-1, 0, 1, back], [1.06, 1, 1, 1 - STACK_SCALE_STEP * (back - 1)], Extrapolation.CLAMP);
    const opacity = interpolate(depth, [-1, -0.35, 0, back, back + 0.65], [0, 1, 1, 1, 0], Extrapolation.CLAMP);
    return { transform: [{ translateY }, { scale }], opacity, zIndex: total - position };
  });

  const blurProps = useAnimatedProps<BlurViewProps>(() => {
    const depth = position - progress.value;
    return { intensity: interpolate(depth, [-1, 0, 1], [30, 0, 30], Extrapolation.CLAMP) };
  });

  return (
    <Animated.View style={[{ position: "absolute", width: "100%", height: cardHeight }, cardStyle]}>
      <View className="flex-1 overflow-hidden rounded-2xl">
        {children}
        <AnimatedBlurView pointerEvents="none" style={{ position: "absolute", inset: 0 }} tint={dark ? "dark" : "light"} animatedProps={blurProps} />
      </View>
    </Animated.View>
  );
}

/** A vertically browsable card stack — fling up/down to cycle, with a blur "fill" between depths. */
export function FillingStack<T>({
  className, data, renderItem, visibleCount = 3, cardHeight = 260, onIndexChange, ...props
}: FillingStackProps<T>) {
  const dark = useColorScheme() === "dark";
  const progress = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => {
    setIndex((current) => {
      const next = current + dir;
      if (next < 0 || next >= data.length) return current;
      progress.value = withSpring(next, SPRING);
      onIndexChange?.(next);
      return next;
    });
  };

  const fling = Gesture.Race(
    Gesture.Fling().direction(Directions.UP).onStart(() => runOnJS(go)(1)),
    Gesture.Fling().direction(Directions.DOWN).onStart(() => runOnJS(go)(-1))
  );

  return (
    <GestureDetector gesture={fling}>
      <View
        className={cn("items-center justify-center", className)}
        style={{ height: cardHeight }}
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityLabel={`Card ${index + 1} of ${data.length}`}
        {...props}
      >
        {data.map((item, i) => (
          <FillingCard key={i} position={i} total={data.length} visibleCount={visibleCount} cardHeight={cardHeight} progress={progress} dark={dark}>
            {renderItem(item, i)}
          </FillingCard>
        ))}
      </View>
    </GestureDetector>
  );
}
