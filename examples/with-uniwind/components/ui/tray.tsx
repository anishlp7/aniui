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
  Modal,
  Pressable,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { Gesture, GestureDetector, type PanGesture } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, X } from "lucide-react-native";
import { cn } from "@/lib/utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ---------------------------------------------------------------------------
// Physics helpers (worklets) — detents, overscroll resistance, flick landing.
// ---------------------------------------------------------------------------

/** Rubber-band overscroll resistance: travels less the further you drag. */
function rubberBand(distance: number, dimension: number, factor = 0.55): number {
  "worklet";
  return (1 - 1 / ((distance * factor) / Math.max(dimension, 1) + 1)) * Math.max(dimension, 1);
}

/**
 * Where a flick would come to rest if it decelerated naturally. Projecting
 * the release velocity forward (instead of snapping on raw position alone)
 * is what makes a fast flick reach the next detent and a slow drag settle on
 * the nearest one — the same trick iOS sheets use.
 */
function projectPosition(position: number, velocity: number, seconds: number): number {
  "worklet";
  return position + velocity * seconds;
}

function nearestOffsetIndex(offsets: readonly number[], position: number): number {
  "worklet";
  let best = 0;
  let bestDistance = Number.MAX_VALUE;
  for (let i = 0; i < offsets.length; i++) {
    const distance = Math.abs(offsets[i] - position);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  }
  return best;
}

function resolveDetent(detent: number | string, available: number): number {
  if (typeof detent === "string") {
    const percent = parseFloat(detent);
    return Number.isFinite(percent) ? (available * percent) / 100 : available;
  }
  return detent <= 1 ? available * detent : detent;
}

