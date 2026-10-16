import React, { useEffect, useRef } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const GAP = 8;
const MORPH_EASING = Easing.bezier(0.4, 0, 0.2, 1);

export type MorphTab = { key: string; label: string; icon?: React.ReactNode };

export interface MorphingTabBarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  tabs: MorphTab[];
  activeKey: string;
  onTabPress: (key: string) => void;
  /** Corner radius each tab morphs toward when it becomes (or borders) the active tab. */
  borderRadius?: number;
  animationDuration?: number;
}

/**
 * One corner-pair's animated radius for a single tab edge (left or right), driven by whether
 * this tab was/will be the active one, or merely sits beside the tab that was/will be active —
 * so the bar visually splits apart around the active tab instead of sliding a pill behind it.
 */
function morphRadius(
  progress: number,
  radius: number,
  willBeActive: boolean,
  wasActive: boolean,
  wasAdjacentToActive: boolean,
  willBeAdjacentToActive: boolean
) {
  "worklet";
  if (willBeActive) {
    const from = wasActive || wasAdjacentToActive ? radius : 0;
    return interpolate(progress, [0, 1], [from, radius], Extrapolation.CLAMP);
  }
  if (wasActive) {
    const to = willBeAdjacentToActive ? radius : 0;
    return interpolate(progress, [0, 1], [radius, to], Extrapolation.CLAMP);
  }
  const from = wasAdjacentToActive ? radius : 0;
  const to = willBeAdjacentToActive ? radius : 0;
  return from === to ? from : interpolate(progress, [0, 1], [from, to], Extrapolation.CLAMP);
}

export function MorphingTabBar({
  className,
  tabs,
  activeKey,
  onTabPress,
  borderRadius = 12,
  animationDuration = 300,
  ...props
}: MorphingTabBarProps) {
  const activeIndex = tabs.findIndex((t) => t.key === activeKey);
  const previousIndex = useSharedValue(activeIndex);
  const progress = useSharedValue(1);
  const lastKey = useRef(activeKey);

  useEffect(() => {
    if (lastKey.current === activeKey) return;
    const fromIndex = tabs.findIndex((t) => t.key === lastKey.current);
    previousIndex.value = fromIndex === -1 ? activeIndex : fromIndex;
    progress.value = 0;
    progress.value = withTiming(1, { duration: animationDuration, easing: MORPH_EASING });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    lastKey.current = activeKey;
  }, [activeKey, activeIndex, animationDuration, previousIndex, progress, tabs]);

  return (
    <View className={cn("flex-row", className)} accessibilityRole="tablist" {...props}>
      {tabs.map((tab, index) => (
        <MorphTabItem
          key={tab.key}
          tab={tab}
          index={index}
          isFirst={index === 0}
          isLast={index === tabs.length - 1}
          activeIndex={activeIndex}
          previousIndex={previousIndex}
          progress={progress}
          borderRadius={borderRadius}
          selected={tab.key === activeKey}
          onPress={() => onTabPress(tab.key)}
        />
      ))}
    </View>
  );
}

function MorphTabItem({
  tab,
  index,
  isFirst,
  isLast,
  activeIndex,
  previousIndex,
  progress,
  borderRadius,
  selected,
  onPress,
}: {
  tab: MorphTab;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  activeIndex: number;
  previousIndex: SharedValue<number>;
  progress: SharedValue<number>;
  borderRadius: number;
  selected: boolean;
  onPress: () => void;
}) {
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const prevIdx = previousIndex.value;
    const willBeActive = activeIndex === index;
    const wasActive = prevIdx === index;

    const left = morphRadius(p, borderRadius, willBeActive, wasActive, prevIdx === index - 1 || isFirst, activeIndex === index - 1 || isFirst);
    const right = morphRadius(p, borderRadius, willBeActive, wasActive, prevIdx === index + 1 || isLast, activeIndex === index + 1 || isLast);

    let marginHorizontal = 0;
    if (willBeActive && !wasActive) marginHorizontal = interpolate(p, [0, 1], [0, GAP]);
    else if (wasActive && !willBeActive) marginHorizontal = interpolate(p, [0, 1], [GAP, 0]);
    else if (willBeActive && wasActive) marginHorizontal = GAP;

    return {
      borderTopLeftRadius: left,
      borderBottomLeftRadius: left,
      borderTopRightRadius: right,
      borderBottomRightRadius: right,
      marginHorizontal,
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      className="min-h-12 min-w-12 flex-1 flex-row items-center justify-center gap-1.5 bg-muted px-3 py-2"
      style={style}
    >
      {tab.icon}
      <Text className={cn("text-sm font-medium", selected ? "text-foreground" : "text-muted-foreground")}>{tab.label}</Text>
    </AnimatedPressable>
  );
}
