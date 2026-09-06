import React, { useEffect, useRef, useState } from "react";
import { View, Pressable, Text, Keyboard, useWindowDimensions, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, type SharedValue } from "react-native-reanimated";
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { cn } from "@/lib/utils";

export type CurvedTab = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
};

export interface CurvedBottomTabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  tabs: CurvedTab[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  hideOnKeyboard?: boolean;
  gradientColors?: readonly [string, string];
}

const BAR_HEIGHT = 80;
const NOTCH_HALF = 40;
const FLOAT_SIZE = 56;
const FLOAT_LIFT = 26;
const CURVE_SPRING = { damping: 12, stiffness: 120, mass: 0.5 };
const LIFT_SPRING = { damping: 10, stiffness: 100, mass: 0.5 };

// Renders the badge count the same way reacticx's curved-bottom-tabs does:
// hidden for 0/undefined, capped display at "99+" once the value exceeds 99.
function formatBadge(badge?: number): string | null {
  if (badge === undefined || badge <= 0) return null;
  return badge > 99 ? "99+" : String(badge);
}

export function CurvedBottomTabs({
  className,
  tabs,
  activeIndex,
  onTabPress,
  hideOnKeyboard = false,
  gradientColors,
  ...props
}: CurvedBottomTabsProps) {
  const { width } = useWindowDimensions();
  const dark = useColorScheme() === "dark";
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const tabWidth = width / tabs.length;
  // The bar is rendered 3x screen-width with a single fixed notch at its own
  // midpoint, then clipped to `width` and slid horizontally via translateX so
  // the notch appears to travel to whichever tab is active (reacticx's
  // "wide strip + overflow:hidden" technique, rewritten here in our own path
  // math and NativeWind layout instead of its cubic-bezier/StyleSheet version).
  const patternWidth = width * 3;
  const patternMid = patternWidth / 2;
  const targetFor = (index: number) => index * tabWidth + tabWidth / 2 - patternMid;

  const curveX = useSharedValue(targetFor(activeIndex));
  // One shared value per tab so the outgoing tab can ease back down while the
  // incoming one rises, mirroring reacticx's per-tab floatingAnimations array.
  // Relies on `tabs.length` staying stable across renders (as reacticx's does).
  const lifts = useRef(tabs.map((_, i) => useSharedValue(i === activeIndex ? -FLOAT_LIFT : 0))).current;

  useEffect(() => {
    curveX.value = withSpring(targetFor(activeIndex), CURVE_SPRING);
    lifts.forEach((lift, i) => {
      lift.value = withSpring(i === activeIndex ? -FLOAT_LIFT : 0, LIFT_SPRING);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, tabWidth]);

  useEffect(() => {
    if (!hideOnKeyboard) return;
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [hideOnKeyboard]);

  const curveStyle = useAnimatedStyle(() => ({ transform: [{ translateX: curveX.value }] }));

  if (hideOnKeyboard && keyboardVisible) return null;

  const barGradient = gradientColors ?? (dark ? (["#18181b", "#27272a"] as const) : (["#ffffff", "#f4f4f5"] as const));
  const floatGradient = dark ? (["#fafafa", "#d4d4d8"] as const) : (["#18181b", "#3f3f46"] as const);

  const notchPath = `M0,0 L${patternMid - NOTCH_HALF},0 Q${patternMid - 14},0 ${patternMid},32 Q${patternMid + 14},0 ${patternMid + NOTCH_HALF},0 L${patternWidth},0 L${patternWidth},${BAR_HEIGHT} L0,${BAR_HEIGHT} Z`;

  return (
    <View className={cn("relative", className)} style={{ height: BAR_HEIGHT }} accessibilityRole="tablist" {...props}>
      <View className="absolute bottom-0 left-0 overflow-hidden" style={{ width, height: BAR_HEIGHT }}>
        <Animated.View style={[{ width: patternWidth, height: BAR_HEIGHT }, curveStyle]}>
          <Svg width={patternWidth} height={BAR_HEIGHT}>
            <Defs>
              <LinearGradient id="curvedTabsBarFill" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={barGradient[0]} />
                <Stop offset="1" stopColor={barGradient[1]} />
              </LinearGradient>
            </Defs>
            <Path d={notchPath} fill="url(#curvedTabsBarFill)" />
          </Svg>
        </Animated.View>
      </View>
      <View className="flex-row" style={{ height: BAR_HEIGHT }}>
        {tabs.map((tab, index) => (
          <TabButton
            key={tab.key}
            tab={tab}
            active={index === activeIndex}
            lift={lifts[index]}
            gradient={floatGradient}
            onPress={() => onTabPress(index)}
          />
        ))}
      </View>
    </View>
  );
}

function TabButton({
  tab,
  active,
  lift,
  gradient,
  onPress,
}: {
  tab: CurvedTab;
  active: boolean;
  lift: SharedValue<number>;
  gradient: readonly [string, string];
  onPress: () => void;
}) {
  const liftStyle = useAnimatedStyle(() => ({ transform: [{ translateY: lift.value }] }));
  const badgeLabel = formatBadge(tab.badge);
  const gradientId = `curvedTabsFloat-${tab.key}`;

  return (
    <Animated.View style={[{ flex: 1 }, liftStyle]}>
      <Pressable
        onPress={onPress}
        accessible={true}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        className="min-h-12 min-w-12 flex-1 items-center justify-center gap-1"
      >
        {active ? (
          <View className="items-center justify-center" style={{ width: FLOAT_SIZE, height: FLOAT_SIZE }}>
            <Svg width={FLOAT_SIZE} height={FLOAT_SIZE}>
              <Defs>
                <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor={gradient[0]} />
                  <Stop offset="1" stopColor={gradient[1]} />
                </LinearGradient>
              </Defs>
              <Circle cx={FLOAT_SIZE / 2} cy={FLOAT_SIZE / 2} r={FLOAT_SIZE / 2} fill={`url(#${gradientId})`} />
            </Svg>
            <View className="absolute inset-0 items-center justify-center">{tab.icon}</View>
            {badgeLabel && (
              <View className="absolute -top-1 -right-2 min-w-5 h-5 items-center justify-center rounded-full bg-destructive px-1">
                <Text className="text-[10px] font-bold text-destructive-foreground">{badgeLabel}</Text>
              </View>
            )}
          </View>
        ) : (
          <>
            <View className="items-center justify-center">
              {tab.icon}
              {badgeLabel && (
                <View className="absolute -top-1 -right-2 min-w-5 h-5 items-center justify-center rounded-full bg-destructive px-1">
                  <Text className="text-[10px] font-bold text-destructive-foreground">{badgeLabel}</Text>
                </View>
              )}
            </View>
            <Text className="text-[10px] text-muted-foreground">{tab.label}</Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}
