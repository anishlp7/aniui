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
  useColorScheme,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  type AnimatedStyle,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}
interface AnchorRect {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface PanelPosition {
  left: number;
  top: number;
}

/** Keeps the panel fully on-screen, centered on the anchor where possible. */
function clampToScreen(
  anchor: AnchorRect,
  panelWidth: number,
  panelHeight: number,
  screenWidth: number,
  screenHeight: number,
  margin: number,
  insetTop: number,
  insetBottom: number
): PanelPosition {
  const idealLeft = anchor.x + anchor.w / 2 - panelWidth / 2;
  const idealTop = anchor.y + anchor.h / 2 - panelHeight / 2;
  const minLeft = margin;
  const maxLeft = screenWidth - panelWidth - margin;
  const minTop = insetTop + margin;
  const maxTop = screenHeight - insetBottom - panelHeight - margin;
  return {
    left: Math.min(Math.max(idealLeft, minLeft), Math.max(maxLeft, minLeft)),
    top: Math.min(Math.max(idealTop, minTop), Math.max(maxTop, minTop)),
  };
}

export type UnfoldMenuTheme = "light" | "dark";

export interface UnfoldMenuPalette {
  surface: string;
  border: string;
  text: string;
  mutedText: string;
}

const LIGHT_PALETTE: UnfoldMenuPalette = { surface: "#ffffff", border: "#e3e7ec", text: "#111111", mutedText: "#6d7480" };
const DARK_PALETTE: UnfoldMenuPalette = { surface: "#171716", border: "#2b2a25", text: "#f6f3ec", mutedText: "#9a958a" };
const PALETTES: Record<UnfoldMenuTheme, UnfoldMenuPalette> = { light: LIGHT_PALETTE, dark: DARK_PALETTE };

const MORPH_SPRING: WithSpringConfig = { mass: 0.5, damping: 14, stiffness: 145 };
const MORPH_CLOSE_SPRING: WithSpringConfig = { mass: 0.5, damping: 14, stiffness: 146 };
const HANDOFF_DELAY = 460;
const HANDOFF_DURATION = 300;
const HANDOFF_CLOSE_DURATION = 340;
const HANDOFF_EASING = Easing.inOut(Easing.quad);
const REVEAL_DELAY = 260;
const REVEAL_DURATION = 220;
const REVEAL_EASING = Easing.out(Easing.cubic);
const CLOSE_DURATION = 280;
const CLOSE_EASING = Easing.inOut(Easing.quad);
const PRESS_TIMING = { duration: 120, easing: Easing.out(Easing.quad) };
const PRESS_SCALE = 0.97;
const STAGGER_SPAN = 0.45;
const ITEM_WINDOW = 0.55;
const ITEM_SCALE_FROM = 0.85;
const TRIGGER_ICON_FADE_END = 0.2;
const CONTENT_FADE_START = 0.3;
const CONTENT_FADE_END = 0.75;
const MORPH_LABEL_FADE_END = 0.6;
const MORPH_LABEL_SCALE_TO = 0.88;
const MORPH_TITLE_FADE_START = 0.4;
const MORPH_TITLE_SCALE_FROM = 0.88;
const MORPH_PUSH_DISTANCE = 14;
const DEFAULT_PANEL_WIDTH_RATIO = 0.86;
const MAX_PANEL_WIDTH = 420;
const DEFAULT_SCREEN_MARGIN = 12;
const DEFAULT_COLUMNS = 3;
const DEFAULT_RADIUS = 16;
const DEFAULT_ICON_SIZE = 20;

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

// The same children render 3 times, once per slot, so the trigger's icon and
// label can exist simultaneously as: the real anchor button (measured, then
// hidden once handed off), the read-only copy inside the growing panel, and
// a free-floating copy that travels from the anchor's position to the
// panel's title position — the shared-element "unfold" illusion.
type UnfoldMenuSlot = "anchor" | "overlay" | "float";
const UnfoldMenuSlotContext = createContext<UnfoldMenuSlot>("anchor");
function useUnfoldMenuSlot() {
  return useContext(UnfoldMenuSlotContext);
}

interface UnfoldMenuMorph {
  iconStyle?: AnimatedStyle<ViewStyle>;
  labelStyle?: AnimatedStyle<TextStyle>;
  onLabelLayout?: (event: LayoutChangeEvent) => void;
}
const UnfoldMenuMorphContext = createContext<UnfoldMenuMorph | null>(null);
function useUnfoldMenuMorph() {
  return useContext(UnfoldMenuMorphContext);
}

const UnfoldMenuTintContext = createContext<string | null>(null);
function useUnfoldMenuTint(fallback: string): string {
  return useContext(UnfoldMenuTintContext) ?? fallback;
}

const UnfoldMenuOffsetContext = createContext<Point>({ x: 0, y: 0 });
function useUnfoldMenuOffset() {
  return useContext(UnfoldMenuOffsetContext);
}

interface UnfoldMenuGridInfo {
  index: number;
  count: number;
  columns: number;
}
const UnfoldMenuGridContext = createContext<UnfoldMenuGridInfo>({ index: 0, count: 1, columns: 1 });
function useUnfoldMenuGrid() {
  return useContext(UnfoldMenuGridContext);
}

interface UnfoldMenuContextValue {
  open: boolean;
  overlayVisible: boolean;
  requestOpen: () => void;
  setOpen: (open: boolean) => void;
  select: (value?: string) => void;
  progress: SharedValue<number>;
  reveal: SharedValue<number>;
  handoff: SharedValue<number>;
  panelWidth: number;
  registerPanel: (height: number) => void;
  anchorRect: AnchorRect;
  panelOrigin: Point;
  labelOrigin: SharedValue<Point>;
  titleOrigin: SharedValue<Point>;
  registerLabelOrigin: (point: Point) => void;
  registerTitleOrigin: (point: Point) => void;
  palette: UnfoldMenuPalette;
  iconSize: number;
  reduceMotion: boolean;
}

const UnfoldMenuContext = createContext<UnfoldMenuContextValue | null>(null);
function useUnfoldMenu(component: string) {
  const ctx = useContext(UnfoldMenuContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <UnfoldMenu>.`);
  return ctx;
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface UnfoldMenuProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value?: string) => void;
  closeOnSelect?: boolean;
  panelWidth?: number;
  screenMargin?: number;
  radius?: number;
  iconSize?: number;
  theme?: UnfoldMenuTheme;
  palette?: Partial<UnfoldMenuPalette>;
}

/**
 * A compound menu whose trigger "unfolds" into a full panel: the trigger's
 * measured rect morphs (position, width, height, all spring-driven) into the
 * target panel rect, while the trigger's icon fades out and its label
 * cross-fades into the panel's title at the title's own position — so the
 * label reads as travelling and settling into place rather than two
 * unrelated pieces of text swapping. `measureInWindow` (not `measure`) is
 * used for the anchor so the morph starts from the right spot regardless of
 * status bar / notch offsets once the panel opens inside a `Modal`.
 */
export function UnfoldMenu({
  children,
  className,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onSelect,
  closeOnSelect = true,
  panelWidth: panelWidthProp,
  screenMargin = DEFAULT_SCREEN_MARGIN,
  radius = DEFAULT_RADIUS,
  iconSize = DEFAULT_ICON_SIZE,
  theme: themeProp,
  palette: paletteProp,
}: UnfoldMenuProps) {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? (openProp as boolean) : internalOpen;

  const reduceMotion = useReducedMotion();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const systemDark = useColorScheme() === "dark";
  const theme = themeProp ?? (systemDark ? "dark" : "light");

  const progress = useSharedValue(open ? 1 : 0);
  const reveal = useSharedValue(open ? 1 : 0);
  const handoff = useSharedValue(open ? 1 : 0);
  const labelOrigin = useSharedValue<Point>({ x: 0, y: 0 });
  const titleOrigin = useSharedValue<Point>({ x: 0, y: 0 });

  const anchorRef = useRef<View>(null);
  const [anchorRect, setAnchorRect] = useState<AnchorRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [panelHeight, setPanelHeight] = useState(0);
  const [mounted, setMounted] = useState(open);
  const [presented, setPresented] = useState(open);

  const panelWidth = Math.min(
    panelWidthProp ?? screenWidth * DEFAULT_PANEL_WIDTH_RATIO,
    screenWidth - screenMargin * 2,
    panelWidthProp ?? MAX_PANEL_WIDTH
  );

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const requestOpen = useCallback(() => {
    const node = anchorRef.current;
    if (!node) {
      setOpen(true);
      return;
    }
    node.measureInWindow((x, y, w, h) => {
      setAnchorRect({ x, y, w, h });
      setOpen(true);
    });
  }, [setOpen]);

  const select = useCallback(
    (value?: string) => {
      onSelect?.(value);
      if (closeOnSelect) setOpen(false);
    },
    [onSelect, closeOnSelect, setOpen]
  );

  const registerPanel = useCallback((h: number) => {
    setPanelHeight((prev) => (Math.abs(prev - h) < 0.5 ? prev : h));
  }, []);

  const registerLabelOrigin = useCallback((point: Point) => { labelOrigin.value = point; }, [labelOrigin]);
  const registerTitleOrigin = useCallback((point: Point) => { titleOrigin.value = point; }, [titleOrigin]);

  useEffect(() => {
    if (!open) return;
    setMounted(true);
    // Two rAFs: the first lets the Modal mount and the anchor's real layout
    // settle, the second flips `presented` so the very first animated frame
    // already has a measured panel height to morph towards.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPresented(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [open]);

  useEffect(() => {
    if (reduceMotion) {
      progress.value = open ? 1 : 0;
      reveal.value = open ? 1 : 0;
      handoff.value = open ? 1 : 0;
      if (!open) setMounted(false);
      return;
    }
    if (open) {
      if (!presented) return;
      progress.value = withSpring(1, MORPH_SPRING);
      reveal.value = withDelay(REVEAL_DELAY, withTiming(1, { duration: REVEAL_DURATION, easing: REVEAL_EASING }));
      handoff.value = withDelay(HANDOFF_DELAY, withTiming(1, { duration: HANDOFF_DURATION, easing: HANDOFF_EASING }));
      return;
    }
    reveal.value = withTiming(0, { duration: CLOSE_DURATION, easing: CLOSE_EASING });
    handoff.value = withTiming(0, { duration: HANDOFF_CLOSE_DURATION, easing: HANDOFF_EASING });
    progress.value = withSpring(0, MORPH_CLOSE_SPRING, (finished) => {
      "worklet";
      if (finished) {
        runOnJS(setMounted)(false);
        runOnJS(setPresented)(false);
      }
    });
  }, [open, presented, reduceMotion, progress, reveal, handoff]);

  const palette = useMemo<UnfoldMenuPalette>(() => ({ ...PALETTES[theme], ...paletteProp }), [theme, paletteProp]);

  const panelHeightResolved = panelHeight || anchorRect.h;
  const target = clampToScreen(anchorRect, panelWidth, panelHeightResolved, screenWidth, screenHeight, screenMargin, insets.top, insets.bottom);
  const panelOrigin = useMemo(() => ({ x: target.left, y: target.top }), [target.left, target.top]);

  const ctx = useMemo<UnfoldMenuContextValue>(
    () => ({
      open, overlayVisible: mounted, requestOpen, setOpen, select, progress, reveal, handoff,
      panelWidth, registerPanel, anchorRect, panelOrigin, labelOrigin, titleOrigin,
      registerLabelOrigin, registerTitleOrigin, palette, iconSize, reduceMotion,
    }),
    [open, mounted, requestOpen, setOpen, select, progress, reveal, handoff, panelWidth, registerPanel,
      anchorRect, panelOrigin, labelOrigin, titleOrigin, registerLabelOrigin, registerTitleOrigin, palette, iconSize, reduceMotion]
  );

  const morphStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      transform: [
        { translateX: interpolate(p, [0, 1], [anchorRect.x, target.left]) },
        { translateY: interpolate(p, [0, 1], [anchorRect.y, target.top]) },
      ],
      width: interpolate(p, [0, 1], [anchorRect.w, panelWidth]),
      height: interpolate(p, [0, 1], [anchorRect.h, panelHeightResolved]),
    };
  });

  return (
    <UnfoldMenuContext.Provider value={ctx}>
      <View className={className}>
        <View ref={anchorRef} collapsable={false} className="self-start">
          <UnfoldMenuSlotContext.Provider value="anchor">{children}</UnfoldMenuSlotContext.Provider>
        </View>
      </View>

      {mounted ? (
        <Modal
          transparent
          statusBarTranslucent
          visible
          animationType="none"
          onRequestClose={() => setOpen(false)}
          onShow={() => setPresented(true)}
        >
          <Pressable className="absolute inset-0" onPress={() => setOpen(false)} />
          <Animated.View
            pointerEvents="box-none"
            className="absolute left-0 top-0 overflow-hidden border"
            style={[{ backgroundColor: palette.surface, borderColor: palette.border, borderRadius: radius }, morphStyle]}
          >
            <UnfoldMenuSlotContext.Provider value="overlay">{children}</UnfoldMenuSlotContext.Provider>
          </Animated.View>

          {/*
            The travelling trigger copy lives outside the panel: the panel
            resizes every frame, and anything inside it gets re-laid-out
            (text re-measured) along with it. Out here its layout is
            computed once and only its transform moves each frame.
          */}
          <UnfoldMenuSlotContext.Provider value="float">{children}</UnfoldMenuSlotContext.Provider>
        </Modal>
      ) : null}
    </UnfoldMenuContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Trigger
// ---------------------------------------------------------------------------

const triggerBase = "min-h-12 min-w-12 flex-row items-center justify-center gap-2 rounded-full border px-5";

export interface UnfoldMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function UnfoldMenuTrigger({ children, className }: UnfoldMenuTriggerProps) {
  const {
    open, overlayVisible, requestOpen, progress, handoff, palette, reduceMotion,
    anchorRect, panelOrigin, labelOrigin, titleOrigin, registerLabelOrigin,
  } = useUnfoldMenu("UnfoldMenuTrigger");
  const slot = useUnfoldMenuSlot();
  const pressed = useSharedValue(0);

  const travelStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const toX = panelOrigin.x + titleOrigin.value.x - labelOrigin.value.x;
    const toY = panelOrigin.y + titleOrigin.value.y - labelOrigin.value.y;
    return {
      transform: [
        { translateX: interpolate(p, [0, 1], [anchorRect.x, toX]) },
        { translateY: interpolate(p, [0, 1], [anchorRect.y, toY]) },
      ],
    };
  });

  const morphIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, TRIGGER_ICON_FADE_END], [1, 0], Extrapolation.CLAMP),
  }));

  const morphLabelStyle = useAnimatedStyle(() => {
    const h = handoff.value;
    return {
      opacity: interpolate(h, [0, MORPH_LABEL_FADE_END], [1, 0], Extrapolation.CLAMP),
      transformOrigin: "left center",
      transform: [
        { translateX: interpolate(h, [0, MORPH_LABEL_FADE_END], [0, -MORPH_PUSH_DISTANCE], Extrapolation.CLAMP) },
        { scale: interpolate(h, [0, MORPH_LABEL_FADE_END], [1, MORPH_LABEL_SCALE_TO], Extrapolation.CLAMP) },
      ],
    };
  });

  const morph = useMemo<UnfoldMenuMorph>(() => ({ iconStyle: morphIconStyle, labelStyle: morphLabelStyle }), [morphIconStyle, morphLabelStyle]);

  const onLabelLayout = useCallback(
    (event: LayoutChangeEvent) => registerLabelOrigin({ x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y }),
    [registerLabelOrigin]
  );
  const measurer = useMemo<UnfoldMenuMorph>(() => ({ onLabelLayout }), [onLabelLayout]);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - (1 - PRESS_SCALE) * (reduceMotion ? 0 : pressed.value) }],
  }));

  if (slot === "overlay") return null;

  if (slot === "float") {
    return (
      <Animated.View pointerEvents="none" className={cn("absolute left-0 top-0", triggerBase, className)} style={travelStyle}>
        <UnfoldMenuMorphContext.Provider value={morph}>
          <UnfoldMenuTintContext.Provider value={palette.text}>{children}</UnfoldMenuTintContext.Provider>
        </UnfoldMenuMorphContext.Provider>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={requestOpen}
        onPressIn={() => { pressed.value = withTiming(1, PRESS_TIMING); }}
        onPressOut={() => { pressed.value = withTiming(0, PRESS_TIMING); }}
        className={cn(triggerBase, className)}
        style={[{ backgroundColor: palette.surface, borderColor: palette.border }, overlayVisible ? { opacity: 0 } : null]}
      >
        <UnfoldMenuMorphContext.Provider value={measurer}>
          <UnfoldMenuTintContext.Provider value={palette.text}>{children}</UnfoldMenuTintContext.Provider>
        </UnfoldMenuMorphContext.Provider>
      </Pressable>
    </Animated.View>
  );
}

// ---------------------------------------------------------------------------
// Content / chrome
// ---------------------------------------------------------------------------

export interface UnfoldMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

export function UnfoldMenuContent({ children, className }: UnfoldMenuContentProps) {
  const { open, progress, panelWidth, registerPanel } = useUnfoldMenu("UnfoldMenuContent");
  const slot = useUnfoldMenuSlot();

  const onLayout = useCallback((event: LayoutChangeEvent) => registerPanel(event.nativeEvent.layout.height), [registerPanel]);

  const layerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [CONTENT_FADE_START, CONTENT_FADE_END], [0, 1], Extrapolation.CLAMP),
  }));

  if (slot === "anchor") {
    // Invisible, laid out once to measure the panel's natural height.
    return (
      <View pointerEvents="none" onLayout={onLayout} className="absolute left-0 top-0 opacity-0" style={{ width: panelWidth }}>
        {children}
      </View>
    );
  }
  if (slot === "float") return null;

  return (
    <Animated.View
      pointerEvents={open ? "auto" : "none"}
      className={cn("absolute left-0 top-0", className)}
      style={[{ width: panelWidth }, layerStyle]}
    >
      {children}
    </Animated.View>
  );
}

export interface UnfoldMenuHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function UnfoldMenuHeader({ children, className }: UnfoldMenuHeaderProps) {
  const { palette } = useUnfoldMenu("UnfoldMenuHeader");
  const slot = useUnfoldMenuSlot();
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y } = event.nativeEvent.layout;
    setOffset((prev) => (prev.x === x && prev.y === y ? prev : { x, y }));
  }, []);

  return (
    <View
      onLayout={slot === "anchor" ? onLayout : undefined}
      className={cn("flex-row items-center justify-between border-b px-4 py-3", className)}
      style={{ borderBottomColor: palette.border }}
    >
      <UnfoldMenuOffsetContext.Provider value={offset}>{children}</UnfoldMenuOffsetContext.Provider>
    </View>
  );
}

export interface UnfoldMenuTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function UnfoldMenuTitle({ children, className }: UnfoldMenuTitleProps) {
  const { palette, handoff, registerTitleOrigin } = useUnfoldMenu("UnfoldMenuTitle");
  const offset = useUnfoldMenuOffset();
  const slot = useUnfoldMenuSlot();
  const [local, setLocal] = useState<Point | null>(null);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y } = event.nativeEvent.layout;
    setLocal((prev) => (prev && prev.x === x && prev.y === y ? prev : { x, y }));
  }, []);

  useEffect(() => {
    if (!local) return;
    registerTitleOrigin({ x: offset.x + local.x, y: offset.y + local.y });
  }, [local, offset.x, offset.y, registerTitleOrigin]);

  const fadeStyle = useAnimatedStyle(() => {
    const h = handoff.value;
    return {
      opacity: interpolate(h, [MORPH_TITLE_FADE_START, 1], [0, 1], Extrapolation.CLAMP),
      transformOrigin: "left center",
      transform: [
        { translateX: interpolate(h, [MORPH_TITLE_FADE_START, 1], [MORPH_PUSH_DISTANCE, 0], Extrapolation.CLAMP) },
        { scale: interpolate(h, [MORPH_TITLE_FADE_START, 1], [MORPH_TITLE_SCALE_FROM, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <Animated.Text
      onLayout={slot === "anchor" ? onLayout : undefined}
      className={cn("text-sm font-medium", className)}
      style={[{ color: palette.mutedText }, slot === "overlay" ? fadeStyle : null]}
    >
      {children}
    </Animated.Text>
  );
}

export interface UnfoldMenuCloseProps {
  children?: React.ReactNode | ((state: { color: string; size: number }) => React.ReactNode);
  className?: string;
}

export function UnfoldMenuClose({ children, className }: UnfoldMenuCloseProps) {
  const { setOpen, palette, iconSize } = useUnfoldMenu("UnfoldMenuClose");
  const state = { color: palette.mutedText, size: iconSize };
  const content = typeof children === "function" ? children(state) : (children ?? null);

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Close menu"
      hitSlop={10}
      onPress={() => setOpen(false)}
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
    >
      <UnfoldMenuTintContext.Provider value={palette.mutedText}>
        {content ?? <X size={state.size} color={state.color} strokeWidth={2.5} />}
      </UnfoldMenuTintContext.Provider>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Grid / items
// ---------------------------------------------------------------------------

export interface UnfoldMenuGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export function UnfoldMenuGrid({ children, columns = DEFAULT_COLUMNS, className }: UnfoldMenuGridProps) {
  const items = React.Children.toArray(children);
  return (
    <View className={cn("flex-row flex-wrap", className)}>
      {items.map((child, index) => (
        <UnfoldMenuGridContext.Provider key={index} value={{ index, count: items.length, columns }}>
          {child}
        </UnfoldMenuGridContext.Provider>
      ))}
    </View>
  );
}

export interface UnfoldMenuItemProps {
  children: React.ReactNode;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export function UnfoldMenuItem({ children, value, onPress, disabled = false, className }: UnfoldMenuItemProps) {
  const { select, reveal, palette, reduceMotion } = useUnfoldMenu("UnfoldMenuItem");
  const { index, count, columns } = useUnfoldMenuGrid();

  const rows = Math.ceil(count / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  const maxDistance = Math.hypot((columns - 1) / 2, (rows - 1) / 2) || 1;
  const distance = Math.hypot(col - (columns - 1) / 2, row - (rows - 1) / 2);
  const start = (distance / maxDistance) * STAGGER_SPAN;

  // Items reveal outward from the grid's center, nearest first, each one
  // fading and scaling in over its own [start, start + window] slice of the
  // shared `reveal` timeline — one shared value drives every item's stagger.
  const itemStyle = useAnimatedStyle(() => {
    if (reduceMotion) return { opacity: reveal.value, transform: [] };
    const t = interpolate(reveal.value, [start, start + ITEM_WINDOW], [0, 1], Extrapolation.CLAMP);
    return { opacity: t, transform: [{ scale: ITEM_SCALE_FROM + (1 - ITEM_SCALE_FROM) * t }] };
  });

  const handlePress = useCallback(() => {
    onPress?.();
    select(value);
  }, [onPress, select, value]);

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      className={cn("min-h-12 items-center justify-center px-3 py-[22px]", disabled && "opacity-40", className)}
      style={{
        width: `${100 / columns}%`,
        borderRightWidth: col === columns - 1 ? 0 : 0.5,
        borderBottomWidth: row === rows - 1 ? 0 : 0.5,
        borderColor: palette.border,
      }}
    >
      <Animated.View className="items-center justify-center gap-2" style={itemStyle}>
        <UnfoldMenuTintContext.Provider value={palette.mutedText}>{children}</UnfoldMenuTintContext.Provider>
      </Animated.View>
    </Pressable>
  );
}

export interface UnfoldMenuIconProps {
  children: React.ReactNode | ((state: { color: string; size: number }) => React.ReactNode);
  className?: string;
}

export function UnfoldMenuIcon({ children, className }: UnfoldMenuIconProps) {
  const { palette, iconSize } = useUnfoldMenu("UnfoldMenuIcon");
  const color = useUnfoldMenuTint(palette.text);
  const morph = useUnfoldMenuMorph();
  const content = typeof children === "function" ? children({ color, size: iconSize }) : children;

  return (
    <Animated.View className={cn("items-center justify-center", className)} style={[{ width: iconSize, height: iconSize }, morph?.iconStyle]}>
      {content}
    </Animated.View>
  );
}

export interface UnfoldMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function UnfoldMenuLabel({ children, className }: UnfoldMenuLabelProps) {
  const { palette } = useUnfoldMenu("UnfoldMenuLabel");
  const color = useUnfoldMenuTint(palette.text);
  const morph = useUnfoldMenuMorph();

  return (
    <Animated.Text
      numberOfLines={1}
      onLayout={morph?.onLabelLayout}
      className={cn("text-sm font-medium", className)}
      style={[{ color }, morph?.labelStyle]}
    >
      {children}
    </Animated.Text>
  );
}
