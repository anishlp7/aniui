import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Deterministic per-bar amplitude/tempo so the wave looks organic without
// Math.random (keeps renders stable and tests deterministic).
const amp = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

function Bar({ index, max, active, color }: { index: number; max: number; active: boolean; color: string }) {
  const scale = useSharedValue(active ? 0.3 : 1);
  useEffect(() => {
    if (active) {
      const duration = 260 + (index % 5) * 70;
      scale.value = withRepeat(
        withSequence(withTiming(1, { duration }), withTiming(0.25, { duration })),
        -1,
        true
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 150 });
    }
    return () => cancelAnimation(scale);
  }, [active, index, scale]);

  const height = Math.max(3, max * amp(index));
  const style = useAnimatedStyle(() => ({ height, transform: [{ scaleY: scale.value }] }));
  return <Animated.View style={[style, { backgroundColor: color }]} className="w-0.5 rounded-full" />;
}

export interface WaveformProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Number of bars (default 28). */
  bars?: number;
  /** Animate the bars (recording/playing). false renders a static wave. */
  active?: boolean;
  size?: keyof typeof sizes;
  /** Bar color; defaults to the theme foreground. */
  color?: string;
}

export function Waveform({ className, bars = 28, active = true, size = "md", color, ...props }: WaveformProps) {
  const dark = useColorScheme() === "dark";
  const barColor = color ?? (dark ? "#fafafa" : "#18181b");
  return (
    <View
      className={cn("flex-row items-center justify-center gap-0.5", className)}
      accessibilityLabel={active ? "Recording" : "Audio waveform"}
      {...props}
    >
      {Array.from({ length: bars }, (_, i) => (
        <Bar key={i} index={i} max={sizes[size]} active={active} color={barColor} />
      ))}
    </View>
  );
}
