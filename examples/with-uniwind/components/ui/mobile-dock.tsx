import React, { useCallback, useMemo } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
  type SharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { cn } from "@/lib/utils";

export type DockItem = {
  key: string;
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
};

export interface MobileDockProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  items: DockItem[];
  /** Resting icon size (dp) when nothing is being touched. */
  itemSize?: number;
  /** Icon size (dp) directly under the finger. */
  peakSize?: number;
  /** How many neighbors on either side still feel the magnification falloff. */
  spread?: number;
  /** Horizontal gap (dp) between resting icons. */
  gap?: number;
  /** Show a floating label above the touched icon. */
  showLabels?: boolean;
  onItemPress?: (item: DockItem, index: number) => void;
}

// Fractional icon index under a touch: x=0 -> -0.5 (left of the first icon),
// x=width -> count-0.5 (right of the last icon). Landing exactly on an
// integer means the finger sits at that icon's center.
function touchToIndex(x: number, width: number, count: number) {
  "worklet";
  if (width <= 0) return -1;
  return (x / width) * count - 0.5;
}

// Conserved-width fisheye size for one icon: everyone's growth is funded by
// shrinking everyone (including itself) by an even share of the dock-wide
// extra width picked up under the touch, so the row's total width never
// changes — only the finger's neighborhood visibly redistributes it.
function iconSize(
  index: number,
  count: number,
  activeIndex: number,
  activeAmount: number,
  restSize: number,
  inputRange: number[],
  outputRange: number[]
) {
  "worklet";
  const n = Math.max(count, 1);
  let totalExtra = 0;
  for (let j = 0; j < n; j++) {
    const distance = Math.abs(activeIndex - j);
    const grown = interpolate(distance, inputRange, outputRange, Extrapolation.CLAMP);
    totalExtra += interpolate(activeAmount, ISACTIVE_INPUT, [0, grown - restSize]);
  }
  const myDistance = Math.abs(activeIndex - index);
  const myGrown = interpolate(myDistance, inputRange, outputRange, Extrapolation.CLAMP);
  const mine = interpolate(activeAmount, ISACTIVE_INPUT, [restSize, myGrown]);
  return mine - totalExtra / n;
}

const ACTIVATE_SPRING = { damping: 22, stiffness: 400, mass: 0.35 };
const SETTLE_SPRING = { damping: 27, stiffness: 242, mass: 0.4 };
const ISACTIVE_INPUT = [0, 1];
const TOOLTIP_INPUT = [0, 0.5];
const TOOLTIP_OPACITY_OUTPUT = [1, 0];
const TOOLTIP_TRANSLATE_OUTPUT = [6, 0];

