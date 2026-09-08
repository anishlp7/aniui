import React from "react";
import { Platform, View, useColorScheme, type ScrollView } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const COMPACT_HEADER_HEIGHT = 44;

export interface AnimatedHeaderScrollViewProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ScrollView>, "onScroll"> {
  className?: string;
  /** Large title rendered inline at the top of the scroll content; shrinks into the compact header as the user scrolls. */
  title: string;
  subtitle?: string;
  /** Right-aligned actions pinned to the compact header (e.g. icon buttons). Stays interactive while the header background is decorative. */
  headerRight?: React.ReactNode;
  largeTitleClassName?: string;
  /** Scroll distance (px) over which the large title fully collapses into the compact header. */
  collapseDistance?: number;
  /** Max BlurView intensity once fully scrolled. iOS only — Android falls back to a plain translucent backdrop. */
  blurIntensity?: number;
  /** Space reserved above the header for the status bar/notch. Defaults to the
   * device's real safe-area inset — override (e.g. to 0) when this isn't
   * mounted at the actual top of the screen, such as inside a card or modal,
   * where the real inset would just add dead space. */
  topInset?: number;
}

/** iOS-style collapsing large-title ScrollView: a big inline title fades/slides
 * away while a compact header title (and a blur+translucent backdrop) fades in,
 * both driven off a single `scrollY` shared value via `useAnimatedScrollHandler`. */
export function AnimatedHeaderScrollView({
  className,
  title,
  subtitle,
  headerRight,
  largeTitleClassName,
  collapseDistance = 80,
  blurIntensity = 40,
  topInset: topInsetProp,
  children,
  contentContainerStyle,
  ...props
}: AnimatedHeaderScrollViewProps) {
  const insets = useSafeAreaInsets();
  const topInset = topInsetProp ?? insets.top;
  const dark = useColorScheme() === "dark";
  const scrollY = useSharedValue(0);
  const headerHeight = COMPACT_HEADER_HEIGHT + topInset;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerBgStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, collapseDistance], [0, 1], Extrapolation.CLAMP),
  }));
  const largeTitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, collapseDistance * 0.75], [1, 0], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(scrollY.value, [0, collapseDistance], [0, -10], Extrapolation.CLAMP) }],
  }));
  const compactTitleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [collapseDistance * 0.5, collapseDistance], [0, 1], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(scrollY.value, [collapseDistance * 0.5, collapseDistance], [8, 0], Extrapolation.CLAMP) },
    ],
  }));
  const blurProps = useAnimatedProps(() => ({
    intensity: interpolate(scrollY.value, [0, collapseDistance], [0, blurIntensity], Extrapolation.CLAMP),
  }));

  return (
    <View className={cn("flex-1 bg-background", className)}>
      <Animated.View pointerEvents="none" className="absolute left-0 right-0 top-0 z-10" style={[{ height: headerHeight }, headerBgStyle]}>
        <View className="absolute inset-0 bg-background/90" />
        {Platform.OS === "ios" && (
          <AnimatedBlurView tint={dark ? "dark" : "light"} animatedProps={blurProps} className="absolute inset-0" />
        )}
      </Animated.View>

      <View
        pointerEvents="box-none"
        className="absolute left-0 right-0 top-0 z-20 flex-row items-end justify-between gap-3 px-4 pb-2"
        style={{ height: headerHeight, paddingTop: topInset }}
      >
        <Animated.Text
          numberOfLines={1}
          accessibilityRole="header"
          className="flex-1 text-lg font-semibold text-foreground"
          style={compactTitleStyle}
        >
          {title}
        </Animated.Text>
        {headerRight && <View className="flex-row items-center gap-2">{headerRight}</View>}
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingTop: headerHeight + 8, paddingBottom: insets.bottom + 24 }, contentContainerStyle]}
        {...props}
      >
        <Animated.View className={cn("px-4 pb-2", largeTitleClassName)} style={largeTitleStyle}>
          <Animated.Text accessibilityRole="header" className="text-4xl font-extrabold tracking-tight text-foreground">
            {title}
          </Animated.Text>
          {subtitle && <Animated.Text className="mt-1 text-base text-muted-foreground">{subtitle}</Animated.Text>}
        </Animated.View>
        {children}
      </Animated.ScrollView>
    </View>
  );
}
