import React, { useCallback, useMemo } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface Carousel3DProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  perspectiveFactor?: number;
  backOpacity?: number;
  onIndexChange?: (index: number) => void;
  onPressItem?: (index: number) => void;
}

const MIN_PROJECTION_DENOMINATOR = 1;

function stepOf(count: number) {
  "worklet";
  return 360 / Math.max(count, 1);
}

function frontIndex(rotation: number, step: number, count: number) {
  "worklet";
  if (count <= 0) return 0;
  const index = Math.round(-rotation / step) % count;
  return index < 0 ? index + count : index;
}

function projectFace(angle: number, radius: number, perspective: number) {
  "worklet";
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const distance = Math.max(perspective, MIN_PROJECTION_DENOMINATOR);
  const depth = radius * cos;
  return {
    matrix: [cos, 0, -sin, sin / distance, 0, 1, 0, 0, sin, 0, cos, -cos / distance, sin * radius, 0, depth, 1 - depth / distance],
    depth,
    facing: depth - (radius * radius) / distance,
  };
}

export function Carousel3D({
  className,
  data,
  itemWidth: itemWidthProp,
  gap = 8,
  perspectiveFactor = 3.5,
  backOpacity = 0.4,
  onIndexChange,
  onPressItem,
  ...props
}: Carousel3DProps) {
  const { width: windowWidth } = useWindowDimensions();
  const count = data.length;
  const step = stepOf(count);
  const itemWidth = itemWidthProp ?? Math.min(windowWidth * 0.55, 220);
  const itemHeight = itemWidth * 1.25;
  const radius = Math.max((count * (itemWidth + gap)) / (2 * Math.PI), itemWidth);
  const perspective = radius * perspectiveFactor;

  const rotation = useSharedValue(0);
  const dragOrigin = useSharedValue(0);

  const handleIndex = useCallback((index: number) => onIndexChange?.(index), [onIndexChange]);

  useAnimatedReaction(
    () => frontIndex(rotation.value, step, count),
    (current, prev) => {
      if (prev !== null && current !== prev) runOnJS(handleIndex)(current);
    },
    [step, count, handleIndex]
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-8, 8])
        .onBegin(() => {
          cancelAnimation(rotation);
          dragOrigin.value = rotation.value;
        })
        .onUpdate((e) => {
          const degreesPerPixel = 180 / (Math.PI * Math.max(radius, 1));
          rotation.value = dragOrigin.value + e.translationX * degreesPerPixel;
        })
        .onEnd((e) => {
          const degreesPerPixel = 180 / (Math.PI * Math.max(radius, 1));
          const velocity = e.velocityX * degreesPerPixel;
          const projected = rotation.value + velocity * 0.28;
          rotation.value = withSpring(Math.round(projected / step) * step, {
            damping: 26,
            stiffness: 110,
            mass: 0.6,
            velocity,
          });
        }),
    [rotation, dragOrigin, step, radius]
  );

  const frontScale = perspectiveFactor / Math.max(perspectiveFactor - 1, 0.1);

  return (
    <View
      className={cn("w-full items-center justify-center overflow-hidden", className)}
      style={{ height: itemHeight * frontScale + 48 }}
      accessibilityRole="adjustable"
      {...props}
    >
      <GestureDetector gesture={pan}>
        <Animated.View className="relative w-full items-center justify-center" style={{ height: itemHeight }}>
          {data.map((item, index) => (
            <Carousel3DFace
              key={index}
              index={index}
              rotation={rotation}
              step={step}
              radius={radius}
              perspective={perspective}
              backOpacity={backOpacity}
              itemWidth={itemWidth}
              itemHeight={itemHeight}
              onPress={onPressItem ? () => onPressItem(index) : undefined}
            >
              {item}
            </Carousel3DFace>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

function Carousel3DFace({
  index,
  rotation,
  step,
  radius,
  perspective,
  backOpacity,
  itemWidth,
  itemHeight,
  onPress,
  children,
}: {
  index: number;
  rotation: SharedValue<number>;
  step: number;
  radius: number;
  perspective: number;
  backOpacity: number;
  itemWidth: number;
  itemHeight: number;
  onPress?: () => void;
  children: React.ReactNode;
}) {
  const facing = useSharedValue(1);

  const style = useAnimatedStyle(() => {
    const angle = rotation.value + index * step;
    const projected = projectFace(angle, radius, perspective);
    facing.value = projected.facing;
    return {
      opacity: interpolate(projected.depth, [-radius, radius], [backOpacity, 1], Extrapolation.CLAMP),
      zIndex: Math.round(projected.depth) + 1000,
      transform: [{ matrix: projected.matrix }],
    };
  }, [index, step, radius, perspective, backOpacity]);

  const handlePress = useCallback(() => {
    if (facing.value <= 0) return;
    onPress?.();
  }, [onPress, facing]);

  const body = (
    <Animated.View
      className="absolute overflow-hidden rounded-xl border border-border bg-card"
      style={[{ width: itemWidth, height: itemHeight }, style]}
    >
      {children}
    </Animated.View>
  );

  if (!onPress) return body;
  return (
    <Pressable onPress={handlePress} accessible={true} accessibilityRole="button">
      {body}
    </Pressable>
  );
}