export function MobileDock({
  className,
  items,
  itemSize = 50,
  peakSize = 70,
  spread = 1,
  gap = 6,
  showLabels = true,
  onItemPress,
  onLayout,
  ...props
}: MobileDockProps) {
  const activeIndex = useSharedValue(-1);
  const isActive = useSharedValue(0);
  const dockWidth = useSharedValue(0);
  const count = items.length;

  // spread=1 (default) -> inputRange [0, 1], outputRange [peakSize, itemSize]:
  // the touched icon peaks, its immediate neighbors are back to rest, and
  // everything beyond that is clamped at rest too.
  const { inputRange, outputRange } = useMemo(() => {
    const input: number[] = [];
    const output: number[] = [];
    for (let d = 0; d <= spread; d++) {
      input.push(d);
      output.push(d === 0 ? peakSize : itemSize + (peakSize - itemSize) * Math.max(0, 1 - d / spread));
    }
    return { inputRange: input, outputRange: output };
  }, [spread, itemSize, peakSize]);

  const fireTap = useCallback(
    (idx: number) => {
      const item = items[Math.round(idx)];
      if (!item) return;
      item.onPress?.();
      onItemPress?.(item, Math.round(idx));
    },
    [items, onItemPress]
  );

  const gesture = useMemo(
    () =>
      Gesture.Manual()
        .onTouchesDown((e, manager) => {
          if (e.allTouches.length === 0) return;
          activeIndex.value = touchToIndex(e.allTouches[0].x, dockWidth.value, count);
          isActive.value = withSpring(1, ACTIVATE_SPRING);
          manager.activate();
        })
        .onTouchesMove((e) => {
          if (e.allTouches.length === 0) return;
          activeIndex.value = touchToIndex(e.allTouches[0].x, dockWidth.value, count);
        })
        .onTouchesUp((e) => {
          const idx = e.allTouches.length > 0 ? touchToIndex(e.allTouches[0].x, dockWidth.value, count) : activeIndex.value;
          if (idx >= -0.5) runOnJS(fireTap)(idx);
          isActive.value = withSpring(0, SETTLE_SPRING);
        })
        .onTouchesCancelled((_e, manager) => {
          isActive.value = withSpring(0, SETTLE_SPRING);
          manager.end();
        })
        .shouldCancelWhenOutside(false),
    [activeIndex, isActive, dockWidth, count, fireTap]
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    dockWidth.value = e.nativeEvent.layout.width;
    onLayout?.(e);
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        className={cn("flex-row items-end rounded-2xl border border-border bg-card/90 px-3 pb-2 pt-1", className)}
        onLayout={handleLayout}
        accessibilityRole="toolbar"
        {...props}
      >
        {items.map((item, index) => (
          <DockIcon
            key={item.key}
            item={item}
            index={index}
            count={count}
            activeIndex={activeIndex}
            isActive={isActive}
            itemSize={itemSize}
            gap={gap}
            inputRange={inputRange}
            outputRange={outputRange}
            showLabel={showLabels && !!item.label}
          />
        ))}
      </Animated.View>
    </GestureDetector>
  );
}

function DockIcon({
  item,
  index,
  count,
  activeIndex,
  isActive,
  itemSize,
  gap,
  inputRange,
  outputRange,
  showLabel,
}: {
  item: DockItem;
  index: number;
  count: number;
  activeIndex: SharedValue<number>;
  isActive: SharedValue<number>;
  itemSize: number;
  gap: number;
  inputRange: number[];
  outputRange: number[];
  showLabel: boolean;
}) {
  // The wrapper's own width/height grow into the flex row (which is
  // bottom-aligned via `items-end`), so the slot itself pushes upward.
  const wrapperStyle = useAnimatedStyle(() => {
    const size = iconSize(index, count, activeIndex.value, isActive.value, itemSize, inputRange, outputRange);
    return { width: size, height: size };
  });

  // The icon inside is a fixed-size box scaled via transform. RN scales
  // around the center, which would grow the icon downward too — translateY
  // cancels exactly that downward half so growth reads as upward-only.
  const iconStyle = useAnimatedStyle(() => {
    const size = iconSize(index, count, activeIndex.value, isActive.value, itemSize, inputRange, outputRange);
    const scale = size / itemSize;
    return { transform: [{ translateY: -(itemSize * (scale - 1)) / 2 }, { scale }] };
  });

  const tooltipStyle = useAnimatedStyle(() => {
    const distance = Math.abs(activeIndex.value - index);
    const opacity = isActive.value * interpolate(distance, TOOLTIP_INPUT, TOOLTIP_OPACITY_OUTPUT, Extrapolation.CLAMP);
    const translateY = interpolate(isActive.value, ISACTIVE_INPUT, TOOLTIP_TRANSLATE_OUTPUT);
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <Animated.View
      style={[{ marginHorizontal: gap / 2 }, wrapperStyle]}
      className="items-center justify-end overflow-visible"
    >
      {showLabel && (
        <Animated.View
          style={tooltipStyle}
          pointerEvents="none"
          className="absolute -top-8 rounded-md bg-primary px-2 py-1"
        >
          <Text numberOfLines={1} className="text-[11px] font-medium text-primary-foreground">
            {item.label}
          </Text>
        </Animated.View>
      )}
      <Animated.View
        style={[{ width: itemSize, height: itemSize }, iconStyle]}
        className="items-center justify-center rounded-xl bg-secondary"
        accessible
        accessibilityRole="button"
        accessibilityLabel={item.label ?? item.key}
      >
        {item.icon}
      </Animated.View>
    </Animated.View>
  );
}
