import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  Text,
  View,
  useColorScheme,
  type LayoutChangeEvent,
} from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

/**
 * A vertical list whose items are projected onto a curved arc (dial/wheel
 * picker), scaling and fading by distance from the focused center, snapping
 * to the nearest item on release with a haptic tick.
 */

export type ArcListSide = "left" | "right";

const DEFAULT_ITEM_HEIGHT = 56;
const DEFAULT_SWEEP = 40;
const MIN_SWEEP = 1;
const MAX_SWEEP = 80;
const MIN_RADIUS = 1;
const HORIZON = Math.PI / 2;
const DEFAULT_MIN_OPACITY = 0.3;
const DEFAULT_MIN_SCALE = 0.82;
const PLATEAU_FRACTION = 0.45;
const PLATEAU_SCALE = 0.98;
const PROXIMITY_SPAN = 1;
const CENTER_Z = 1000;
const Z_BAND_LIMIT = 3;
const UNKNOWN_INDEX = -1;
const LABEL_COLOR = "#71717a";
const LABEL_COLOR_DARK = "#a1a1aa";
const ACTIVE_LABEL_COLOR = "#18181b";
const ACTIVE_LABEL_COLOR_DARK = "#fafafa";

function radiusFromSweep(halfHeight: number, sweepDeg: number): number {
  "worklet";
  const clamped = Math.min(Math.max(sweepDeg, MIN_SWEEP), MAX_SWEEP);
  const rad = (clamped * Math.PI) / 180;
  return Math.max(halfHeight / Math.sin(rad), MIN_RADIUS);
}

function offsetForIndex(index: number, itemHeight: number): number {
  "worklet";
  return index * itemHeight;
}

function signedOffset(
  index: number,
  itemHeight: number,
  scrollY: number,
): number {
  "worklet";
  return index * itemHeight - scrollY;
}

function arcPlacement(offset: number, radius: number, direction: 1 | -1) {
  "worklet";
  const r = Math.max(radius, MIN_RADIUS);
  const theta = Math.max(-HORIZON, Math.min(HORIZON, offset / r));
  const arcY = r * Math.sin(theta);
  return {
    bulge: r * (1 - Math.cos(theta)) * direction,
    lift: arcY - offset,
    tilt: (-theta * 180 * direction) / Math.PI,
    distance: Math.abs(arcY),
    onArc: Math.abs(offset / r) < HORIZON,
  };
}

function nearestIndex(
  scrollY: number,
  itemHeight: number,
  count: number,
): number {
  "worklet";
  if (count <= 0) return 0;
  return Math.max(0, Math.min(count - 1, Math.round(scrollY / itemHeight)));
}

interface ArcListContextValue {
  scrollY: SharedValue<number>;
  count: SharedValue<number>;
  itemHeight: number;
  radius: number;
  halfHeight: number;
  direction: 1 | -1;
  minOpacity: number;
  minScale: number;
  scrollToIndex: (index: number, animated?: boolean) => void;
}

interface ArcListItemContextValue {
  index: number;
  proximity: SharedValue<number>;
}

const ArcListContext = createContext<ArcListContextValue | null>(null);
const ArcListItemContext = createContext<ArcListItemContextValue | null>(
  null,
);
const ArcListIndexContext = createContext<number | null>(null);

export interface ArcListProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  itemHeight?: number;
  height?: number;
  sweep?: number;
  radius?: number;
  side?: ArcListSide;
  snap?: boolean;
  value?: number;
  defaultValue?: number;
  onValueChange?: (index: number) => void;
  minOpacity?: number;
  minScale?: number;
  haptics?: boolean;
  className?: string;
}

/** Scrollable arc/dial container. Children are `ArcListItem`s — index is auto-assigned by position. */
export function ArcList({
  children,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  height,
  sweep = DEFAULT_SWEEP,
  radius: radiusProp,
  side = "left",
  snap = true,
  value,
  defaultValue = 0,
  onValueChange,
  minOpacity = DEFAULT_MIN_OPACITY,
  minScale = DEFAULT_MIN_SCALE,
  haptics = true,
  className,
  style,
  ...props
}: ArcListProps) {
  const initialIndex = value ?? defaultValue;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(offsetForIndex(initialIndex, itemHeight));
  const count = useSharedValue(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const didRestore = useRef(false);

  const viewportHeight = height ?? measuredHeight;
  const halfHeight = viewportHeight / 2;
  const radius = radiusProp ?? radiusFromSweep(halfHeight, sweep);
  const direction: 1 | -1 = side === "right" ? -1 : 1;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (height !== undefined) return;
      setMeasuredHeight(e.nativeEvent.layout.height);
    },
    [height],
  );

  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      scrollRef.current?.scrollTo({
        y: offsetForIndex(index, itemHeight),
        animated,
      });
    },
    [itemHeight, scrollRef],
  );

  const handleFocus = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onValueChange?.(index);
      if (haptics) Haptics.selectionAsync();
    },
    [onValueChange, haptics],
  );

  useAnimatedReaction(
    () =>
      count.value > 0
        ? nearestIndex(scrollY.value, itemHeight, count.value)
        : UNKNOWN_INDEX,
    (current, previous) => {
      if (previous === null || previous === UNKNOWN_INDEX) return;
      if (current === UNKNOWN_INDEX || current === previous) return;
      runOnJS(handleFocus)(current);
    },
    [itemHeight, handleFocus],
  );

  useEffect(() => {
    if (value === undefined || value === activeIndex) return;
    scrollToIndex(value);
  }, [value, activeIndex, scrollToIndex]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const total = React.Children.count(children);
  useEffect(() => {
    count.value = total;
  }, [total, count]);

  const handleContentSizeChange = useCallback(() => {
    if (didRestore.current) return;
    didRestore.current = true;
    if (initialIndex <= 0) return;
    scrollRef.current?.scrollTo({
      y: offsetForIndex(initialIndex, itemHeight),
      animated: false,
    });
  }, [initialIndex, itemHeight, scrollRef]);

  const contentPadding = Math.max(halfHeight - itemHeight / 2, 0);

  const rows = React.Children.map(children, (child, index) => (
    <ArcListIndexContext.Provider key={index} value={index}>
      {child}
    </ArcListIndexContext.Provider>
  ));

  const contextValue = useMemo<ArcListContextValue>(
    () => ({
      scrollY,
      count,
      itemHeight,
      radius,
      halfHeight,
      direction,
      minOpacity,
      minScale,
      scrollToIndex,
    }),
    [
      scrollY,
      count,
      itemHeight,
      radius,
      halfHeight,
      direction,
      minOpacity,
      minScale,
      scrollToIndex,
    ],
  );

  return (
    <View
      className={cn("overflow-hidden", className)}
      style={[{ height }, style]}
      onLayout={handleLayout}
      accessibilityRole="adjustable"
      {...props}
    >
      {viewportHeight > 0 ? (
        <ArcListContext.Provider value={contextValue}>
          <Animated.ScrollView
            ref={scrollRef}
            onScroll={scrollHandler}
            onContentSizeChange={handleContentSizeChange}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            snapToInterval={snap ? itemHeight : undefined}
            decelerationRate={snap ? "fast" : "normal"}
            contentContainerStyle={{ paddingVertical: contentPadding }}
          >
            {rows}
          </Animated.ScrollView>
        </ArcListContext.Provider>
      ) : null}
    </View>
  );
}

