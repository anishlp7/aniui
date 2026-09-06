import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { Ellipsis, X } from "lucide-react-native";
import { cn } from "@/lib/utils";

export type ActionRailSize = "sm" | "md";
export type ActionRailTheme = "light" | "dark";

export interface ActionRailPalette {
  track: string;
  border: string;
  action: string;
  actionText: string;
  toggle: string;
  toggleText: string;
}

interface ActionRailMetrics {
  trackPadding: number;
  gap: number;
  actionHeight: number;
  actionPaddingX: number;
  actionGap: number;
  toggleSize: number;
  iconSize: number;
  fontSize: number;
}

const SHELL_SPRING: WithSpringConfig = { damping: 13, stiffness: 150, mass: 0.5 };
const PRESS_SPRING: WithSpringConfig = { damping: 22, stiffness: 420, mass: 0.6 };
const PRESS_SCALE = 0.95;
const GLYPH_SPRING: WithSpringConfig = { damping: 16, stiffness: 220, mass: 0.6 };
const GLYPH_MIN_SCALE = 0.55;

const SIZES: Record<ActionRailSize, ActionRailMetrics> = {
  sm: { trackPadding: 4, gap: 4, actionHeight: 32, actionPaddingX: 12, actionGap: 6, toggleSize: 32, iconSize: 14, fontSize: 12 },
  md: { trackPadding: 6, gap: 6, actionHeight: 36, actionPaddingX: 14, actionGap: 8, toggleSize: 36, iconSize: 16, fontSize: 14 },
};

const LIGHT_PALETTE: ActionRailPalette = {
  track: "#ffffff", border: "#e3e7ec", action: "#f5f7fa", actionText: "#111111",
  toggle: "#111111", toggleText: "#ffffff",
};
const DARK_PALETTE: ActionRailPalette = {
  track: "#171716", border: "#2b2a25", action: "#232320", actionText: "#f6f3ec",
  toggle: "#f6f3ec", toggleText: "#111111",
};
const PALETTES: Record<ActionRailTheme, ActionRailPalette> = { light: LIGHT_PALETTE, dark: DARK_PALETTE };

// Shared layout transition so the track resizes (as actions or the overflow
// group mount/unmount) with the same spring feel as the press interactions,
// instead of Reanimated's default linear layout animation.
function shellLayout() {
  return LinearTransition.springify()
    .damping(SHELL_SPRING.damping as number)
    .stiffness(SHELL_SPRING.stiffness as number)
    .mass(SHELL_SPRING.mass as number);
}

interface ActionRailContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  notifyAction: (value?: string) => void;
  palette: ActionRailPalette;
  metrics: ActionRailMetrics;
  reduceMotion: boolean;
}

const ActionRailContext = createContext<ActionRailContextValue | null>(null);

function useActionRail(part: string) {
  const ctx = useContext(ActionRailContext);
  if (!ctx) throw new Error(`<${part}> must be rendered inside <ActionRail>.`);
  return ctx;
}

const ActionRailTintContext = createContext<string | null>(null);

function useActionRailTint(fallback: string): string {
  return useContext(ActionRailTintContext) ?? fallback;
}

export interface ActionRailProps {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onAction?: (value?: string) => void;
  collapseOnAction?: boolean;
  size?: ActionRailSize;
  theme?: ActionRailTheme;
  palette?: Partial<ActionRailPalette>;
}

/**
 * Expandable icon rail/toolbar: a track of always-visible actions plus a
 * `Trigger` that reveals an `Overflow` group of labeled actions. Ships its
 * own light/dark palette (independent of the app's shadcn theme tokens) so
 * the rail can sit as a floating overlay control on top of photos/maps/video
 * — override any color via the `palette` prop.
 */
