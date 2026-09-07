import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { Dimensions, Pressable, Text, View, type LayoutChangeEvent } from "react-native";
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
import { Plus } from "lucide-react-native";
import { cn } from "@/lib/utils";

type MorphFabDirection = "up" | "down" | "left" | "right";
type MorphFabAlign = "start" | "center" | "end";
type MorphFabRect = { x: number; y: number; w: number; h: number; r: number };
type MorphFabItemEntry = { id: string; w: number; h: number; color?: string };
type MorphFabGeo = {
  layerW: number;
  layerH: number;
  left: number;
  top: number;
  fab: MorphFabRect;
  slots: MorphFabRect[];
};

const OPEN_SPRING: WithSpringConfig = { stiffness: 140, damping: 17, mass: 0.45 };
const CLOSE_SPRING: WithSpringConfig = { stiffness: 170, damping: 20, mass: 0.45 };
const PRESS_IN_SPRING: WithSpringConfig = { stiffness: 150, damping: 14, mass: 0.5 };
const PRESS_OUT_SPRING: WithSpringConfig = { stiffness: 260, damping: 16, mass: 0.5 };
// Alpha-threshold ColorMatrix: sharpens a blurred layer's alpha channel so
// nearby blurred shapes visually fuse into one blob instead of overlapping
// translucently — the same metaball technique used elsewhere in this family.
const GOO_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 22, -11];
const LAYER_PADDING = 36;

function clampRadius(r: number, w: number, h: number) {
  return Math.max(0, Math.min(r, Math.min(w, h) / 2));
}

function crossOffset(align: MorphFabAlign, span: number, itemSpan: number) {
  if (align === "start") return 0;
  if (align === "end") return span - itemSpan;
  return (span - itemSpan) / 2;
}

function buildGeo(
  triggerW: number,
  triggerH: number,
  items: MorphFabItemEntry[],
  direction: MorphFabDirection,
  align: MorphFabAlign,
  sideOffset: number,
  spacing: number,
  itemRadius: number,
  triggerRadius: number,
): MorphFabGeo {
  const empty: MorphFabGeo = {
    layerW: 0,
    layerH: 0,
    left: 0,
    top: 0,
    fab: { x: 0, y: 0, w: 0, h: 0, r: 0 },
    slots: [],
  };
  if (triggerW <= 0 || triggerH <= 0) return empty;

  const vertical = direction === "up" || direction === "down";
  const slots: MorphFabRect[] = [];
  let run = sideOffset;

  for (const item of items) {
    const r = clampRadius(itemRadius, item.w, item.h);
    let x = 0;
    let y = 0;
    if (direction === "up") {
      x = crossOffset(align, triggerW, item.w);
      y = -(run + item.h);
    } else if (direction === "down") {
      x = crossOffset(align, triggerW, item.w);
      y = triggerH + run;
    } else if (direction === "left") {
      x = -(run + item.w);
      y = crossOffset(align, triggerH, item.h);
    } else {
      x = triggerW + run;
      y = crossOffset(align, triggerH, item.h);
    }
    slots.push({ x, y, w: item.w, h: item.h, r });
    run += (vertical ? item.h : item.w) + spacing;
  }

  let minX = 0;
  let minY = 0;
  let maxX = triggerW;
  let maxY = triggerH;
  for (const slot of slots) {
    minX = Math.min(minX, slot.x);
    minY = Math.min(minY, slot.y);
    maxX = Math.max(maxX, slot.x + slot.w);
    maxY = Math.max(maxY, slot.y + slot.h);
  }

  return {
    left: minX - LAYER_PADDING,
    top: minY - LAYER_PADDING,
    layerW: maxX - minX + LAYER_PADDING * 2,
    layerH: maxY - minY + LAYER_PADDING * 2,
    fab: { x: 0, y: 0, w: triggerW, h: triggerH, r: clampRadius(triggerRadius, triggerW, triggerH) },
    slots,
  };
}

