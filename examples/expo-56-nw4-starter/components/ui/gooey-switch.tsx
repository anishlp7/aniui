import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { Canvas, Circle, RoundedRect, Group, Paint, Blur, ColorMatrix } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
  interpolate,
  interpolateColor,
  runOnJS,
  clamp,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

// Alpha-threshold "goo" filter: identity on R/G/B, but the alpha row is a steep
// linear ramp (steepness) offset by -steepness*threshold. Blurred pixels below
// `threshold` alpha collapse to 0 (invisible), pixels above snap to 1 (opaque),
// so two separately-blurred shapes that overlap above the threshold fuse into
// one hard-edged silhouette instead of reading as two soft, separate circles.
function buildGooeyMatrix(steepness: number, threshold: number): number[] {
  return [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, steepness, -steepness * threshold,
  ];
}

const GOOEY_STEEPNESS = 22;
const GOOEY_THRESHOLD = 0.42;
const SPRING_CONFIG = { damping: 16, stiffness: 170, mass: 0.9 };
const FLICK_VELOCITY = 500;

export interface GooeySwitchProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  width?: number;
  height?: number;
  onColor?: string;
  offColor?: string;
  thumbColor?: string;
  disabled?: boolean;
}

export function GooeySwitch({
  className,
  value,
  onValueChange,
  width = 56,
  height = 32,
  onColor = "#18181b",
  offColor = "#e4e4e7",
  thumbColor = "#fafafa",
  disabled = false,
  ...props
}: GooeySwitchProps) {
  const cy = height / 2;
  const thumbR = height / 2 - 4;
  const anchorR = thumbR * 0.8;
  const LEFT_X = height / 2 + 2;
  const RIGHT_X = width - height / 2 - 2;
  const RANGE = RIGHT_X - LEFT_X;
  const BLUR_AMOUNT = height * 0.16;
  const BRIDGE_BASE_HEIGHT = height * 0.42;

  const progress = useSharedValue(value ? 1 : 0);
  const dragging = useSharedValue(false);

  useEffect(() => {
    if (!dragging.value) {
      progress.value = withSpring(value ? 1 : 0, SPRING_CONFIG);
    }
  }, [value]);

  const gooeyMatrix = useMemo(() => buildGooeyMatrix(GOOEY_STEEPNESS, GOOEY_THRESHOLD), []);

  // Thumb (and everything gooey) travels along a single progress-driven axis.
  const mainX = useDerivedValue(() => LEFT_X + progress.value * RANGE);

  // The blurred halo around the thumb bulges slightly mid-transit, then
  // relaxes back down as it settles onto an anchor — a light "jelly" cue.
  const haloRadius = useDerivedValue(() =>
    thumbR + 2 + interpolate(progress.value, [0, 0.2, 0.5, 0.8, 1], [0, 3, 4, 3, 0])
  );

  // Bridge always connects the thumb to whichever anchor it's nearest to:
  // grows from the left anchor toward the thumb for the first half of the
  // trip, then from the thumb toward the right anchor for the second half.
  // The far anchor is left un-bridged, so it stays a separate blob.
  const bridgeX = useDerivedValue(() => (progress.value <= 0.5 ? LEFT_X : mainX.value));
  const bridgeWidth = useDerivedValue(() =>
    Math.max(0, progress.value <= 0.5 ? mainX.value - LEFT_X : RIGHT_X - mainX.value)
  );
  const bridgeHeight = useDerivedValue(
    () => BRIDGE_BASE_HEIGHT * interpolate(progress.value, [0, 0.25, 0.5, 0.75, 1], [0.55, 1, 0.75, 1, 0.55])
  );
  const bridgeY = useDerivedValue(() => cy - bridgeHeight.value / 2);
  const bridgeR = useDerivedValue(() => bridgeHeight.value / 2);

  const trackColor = useDerivedValue(() => interpolateColor(progress.value, [0, 1], [offColor, onColor]));

  const commit = (nextValue: boolean) => {
    if (nextValue !== value) {
      onValueChange?.(nextValue);
    }
  };

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .activeOffsetX([-8, 8])
    .onStart(() => {
      "worklet";
      dragging.value = true;
    })
    .onUpdate((e) => {
      "worklet";
      const startX = value ? RIGHT_X : LEFT_X;
      const nextX = clamp(startX + e.translationX, LEFT_X, RIGHT_X);
      progress.value = interpolate(nextX, [LEFT_X, RIGHT_X], [0, 1]);
    })
    .onEnd((e) => {
      "worklet";
      dragging.value = false;
      const velocity = e.velocityX;
      const shouldBeOn = Math.abs(velocity) > FLICK_VELOCITY ? velocity > 0 : progress.value > 0.5;
      progress.value = withSpring(shouldBeOn ? 1 : 0, { ...SPRING_CONFIG, velocity: velocity / RANGE });
      runOnJS(commit)(shouldBeOn);
    });

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onEnd(() => {
      "worklet";
      const nextValue = !value;
      progress.value = withSpring(nextValue ? 1 : 0, SPRING_CONFIG);
      runOnJS(commit)(nextValue);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        accessible={true}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        className={cn("min-h-12 min-w-12 items-center justify-center", disabled && "opacity-50", className)}
        {...props}
      >
        <Canvas style={{ width, height }}>
          <RoundedRect x={2} y={2} width={width - 4} height={height - 4} r={height / 2} color={trackColor} />
          <Group
            layer={
              <Paint>
                <Blur blur={BLUR_AMOUNT} />
                <ColorMatrix matrix={gooeyMatrix} />
              </Paint>
            }
          >
            <Circle cx={LEFT_X} cy={cy} r={anchorR} color={thumbColor} />
            <Circle cx={RIGHT_X} cy={cy} r={anchorR} color={thumbColor} />
            <RoundedRect x={bridgeX} y={bridgeY} width={bridgeWidth} height={bridgeHeight} r={bridgeR} color={thumbColor} />
            <Circle cx={mainX} cy={cy} r={haloRadius} color={thumbColor} />
          </Group>
          <Circle cx={mainX} cy={cy} r={thumbR} color={thumbColor} />
        </Canvas>
      </View>
    </GestureDetector>
  );
}
