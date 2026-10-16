import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, View, type LayoutChangeEvent } from "react-native";
import { Blur, Canvas, ColorMatrix, Group, Paint, RoundedRect } from "@shopify/react-native-skia";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { Search, X } from "lucide-react-native";
import { cn } from "@/lib/utils";

const HEIGHT = 46;
const PAD_V = 8;
const CLOSE_W = HEIGHT;
const ICON_SIZE = 18;
const DEFAULT_SPRING: WithSpringConfig = { damping: 18, stiffness: 200, mass: 0.9 };
// Same alpha-threshold metaball trick used elsewhere in this family —
// blur two capsules then sharpen alpha so they read as one continuous pill
// while they overlap, without needing an SkSL shader for a smooth-min blend.
const GOO_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 22, -11];

type TabLayout = { x: number; width: number };

type GooeySearchTabsContextValue = {
  progress: SharedValue<number>;
  expanded: boolean;
  expand: () => void;
  collapse: () => void;
  toggle: () => void;
  value: string;
  setValue: (v: string) => void;
  activeTab: string;
  selectTab: (v: string) => void;
  registerTab: (value: string) => void;
  unregisterTab: (value: string) => void;
  reportLayout: (value: string, layout: TabLayout) => void;
  layouts: Record<string, TabLayout>;
  tabsW: number;
  setTabsWidth: (w: number) => void;
  springConfig: WithSpringConfig;
};

const GooeySearchTabsContext = createContext<GooeySearchTabsContextValue | null>(null);
const TabContext = createContext<{ value: string; active: boolean } | null>(null);

function useGooeySearchTabsContext(component: string) {
  const ctx = useContext(GooeySearchTabsContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <GooeySearchTabs>.`);
  return ctx;
}

function useTabContext(component: string) {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <GooeySearchTabsTab>.`);
  return ctx;
}

export interface GooeySearchTabsProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  activeTab?: string;
  defaultActiveTab?: string;
  onTabChange?: (value: string) => void;
  placeholder?: string;
  springConfig?: WithSpringConfig;
  color?: string;
}

/** Root: a Skia goo layer draws two capsules — a left one that grows from an
 * icon-sized cap into the search input's width, and a right one that shrinks
 * from the tabs row into the close button — so the whole bar reads as one
 * continuously merged pill as it morphs between search and tabs mode. */
