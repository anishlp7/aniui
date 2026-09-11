import React, { useState } from "react";
import { View, FlatList, useWindowDimensions } from "react-native";
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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<React.ReactNode>);

export interface CarouselParallaxProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  spacing?: number;
  parallaxIntensity?: number;
  showDots?: boolean;
}

export function CarouselParallax({
  className,
  data,
  itemWidth: itemWidthProp,
  spacing = 16,
  parallaxIntensity = 0.7,
  showDots = true,
  ...props
}: CarouselParallaxProps) {
  const { width } = useWindowDimensions();
  const itemWidth = itemWidthProp ?? width * 0.78;
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
      <AnimatedFlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snap}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - itemWidth) / 2, gap: spacing }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / snap))}
        renderItem={({ item, index }) => (
          <ParallaxSlide index={index} scrollX={scrollX} width={itemWidth} intensity={parallaxIntensity}>
            {item}
          </ParallaxSlide>
        )}
        keyExtractor={(_, i) => String(i)}
      />
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

function ParallaxSlide({
  index,
  scrollX,
  width,
  intensity,
  children,
}: {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
  intensity: number;
  children: React.ReactNode;
}) {
  const offset = index * width;
  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [offset - width, offset, offset + width],
      [-width * intensity, 0, width * intensity],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateX }] };
  });

  return (
    <View style={{ width }} className="overflow-hidden rounded-xl">
      <Animated.View style={[{ width }, style]}>{children}</Animated.View>
    </View>
  );
}