/** Detent heights, sorted ascending, expressed as distance below "fully open". */
function toOffsets(heights: readonly number[]): number[] {
  const tallest = Math.max(...heights);
  return heights.map((height) => tallest - height).sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export type TrayTheme = "light" | "dark";
export type TrayDetent = number | `${number}%`;

export interface TrayPalette {
  surface: string;
  border: string;
  handle: string;
  text: string;
  mutedText: string;
  backdrop: string;
}

const LIGHT_PALETTE: TrayPalette = {
  surface: "#ffffff", border: "#e3e7ec", handle: "rgba(60,60,67,0.3)",
  text: "#111111", mutedText: "#6d7480", backdrop: "rgba(0,0,0,0.4)",
};
const DARK_PALETTE: TrayPalette = {
  surface: "#171716", border: "#2b2a25", handle: "rgba(246,243,236,0.28)",
  text: "#f6f3ec", mutedText: "#9a958a", backdrop: "rgba(0,0,0,0.55)",
};
const PALETTES: Record<TrayTheme, TrayPalette> = { light: LIGHT_PALETTE, dark: DARK_PALETTE };

export interface TrayMotion {
  /** Presenting/dismissing the whole sheet. */
  presentSpring: WithSpringConfig;
  /** Resizing to new content height when a view swaps in. */
  heightSpring: WithSpringConfig;
  /** Settling onto a detent after a drag or flick. */
  detentSpring: WithSpringConfig;
  /** Overscroll resistance above the tallest detent. Higher travels less. */
  overDragFactor: number;
  /** How far the backdrop fades out at full drag, as a fraction. */
  backdropFalloff: number;
  /** Seconds of deceleration used to project a flick onto a detent. */
  flickProjection: number;
  /** Distance (px) a pushed/popped view travels as it slides in/out. */
  viewSlide: number;
  /** Vertical movement before the drag-to-dismiss pan gesture activates. */
  activeOffsetY: [number, number];
  scrollDeceleration: number;
}

const DEFAULT_MOTION: TrayMotion = {
  presentSpring: { damping: 30, stiffness: 280, mass: 0.9 },
  heightSpring: { damping: 26, stiffness: 260, mass: 0.75, overshootClamping: true },
  detentSpring: { damping: 32, stiffness: 320, mass: 0.9 },
  overDragFactor: 0.55,
  backdropFalloff: 0.45,
  flickProjection: 0.35,
  viewSlide: 26,
  activeOffsetY: [-8, 8],
  scrollDeceleration: 0.998,
};

const PRESENT_START_SCALE = 0.94;
const TRAVEL_PADDING = 56;

// ---------------------------------------------------------------------------
// Navigation stack (push/back between named views)
// ---------------------------------------------------------------------------

interface TrayNavigation {
  view: string;
  /** +1 when the last navigation pushed, -1 when it popped. */
  direction: number;
  canGoBack: boolean;
  setView: (view: string) => void;
  goBack: () => void;
  reset: (view: string) => void;
}

function useTrayNavigation(defaultView: string, onViewChange?: (view: string) => void): TrayNavigation {
  const [state, setState] = useState<{ stack: string[]; direction: number }>({
    stack: [defaultView],
    direction: 1,
  });
  const view = state.stack[state.stack.length - 1];

  const setView = useCallback(
    (next: string) => {
      setState((current) => {
        if (current.stack[current.stack.length - 1] === next) return current;
        return { stack: [...current.stack, next], direction: 1 };
      });
      onViewChange?.(next);
    },
    [onViewChange]
  );

  const goBack = useCallback(() => {
    setState((current) => {
      if (current.stack.length < 2) return current;
      const stack = current.stack.slice(0, -1);
      onViewChange?.(stack[stack.length - 1]);
      return { stack, direction: -1 };
    });
  }, [onViewChange]);

  const reset = useCallback((next: string) => setState({ stack: [next], direction: 1 }), []);

  return { view, direction: state.direction, canGoBack: state.stack.length > 1, setView, goBack, reset };
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TrayContextValue {
  visible: boolean;
  view: string;
  direction: number;
  canGoBack: boolean;
  open: (view?: string) => void;
  close: () => void;
  setView: (view: string) => void;
  goBack: () => void;

  height: SharedValue<number>;
  present: SharedValue<number>;
  offset: SharedValue<number>;
  travel: SharedValue<number>;
  /** Live content scroll offset, used for the drag/scroll hand-off. */
  scrollY: SharedValue<number>;
  /** True while the tray itself owns the gesture rather than the scrollable. */
  isDragging: SharedValue<boolean>;
  /** Set by TrayScrollView so the tray knows a scrollable is present. */
  hasScrollable: SharedValue<boolean>;
  offsets: number[];
  detentHeight: number;

  pan: PanGesture;
  onContentLayout: (event: LayoutChangeEvent) => void;
  palette: TrayPalette;
  radius: number;
  motion: TrayMotion;
  reduceMotion: boolean;
}

const TrayContext = createContext<TrayContextValue | null>(null);

function useTray(component: string) {
  const ctx = useContext(TrayContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <Tray>.`);
  return ctx;
}

const TrayTintContext = createContext<string | null>(null);
function useTrayTint(fallback: string): string {
  return useContext(TrayTintContext) ?? fallback;
}

const TrayDismissContext = createContext<boolean>(true);

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface TrayProps {
  children: React.ReactNode;
  defaultView?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onViewChange?: (view: string) => void;
  theme?: TrayTheme;
  palette?: Partial<TrayPalette>;
  radius?: number;
  closeThreshold?: number;
  closeVelocity?: number;
  dismissOnBackdropPress?: boolean;
  enableDragToDismiss?: boolean;
  motion?: Partial<TrayMotion>;
  /** Snap heights (px, 0-1 fraction of available height, or `"NN%"`), tallest first isn't required — sorted internally. */
  detents?: readonly TrayDetent[];
  initialDetent?: number;
  onDetentChange?: (index: number) => void;
}

/**
 * Full compound bottom-sheet/navigation-tray system. `TrayContent` measures
 * its own content and springs its height to match; `TrayView`s form a
 * push/back stack (`setView`/`goBack`) that cross-slides between named
 * views; the sheet itself supports drag-to-dismiss with multiple detents,
 * rubber-band overscroll above the tallest one, and flick-velocity
 * projection to decide which detent a released drag settles on.
 * `TrayScrollView` hands the gesture off to its own scroll view when the
 * sheet is fully expanded and the content is scrolled to the top, and back
 * to the sheet's own drag the moment the user pulls down from there.
 */
export function Tray({
  children,
  defaultView = "default",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onViewChange,
  theme: themeProp,
  palette: paletteProp,
  radius = 38,
  closeThreshold = 96,
  closeVelocity = 900,
  dismissOnBackdropPress = true,
  enableDragToDismiss = true,
  motion: motionProp,
  detents,
  initialDetent = 0,
  onDetentChange,
}: TrayProps) {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? (openProp as boolean) : internalOpen;

  const [mounted, setMounted] = useState(open);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const systemDark = useColorScheme() === "dark";
  const theme = themeProp ?? (systemDark ? "dark" : "light");

  const { offsets, detentHeight } = useMemo(() => {
    if (!detents || detents.length === 0) return { offsets: [0], detentHeight: 0 };
    const available = screenHeight - insets.top - insets.bottom;
    const heights = detents.map((d) => resolveDetent(d, available));
    return { offsets: toOffsets(heights), detentHeight: Math.max(...heights) };
  }, [detents, screenHeight, insets.top, insets.bottom]);

  const reduceMotion = useReducedMotion();
  const motion = useMemo<TrayMotion>(() => ({ ...DEFAULT_MOTION, ...motionProp }), [motionProp]);
  const navigation = useTrayNavigation(defaultView, onViewChange);

  const present = useSharedValue(0);
  const offset = useSharedValue(0);
  const startOffset = useSharedValue(0);
  const detentIndex = useSharedValue(0);
  const travel = useSharedValue(0);
  const sheetHeight = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const owns = useSharedValue(false);
  const origin = useSharedValue(0);
  const hasScrollable = useSharedValue(false);
  const isDragging = useSharedValue(false);

  const measured = useRef(0);
  const presented = useRef(false);
  // Tracks the latest desired open state so a closing spring's completion
  // callback — which can still be in flight when the tray is reopened before
  // it settles — can tell it's now stale and skip resetting the fresh open.
  // Without this, a quick reopen right after closing would get silently
  // yanked back to a mounted-but-reset, invisible state once the old spring
  // finally finished.
  const openRef = useRef(open);
  openRef.current = open;
  // Set while dismiss() (drag-to-dismiss) owns the closing animation, so the
  // effect below doesn't also assign its own withSpring to the same shared
  // value for the same close — two competing springs on `present` meant the
  // drag's velocity-aware one got interrupted (and its callback skipped) the
  // moment the effect's ran, which is a redundant, fragile way to end up at
  // exactly one finishClose() call rather than a guaranteed one.
  const isClosing = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Deliberately does NOT reset measured.current/sheetHeight/travel: the
  // Modal (and its content) now stay mounted permanently — see the render
  // below — so those describe the content's real, still-accurate size and
  // should survive a close instead of forcing a re-measure (and a "grow from
  // 0" flash) on every reopen. Only the transient, position-related values
  // reset, since a fresh open should start from a clean drag/scroll state.
  const reset = useCallback(() => {
    offset.value = 0;
    startOffset.value = 0;
    scrollY.value = 0;
    owns.value = false;
    origin.value = 0;
    present.value = 0;
  }, [offset, startOffset, scrollY, owns, origin, present]);

  const finishClose = useCallback(() => {
    isClosing.current = false;
    if (openRef.current) return;
    setMounted(false);
    reset();
  }, [reset]);

  const clearClosing = useCallback(() => {
    isClosing.current = false;
  }, []);

  const close = useCallback(() => setOpen(false), [setOpen]);

  const openTray = useCallback(
    (view?: string) => {
      navigation.reset(view ?? defaultView);
      setOpen(true);
    },
    [navigation, defaultView, setOpen]
  );

  // Springs the sheet in from below. Called either by onContentLayout (the
  // very first time content is ever measured) or directly by the open effect
  // below (every time after that, since content no longer unmounts between
  // opens and so won't re-fire onLayout on its own).
  const presentEntrance = useCallback(() => {
    presented.current = true;
    const start = offsets[Math.min(initialDetent, offsets.length - 1)] ?? 0;
    offset.value = start;
    detentIndex.value = Math.min(initialDetent, offsets.length - 1);
    present.value = reduceMotion ? 1 : withSpring(1, motion.presentSpring);
  }, [offsets, initialDetent, offset, detentIndex, present, reduceMotion, motion]);

  const onContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const next = detentHeight ? detentHeight : Math.round(event.nativeEvent.layout.height);
      if (next <= 0 || Math.abs(measured.current - next) < 1) return;

      const first = measured.current === 0;
      measured.current = next;
      travel.value = next + insets.bottom + TRAVEL_PADDING;

      if (first || reduceMotion) sheetHeight.value = next;
      else sheetHeight.value = withSpring(next, motion.heightSpring);

      if (openRef.current && !presented.current) presentEntrance();
    },
    [detentHeight, insets.bottom, reduceMotion, motion, sheetHeight, travel, presentEntrance]
  );

  const dismiss = useCallback(
    (velocity: number) => {
      isClosing.current = true;
      setOpen(false);
      if (reduceMotion) {
        present.value = 0;
        finishClose();
        return;
      }
      present.value = withSpring(
        0,
        { ...motion.presentSpring, velocity: -velocity / Math.max(travel.value, 1), overshootClamping: true },
        (finished) => {
          "worklet";
          if (finished) runOnJS(finishClose)();
          else runOnJS(clearClosing)();
        }
      );
    },
    [reduceMotion, motion, present, travel, finishClose, clearClosing, setOpen]
  );

  useEffect(() => {
    if (open) {
      setMounted(true);
      presented.current = false;
      // If content was already measured on a previous open, it won't
      // re-layout just because we're reopening (it never unmounted) — so
      // nothing will call presentEntrance() for us. Do it directly. If this
      // is the very first-ever open, measured.current is still 0 and
      // onContentLayout (about to fire once the Modal is actually visible)
      // handles it instead.
      if (measured.current > 0) presentEntrance();
      return;
    }
    if (!presented.current) return;
    if (isClosing.current) return;
    if (reduceMotion) {
      present.value = 0;
      finishClose();
      return;
    }
    present.value = withSpring(0, { ...motion.presentSpring, overshootClamping: true }, (finished) => {
      "worklet";
      if (finished) runOnJS(finishClose)();
    });
  }, [open, reduceMotion, motion, present, finishClose, presentEntrance]);

  const settleTo = useCallback((index: number) => onDetentChange?.(index), [onDetentChange]);

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(enableDragToDismiss && !reduceMotion)
        .activeOffsetY(motion.activeOffsetY)
        .failOffsetX([-14, 14])
        .onBegin(() => {
          "worklet";
          owns.value = false;
          origin.value = 0;
          startOffset.value = offset.value;
          isDragging.value = false;
        })
        .onUpdate((event) => {
          "worklet";
          if (!owns.value) {
            const expanded = startOffset.value <= 0.5;
            const canScroll = hasScrollable.value && expanded;
            const atTop = !canScroll || scrollY.value <= 0;
            if (!atTop || (canScroll && event.translationY <= 0)) {
              isDragging.value = false;
              return;
            }
            owns.value = true;
            origin.value = event.translationY;
          }

          const travelled = event.translationY - origin.value;
          const next = startOffset.value + travelled;

          if (next < 0) {
            offset.value = -rubberBand(-next, travel.value, motion.overDragFactor);
            isDragging.value = true;
            return;
          }
          offset.value = next;
          isDragging.value = true;
        })
        .onEnd((event) => {
          "worklet";
          if (!owns.value) return;
          const projected = projectPosition(offset.value, event.velocityY, motion.flickProjection);
          const last = offsets[offsets.length - 1];

          if (projected > last + closeThreshold || (event.velocityY > closeVelocity && offset.value > 0)) {
            runOnJS(dismiss)(event.velocityY);
            return;
          }

          const index = nearestOffsetIndex(offsets, projected);
          detentIndex.value = index;
          offset.value = withSpring(offsets[index], { ...motion.detentSpring, velocity: event.velocityY });
          runOnJS(settleTo)(index);
        })
        .onFinalize(() => {
          "worklet";
          owns.value = false;
          isDragging.value = false;
        }),
    [enableDragToDismiss, reduceMotion, motion, isDragging, owns, origin, startOffset, offset, detentIndex, offsets, hasScrollable, scrollY, travel, closeThreshold, closeVelocity, dismiss, settleTo]
  );

  const palette = useMemo<TrayPalette>(() => ({ ...PALETTES[theme], ...paletteProp }), [theme, paletteProp]);

  const ctx = useMemo<TrayContextValue>(
    () => ({
      visible: mounted, view: navigation.view, direction: navigation.direction, canGoBack: navigation.canGoBack,
      open: openTray, close, setView: navigation.setView, goBack: navigation.goBack,
      height: sheetHeight, present, offset, offsets, detentHeight, travel, scrollY, isDragging, hasScrollable,
      pan, onContentLayout, palette, radius, motion, reduceMotion,
    }),
    [mounted, navigation.view, navigation.direction, navigation.canGoBack, navigation.setView, navigation.goBack,
      openTray, close, sheetHeight, present, offset, offsets, detentHeight, travel, scrollY, isDragging,
      hasScrollable, pan, onContentLayout, palette, radius, motion, reduceMotion]
  );

  return (
    <TrayContext.Provider value={ctx}>
      <TrayDismissContext.Provider value={dismissOnBackdropPress}>{children}</TrayDismissContext.Provider>
    </TrayContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

export interface TrayTriggerProps {
  children: React.ReactNode;
  view?: string;
  className?: string;
}

export function TrayTrigger({ children, view, className }: TrayTriggerProps) {
  const { open, palette } = useTray("TrayTrigger");
  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      onPress={() => open(view)}
      className={cn("min-h-12 min-w-12", className)}
    >
      <TrayTintContext.Provider value={palette.text}>{children}</TrayTintContext.Provider>
    </Pressable>
  );
}

export interface TrayContentProps {
  children: React.ReactNode;
  className?: string;
}

export function TrayContent({ children, className }: TrayContentProps) {
  const { visible, close, height, present, offset, travel, pan, onContentLayout, palette, radius, motion } =
    useTray("TrayContent");
  const insets = useSafeAreaInsets();
  const dismissOnBackdropPress = useContext(TrayDismissContext);

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - present.value) * travel.value + offset.value },
      { scale: interpolate(present.value, [0, 1], [PRESENT_START_SCALE, 1], Extrapolation.CLAMP) },
    ],
  }));

  const heightStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: height.value === 0 ? 0 : 1,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: present.value * interpolate(offset.value, [0, Math.max(travel.value, 1)], [1, motion.backdropFalloff], Extrapolation.CLAMP),
  }));

  // The Modal element itself stays mounted permanently and its own `visible`
  // prop toggles native show/hide, rather than this component conditionally
  // returning null (which would unmount/remount the underlying native Modal
  // window on every open/close). On Android in particular, tearing down and
  // recreating that native window is asynchronous — opening again before the
  // previous one has actually finished closing can silently fail to show,
  // which matches "works once, then won't reopen."
  return (
    <Modal transparent statusBarTranslucent visible={visible} animationType="none" onRequestClose={close}>
      <View className="flex-1 justify-end" pointerEvents="box-none">
        <AnimatedPressable
          className="absolute inset-0"
          style={[{ backgroundColor: palette.backdrop }, backdropStyle]}
          onPress={dismissOnBackdropPress ? close : undefined}
        />

        <View className="px-2.5" style={{ paddingBottom: Math.max(insets.bottom, 12) }} pointerEvents="box-none">
          <GestureDetector gesture={pan}>
            <Animated.View
              className="border"
              style={[
                { backgroundColor: palette.surface, borderColor: palette.border, borderRadius: radius },
                transformStyle,
              ]}
            >
              <Animated.View className="justify-end overflow-hidden" style={heightStyle}>
                <View className={cn("absolute bottom-0 left-0 right-0", className)} onLayout={onContentLayout}>
                  <View className="items-center pb-0.5 pt-2.5">
                    <View className="h-[5px] w-[38px] rounded-full" style={{ backgroundColor: palette.handle }} />
                  </View>
                  {children}
                </View>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        </View>
      </View>
    </Modal>
  );
}

export interface TrayViewProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export function TrayView({ children, id, className }: TrayViewProps) {
  const { view, direction, reduceMotion, motion } = useTray("TrayView");
  const active = view === id;

  const [rendered, setRendered] = useState(active);
  const progress = useSharedValue(active ? 1 : 0);
  const slideFrom = useSharedValue(0);

  useEffect(() => {
    if (active) {
      setRendered(true);
      slideFrom.value = direction;
      progress.value = reduceMotion ? 1 : withSpring(1, motion.presentSpring);
      return;
    }
    if (progress.value === 0) return;
    slideFrom.value = -direction;
    if (reduceMotion) {
      progress.value = 0;
      setRendered(false);
      return;
    }
    progress.value = withTiming(0, { duration: 160 }, (finished) => {
      "worklet";
      if (finished) runOnJS(setRendered)(false);
    });
  }, [active, direction, progress, slideFrom, reduceMotion]);

  const layerStyle = useAnimatedStyle(() => {
    const shift = (1 - progress.value) * motion.viewSlide * slideFrom.value;
    return {
      opacity: progress.value,
      transform: [
        { translateX: shift },
        { scale: interpolate(progress.value, [0, 1], [0.94, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={active ? "auto" : "none"}
      className={cn(active ? "w-full" : "absolute bottom-0 left-0 right-0", className)}
      style={layerStyle}
    >
      {children}
    </Animated.View>
  );
}

export interface TraySectionProps {
  children: React.ReactNode;
  className?: string;
}

export function TrayHeader({ children, className }: TraySectionProps) {
  return <View className={cn("flex-row items-center justify-between gap-3 px-5 pb-3 pt-2", className)}>{children}</View>;
}

export function TrayTitle({ children, className }: TraySectionProps) {
  const { palette } = useTray("TrayTitle");
  return (
    <Text className={cn("shrink text-lg font-semibold", className)} style={{ color: palette.text }}>
      {children}
    </Text>
  );
}

export function TraySubtitle({ children, className }: TraySectionProps) {
  const { palette } = useTray("TraySubtitle");
  return (
    <Text className={cn("mt-0.5 text-[13px]", className)} style={{ color: palette.mutedText }}>
      {children}
    </Text>
  );
}

export function TrayBody({ children, className }: TraySectionProps) {
  return <View className={cn("px-5 pb-4", className)}>{children}</View>;
}

export function TrayFooter({ children, className }: TraySectionProps) {
  const { palette } = useTray("TrayFooter");
  return (
    <View className={cn("gap-2.5 border-t px-5 pb-2 pt-3.5", className)} style={{ borderTopColor: palette.border }}>
      {children}
    </View>
  );
}

export interface TrayGlyphButtonProps {
  children?: React.ReactNode | ((state: { color: string; size: number }) => React.ReactNode);
  className?: string;
}

export function TrayClose({ children, className }: TrayGlyphButtonProps) {
  const { close, palette } = useTray("TrayClose");
  const state = { color: palette.mutedText, size: 20 };
  const content = typeof children === "function" ? children(state) : (children ?? null);

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Close"
      hitSlop={12}
      onPress={close}
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
    >
      <TrayTintContext.Provider value={palette.mutedText}>
        {content ?? <X size={state.size} color={state.color} strokeWidth={2.5} />}
      </TrayTintContext.Provider>
    </Pressable>
  );
}

export function TrayBack({ children, className }: TrayGlyphButtonProps) {
  const { goBack, canGoBack, palette } = useTray("TrayBack");
  if (!canGoBack) return null;
  const state = { color: palette.mutedText, size: 20 };
  const content = typeof children === "function" ? children(state) : (children ?? null);

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Back"
      hitSlop={12}
      onPress={goBack}
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
    >
      <TrayTintContext.Provider value={palette.mutedText}>
        {content ?? <ChevronLeft size={state.size} color={state.color} strokeWidth={2.5} />}
      </TrayTintContext.Provider>
    </Pressable>
  );
}

export interface TrayScrollViewProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
  contentContainerStyle?: React.ComponentProps<typeof Animated.ScrollView>["contentContainerStyle"];
}

/**
 * Scrollable body that hands the gesture off to the sheet's own drag: while
 * the user is dragging the sheet, this view's scroll is pinned to 0 so it
 * can't fight the sheet; once the drag ends, native scrolling resumes from
 * wherever content was left. `hasScrollable`/`scrollY` (shared with the
 * root's pan gesture) are what let the pan only "steal" the gesture when
 * this list is already scrolled to the top.
 */
export function TrayScrollView({ children, maxHeight, className, contentContainerStyle }: TrayScrollViewProps) {
  const { scrollY, isDragging, hasScrollable, pan, motion } = useTray("TrayScrollView");
  const { height: screenHeight } = useWindowDimensions();
  const listRef = useAnimatedRef<Animated.ScrollView>();
  const resolvedMax = maxHeight ?? screenHeight * 0.55;

  useEffect(() => {
    hasScrollable.value = true;
    return () => {
      hasScrollable.value = false;
      scrollY.value = 0;
    };
  }, [hasScrollable, scrollY]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      "worklet";
      if (isDragging.value) {
        scrollTo(listRef, 0, 0, false);
        scrollY.value = 0;
        return;
      }
      scrollY.value = event.contentOffset.y;
    },
  });

  const nativeGesture = useMemo(() => Gesture.Native().simultaneousWithExternalGesture(pan), [pan]);

  return (
    <GestureDetector gesture={nativeGesture}>
      <Animated.ScrollView
        ref={listRef}
        className={className}
        contentContainerStyle={contentContainerStyle}
        style={{ maxHeight: resolvedMax }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate={motion.scrollDeceleration}
        bounces
        alwaysBounceVertical={false}
        overScrollMode="never"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
    </GestureDetector>
  );
}

export function TrayIcon({ children }: { children: React.ReactNode }) {
  const { palette } = useTray("TrayIcon");
  const color = useTrayTint(palette.text);
  return <TrayTintContext.Provider value={color}>{children}</TrayTintContext.Provider>;
}