export function ActionRail({
  children,
  className,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  onAction,
  collapseOnAction = false,
  size = "md",
  theme: themeProp,
  palette: paletteProp,
}: ActionRailProps) {
  const isControlled = expandedProp !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = isControlled ? (expandedProp as boolean) : internalExpanded;
  const reduceMotion = useReducedMotion();
  const systemDark = useColorScheme() === "dark";
  const theme = themeProp ?? (systemDark ? "dark" : "light");

  const setExpanded = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    },
    [isControlled, onExpandedChange]
  );

  const notifyAction = useCallback(
    (value?: string) => {
      onAction?.(value);
      if (collapseOnAction) setExpanded(false);
    },
    [onAction, collapseOnAction, setExpanded]
  );

  const palette = useMemo<ActionRailPalette>(() => ({ ...PALETTES[theme], ...paletteProp }), [theme, paletteProp]);
  const metrics = SIZES[size];

  const ctx = useMemo<ActionRailContextValue>(
    () => ({ expanded, setExpanded, notifyAction, palette, metrics, reduceMotion }),
    [expanded, setExpanded, notifyAction, palette, metrics, reduceMotion]
  );

  return (
    <ActionRailContext.Provider value={ctx}>
      <View className={className}>
        <Animated.View
          layout={reduceMotion ? undefined : shellLayout()}
          className="flex-row items-center self-start overflow-hidden border"
          style={{
            backgroundColor: palette.track,
            borderColor: palette.border,
            borderRadius: metrics.actionHeight / 2 + metrics.trackPadding,
            padding: metrics.trackPadding,
            gap: metrics.gap,
          }}
        >
          {children}
        </Animated.View>
      </View>
    </ActionRailContext.Provider>
  );
}

export interface ActionRailRowProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionRailGroup({ children, className }: ActionRailRowProps) {
  const { metrics, reduceMotion } = useActionRail("ActionRailGroup");
  return (
    <Animated.View
      layout={reduceMotion ? undefined : shellLayout()}
      className={cn("flex-row items-center", className)}
      style={{ gap: metrics.gap }}
    >
      {children}
    </Animated.View>
  );
}

export function ActionRailOverflow({ children, className }: ActionRailRowProps) {
  const { expanded, metrics, reduceMotion } = useActionRail("ActionRailOverflow");
  if (!expanded) return null;
  return (
    <Animated.View
      entering={reduceMotion ? undefined : FadeIn.duration(220)}
      exiting={reduceMotion ? undefined : FadeOut.duration(140)}
      layout={reduceMotion ? undefined : shellLayout()}
      className={cn("flex-row items-center", className)}
      style={{ gap: metrics.gap }}
    >
      {children}
    </Animated.View>
  );
}

export interface ActionRailActionProps {
  children: React.ReactNode;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ActionRailAction({ children, value, onPress, disabled = false, className }: ActionRailActionProps) {
  const { palette, metrics, notifyAction, reduceMotion } = useActionRail("ActionRailAction");
  const pressed = useSharedValue(0);
  const hitSlop = Math.max(0, (48 - metrics.actionHeight) / 2);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - (1 - PRESS_SCALE) * (reduceMotion ? 0 : pressed.value) }],
  }));

  const handlePress = useCallback(() => {
    onPress?.();
    notifyAction(value);
  }, [onPress, notifyAction, value]);

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        accessible={true}
        accessibilityRole="button"
        disabled={disabled}
        hitSlop={hitSlop}
        onPress={handlePress}
        onPressIn={() => { pressed.value = withSpring(1, PRESS_SPRING); }}
        onPressOut={() => { pressed.value = withSpring(0, PRESS_SPRING); }}
        className={cn("flex-row items-center justify-center", disabled && "opacity-45", className)}
        style={{
          backgroundColor: palette.action,
          height: metrics.actionHeight,
          minWidth: metrics.actionHeight,
          borderRadius: metrics.actionHeight / 2,
          paddingHorizontal: metrics.actionPaddingX,
          gap: metrics.actionGap,
        }}
      >
        <ActionRailTintContext.Provider value={palette.actionText}>{children}</ActionRailTintContext.Provider>
      </Pressable>
    </Animated.View>
  );
}

export interface ActionRailIconProps {
  children: React.ReactNode | ((state: { color: string; size: number }) => React.ReactNode);
  className?: string;
}

