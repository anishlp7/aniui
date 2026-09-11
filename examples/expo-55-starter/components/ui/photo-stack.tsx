import React from "react";
import { View, Image, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface PhotoStackProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  sources: ({ uri: string } | number)[];
  size?: number;
  maxVisible?: number;
  /** Called with the index of the photo that was pressed. Omit for a static, non-interactive stack. */
  onPress?: (index: number) => void;
}

const LIFT = 10;
const LIFT_SPRING = { damping: 16, stiffness: 220, mass: 0.6 };

// Static fan-out per stack position (translateX + base rotation + stacking
// order). Press only adds a lift (translateY) and straightens the rotation
// toward 0deg on top of these — it never touches translateX.
const offsets = [
  { rotateDeg: -8, translateX: -12, translateY: 4, zIndex: 1 },
  { rotateDeg: 4, translateX: 0, translateY: 0, zIndex: 2 },
  { rotateDeg: 10, translateX: 12, translateY: -4, zIndex: 3 },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PhotoStackFrameProps {
  source: { uri: string } | number;
  size: number;
  offset: (typeof offsets)[number];
  onPress?: () => void;
}

// One frame per photo — each needs its own `pressed` shared value, so this
// has to be its own component (hooks can't be called inside the .map() below).
function PhotoStackFrame({ source, size, offset, onPress }: PhotoStackFrameProps) {
  const pressed = useSharedValue(0);

  const liftStyle = useAnimatedStyle(() => ({
    zIndex: offset.zIndex,
    transform: [
      { translateX: offset.translateX },
      { translateY: offset.translateY - LIFT * pressed.value },
      { rotate: `${offset.rotateDeg * (1 - pressed.value)}deg` },
    ],
  }));

  if (!onPress) {
    return (
      <Animated.Image
        source={source}
        className="absolute rounded-lg border-2 border-background bg-muted"
        style={[{ width: size, height: size }, liftStyle]}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
    );
  }

  return (
    <AnimatedPressable
      className="absolute min-h-12 min-w-12 overflow-hidden rounded-lg border-2 border-background bg-muted"
      style={[{ width: size, height: size }, liftStyle]}
      accessibilityRole="button"
      accessible
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withSpring(1, LIFT_SPRING);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, LIFT_SPRING);
      }}
    >
      <Image source={source} className="h-full w-full" resizeMode="cover" accessibilityIgnoresInvertColors />
    </AnimatedPressable>
  );
}

export function PhotoStack({ className, sources, size = 88, maxVisible = 3, onPress, ...props }: PhotoStackProps) {
  const visible = sources.slice(0, maxVisible);
  const width = size + 24;

  return (
    <View
      className={cn("items-center justify-center", className)}
      style={{ width, height: size + 16 }}
      accessibilityRole="image"
      accessibilityLabel={`Photo stack of ${visible.length} images`}
      {...props}
    >
      {visible.map((source, index) => (
        <PhotoStackFrame
          key={index}
          source={source}
          size={size}
          offset={offsets[index] ?? offsets[offsets.length - 1]}
          onPress={onPress ? () => onPress(index) : undefined}
        />
      ))}
    </View>
  );
}
