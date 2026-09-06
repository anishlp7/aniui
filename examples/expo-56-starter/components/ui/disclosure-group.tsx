import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Pressable, Text, View, useColorScheme, type LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { ChevronDown } from "lucide-react-native";
import { cn } from "@/lib/utils";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedChevron = Animated.createAnimatedComponent(ChevronDown);

const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const PRESS_SPRING = { mass: 0.6, stiffness: 260, damping: 18 } as const;

type Ctx = { open: Set<string>; toggle: (id: string) => void; type: "single" | "multiple" };
const DisclosureCtx = createContext<Ctx | null>(null);

export interface DisclosureGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  type?: "single" | "multiple";
  children?: React.ReactNode;
}

export function DisclosureGroup({ className, type = "single", children, ...props }: DisclosureGroupProps) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (type === "single") {
        next.clear();
        if (!prev.has(id)) next.add(id);
      } else if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <DisclosureCtx.Provider value={{ open, toggle, type }}>
      <View className={cn("rounded-xl border border-border overflow-hidden", className)} {...props}>
        {children}
      </View>
    </DisclosureCtx.Provider>
  );
}

export interface DisclosureItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  title: string;
  /** Opt-in frosted-glass layer that blurs the panel while it expands/collapses. */
  frosted?: boolean;
  children?: React.ReactNode;
}

export function DisclosureItem({ className, value, title, frosted = false, children, ...props }: DisclosureItemProps) {
  const ctx = useContext(DisclosureCtx);
  if (!ctx) throw new Error("DisclosureItem must be used within DisclosureGroup");
  const isOpen = ctx.open.has(value);
  const dark = useColorScheme() === "dark";

  const [contentHeight, setContentHeight] = useState(0);
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const blurIntensity = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 350, easing: EASING });
    rotation.value = withTiming(isOpen ? 180 : 0, { duration: 300, easing: EASING });
    if (frosted) blurIntensity.value = withTiming(isOpen ? 0 : 20, { duration: 300 });
  }, [isOpen, frosted]);

  const onContentLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setContentHeight(h);
  }, []);

  const panelStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, contentHeight], Extrapolation.CLAMP),
    opacity: progress.value,
  }));
  const chevronStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const blurProps = useAnimatedProps(() => ({ intensity: withSpring(blurIntensity.value) }));

  return (
    <View className={cn("border-b border-border last:border-b-0", className)} {...props}>
      <AnimatedPressable
        className="flex-row items-center justify-between px-4 py-4 min-h-12 min-w-12"
        style={pressStyle}
        onPress={() => ctx.toggle(value)}
        onPressIn={() => {
          scale.value = withSpring(0.98, PRESS_SPRING);
        }}
        onPressOut={() => {
          scale.value = withSpring(1, PRESS_SPRING);
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text className="text-base font-medium text-foreground flex-1">{title}</Text>
        <AnimatedChevron size={16} color={dark ? "#a1a1aa" : "#71717a"} strokeWidth={2} style={chevronStyle} />
      </AnimatedPressable>
      <Animated.View className="overflow-hidden" style={panelStyle}>
        <View className="px-4 pb-4" onLayout={onContentLayout}>
          {children}
        </View>
        {frosted && (
          <AnimatedBlurView
            tint={dark ? "dark" : "light"}
            animatedProps={blurProps}
            pointerEvents="none"
            className="absolute inset-0"
          />
        )}
      </Animated.View>
    </View>
  );
}
