import React, { useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate, runOnJS } from "react-native-reanimated";
import { ChevronRight, Check } from "lucide-react-native";
import { cn } from "@/lib/utils";

const THUMB = 48;
const PAD = 4;

export interface SlideToConfirmProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
  /** Fired once when the thumb reaches the end. Remount (key) to reset. */
  onConfirm: () => void;
}

export function SlideToConfirm({
  className, label = "Slide to confirm", confirmedLabel = "Confirmed",
  disabled, onConfirm, onLayout, ...props
}: SlideToConfirmProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const tx = useSharedValue(0);
  const end = Math.max(0, trackWidth - THUMB - PAD * 2);
  const dark = useColorScheme() === "dark";

  const confirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  const gesture = Gesture.Pan()
    .enabled(!disabled && !confirmed && end > 0)
    .onUpdate((e) => { tx.value = Math.max(0, Math.min(end, e.translationX)); })
    .onEnd(() => {
      if (tx.value >= end * 0.92) {
        tx.value = withTiming(end, { duration: 120 }, () => runOnJS(confirm)());
      } else {
        tx.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({ transform: [{ translateX: tx.value }] }));
  // The hint label fades out as the thumb travels across it.
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [0, end || 1], [1, 0]),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        className={cn("h-14 w-full justify-center rounded-full bg-secondary", disabled && "opacity-50", className)}
        onLayout={(e) => { setTrackWidth(e.nativeEvent.layout.width); onLayout?.(e); }}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={confirmed ? confirmedLabel : label}
        accessibilityState={{ disabled: !!disabled }}
        {...props}
      >
        <Animated.View style={labelStyle} className="absolute inset-0 items-center justify-center" pointerEvents="none">
          <Text className="text-sm font-medium text-muted-foreground">{label}</Text>
        </Animated.View>
        {confirmed && (
          <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
            <Text className="text-sm font-medium text-foreground">{confirmedLabel}</Text>
          </View>
        )}
        <Animated.View
          style={thumbStyle}
          className="ms-1 h-12 w-12 items-center justify-center rounded-full bg-primary"
        >
          {confirmed ? (
            <Check size={20} color={dark ? "#18181b" : "#fafafa"} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={22} color={dark ? "#18181b" : "#fafafa"} />
          )}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
