import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const ACTION_WIDTH = 80;

export interface SwipeableAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  color: string;
  textColor?: string;
  onPress: () => void;
}

export interface SwipeableListItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  leftActions?: SwipeableAction[];
  rightActions?: SwipeableAction[];
  onSwipeOpen?: (direction: "left" | "right") => void;
  enabled?: boolean;
  className?: string;
}

function ActionTray({ actions, side }: { actions: SwipeableAction[]; side: "left" | "right" }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        ...(side === "left" ? { left: 0 } : { right: 0 }),
        width: actions.length * ACTION_WIDTH,
        flexDirection: "row",
      }}
    >
      {actions.map((action) => (
        <Pressable
          key={action.key}
          onPress={action.onPress}
          className={cn("items-center justify-center", action.color)}
          style={{ width: ACTION_WIDTH }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          {action.icon}
          <Text className={cn("text-xs font-medium mt-1", action.textColor ?? "text-white")}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function SwipeableListItem({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeOpen,
  enabled = true,
  className,
  ...props
}: SwipeableListItemProps) {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const leftWidth = leftActions.length * ACTION_WIDTH;
  const rightWidth = rightActions.length * ACTION_WIDTH;

  const notifyOpen = useCallback(
    (dir: "left" | "right") => onSwipeOpen?.(dir),
    [onSwipeOpen]
  );

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .enabled(enabled)
    .onStart(() => { startX.value = translateX.value; })
    .onUpdate((e) => {
      translateX.value = Math.max(-rightWidth, Math.min(leftWidth, startX.value + e.translationX));
    })
    .onEnd((e) => {
      const x = translateX.value;
      if (x > 0 && leftWidth > 0) {
        const open = x > leftWidth * 0.5 || e.velocityX > 500;
        translateX.value = withSpring(open ? leftWidth : 0);
        if (open) runOnJS(notifyOpen)("left");
      } else if (x < 0 && rightWidth > 0) {
        const open = Math.abs(x) > rightWidth * 0.5 || e.velocityX < -500;
        translateX.value = withSpring(open ? -rightWidth : 0);
        if (open) runOnJS(notifyOpen)("right");
      } else {
        translateX.value = withSpring(0);
      }
    });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className={cn("overflow-hidden", className)} {...props}>
      {leftActions.length > 0 && <ActionTray actions={leftActions} side="left" />}
      {rightActions.length > 0 && <ActionTray actions={rightActions} side="right" />}
      <GestureDetector gesture={pan}>
        <Animated.View style={contentStyle} className="bg-white dark:bg-zinc-950">
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
