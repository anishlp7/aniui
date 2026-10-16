import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

export interface CarouselScaleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  spacing?: number;
  scaleRange?: [number, number, number];
  rotationRange?: [number, number, number];
  showDots?: boolean;
}

export function CarouselScale({
  className,
  data,
  itemWidth: itemWidthProp,
  spacing = 12,
  scaleRange = [1.6, 1, 1.6],
  rotationRange = [15, 0, -10],
  showDots = true,
  ...props
}: CarouselScaleProps) {
  const { width } = useWindowDimensions();
  const itemWidth = itemWidthProp ?? width * 0.62;
  const snap = itemWidth + spacing;
  const scrollX = useSharedValue(0);
  const [active, setActive] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onEndDrag: () => {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Rigid);
    },
  });

  return (
    <View className={cn("", className)} accessibilityRole="adjustable" {...props}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snap}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - itemWidth) / 2, gap: spacing }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / snap))}
      >
        {data.map((item, index) => (
          <ScaleSlide key={index} index={index} scrollX={scrollX} snap={snap} width={itemWidth} scaleRange={scaleRange} rotationRange={rotationRange}>
            {item}
          </ScaleSlide>
        ))}
      </Animated.ScrollView>
      {showDots && data.length > 1 && (
        <View className="mt-3 flex-row items-center justify-center gap-1.5">
          {data.map((_, i) => (
            <View key={i} className={cn("h-2 rounded-full", i === active ? "w-4 bg-primary" : "w-2 bg-muted-foreground/30")} />
          ))}
        </View>
      )}
    </View>
  );
}

function ScaleSlide({
  index,
  scrollX,
  snap,
  width,
  scaleRange,
  rotationRange,
  children,
}: {
  index: number;
  scrollX: SharedValue<number>;
  snap: number;
  width: number;
  scaleRange: [number, number, number];
  rotationRange: [number, number, number];
  children: React.ReactNode;
}) {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * snap, index * snap, (index + 1) * snap];
    const scale = interpolate(scrollX.value, input, scaleRange, Extrapolation.CLAMP);
    const rotate = interpolate(scrollX.value, input, rotationRange, Extrapolation.CLAMP);
    return { transform: [{ scale }, { rotate: `${rotate}deg` }] };
  });
  return (
    <Animated.View style={[{ width }, style]} className="overflow-hidden rounded-2xl">
      {children}
    </Animated.View>
  );
}
