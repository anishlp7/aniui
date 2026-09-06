import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { cn } from "@/lib/utils";

export interface RollingCounterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: number;
  digits?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const TILES = 11;
const STAGGER_MS = 38;
const MAX_BLUR = 24;
const SQUASH_Y = 0.12;
const SQUASH_X = 0.035;
const ROLL_EASING = Easing.bezier(0.22, 1, 0.28, 1);
const ROLL_TIMING = { duration: 620, easing: ROLL_EASING };
const WIDTH_TIMING = { duration: 380, easing: ROLL_EASING };

function wrap(num: number, mod: number) {
  "worklet";
  return ((num % mod) + mod) % mod;
}

function digitAt(num: number, place: number) {
  "worklet";
  const str = Math.abs(Math.floor(num)).toString();
  return parseInt(str[str.length - 1 - place] ?? "0", 10);
}

function digitCount(num: number) {
  "worklet";
  return Math.max(Math.abs(Math.floor(num)).toString().length, 1);
}

function Digit({ place, counterValue, height, width, stagger }: { place: number; counterValue: SharedValue<number>; height: number; width: number; stagger: number }) {
  const settled = digitAt(counterValue.value, place);
  const offset = useSharedValue(settled);
  const travelFrom = useSharedValue(settled);
  const travelTo = useSharedValue(settled);

  useAnimatedReaction(
    () => counterValue.value,
    (current, previous) => {
      if (previous === null || current === previous) return;
      const next = digitAt(current, place);
      if (next === digitAt(previous, place)) return;

      const from = wrap(offset.value, 10);
      const forward = current > previous;
      const delta = forward ? wrap(next - from, 10) : -wrap(from - next, 10);
      if (delta === 0) return;

      travelFrom.value = offset.value;
      travelTo.value = offset.value + delta;
      const roll = withTiming(travelTo.value, ROLL_TIMING);
      offset.value = stagger > 0 ? withDelay(place * stagger, roll) : roll;
    },
    [place, stagger]
  );

  // Bell curve (sin^2 of roll progress) scaled by how far this digit is
  // travelling — near-zero for a single-step roll, near-1 for a full 0-9 span.
  const motion = useDerivedValue(() => {
    const span = travelTo.value - travelFrom.value;
    if (span === 0) return 0;
    const progress = Math.min(Math.max((offset.value - travelFrom.value) / span, 0), 1);
    const bell = Math.sin(Math.PI * progress) ** 2;
    const reach = Math.min(Math.max(Math.abs(span) / 9, 0), 1);
    return bell * reach;
  });

  const windowStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: 1 - SQUASH_Y * motion.value }, { scaleX: 1 - SQUASH_X * motion.value }],
  }));

  const stripStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -height * wrap(offset.value, 10) }],
  }));

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(motion.value, [0, 1], [0, MAX_BLUR]),
  }));

  return (
    <Animated.View style={[{ height, width, overflow: "hidden" }, windowStyle]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Animated.View style={stripStyle}>
        {Array.from({ length: TILES }, (_, n) => (
          <Text key={n} className="text-3xl font-bold text-foreground tabular-nums text-center" style={{ height, width, lineHeight: height }}>
            {n % 10}
          </Text>
        ))}
      </Animated.View>
      <AnimatedBlurView animatedProps={blurProps} tint="default" pointerEvents="none" className="absolute inset-0" />
    </Animated.View>
  );
}

export function RollingCounter({ className, value, digits = 4, prefix, suffix, ...props }: RollingCounterProps) {
  const clamped = Math.max(0, Math.floor(value));
  const digitHeight = 36;
  const digitWidth = 24;

  const counterValue = useSharedValue(clamped);
  useEffect(() => {
    counterValue.value = clamped;
  }, [clamped, counterValue]);

  const [totalDigits, setTotalDigits] = useState(() => Math.max(digits, digitCount(clamped)));
  const rowWidth = useSharedValue(totalDigits * digitWidth);

  useAnimatedReaction(
    () => Math.max(digits, digitCount(counterValue.value)),
    (next, previous) => {
      if (previous === null || next === previous) return;
      rowWidth.value = withTiming(next * digitWidth, WIDTH_TIMING);
      runOnJS(setTotalDigits)(next);
    },
    [digits, digitWidth]
  );

  const rowStyle = useAnimatedStyle(() => ({ width: rowWidth.value }));

  return (
    <View className={cn("flex-row items-center gap-0.5", className)} accessibilityRole="text" accessibilityLabel={`${prefix ?? ""}${clamped}${suffix ?? ""}`} {...props}>
      {prefix ? <Text className="text-2xl font-bold text-muted-foreground mr-1">{prefix}</Text> : null}
      <Animated.View style={[{ flexDirection: "row", overflow: "hidden" }, rowStyle]}>
        {Array.from({ length: totalDigits }, (_, i) => {
          const place = totalDigits - 1 - i;
          return <Digit key={place} place={place} counterValue={counterValue} height={digitHeight} width={digitWidth} stagger={STAGGER_MS} />;
        })}
      </Animated.View>
      {suffix ? <Text className="text-2xl font-bold text-muted-foreground ml-1">{suffix}</Text> : null}
    </View>
  );
}
