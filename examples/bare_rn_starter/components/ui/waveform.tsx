import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Ambient fallback shape when no real audio `levels` are wired up —
// deterministic per-bar (no Math.random) so renders and tests are stable.
const ambient = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

function Bar({ index, max, active, color, level }: {
  index: number; max: number; active: boolean; color: string; level?: number;
}) {
  const height = useSharedValue(3);

  useEffect(() => {
    if (level !== undefined) {
      // Audio-driven: follow the measured amplitude for this bar.
      cancelAnimation(height);
      height.value = withTiming(Math.max(3, max * Math.min(1, Math.max(0, level))), { duration: 100 });
    } else if (active) {
      const duration = 260 + (index % 5) * 70;
      height.value = withRepeat(
        withSequence(withTiming(max * ambient(index), { duration }), withTiming(max * 0.2, { duration })),
        -1,
        true
      );
    } else {
      cancelAnimation(height);
      height.value = withTiming(Math.max(3, max * ambient(index)), { duration: 150 });
    }
    return () => cancelAnimation(height);
  }, [level, active, index, max, height]);

  const style = useAnimatedStyle(() => ({ height: height.value }));
  return <Animated.View style={[style, { backgroundColor: color }]} className="w-0.5 rounded-full" />;
}

export interface WaveformProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Number of bars (default 28). */
  bars?: number;
  /**
   * Real audio amplitudes in 0–1 (e.g. from mic metering or decoded playback
   * data). The most recent `bars` values are shown, newest on the right.
   * When provided, the bars follow the audio instead of the ambient animation.
   */
  levels?: number[];
  /** Without `levels`: animate an ambient wave (recording). false = static. */
  active?: boolean;
  size?: keyof typeof sizes;
  /** Bar color; defaults to the theme foreground. */
  color?: string;
}

export function Waveform({ className, bars = 28, levels, active = true, size = "md", color, ...props }: WaveformProps) {
  const dark = useColorScheme() === "dark";
  const barColor = color ?? (dark ? "#fafafa" : "#18181b");
  const window = levels?.slice(-bars);
  const pad = window ? bars - window.length : 0;
  return (
    <View
      className={cn("flex-row items-center justify-center gap-0.5", className)}
      accessibilityLabel={active ? "Recording" : "Audio waveform"}
      {...props}
    >
      {Array.from({ length: bars }, (_, i) => (
        <Bar
          key={i}
          index={i}
          max={sizes[size]}
          active={active}
          color={barColor}
          level={window ? (i < pad ? 0 : window[i - pad]) : undefined}
        />
      ))}
    </View>
  );
}
