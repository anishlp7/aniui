import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Ambient fallback shape when no real audio `levels` are wired up —
// deterministic per-bar (no Math.random) so renders and tests are stable.
const ambient = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

function Bar({ index, max, active, color, level, dim = 1 }: {
  index: number; max: number; active: boolean; color: string; level?: number; dim?: number;
}) {
  const height = useSharedValue(3);
  const opacity = useSharedValue(dim);

  useEffect(() => {
    // Follows the playhead smoothly (100ms matches typical status-update ticks).
    opacity.value = withTiming(dim, { duration: 100 });
  }, [dim, opacity]);

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

  const style = useAnimatedStyle(() => ({ height: height.value, opacity: opacity.value }));
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
  /** Playback position 0–1 — bars past the playhead are faded (scrubber look). */
  progress?: number;
  size?: keyof typeof sizes;
  /** Bar color; defaults to the theme foreground. */
  color?: string;
}

export function Waveform({ className, bars = 28, levels, active = true, progress, size = "md", color, style, ...props }: WaveformProps) {
  const dark = useColorScheme() === "dark";
  const barColor = color ?? (dark ? "#fafafa" : "#18181b");
  const window = levels?.slice(-bars);
  const pad = window ? bars - window.length : 0;
  // Continuous playhead in bar units — the boundary bar gets an interpolated
  // opacity so the sweep is smooth instead of stepping bar-by-bar.
  const playhead = progress !== undefined ? Math.min(1, Math.max(0, progress)) * bars : undefined;
  const dimFor = (i: number) => {
    if (playhead === undefined) return 1;
    if (i + 1 <= playhead) return 1;
    if (i >= playhead) return 0.35;
    return 0.35 + 0.65 * (playhead - i);
  };
  return (
    <View
      className={cn("flex-row items-center justify-center gap-0.5", className)}
      // Fixed to the tallest bar so the row never changes height while the
      // bars animate (no layout bounce in composers / recording rows).
      style={[{ height: sizes[size] }, style]}
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
          dim={dimFor(i)}
        />
      ))}
    </View>
  );
}
