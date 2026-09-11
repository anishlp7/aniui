import React, { useState } from "react";
import { FlatList, View, useWindowDimensions, type LayoutChangeEvent } from "react-native";
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

export interface VerticalPageCarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemHeight?: number;
  cardSpacing?: number;
  cardMargin?: number;
  scaleRange?: [number, number, number];
  opacityRange?: [number, number, number];
  showDots?: boolean;
  onIndexChange?: (index: number) => void;
}

/** Full-bleed, one-card-per-screen vertical pager — each page scales/fades in from its neighbors, with a haptic tick on release. */
export function VerticalPageCarousel({
  className,
  data,
  itemHeight: itemHeightProp,
  cardSpacing = 20,
  cardMargin = 20,
  scaleRange = [0.9, 1, 0.9],
  opacityRange = [0.5, 1, 0.5],
  showDots = true,
  onIndexChange,
  onLayout,
  ...props
}: VerticalPageCarouselProps) {
  const { height: windowHeight } = useWindowDimensions();
  // The centering padding below needs the carousel's own rendered height, not
  // the device's — assuming the full window (a natural assumption for a
  // full-screen pager) breaks the moment this is embedded in a smaller
  // container, over-padding the content and leaving every card off-center.
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const height = measuredHeight || windowHeight;
  const itemHeight = itemHeightProp ?? height * 0.7;
  const step = itemHeight + cardSpacing;
  const scrollY = useSharedValue(0);
  const [active, setActive] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== measuredHeight) setMeasuredHeight(h);
    onLayout?.(e);
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y / step;
    },
    onEndDrag: () => {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
    },
  });

  return (
    <View className={cn("flex-1", className)} onLayout={handleLayout} accessibilityRole="adjustable" {...props}>
      <AnimatedFlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={step}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: (height - itemHeight) / 2 - cardSpacing / 2 }}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.y / step);
          setActive(idx);
          onIndexChange?.(idx);
        }}
        renderItem={({ item, index }) => (
          <PageSlide index={index} scrollY={scrollY} itemHeight={itemHeight} cardSpacing={cardSpacing} cardMargin={cardMargin} scaleRange={scaleRange} opacityRange={opacityRange}>
            {item}
          </PageSlide>
        )}
        keyExtractor={(_, i) => String(i)}
      />
      {showDots && data.length > 1 && (
        <View className="absolute right-3 top-0 bottom-0 items-center justify-center gap-1.5">
          {data.map((_, i) => (
            <View key={i} className={cn("w-2 rounded-full", i === active ? "h-4 bg-primary" : "h-2 bg-muted-foreground/30")} />
          ))}
        </View>
      )}
    </View>
  );
}

function PageSlide({
  index,
  scrollY,
  itemHeight,
  cardSpacing,
  cardMargin,
  scaleRange,
  opacityRange,
  children,
}: {
  index: number;
  scrollY: SharedValue<number>;
  itemHeight: number;
  cardSpacing: number;
  cardMargin: number;
  scaleRange: [number, number, number];
  opacityRange: [number, number, number];
  children: React.ReactNode;
}) {
  const input = [index - 1, index, index + 1];

  const style = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, input, scaleRange, Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, input, opacityRange, Extrapolation.CLAMP);
    return { transform: [{ scale }], opacity };
  });

  return (
    <View style={{ height: itemHeight + cardSpacing, paddingHorizontal: cardMargin }} className="w-full items-center justify-center">
      <Animated.View style={[{ height: itemHeight }, style]} className="w-full overflow-hidden rounded-2xl bg-card">
        {children}
      </Animated.View>
    </View>
  );
}