export function GooeySearchTabs({
  children,
  className,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onTabChange,
  placeholder = "Search",
  springConfig = DEFAULT_SPRING,
  color = "#ffffff",
}: GooeySearchTabsProps) {
  const progress = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [order, setOrder] = useState<string[]>([]);
  const [internalActive, setInternalActive] = useState(defaultActiveTab ?? "");
  const [tabsW, setTabsW] = useState(0);
  const [layouts, setLayouts] = useState<Record<string, TabLayout>>({});
  const inputRef = useRef<TextInput>(null);

  const value = controlledValue ?? internalValue;
  const activeTab = controlledActiveTab ?? internalActive ?? order[0] ?? "";

  const registerTab = useCallback((v: string) => {
    setOrder((prev) => (prev.includes(v) ? prev : [...prev, v]));
  }, []);
  const unregisterTab = useCallback((v: string) => {
    setOrder((prev) => prev.filter((x) => x !== v));
    setLayouts((prev) => {
      if (!(v in prev)) return prev;
      const next = { ...prev };
      delete next[v];
      return next;
    });
  }, []);
  const reportLayout = useCallback((v: string, layout: TabLayout) => {
    setLayouts((prev) => (prev[v]?.x === layout.x && prev[v]?.width === layout.width ? prev : { ...prev, [v]: layout }));
  }, []);
  const setTabsWidth = useCallback((w: number) => setTabsW((prev) => (prev === w ? prev : w)), []);

  useEffect(() => {
    if (!internalActive && order.length > 0) setInternalActive(order[0]);
  }, [order, internalActive]);

  const expand = useCallback(() => {
    setExpanded(true);
    progress.value = withSpring(1, springConfig);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [progress, springConfig]);
  const collapse = useCallback(() => {
    setExpanded(false);
    progress.value = withSpring(0, springConfig);
    if (controlledValue === undefined) setInternalValue("");
    inputRef.current?.blur();
  }, [controlledValue, progress, springConfig]);
  const toggle = useCallback(() => (expanded ? collapse() : expand()), [expanded, expand, collapse]);

  const setValue = useCallback(
    (v: string) => {
      if (controlledValue === undefined) setInternalValue(v);
      onChange?.(v);
    },
    [controlledValue, onChange],
  );
  const selectTab = useCallback(
    (v: string) => {
      if (controlledActiveTab === undefined) setInternalActive(v);
      onTabChange?.(v);
    },
    [controlledActiveTab, onTabChange],
  );

  const ctx = useMemo<GooeySearchTabsContextValue>(
    () => ({ progress, expanded, expand, collapse, toggle, value, setValue, activeTab, selectTab, registerTab, unregisterTab, reportLayout, layouts, tabsW, setTabsWidth, springConfig }),
    [progress, expanded, expand, collapse, toggle, value, setValue, activeTab, selectTab, registerTab, unregisterTab, reportLayout, layouts, tabsW, setTabsWidth, springConfig],
  );

  const total = HEIGHT + tabsW;
  const leftX = useSharedValue(0);
  const leftW = useDerivedValue(() => HEIGHT + (tabsW - HEIGHT) * progress.value, [tabsW]);
  const rightW = useDerivedValue(() => tabsW + (CLOSE_W - tabsW) * progress.value, [tabsW]);
  const rightX = useDerivedValue(() => total - rightW.value, [total]);

  const inputStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.35, 0.9], [0, 1], Extrapolation.CLAMP),
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-10, 0], Extrapolation.CLAMP) }],
  }));
  const closeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.55, 1], [0, 1], Extrapolation.CLAMP),
    transform: [{ scale: interpolate(progress.value, [0.5, 1], [0.6, 1], Extrapolation.CLAMP) }],
  }));

  return (
    <GooeySearchTabsContext.Provider value={ctx}>
      <View className={cn("self-center justify-center", className)} style={{ width: total, height: HEIGHT }}>
        {tabsW > 0 ? (
          <Canvas pointerEvents="none" style={{ position: "absolute", left: 0, right: 0, top: -PAD_V, height: HEIGHT + PAD_V * 2 }}>
            <Group layer={<Paint><Blur blur={6} /><ColorMatrix matrix={GOO_MATRIX} /></Paint>}>
              <RoundedRect x={leftX} y={PAD_V} width={leftW} height={HEIGHT} r={HEIGHT / 2} color={color} />
              <RoundedRect x={rightX} y={PAD_V} width={rightW} height={HEIGHT} r={HEIGHT / 2} color={color} />
            </Group>
          </Canvas>
        ) : null}

        {children}

        <Animated.View
          className="absolute justify-center pr-3.5"
          style={[{ left: HEIGHT, right: HEIGHT, top: 0, height: HEIGHT }, inputStyle]}
          pointerEvents={expanded ? "auto" : "none"}
        >
          <TextInput
            ref={inputRef}
            className="p-0 text-base text-foreground"
            placeholder={placeholder}
            placeholderTextColor="#8a8a90"
            value={value}
            editable={expanded}
            onChangeText={setValue}
            onSubmitEditing={() => onSearch?.(value)}
            returnKeyType="search"
          />
        </Animated.View>

        <Animated.View
          className="absolute right-0 top-0 items-center justify-center"
          style={[{ width: CLOSE_W, height: HEIGHT }, closeStyle]}
          pointerEvents={expanded ? "auto" : "none"}
        >
          <Pressable
            onPress={collapse}
            hitSlop={8}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Close search"
            className="min-h-12 min-w-12 items-center justify-center"
          >
            <X size={ICON_SIZE} color="#1d1d1f" />
          </Pressable>
        </Animated.View>
      </View>
    </GooeySearchTabsContext.Provider>
  );
}

