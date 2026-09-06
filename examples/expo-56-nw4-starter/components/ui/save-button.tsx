import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, useColorScheme } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Check } from "lucide-react-native";
import { cn } from "@/lib/utils";

export type SaveButtonPhase = "idle" | "loading" | "success" | "done";

export interface SaveButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onPress" | "disabled"> {
  className?: string;
  label?: string;
  savedLabel?: string;
  onSave?: () => void | Promise<void>;
  onSaved?: () => void;
  minLoading?: number;
  successPause?: number;
  /** Reverts back to idle after this many ms once done. Stays "done" if omitted. */
  resetAfter?: number;
  disabled?: boolean;
}

const IDLE_WIDTH = 116;
const CIRCLE_WIDTH = 48;
const DONE_WIDTH = 148;
const SPRING = { damping: 18, stiffness: 180, mass: 1 };

/** Idle -> loading -> success -> done state-machine button for async save actions. */
export function SaveButton({
  className, label = "Save", savedLabel = "Saved", onSave, onSaved,
  minLoading = 1100, successPause = 600, resetAfter, disabled = false, ...props
}: SaveButtonProps) {
  const dark = useColorScheme() === "dark";
  const idleBg = dark ? "#27272a" : "#f4f4f5";
  const activeBg = dark ? "#fafafa" : "#18181b";
  const idleText = dark ? "#fafafa" : "#18181b";

  const [phase, setPhase] = useState<SaveButtonPhase>("idle");
  const phaseRef = useRef<SaveButtonPhase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const width = useSharedValue(IDLE_WIDTH);
  const bg = useSharedValue(0);
  const labelP = useSharedValue(1);
  const spinP = useSharedValue(0);
  const spin = useSharedValue(0);
  const checkP = useSharedValue(0);
  const savedP = useSharedValue(0);

  const setBoth = useCallback((p: SaveButtonPhase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const runReset = useCallback(() => {
    setBoth("idle");
    savedP.value = withTiming(0, { duration: 150 });
    checkP.value = withTiming(0, { duration: 150 });
    bg.value = withTiming(0, { duration: 200 });
    width.value = withSpring(IDLE_WIDTH, SPRING);
    labelP.value = withDelay(120, withTiming(1, { duration: 200 }));
  }, [savedP, checkP, bg, width, labelP, setBoth]);

  const runDone = useCallback(() => {
    setBoth("done");
    width.value = withSpring(DONE_WIDTH, SPRING);
    checkP.value = withTiming(0, { duration: 180 });
    savedP.value = withDelay(20, withTiming(1, { duration: 240 }));
    onSaved?.();
    if (resetAfter != null) timers.current.push(setTimeout(runReset, resetAfter));
  }, [width, checkP, savedP, onSaved, resetAfter, runReset, setBoth]);

  const runSuccess = useCallback(() => {
    setBoth("success");
    spinP.value = withTiming(0, { duration: 160 });
    cancelAnimation(spin);
    checkP.value = withDelay(140, withSpring(1, { damping: 11, stiffness: 220 }));
    timers.current.push(setTimeout(runDone, successPause));
  }, [spinP, spin, checkP, successPause, runDone, setBoth]);

  const runLoading = useCallback(() => {
    setBoth("loading");
    width.value = withSpring(CIRCLE_WIDTH, SPRING);
    bg.value = withTiming(1, { duration: 260 });
    labelP.value = withDelay(50, withTiming(0, { duration: 180 }));
    spinP.value = withDelay(240, withTiming(1, { duration: 180 }));
    spin.value = 0;
    spin.value = withRepeat(withTiming(360, { duration: 750, easing: Easing.linear }), -1, false);
  }, [width, bg, labelP, spinP, spin, setBoth]);

  const handlePress = useCallback(async () => {
    if (disabled || phaseRef.current !== "idle") return;
    runLoading();
    const started = Date.now();
    try {
      await onSave?.();
    } catch {
      // A failed save still resolves through to "success" — callers surface errors themselves.
    }
    timers.current.push(setTimeout(runSuccess, Math.max(0, minLoading - (Date.now() - started))));
  }, [disabled, runLoading, onSave, minLoading, runSuccess]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const containerStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: interpolateColor(bg.value, [0, 1], [idleBg, activeBg]),
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelP.value,
    transform: [{ scale: interpolate(labelP.value, [0, 1], [0.6, 1]) }],
  }));
  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: spinP.value,
    transform: [{ rotate: `${spin.value}deg` }],
  }));
  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkP.value,
    transform: [{ scale: interpolate(checkP.value, [0, 1], [0.5, 1]) }],
  }));
  const savedStyle = useAnimatedStyle(() => ({
    opacity: savedP.value,
    transform: [{ translateY: interpolate(savedP.value, [0, 1], [6, 0]) }],
  }));

  const busy = phase !== "idle";

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || busy}
      accessibilityRole="button"
      accessibilityState={{ busy, disabled }}
      accessibilityLabel={phase === "done" ? savedLabel : label}
      accessible={true}
      className={cn("min-h-12 min-w-12 items-center justify-center", disabled && "opacity-50", className)}
      {...props}
    >
      <Animated.View className="h-12 items-center justify-center overflow-hidden rounded-full" style={containerStyle}>
        <Animated.View className="absolute" style={labelStyle}>
          <Text numberOfLines={1} className="text-base font-medium" style={{ color: idleText }}>
            {label}
          </Text>
        </Animated.View>
        <Animated.View className="absolute h-6 w-6 rounded-full border-2 border-white/25" style={[spinnerStyle, { borderTopColor: "#fff" }]} />
        <Animated.View className="absolute" style={checkStyle}>
          <Check size={18} color={dark ? "#18181b" : "#fafafa"} />
        </Animated.View>
        <Animated.View className="absolute" style={savedStyle}>
          <Text numberOfLines={1} className="text-base font-medium" style={{ color: idleText }}>
            {savedLabel}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
