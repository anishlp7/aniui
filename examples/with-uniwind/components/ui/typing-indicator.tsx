import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

function Dot({ delay }: { delay: number }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(withSequence(withTiming(-4, { duration: 300 }), withTiming(0, { duration: 300 })), -1)
    );
  }, [delay, translateY]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return <Animated.View style={style} className="h-2 w-2 rounded-full bg-muted-foreground" />;
}

export interface TypingIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

export function TypingIndicator({ className, ...props }: TypingIndicatorProps) {
  return (
    <View
      className={cn("flex-row items-center gap-1 px-4 py-2.5 rounded-2xl bg-secondary self-start rounded-bl-sm", className)}
      accessibilityLabel="Typing"
      {...props}
    >
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
}