export interface GooeySearchTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

export function GooeySearchTabsTrigger({ children, className, ...props }: GooeySearchTabsTriggerProps) {
  const { expanded, expand } = useGooeySearchTabsContext("GooeySearchTabsTrigger");
  return (
    <Pressable
      onPress={expanded ? undefined : expand}
      hitSlop={8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Search"
      className={cn("absolute left-0 top-0 min-h-12 min-w-12 items-center justify-center", className)}
      style={{ width: HEIGHT, height: HEIGHT }}
      {...props}
    >
      {children ?? <Search size={ICON_SIZE} color="#1d1d1f" />}
    </Pressable>
  );
}

export interface GooeySearchTabsTabsProps {
  children: React.ReactNode;
  className?: string;
}

export function GooeySearchTabsTabs({ children, className }: GooeySearchTabsTabsProps) {
  const { progress, expanded, activeTab, layouts, setTabsWidth, springConfig } = useGooeySearchTabsContext("GooeySearchTabsTabs");
  const idxX = useSharedValue(0);
  const idxW = useSharedValue(0);

  useEffect(() => {
    const l = layouts[activeTab];
    if (!l) return;
    const immediate = idxW.value === 0;
    idxX.value = immediate ? l.x : withSpring(l.x, springConfig);
    idxW.value = immediate ? l.width : withSpring(l.width, springConfig);
  }, [activeTab, layouts, springConfig, idxX, idxW]);

  const rowStyle = useAnimatedStyle(() => ({ opacity: interpolate(progress.value, [0, 0.45], [1, 0], Extrapolation.CLAMP) }));
  const indicatorStyle = useAnimatedStyle(() => ({ transform: [{ translateX: idxX.value }], width: idxW.value }));

  return (
    <Animated.View
      className={cn("absolute right-0 top-0 flex-row items-center px-1.5", className)}
      style={[{ height: HEIGHT }, rowStyle]}
      pointerEvents={expanded ? "none" : "auto"}
      onLayout={(e: LayoutChangeEvent) => setTabsWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View className="absolute rounded-full bg-black/[0.06]" style={[{ top: (HEIGHT - 32) / 2, left: 0, height: 32 }, indicatorStyle]} />
      {children}
    </Animated.View>
  );
}

export interface GooeySearchTabsTabProps {
  value: string;
  children: React.ReactNode;
  onPress?: (value: string) => void;
  className?: string;
}

export function GooeySearchTabsTab({ value, children, onPress, className }: GooeySearchTabsTabProps) {
  const { activeTab, selectTab, registerTab, unregisterTab, reportLayout } = useGooeySearchTabsContext("GooeySearchTabsTab");

  useEffect(() => {
    registerTab(value);
    return () => unregisterTab(value);
  }, [value, registerTab, unregisterTab]);

  const active = value === activeTab;
  const tabCtx = useMemo(() => ({ value, active }), [value, active]);

  return (
    <TabContext.Provider value={tabCtx}>
      <Pressable
        onPress={() => {
          selectTab(value);
          onPress?.(value);
        }}
        onLayout={(e: LayoutChangeEvent) => reportLayout(value, { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width })}
        accessible={true}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        className={cn("min-h-12 flex-row items-center gap-1.5 px-8", className)}
      >
        {children}
      </Pressable>
    </TabContext.Provider>
  );
}

export interface GooeySearchTabsTabIconProps {
  children: React.ReactNode;
  className?: string;
}

export function GooeySearchTabsTabIcon({ children, className }: GooeySearchTabsTabIconProps) {
  const { active } = useTabContext("GooeySearchTabsTabIcon");
  return <View className={cn("items-center justify-center", active ? "opacity-100" : "opacity-60", className)}>{children}</View>;
}

export interface GooeySearchTabsTabLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function GooeySearchTabsTabLabel({ children, className }: GooeySearchTabsTabLabelProps) {
  const { active } = useTabContext("GooeySearchTabsTabLabel");
  return (
    <Text className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground", className)} numberOfLines={1}>
      {children}
    </Text>
  );
}
