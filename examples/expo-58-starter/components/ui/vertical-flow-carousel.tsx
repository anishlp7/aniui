import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

// Extra space after the last card so it can still scroll all the way to the
// centered/focused position instead of stopping short once content runs out.
const END_SPACER = 400;

export interface VerticalFlowCarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemHeight?: number;
  spacing?: number;
  rotationAngle?: number;
  scaleInactive?: number;
  opacityInactive?: number;
  showBlur?: boolean;
  blurIntensity?: number;
  snapEnabled?: boolean;
  onIndexChange?: (index: number) => void;
}

export function VerticalFlowCarousel({
  className,
  data,
  itemHeight = 120,
  spacing = 50,
  rotationAngle = 12,
  scaleInactive = 0.85,
  opacityInactive = 0.5,
  showBlur = true,
  blurIntensity = 16,
  snapEnabled = true,
  onIndexChange,
  ...props
}: VerticalFlowCarouselProps) {
  const step = itemHeight + spacing;
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View className={cn("flex-1", className)} accessibilityRole="adjustable" {...props}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={snapEnabled ? step : undefined}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => onIndexChange?.(Math.round(e.nativeEvent.contentOffset.y / step))}
      >
        {data.map((item, index) => (
          <FlowItem
            key={index}
            index={index}
            count={data.length}
            scrollY={scrollY}
            itemHeight={itemHeight}
            spacing={spacing}
            rotationAngle={rotationAngle}
            scaleInactive={scaleInactive}
            opacityInactive={opacityInactive}
            showBlur={showBlur}
            blurIntensity={blurIntensity}
          >
            {item}
          </FlowItem>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

function FlowItem({
  index,
  count,
  scrollY,
  itemHeight,
  spacing,
  rotationAngle,
  scaleInactive,
  opacityInactive,
  showBlur,
  blurIntensity,
  children,
}: {
  index: number;
  count: number;
  scrollY: SharedValue<number>;
  itemHeight: number;
  spacing: number;
  rotationAngle: number;
  scaleInactive: number;
  opacityInactive: number;
  showBlur: boolean;
  blurIntensity: number;
  children: React.ReactNode;
}) {
  const step = itemHeight + spacing;
  const inputRange = [(index - 1) * step, index * step, (index + 1) * step];

  const style = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, inputRange, [scaleInactive, 1, scaleInactive], Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, inputRange, [opacityInactive, 1, opacityInactive], Extrapolation.CLAMP);
    const rotateZ = interpolate(scrollY.value, inputRange, [rotationAngle, 0, -rotationAngle], Extrapolation.CLAMP);
    return { opacity, transform: [{ perspective: 1000 }, { scale }, { rotateZ: `${rotateZ}deg` }] };
  });

  const blurStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, inputRange, [1, 0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[{ width: "100%" }, style, { marginBottom: index === count - 1 ? END_SPACER : spacing }]}>
      <View className="w-full overflow-hidden">
        {children}
        {showBlur && (
          <Animated.View pointerEvents="none" className="absolute inset-0 overflow-hidden" style={blurStyle}>
            <BlurView intensity={blurIntensity} tint="dark" className="absolute inset-0" />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}