function itemProgress(p: number, index: number, count: number, stagger: number) {
  "worklet";
  const span = Math.max(0.0001, 1 - stagger * Math.max(0, count - 1));
  const t = (p - index * stagger) / span;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

function slotAt(geo: MorphFabGeo, index: number, p: number): MorphFabRect {
  "worklet";
  const fab = geo.fab;
  const slot = geo.slots[index];
  if (!slot) return fab;
  const lerp = (a: number, b: number) => a + (b - a) * p;
  return {
    x: lerp(fab.x, slot.x),
    y: lerp(fab.y, slot.y),
    w: lerp(fab.w, slot.w),
    h: lerp(fab.h, slot.h),
    r: lerp(fab.r, slot.r),
  };
}

type MorphFabContextValue = {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  progress: SharedValue<number>;
  triggerScale: SharedValue<number>;
  items: MorphFabItemEntry[];
  registerItem: (id: string, color?: string) => void;
  unregisterItem: (id: string) => void;
  updateItem: (id: string, w: number, h: number) => void;
  selectItem: (value: string | undefined, onSelect?: (value?: string) => void) => void;
  geo: MorphFabGeo;
  stagger: number;
  itemPadding: number;
  itemGap: number;
};

const MorphFabContext = createContext<MorphFabContextValue | null>(null);

function useMorphFabContext(component: string) {
  const ctx = useContext(MorphFabContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <MorphFab>.`);
  return ctx;
}

export interface MorphFabProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: MorphFabDirection;
  align?: MorphFabAlign;
  sideOffset?: number;
  spacing?: number;
  itemRadius?: number;
  itemPadding?: number;
  itemGap?: number;
  triggerRadius?: number;
  triggerColor?: string;
  itemColor?: string;
  gooStrength?: number;
  stagger?: number;
  closeOnSelect?: boolean;
  dismissOnOutsidePress?: boolean;
}

/** Root: a Skia goo layer merges the trigger + item blobs, while real
 * Pressable content sits on top so taps, accessibility, and layout stay
 * ordinary React Native — the canvas is purely a visual metaball behind it. */
export function MorphFab({
  children,
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  direction = "up",
  align = "center",
  sideOffset = 16,
  spacing = 12,
  itemRadius = 999,
  itemPadding = 16,
  itemGap = 10,
  triggerRadius = 999,
  triggerColor = "#18181b",
  itemColor = "#27272a",
  gooStrength = 9,
  stagger = 0.1,
  closeOnSelect = true,
  dismissOnOutsidePress = true,
}: MorphFabProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolled;

  const progress = useSharedValue(defaultOpen ? 1 : 0);
  const triggerScale = useSharedValue(1);
  const [triggerSize, setTriggerSize] = useState({ w: 0, h: 0 });
  const [items, setItems] = useState<MorphFabItemEntry[]>([]);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
  const selectItem = useCallback(
    (value?: string, onSelect?: (value?: string) => void) => {
      onSelect?.(value);
      if (closeOnSelect) setOpen(false);
    },
    [closeOnSelect, setOpen],
  );

  useEffect(() => {
    progress.value = withSpring(open ? 1 : 0, open ? OPEN_SPRING : CLOSE_SPRING);
  }, [open, progress]);

  const registerItem = useCallback((id: string, color?: string) => {
    setItems((prev) => (prev.some((i) => i.id === id) ? prev : [...prev, { id, w: 0, h: 0, color }]));
  }, []);
  const unregisterItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);
  const updateItem = useCallback((id: string, w: number, h: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id && (Math.abs(i.w - w) > 0.5 || Math.abs(i.h - h) > 0.5) ? { ...i, w, h } : i)),
    );
  }, []);

  const geo = useMemo(
    () => buildGeo(triggerSize.w, triggerSize.h, items, direction, align, sideOffset, spacing, itemRadius, triggerRadius),
    [triggerSize, items, direction, align, sideOffset, spacing, itemRadius, triggerRadius],
  );
  const ready = geo.layerW > 0 && items.every((i) => i.w > 0 && i.h > 0);

  const ctx = useMemo<MorphFabContextValue>(
    () => ({
      open,
      toggle,
      setOpen,
      progress,
      triggerScale,
      items,
      registerItem,
      unregisterItem,
      updateItem,
      selectItem,
      geo,
      stagger,
      itemPadding,
      itemGap,
    }),
    [open, toggle, setOpen, progress, triggerScale, items, registerItem, unregisterItem, updateItem, selectItem, geo, stagger, itemPadding, itemGap],
  );

  const cx = geo.fab.x + geo.fab.w / 2;
  const cy = geo.fab.y + geo.fab.h / 2;
  const fx = useDerivedValue(() => cx - (geo.fab.w * triggerScale.value) / 2, [geo]);
  const fy = useDerivedValue(() => cy - (geo.fab.h * triggerScale.value) / 2, [geo]);
  const fw = useDerivedValue(() => geo.fab.w * triggerScale.value, [geo]);
  const fh = useDerivedValue(() => geo.fab.h * triggerScale.value, [geo]);
  const fr = useDerivedValue(() => geo.fab.r * triggerScale.value, [geo]);

  const { width: screenW, height: screenH } = Dimensions.get("window");

  return (
    <MorphFabContext.Provider value={ctx}>
      <View className={cn("relative", className)}>
        {open && dismissOnOutsidePress ? (
          <Pressable
            accessible={false}
            onPress={() => setOpen(false)}
            style={{ position: "absolute", left: -screenW, top: -screenH, width: screenW * 2, height: screenH * 2, zIndex: 5 }}
          />
        ) : null}

        {ready ? (
          <Canvas
            pointerEvents="none"
            style={{ position: "absolute", zIndex: 0, left: geo.left, top: geo.top, width: geo.layerW, height: geo.layerH }}
          >
            <Group
              transform={[{ translateX: -geo.left }, { translateY: -geo.top }]}
              layer={
                <Paint>
                  <Blur blur={gooStrength} />
                  <ColorMatrix matrix={GOO_MATRIX} />
                </Paint>
              }
            >
              <RoundedRect x={fx} y={fy} width={fw} height={fh} r={fr} color={triggerColor} />
              {items.map((item, index) => (
                <MorphFabBlob
                  key={item.id}
                  index={index}
                  count={items.length}
                  geo={geo}
                  progress={progress}
                  stagger={stagger}
                  color={item.color ?? itemColor}
                />
              ))}
            </Group>
          </Canvas>
        ) : null}

        <View
          pointerEvents="box-none"
          onLayout={(e: LayoutChangeEvent) => {
            const { width, height } = e.nativeEvent.layout;
            setTriggerSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
          }}
          style={{ alignSelf: "flex-start", zIndex: 10 }}
        >
          {children}
        </View>
      </View>
    </MorphFabContext.Provider>
  );
}

function MorphFabBlob({
  index,
  count,
  geo,
  progress,
  stagger,
  color,
}: {
  index: number;
  count: number;
  geo: MorphFabGeo;
  progress: SharedValue<number>;
  stagger: number;
  color: string;
}) {
  const rect = useDerivedValue(
    () => slotAt(geo, index, itemProgress(progress.value, index, count, stagger)),
    [geo, index, count, stagger],
  );
  const x = useDerivedValue(() => rect.value.x);
  const y = useDerivedValue(() => rect.value.y);
  const w = useDerivedValue(() => rect.value.w);
  const h = useDerivedValue(() => rect.value.h);
  const r = useDerivedValue(() => rect.value.r);
  return <RoundedRect x={x} y={y} width={w} height={h} r={r} color={color} />;
}

export interface MorphFabTriggerProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "children"> {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  pressScale?: number;
  rotate?: number;
}

export function MorphFabTrigger({ children, className, size = 60, pressScale = 0.94, rotate = 45, ...props }: MorphFabTriggerProps) {
  const { toggle, open, progress, triggerScale } = useMorphFabContext("MorphFabTrigger");

  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: triggerScale.value }] }));
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, rotate])}deg` }],
  }));

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onPress={toggle}
        onPressIn={() => {
          triggerScale.value = withSpring(pressScale, PRESS_IN_SPRING);
        }}
        onPressOut={() => {
          triggerScale.value = withSpring(1, PRESS_OUT_SPRING);
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        className={cn("min-h-12 min-w-12 items-center justify-center", className)}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        {...props}
      >
        <Animated.View style={iconStyle}>{children ?? <Plus size={24} color="#fafafa" strokeWidth={2.5} />}</Animated.View>
      </Pressable>
    </Animated.View>
  );
}

