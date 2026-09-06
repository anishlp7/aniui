import React, { useState } from "react";
import { FlatList, Platform, View, useWindowDimensions } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<React.ReactNode>);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export interface CarouselCircularProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  spacing?: number;
  onIndexChange?: (index: number) => void;
}

export function CarouselCircular({
  className,
  data,
  itemWidth: itemWidthProp,
  spacing = 20,
  onIndexChange,
  ...props
}: CarouselCircularProps) {
  const { width } = useWindowDimensions();
  const itemWidth = itemWidthProp ?? width * 0.75;
  const sideSpacing = (width - itemWidth) / 2;
  const snap = itemWidth + spacing;
  const scrollX = useSharedValue(0);
  const [active, setActive] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
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
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / snap);
          setActive(idx);
          onIndexChange?.(idx);
        }}
        contentContainerStyle={{ paddingHorizontal: sideSpacing - spacing / 2, paddingVertical: 24 }}
        renderItem={({ item, index }) => (
          <CircularItem index={index} scrollX={scrollX} itemWidth={itemWidth} spacing={spacing}>
            {item}
          </CircularItem>
        )}
        keyExtractor={(_, i) => String(i)}
      />
    </View>
  );
}

function CircularItem({
  index,
  scrollX,
  itemWidth,
  spacing,
  children,
}: {
  index: number;
  scrollX: SharedValue<number>;
  itemWidth: number;
  spacing: number;
  children: React.ReactNode;
}) {
  const snap = itemWidth + spacing;
  const inputRange = [(index - 2) * snap, (index - 1) * snap, index * snap, (index + 1) * snap, (index + 2) * snap];

  const style = useAnimatedStyle(() => {
    const translateY = interpolate(scrollX.value, inputRange, [itemWidth / 4, itemWidth / 8, 0, itemWidth / 8, itemWidth / 4], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.5, 0.8, 1, 0.8, 0.5], Extrapolation.CLAMP);
    const scale = interpolate(scrollX.value, inputRange, [0.75, 0.85, 1, 0.85, 0.75], Extrapolation.CLAMP);
    const rotateZ = interpolate(scrollX.value, inputRange, [40, 20, 0, -20, -40], Extrapolation.CLAMP);
    return { opacity, transform: [{ translateY }, { scale }, { rotateZ: `${rotateZ}deg` }] };
  });

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(scrollX.value, inputRange, [80, 40, 0, 40, 80], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[{ width: itemWidth, marginHorizontal: spacing / 2 }, style]} className="items-center justify-center">
      <View className="w-full overflow-hidden rounded-2xl bg-card">
        {children}
        {Platform.OS === "ios" && (
          <AnimatedBlurView animatedProps={blurProps} tint="prominent" pointerEvents="none" className="absolute inset-0 rounded-2xl" />
        )}
      </View>
    </Animated.View>
  );
}
