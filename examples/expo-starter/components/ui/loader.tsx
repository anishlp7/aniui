import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useReducedMotion } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

const loaderVariants = cva("items-center justify-center", {
  variants: {
    variant: {
      circle: "",
      dots: "flex-row gap-1.5",
    },
    size: { sm: "", md: "", lg: "" },
  },
  defaultVariants: { variant: "circle", size: "md" },
});

const sizes = { sm: 20, md: 32, lg: 44 } as const;
const strokeWidths = { sm: 2, md: 2.5, lg: 3 } as const;

// Segmented "comet tail" ring, ported from reacticx's circular-loader
// (strokeDasharray/strokeDashoffset per segment + exponential opacity falloff)
// rather than a plain spinning border.
const SEGMENTS = 16;
const ACTIVE_PCT = 0.75;
const GRADIENT_PCT = 0.25;

export interface LoaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof loaderVariants> {
  className?: string;
}

export function Loader({ variant = "circle", size = "md", className, ...props }: LoaderProps) {
  const reducedMotion = useReducedMotion();
  const spin = useSharedValue(0);
  const s = sizes[size ?? "md"];
  const dark = useColorScheme() === "dark";
  const color = dark ? "#fafafa" : "#18181b";

  useEffect(() => {
    if (reducedMotion) return;
    spin.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.linear }), -1, false);
    return () => cancelAnimation(spin);
  }, [spin, reducedMotion]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }],
  }));

  if (variant === "dots") {
    return (
      <View className={cn(loaderVariants({ variant, size }), className)} accessibilityRole="progressbar" {...props}>
        {[0, 1, 2].map((i) => (
          <Dot key={i} index={i} size={s / 4} reducedMotion={reducedMotion} />
        ))}
      </View>
    );
  }

  const strokeWidth = strokeWidths[size ?? "md"];
  const radius = (s - strokeWidth) / 2;
  const cx = s / 2;
  const cy = s / 2;
  const circumference = 2 * Math.PI * radius;
  const solidPct = ACTIVE_PCT - GRADIENT_PCT;
  const segmentLength = (circumference * GRADIENT_PCT) / SEGMENTS;
  const activeLength = circumference * solidPct;

  return (
    <View className={cn(loaderVariants({ variant, size }), className)} accessibilityRole="progressbar" {...props}>
      <Animated.View style={[{ width: s, height: s }, !reducedMotion && spinStyle]}>
        <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <Circle
            cx={cx}
            cy={cy}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${activeLength} ${circumference}`}
            opacity={reducedMotion ? 0.6 : 1}
          />
          {Array.from({ length: SEGMENTS }).map((_, i) => {
            const progress = i / SEGMENTS;
            const opacity = 1 - Math.pow(progress, 1.5);
            if (opacity < 0.03) return null;
            return (
              <Circle
                key={i}
                cx={cx}
                cy={cy}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                fill="none"
                opacity={reducedMotion ? 0 : opacity}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-(activeLength + segmentLength * i)}
              />
            );
          })}
        </Svg>
      </Animated.View>
    </View>
  );
}

function Dot({ index, size, reducedMotion }: { index: number; size: number; reducedMotion: boolean }) {
  // Vertical bounce (translateY), staggered per dot — matches reacticx's
  // circle-loader (cy jump of dotRadius * 0.85, staggered by duration / 3).
  const progress = useSharedValue(0);
  const jump = size * 0.85;

  useEffect(() => {
    if (reducedMotion) return;
    progress.value = withDelay(
      index * 167,
      withRepeat(withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }), -1, true)
    );
    return () => cancelAnimation(progress);
  }, [progress, index, reducedMotion]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: -progress.value * jump }],
  }));

  return (
    <Animated.View
      className="rounded-full bg-primary"
      style={[{ width: size, height: size, opacity: reducedMotion ? 0.6 : 1 }, !reducedMotion && style]}
    />
  );
}
