import React, { createContext, useContext, useState } from "react";
import { Pressable, Text, View, type LayoutChangeEvent } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withSpring } from "react-native-reanimated";
import { cn } from "@/lib/utils";

interface ChipContextValue {
  open: boolean;
  toggle: () => void;
  depth: number;
  parentOpen: boolean;
  triggerWidth: number;
  setTriggerWidth: (w: number) => void;
}

const ChipContext = createContext<ChipContextValue | null>(null);

export interface StackedChipsProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  className?: string;
}

/** Root of a nested/expandable chip menu — wrap another StackedChips inside Content to go deeper. */
export function StackedChips({ children, className, style, ...props }: StackedChipsProps) {
  const parent = useContext(ChipContext);
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const depth = parent ? parent.depth + 1 : 0;
  const parentOpen = parent ? parent.open : true;

  return (
    <ChipContext.Provider
      value={{ open, toggle: () => setOpen((o) => !o), depth, parentOpen, triggerWidth, setTriggerWidth }}
    >
      <View className={cn("flex-row", className)} style={[{ zIndex: 100 - depth }, style]} {...props}>
        {children}
      </View>
    </ChipContext.Provider>
  );
}

export interface StackedChipsTriggerProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export function StackedChipsTrigger({ children, className, onPress }: StackedChipsTriggerProps) {
  const ctx = useContext(ChipContext);
  if (!ctx) throw new Error("StackedChipsTrigger must be used within StackedChips");
  const { toggle, depth, parentOpen, setTriggerWidth, open } = ctx;

  const progress = useDerivedValue(() => withSpring(parentOpen ? 1 : 0));
  const revealStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.85, 1]) }],
  }));

  const handleLayout = (e: LayoutChangeEvent) => setTriggerWidth(e.nativeEvent.layout.width);

  return (
    <Animated.View style={depth > 0 ? revealStyle : undefined} onLayout={handleLayout}>
      <Pressable
        onPress={() => {
          toggle();
          onPress?.();
        }}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessible={true}
        className={cn("min-h-12 min-w-12 flex-row items-center justify-center rounded-full bg-secondary px-4", className)}
      >
        {typeof children === "string" ? <Text className="text-sm font-medium text-secondary-foreground">{children}</Text> : children}
      </Pressable>
    </Animated.View>
  );
}

export interface StackedChipsContentProps {
  children: React.ReactNode;
  className?: string;
}

/** The chips revealed beside a trigger once it's open. */
export function StackedChipsContent({ children, className }: StackedChipsContentProps) {
  const ctx = useContext(ChipContext);
  if (!ctx) throw new Error("StackedChipsContent must be used within StackedChips");
  const { open, triggerWidth, depth } = ctx;
  const [contentWidth, setContentWidth] = useState(0);

  const style = useAnimatedStyle(() => ({
    opacity: withSpring(open ? 1 : 0),
    transform: [{ translateX: withSpring(open ? 0 : -contentWidth + 60) }],
  }));

  return (
    <Animated.View
      onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
      pointerEvents={open ? "auto" : "none"}
      style={[{ position: "absolute", left: triggerWidth + 8, top: 0, zIndex: 99 - depth }, style]}
      className={cn("min-h-12 flex-row items-center justify-center gap-2 rounded-full bg-secondary/95 py-1 pl-3 pr-2", className)}
    >
      {children}
    </Animated.View>
  );
}
