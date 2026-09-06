import React, { useCallback, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface SpinButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onPress"> {
  className?: string;
  idleText?: string;
  activeText?: string;
  /** Fully controlled — the parent owns the saving state, like other AniUI toggles. */
  saving?: boolean;
  onSavingChange?: (saving: boolean) => void;
  disabled?: boolean;
}

/** Button that swaps its label for a custom spinning SVG arc while `saving`. */
export function SpinButton({
  className, idleText = "Save", activeText = "Saving", saving = false, onSavingChange, disabled = false, ...props
}: SpinButtonProps) {
  const progress = useSharedValue(saving ? 1 : 0);
  const pressed = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(saving ? 1 : 0, { duration: 220 });
    if (saving) {
      rotation.value = withRepeat(withTiming(rotation.value + 360, { duration: 850, easing: Easing.linear }), -1, false);
    } else {
      cancelAnimation(rotation);
    }
  }, [saving, progress, rotation]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    onSavingChange?.(!saving);
  }, [disabled, saving, onSavingChange]);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.96]) }],
  }));
  const idleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -10]) }],
  }));
  const activeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [10, 0]) }],
  }));
  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const size = 16;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Animated.View style={buttonStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={() => (pressed.value = withSpring(1, { damping: 14, stiffness: 220 }))}
        onPressOut={() => (pressed.value = withSpring(0, { damping: 14, stiffness: 220 }))}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled, busy: saving }}
        accessibilityLabel={saving ? activeText : idleText}
        accessible={true}
        className={cn("min-h-12 min-w-12 flex-row items-center justify-center gap-2 rounded-full bg-primary px-6", disabled && "opacity-50", className)}
        {...props}
      >
        <View className="relative items-center justify-center">
          <Text className="text-base font-bold text-primary-foreground opacity-0" numberOfLines={1}>
            {idleText.length >= activeText.length ? idleText : activeText}
          </Text>
          <Animated.Text style={idleStyle} className="absolute text-base font-bold text-primary-foreground" numberOfLines={1}>
            {idleText}
          </Animated.Text>
          <Animated.Text style={activeStyle} className="absolute text-base font-bold text-primary-foreground" numberOfLines={1}>
            {activeText}
          </Animated.Text>
        </View>
        <Animated.View style={[{ width: size, height: size }, spinnerStyle]}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#fff"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${circumference * 0.3} ${circumference}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