export interface MorphFabItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value?: string;
  disabled?: boolean;
  onSelect?: (value?: string) => void;
  color?: string;
  pressScale?: number;
}

export function MorphFabItem({ children, className, value, disabled = false, onSelect, color, pressScale = 0.92, ...props }: MorphFabItemProps) {
  const id = useId();
  const { items, registerItem, unregisterItem, updateItem, selectItem, geo, progress, stagger, open, itemPadding, itemGap } =
    useMorphFabContext("MorphFabItem");

  const index = items.findIndex((i) => i.id === id);
  const count = items.length;
  const slot = index >= 0 ? geo.slots[index] : undefined;
  const pressed = useSharedValue(0);

  useEffect(() => {
    registerItem(id, color);
    return () => unregisterItem(id);
  }, [id, registerItem, unregisterItem, color]);

  const animatedStyle = useAnimatedStyle(() => {
    const t = index < 0 ? 0 : itemProgress(progress.value, index, count, stagger);
    const target = geo.slots[index] ?? geo.fab;
    const dx = geo.fab.x + geo.fab.w / 2 - (target.x + target.w / 2);
    const dy = geo.fab.y + geo.fab.h / 2 - (target.y + target.h / 2);
    return {
      opacity: interpolate(t, [0, 0.55, 1], [0, 0, 1], Extrapolation.CLAMP),
      transform: [
        { translateX: dx * (1 - t) },
        { translateY: dy * (1 - t) },
        { scale: interpolate(t, [0, 1], [0.6, 1], Extrapolation.CLAMP) * interpolate(pressed.value, [0, 1], [1, pressScale]) },
      ],
    };
  }, [geo, index, count, stagger, pressScale]);

  return (
    <Animated.View
      onLayout={(e: LayoutChangeEvent) => updateItem(id, e.nativeEvent.layout.width, e.nativeEvent.layout.height)}
      pointerEvents={open ? "box-none" : "none"}
      style={[{ position: "absolute", left: slot?.x ?? 0, top: slot?.y ?? 0, zIndex: 10 }, animatedStyle]}
    >
      <Pressable
        disabled={disabled || !open}
        onPress={() => selectItem(value, onSelect)}
        onPressIn={() => {
          pressed.value = withSpring(1, PRESS_IN_SPRING);
        }}
        onPressOut={() => {
          pressed.value = withSpring(0, PRESS_OUT_SPRING);
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        className={cn("min-h-12 min-w-12 flex-row items-center justify-center", className)}
        style={{ padding: itemPadding, gap: itemGap }}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export interface MorphFabItemIconProps {
  children: React.ReactNode;
  className?: string;
}

export function MorphFabItemIcon({ children, className }: MorphFabItemIconProps) {
  return <View className={cn("items-center justify-center", className)}>{children}</View>;
}

export interface MorphFabItemLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function MorphFabItemLabel({ children, className }: MorphFabItemLabelProps) {
  return (
    <Text className={cn("text-sm font-semibold text-white", className)} numberOfLines={1}>
      {children}
    </Text>
  );
}
