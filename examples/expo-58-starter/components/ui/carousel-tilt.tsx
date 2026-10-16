import React, { useState } from "react";
import { Platform, View, useWindowDimensions } from "react-native";
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

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export interface CarouselTiltProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  itemHeight?: number;
  spacing?: number;
  rotationAngle?: number;
  translateYValue?: number;
  useBlur?: boolean;
  showDots?: boolean;
}

export function CarouselTilt({
  className,
  data,
  itemWidth: itemWidthProp,
  itemHeight = 320,
  spacing = 14,
  rotationAngle = 20,
  translateYValue = 60,
  useBlur = false,
  showDots = true,
  ...props
}: CarouselTiltProps) {
  const { width } = useWindowDimensions();
  const itemWidth = itemWidthProp ?? width * 0.65;
  const fullWidth = itemWidth + spacing * 2;
  const scrollX = useSharedValue(0);
  const [active, setActive] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View className={cn("", className)} accessibilityRole="adjustable" {...props}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={fullWidth}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - fullWidth) / 2, paddingVertical: 40 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / fullWidth))}
      >
        {data.map((item, index) => (
          <TiltSlide
            key={index}
            index={index}
            scrollX={scrollX}
            fullWidth={fullWidth}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            spacing={spacing}
            rotationAngle={rotationAngle}
            translateYValue={translateYValue}
            useBlur={useBlur}
          >
            {item}
          </TiltSlide>
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

function TiltSlide({
  index,
  scrollX,
  fullWidth,
  itemWidth,
  itemHeight,
  spacing,
  rotationAngle,
  translateYValue,
  useBlur,
  children,
}: {
  index: number;
  scrollX: SharedValue<number>;
  fullWidth: number;
  itemWidth: number;
  itemHeight: number;
  spacing: number;
  rotationAngle: number;
  translateYValue: number;
  useBlur: boolean;
  children: React.ReactNode;
}) {
  const inputRange = [(index - 1) * fullWidth, index * fullWidth, (index + 1) * fullWidth];

  const style = useAnimatedStyle(() => {
    const rotateZ = interpolate(scrollX.value, inputRange, [rotationAngle, 0, -rotationAngle], Extrapolation.CLAMP);
    const translateY = interpolate(scrollX.value, inputRange, [translateYValue, 0, translateYValue], Extrapolation.CLAMP);
    return {
      transformOrigin: Platform.OS === "android" ? (`${itemWidth / 2}px ${itemHeight}px` as unknown as string) : "bottom",
      transform: [{ rotateZ: `${rotateZ}deg` }, { translateY }],
    };
  });

  const blurStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 0.35) * fullWidth, index * fullWidth, (index + 0.35) * fullWidth],
      [1, 0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(scrollX.value, inputRange, [25, 0, 25], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View
      style={[{ width: itemWidth, height: itemHeight, marginHorizontal: spacing }, style]}
      className="overflow-hidden rounded-xl"
    >
      {children}
      {useBlur && (
        <AnimatedBlurView
          pointerEvents="none"
          animatedProps={blurProps}
          tint="regular"
          style={blurStyle}
          className="absolute inset-0"
        />
      )}
    </Animated.View>
  );
}
