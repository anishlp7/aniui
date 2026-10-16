import React, { useEffect, useState } from "react";
import { View, Pressable, Text, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { Plus } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING = { damping: 14, stiffness: 170, mass: 0.8 } as const;
const PRESS_SPRING = { damping: 20, stiffness: 250, mass: 0.5 } as const;
const STAGGER_MS = 30;

export type FanMenuItem = {
  key: string;
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
  angle?: number;
};

export interface FanMenuProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  items: FanMenuItem[];
  radius?: number;
  triggerIcon?: React.ReactNode;
}

export function FanMenu({ className, items, radius = 96, triggerIcon, ...props }: FanMenuProps) {
  const [open, setOpen] = useState(false);
  const colors = useThemeColors();
  const { width: screenW, height: screenH } = useWindowDimensions();
  const progress = useSharedValue(0);
  const pressed = useSharedValue(0);
  const spread = 120;
  const startAngle = -spread / 2;
  const count = items.length;

  useEffect(() => {
    progress.value = open
      ? withSpring(1, SPRING)
      : withDelay(Math.max(0, count - 1) * STAGGER_MS, withSpring(0, SPRING));
  }, [open, count, progress]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

  const triggerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pressed.value, [0, 1], [1, 0.9], Extrapolation.CLAMP) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, 45], Extrapolation.CLAMP)}deg` },
    ],
  }));

  return (
    <View className={cn("items-center justify-end", className)} style={{ height: radius + 80 }} {...props}>
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        className="absolute"
        style={[{ width: screenW * 2, height: screenH * 2, left: -screenW, top: -screenH }, backdropStyle]}
      >
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        />
      </Animated.View>
      {items.map((item, index) => {
        const angle = item.angle ?? startAngle + (spread / Math.max(count - 1, 1)) * index;
        const delay = (open ? index : count - 1 - index) * STAGGER_MS;
        return <FanMenuAction key={item.key} open={open} angle={angle} radius={radius} delay={delay} item={item} />;
      })}
      <Pressable
        onPress={() => setOpen((v) => !v)}
        onPressIn={() => {
          pressed.value = withSpring(1, PRESS_SPRING);
        }}
        onPressOut={() => {
          pressed.value = withSpring(0, PRESS_SPRING);
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={open ? "Close menu" : "Open menu"}
        className="h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg min-h-12 min-w-12"
      >
        <Animated.View style={triggerStyle}>
          {triggerIcon ?? <Plus size={22} color={colors.primaryForeground} strokeWidth={2} />}
        </Animated.View>
      </Pressable>
    </View>
  );
}

function FanMenuAction({
  open,
  angle,
  radius,
  delay,
  item,
}: {
  open: boolean;
  angle: number;
  radius: number;
  delay: number;
  item: FanMenuItem;
}) {
  const rad = (angle * Math.PI) / 180;
  const targetX = Math.sin(rad) * radius;
  const targetY = -Math.cos(rad) * radius;
  const t = useSharedValue(open ? 1 : 0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(delay, withSpring(open ? 1 : 0, SPRING));
  }, [open, delay, t]);

  const style = useAnimatedStyle(() => {
    const p = t.value;
    return {
      opacity: interpolate(p, [0, 0.25, 1], [0, 0.4, 1], Extrapolation.CLAMP),
      transform: [
        { translateX: targetX * p },
        { translateY: targetY * p },
        { scale: interpolate(p, [0, 1], [0.4, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  const pressableStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 1.06], Extrapolation.CLAMP) }],
  }));

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(t.value, [0, 0.25, 0.45, 1], [0, 30, 35, 0], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View className="absolute bottom-7" pointerEvents={open ? "box-none" : "none"} style={style}>
      <AnimatedBlurView
        animatedProps={blurProps}
        tint="prominent"
        pointerEvents="none"
        className="absolute inset-0 overflow-hidden rounded-full"
      />
      <AnimatedPressable
        onPress={item.onPress}
        onPressIn={() => {
          pressed.value = withSpring(1, PRESS_SPRING);
        }}
        onPressOut={() => {
          pressed.value = withSpring(0, PRESS_SPRING);
        }}
        disabled={!open}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={item.label ?? item.key}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-full border border-border bg-card/90 shadow-md min-h-12 min-w-12",
          item.label ? "px-4 py-2" : "h-12 w-12"
        )}
        style={pressableStyle}
      >
        {item.icon}
        {item.label ? <Text className="text-sm font-medium text-foreground">{item.label}</Text> : null}
      </AnimatedPressable>
    </Animated.View>
  );
}
