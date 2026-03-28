import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  content: string;
  side?: "top" | "bottom";
  children: React.ReactNode;
}

export function Tooltip({ content, side = "top", className, children, ...props }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View className={cn("relative", className)} {...props}>
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
        onLongPress={() => setVisible(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint={content}
      >
        <View pointerEvents="none">
          {children}
        </View>
      </Pressable>
      {visible && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          className={cn(
            "absolute left-1/2 z-50 -translate-x-1/2 rounded-md bg-primary px-3 py-1.5",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2"
          )}
          pointerEvents="none"
        >
          <Text className="text-xs text-primary-foreground text-center">{content}</Text>
        </Animated.View>
      )}
    </View>
  );
}