export function ActionRailIcon({ children, className }: ActionRailIconProps) {
  const { palette, metrics } = useActionRail("ActionRailIcon");
  const color = useActionRailTint(palette.actionText);
  const content = typeof children === "function" ? children({ color, size: metrics.iconSize }) : children;

  return (
    <View className={cn("items-center justify-center", className)} style={{ width: metrics.iconSize, height: metrics.iconSize }}>
      {content}
    </View>
  );
}

export interface ActionRailLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionRailLabel({ children, className }: ActionRailLabelProps) {
  const { palette, metrics } = useActionRail("ActionRailLabel");
  const color = useActionRailTint(palette.actionText);
  return (
    <Text numberOfLines={1} className={cn("font-medium", className)} style={{ color, fontSize: metrics.fontSize }}>
      {children}
    </Text>
  );
}

export interface ActionRailTriggerProps {
  children?: React.ReactNode | ((state: { expanded: boolean; color: string; size: number }) => React.ReactNode);
  className?: string;
}

export function ActionRailTrigger({ children, className }: ActionRailTriggerProps) {
  const { expanded, setExpanded, palette, metrics, reduceMotion } = useActionRail("ActionRailTrigger");
  const pressed = useSharedValue(0);
  const hitSlop = Math.max(0, (48 - metrics.toggleSize) / 2);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - (1 - PRESS_SCALE) * (reduceMotion ? 0 : pressed.value) }],
  }));

  const state = { expanded, color: palette.toggleText, size: metrics.iconSize };
  const content = typeof children === "function" ? children(state) : (children ?? null);

  return (
    <Animated.View layout={reduceMotion ? undefined : shellLayout()} style={pressStyle}>
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={expanded ? "Hide extra actions" : "Show extra actions"}
        hitSlop={hitSlop}
        onPress={() => setExpanded(!expanded)}
        onPressIn={() => { pressed.value = withSpring(1, PRESS_SPRING); }}
        onPressOut={() => { pressed.value = withSpring(0, PRESS_SPRING); }}
        className={cn("items-center justify-center", className)}
        style={{ backgroundColor: palette.toggle, width: metrics.toggleSize, height: metrics.toggleSize, borderRadius: metrics.toggleSize / 2 }}
      >
        <ActionRailTintContext.Provider value={palette.toggleText}>
          {content ?? (
            <DefaultTriggerGlyph expanded={expanded} color={palette.toggleText} size={metrics.fontSize} reduceMotion={reduceMotion} />
          )}
        </ActionRailTintContext.Provider>
      </Pressable>
    </Animated.View>
  );
}

interface DefaultTriggerGlyphProps {
  expanded: boolean;
  color: string;
  size: number;
  reduceMotion: boolean;
}

// Cross-fades the "more" glyph into a "close" glyph, each scaling up from
// GLYPH_MIN_SCALE as it appears and back down as it leaves, plus a quarter
// turn, so the swap reads as one continuous rotation rather than a hard cut.
function DefaultTriggerGlyph({ expanded, color, size, reduceMotion }: DefaultTriggerGlyphProps) {
  const progress = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    const target = expanded ? 1 : 0;
    progress.value = reduceMotion ? target : withSpring(target, GLYPH_SPRING);
  }, [expanded, reduceMotion, progress]);

  const moreStyle = useAnimatedStyle(() => {
    const shown = 1 - progress.value;
    return {
      opacity: shown,
      transform: [
        { scale: GLYPH_MIN_SCALE + (1 - GLYPH_MIN_SCALE) * shown },
        { rotate: `${progress.value * 90}deg` },
      ],
    };
  });

  const closeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: GLYPH_MIN_SCALE + (1 - GLYPH_MIN_SCALE) * progress.value },
      { rotate: `${(progress.value - 1) * 90}deg` },
    ],
  }));

  return (
    <View className="items-center justify-center">
      <Animated.View style={moreStyle}>
        <Ellipsis size={size + 4} color={color} strokeWidth={2.5} />
      </Animated.View>
      <Animated.View className="absolute" style={closeStyle}>
        <X size={size + 4} color={color} strokeWidth={2.5} />
      </Animated.View>
    </View>
  );
}