export interface ArcListItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "onPress"> {
  onPress?: (index: number) => void;
  className?: string;
}

/** A single arc-projected, snap-to row. Wrap label/indicator content as children. */
export function ArcListItem({
  children,
  disabled = false,
  onPress,
  className,
  style,
  ...props
}: ArcListItemProps) {
  const ctx = useContext(ArcListContext);
  if (!ctx) {
    throw new Error("ArcListItem must be rendered inside an ArcList");
  }
  const injectedIndex = useContext(ArcListIndexContext);
  const index = injectedIndex ?? 0;

  const rItem = useAnimatedStyle(() => {
    const offset = signedOffset(index, ctx.itemHeight, ctx.scrollY.value);
    const placement = arcPlacement(offset, ctx.radius, ctx.direction);
    const plateau = ctx.halfHeight * PLATEAU_FRACTION;
    const opacity = placement.onArc
      ? interpolate(
          placement.distance,
          [0, plateau, ctx.halfHeight],
          [1, 1, ctx.minOpacity],
          Extrapolation.CLAMP,
        )
      : 0;
    const scale = interpolate(
      placement.distance,
      [0, plateau, ctx.halfHeight],
      [1, PLATEAU_SCALE, ctx.minScale],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      zIndex:
        CENTER_Z -
        Math.min(Math.round(placement.distance / ctx.itemHeight), Z_BAND_LIMIT),
      transform: [
        { translateX: placement.bulge },
        { translateY: placement.lift },
        { rotate: `${placement.tilt}deg` },
        { scale },
      ],
    };
  }, [index, ctx]);

  const proximity = useDerivedValue(() => {
    const offset = signedOffset(index, ctx.itemHeight, ctx.scrollY.value);
    return interpolate(
      Math.abs(offset),
      [0, ctx.itemHeight * PROXIMITY_SPAN],
      [1, 0],
      Extrapolation.CLAMP,
    );
  }, [index, ctx]);

  const itemContextValue = useMemo<ArcListItemContextValue>(
    () => ({ index, proximity }),
    [index, proximity],
  );

  const handlePress = useCallback(() => {
    ctx.scrollToIndex(index);
    onPress?.(index);
  }, [ctx, index, onPress]);

  return (
    <ArcListItemContext.Provider value={itemContextValue}>
      <Animated.View
        style={[{ height: ctx.itemHeight, justifyContent: "center" }, rItem]}
        className={ctx.direction === -1 ? "items-end" : "items-start"}
      >
        <Pressable
          onPress={handlePress}
          disabled={disabled}
          accessible={true}
          accessibilityRole="button"
          className={cn(
            "min-h-12 min-w-12 flex-1 flex-row items-center justify-center gap-2 px-3",
            className,
          )}
          style={style}
          {...props}
        >
          {children}
        </Pressable>
      </Animated.View>
    </ArcListItemContext.Provider>
  );
}

export interface ArcListLabelProps
  extends React.ComponentPropsWithoutRef<typeof Text> {
  activeColor?: string;
  className?: string;
}

/** Convenience label whose color tints toward `activeColor` as its `ArcListItem` nears the center. */
export function ArcListLabel({
  children,
  activeColor,
  className,
  style,
  numberOfLines = 1,
  ...props
}: ArcListLabelProps) {
  const itemCtx = useContext(ArcListItemContext);
  if (!itemCtx) {
    throw new Error("ArcListLabel must be rendered inside an ArcListItem");
  }
  const scheme = useColorScheme();
  const color = scheme === "dark" ? LABEL_COLOR_DARK : LABEL_COLOR;
  const tint =
    activeColor ??
    (scheme === "dark" ? ACTIVE_LABEL_COLOR_DARK : ACTIVE_LABEL_COLOR);

  const rLabel = useAnimatedStyle(
    () => ({
      color: interpolateColor(itemCtx.proximity.value, [0, 1], [color, tint]),
    }),
    [color, tint],
  );

  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[rLabel, style]}
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </Animated.Text>
  );
}
