import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Text, View, type LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector, type PanGesture } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

const DEFAULT_SPRING: WithSpringConfig = { damping: 12, stiffness: 150, mass: 0.5 };
const HANDLE_HIT_SLOP = 12;
const SNAP_BIAS = 20;

function clamp(value: number, min: number, max: number): number {
  "worklet";
  return Math.min(Math.max(value, min), max);
}

/**
 * Pick the snap point for a settled drag. A fast fling jumps to the next
 * point in the fling direction; a slow release lands on the nearest point.
 */
function resolveSnapTarget(
  current: number,
  velocity: number,
  snapPoints: readonly number[],
  threshold: number
): number {
  "worklet";
  if (Math.abs(velocity) > threshold) {
    if (velocity > 0) {
      for (let i = 0; i < snapPoints.length; i++) {
        if (snapPoints[i] > current + SNAP_BIAS) return snapPoints[i];
      }
      return snapPoints[snapPoints.length - 1];
    }
    for (let i = snapPoints.length - 1; i >= 0; i--) {
      if (snapPoints[i] < current - SNAP_BIAS) return snapPoints[i];
    }
    return snapPoints[0];
  }
  let best = snapPoints[0];
  let bestDistance = Math.abs(snapPoints[0] - current);
  for (let i = 1; i < snapPoints.length; i++) {
    const distance = Math.abs(snapPoints[i] - current);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = snapPoints[i];
    }
  }
  return best;
}

interface SplitViewContextValue {
  topHeight: SharedValue<number>;
  handleScale: SharedValue<number>;
  gap: number;
  minTop: number;
  maxTop: number;
  gesture: PanGesture;
}

const SplitViewContext = createContext<SplitViewContextValue | null>(null);

function useSplitView(component: string) {
  const ctx = useContext(SplitViewContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <SplitView>.`);
  return ctx;
}

export interface SplitViewProps {
  children: React.ReactNode;
  className?: string;
  initialTopHeight?: number;
  minTopHeight?: number;
  minBottomHeight?: number;
  maxTopHeight?: number;
  gap?: number;
  snapPoints?: number[];
  velocityThreshold?: number;
  springConfig?: WithSpringConfig;
  onHeightChange?: (height: number) => void;
}

/**
 * Draggable, resizable top/bottom split pane. The handle's pan gesture drives
 * the top pane's height directly while dragging, then projects the release
 * velocity forward to decide which snap point (nearest for a slow release,
 * next-in-direction for a fast flick) to spring to — same technique as a
 * bottom sheet's detents, applied to an in-page divider instead of a modal.
 */
export function SplitView({
  children,
  className,
  initialTopHeight = 300,
  minTopHeight = 80,
  minBottomHeight = 80,
  maxTopHeight,
  gap = 28,
  snapPoints,
  velocityThreshold = 500,
  springConfig = DEFAULT_SPRING,
  onHeightChange,
}: SplitViewProps) {
  const [containerHeight, setContainerHeight] = useState(0);

  const topHeight = useSharedValue(initialTopHeight);
  const startY = useSharedValue(0);
  const handleScale = useSharedValue(1);

  const minTop = minTopHeight;
  const maxTop =
    maxTopHeight ?? Math.max(minTop + 1, containerHeight - gap - minBottomHeight);

  const resolvedSnapPoints = useMemo<number[]>(() => {
    if (snapPoints && snapPoints.length > 0) return [...snapPoints].sort((a, b) => a - b);
    return [minTop, (minTop + maxTop) / 2, maxTop];
  }, [snapPoints, minTop, maxTop]);

  useEffect(() => {
    if (containerHeight <= 0) return;
    const bounded = clamp(topHeight.value, minTop, maxTop);
    if (bounded !== topHeight.value) topHeight.value = withSpring(bounded, springConfig);
    // topHeight is a SharedValue ref, safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerHeight, minTop, maxTop]);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .hitSlop({ top: HANDLE_HIT_SLOP, bottom: HANDLE_HIT_SLOP })
        .onStart(() => {
          startY.value = topHeight.value;
          handleScale.value = withSpring(1.18, springConfig);
        })
        .onUpdate((event) => {
          topHeight.value = clamp(startY.value + event.translationY, minTop, maxTop);
        })
        .onEnd((event) => {
          const velocity = clamp(event.velocityY, -4000, 4000);
          const target = resolveSnapTarget(
            topHeight.value,
            velocity,
            resolvedSnapPoints,
            velocityThreshold
          );
          topHeight.value = withSpring(target, { ...springConfig, overshootClamping: true });
          if (onHeightChange) runOnJS(onHeightChange)(target);
        })
        .onFinalize(() => {
          handleScale.value = withSpring(1, springConfig);
        }),
    [
      minTop,
      maxTop,
      resolvedSnapPoints,
      velocityThreshold,
      springConfig,
      onHeightChange,
      topHeight,
      startY,
      handleScale,
    ]
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerHeight(event.nativeEvent.layout.height);
  }, []);

  const ctx = useMemo(
    () => ({ topHeight, handleScale, gap, minTop, maxTop, gesture }),
    [topHeight, handleScale, gap, minTop, maxTop, gesture]
  );

  return (
    <SplitViewContext.Provider value={ctx}>
      <View className={cn("flex-1", className)} onLayout={onLayout}>
        {children}
      </View>
    </SplitViewContext.Provider>
  );
}

export interface SplitViewPaneProps {
  children: React.ReactNode;
  className?: string;
}

export function SplitViewTop({ children, className }: SplitViewPaneProps) {
  const { topHeight, minTop } = useSplitView("SplitViewTop");

  const style = useAnimatedStyle(() => ({
    height: topHeight.value,
    opacity: interpolate(topHeight.value, [minTop, minTop + 60], [0.2, 1], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View
      className={cn("overflow-hidden rounded-b-2xl bg-card", className)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}

export function SplitViewBottom({ children, className }: SplitViewPaneProps) {
  const { topHeight, maxTop } = useSplitView("SplitViewBottom");

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(topHeight.value, [maxTop - 60, maxTop], [1, 0.2], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View
      className={cn("flex-1 overflow-hidden rounded-t-2xl bg-card", className)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}

export interface SplitViewHandleProps {
  className?: string;
  barClassName?: string;
}

export function SplitViewHandle({ className, barClassName }: SplitViewHandleProps) {
  const { gesture, handleScale, gap } = useSplitView("SplitViewHandle");

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ scale: handleScale.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className={cn("min-h-12 w-full items-center justify-center bg-background", className)}
        style={{ height: gap }}
        accessible={true}
        accessibilityRole="adjustable"
        accessibilityLabel="Resize split view"
      >
        <Animated.View
          className={cn("h-[5px] w-11 rounded-full bg-foreground/25", barClassName)}
          style={barStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}

export interface SplitViewTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SplitViewTitle({ children, className }: SplitViewTitleProps) {
  return (
    <Text className={cn("px-4 pb-1 pt-3 text-[15px] font-semibold text-muted-foreground", className)}>
      {children}
    </Text>
  );
}
