import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, View, useWindowDimensions } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Moon, Sun } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

export interface ThemeSwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onPress"> {
  className?: string;
  isDark: boolean;
  onToggle: () => void;
  size?: number;
  duration?: number;
  /** Plays a full-screen circular wipe from the toggle's position instead of just morphing the icon. */
  wipe?: boolean;
  wipeLightColor?: string;
  wipeDarkColor?: string;
}

/** Sun/moon icon-morph theme toggle, with an optional whole-screen circular wipe transition. */
export function ThemeSwitch({
  className, isDark, onToggle, size = 24, duration = 450,
  wipe = false, wipeLightColor = "#fafafa", wipeDarkColor = "#09090b", ...props
}: ThemeSwitchProps) {
  const colors = useThemeColors();
  const tint = colors.foreground;
  const { width, height } = useWindowDimensions();
  const triggerRef = useRef<View>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const progress = useSharedValue(isDark ? 1 : 0);
  const wipeProgress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isDark ? 1 : 0, { duration, easing: Easing.inOut(Easing.quad) });
  }, [isDark, duration, progress]);

  const maxRadius = origin
    ? Math.hypot(Math.max(origin.x, width - origin.x), Math.max(origin.y, height - origin.y))
    : 0;

  const handlePress = () => {
    if (!wipe) return onToggle();
    // measureInWindow (not measure) — avoids the status-bar offset bug measure() has for
    // absolutely/Modal-positioned overlays.
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setOrigin({ x: x + w / 2, y: y + h / 2 });
      wipeProgress.value = 0;
      wipeProgress.value = withTiming(1, { duration: duration * 1.6, easing: Easing.out(Easing.cubic) }, (done) => {
        if (done) runOnJS(setOrigin)(null);
      });
      setTimeout(onToggle, duration * 0.5);
    });
  };

  const sunStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [0, 90])}deg` },
      { scale: interpolate(progress.value, [0, 1], [1, 0.4], Extrapolation.CLAMP) },
    ],
  }));
  const moonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.5, 1], [0, 1], Extrapolation.CLAMP),
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [-90, 0])}deg` },
      { scale: interpolate(progress.value, [0, 1], [0.4, 1], Extrapolation.CLAMP) },
    ],
  }));
  const wipeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(wipeProgress.value, [0, 0.85, 1], [1, 1, 0], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(wipeProgress.value, [0, 1], [0, 1], Extrapolation.CLAMP) }],
  }));

  return (
    <>
      <Pressable
        ref={triggerRef}
        onPress={handlePress}
        accessibilityRole="switch"
        accessibilityState={{ checked: isDark }}
        accessibilityLabel={isDark ? "Switch to light theme" : "Switch to dark theme"}
        accessible={true}
        className={cn("min-h-12 min-w-12 items-center justify-center", className)}
        {...props}
      >
        <Animated.View style={[{ position: "absolute" }, sunStyle]}>
          <Sun size={size} color={tint} />
        </Animated.View>
        <Animated.View style={moonStyle}>
          <Moon size={size} color={tint} />
        </Animated.View>
      </Pressable>
      {wipe && origin && (
        <Modal transparent visible animationType="none">
          <View className="flex-1" pointerEvents="none">
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: origin.x - maxRadius,
                  top: origin.y - maxRadius,
                  width: maxRadius * 2,
                  height: maxRadius * 2,
                  borderRadius: maxRadius,
                  backgroundColor: isDark ? wipeLightColor : wipeDarkColor,
                },
                wipeStyle,
              ]}
            />
          </View>
        </Modal>
      )}
    </>
  );
}
