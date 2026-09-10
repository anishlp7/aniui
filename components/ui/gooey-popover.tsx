import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Dimensions, Pressable, Text, View, useColorScheme, type LayoutChangeEvent } from "react-native";
import { Blur, Canvas, ColorMatrix, Group, Paint, RoundedRect } from "@shopify/react-native-skia";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

type GooeyPopoverSide = "top" | "bottom";
type GooeyPopoverAlign = "start" | "center" | "end";
type GooeyPopoverRect = { x: number; y: number; w: number; h: number; r: number };
type GooeyPopoverGeo = {
  layerW: number;
  layerH: number;
  left: number;
  top: number;
  trigger: GooeyPopoverRect;
  panel: GooeyPopoverRect;
};

const OPEN_SPRING: WithSpringConfig = { stiffness: 115, damping: 18, mass: 0.4 };
const CLOSE_SPRING: WithSpringConfig = { stiffness: 115, damping: 18, mass: 0.4 };
const PRESS_IN_SPRING: WithSpringConfig = { stiffness: 400, damping: 26, mass: 0.5 };
const PRESS_OUT_SPRING: WithSpringConfig = { stiffness: 260, damping: 16, mass: 0.5 };
// Same alpha-threshold trick used elsewhere in this family: blur two shapes, then
// sharpen alpha so they fuse into a single blob while they overlap.
const GOO_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 22, -11];

function buildGeo(
  triggerW: number,
  triggerH: number,
  panelW: number,
  panelH: number,
  side: GooeyPopoverSide,
  align: GooeyPopoverAlign,
  gap: number,
  panelRadius: number,
): GooeyPopoverGeo {
  const py = side === "bottom" ? triggerH + gap : -(gap + panelH);
  const px = align === "start" ? 0 : align === "end" ? triggerW - panelW : (triggerW - panelW) / 2;

  const left = Math.min(0, px);
  const top = Math.min(0, py);
  const layerW = Math.max(triggerW, px + panelW) - left;
  const layerH = Math.max(triggerH, py + panelH) - top;
  const triggerRadius = Math.min(triggerH / 2, panelRadius);

  return {
    layerW,
    layerH,
    left,
    top,
    trigger: { x: -left, y: -top, w: triggerW, h: triggerH, r: triggerRadius },
    panel: { x: px - left, y: py - top, w: panelW, h: panelH, r: panelRadius },
  };
}

function rectAt(geo: GooeyPopoverGeo, p: number): GooeyPopoverRect {
  "worklet";
  const t = geo.trigger;
  const panel = geo.panel;
  const lerp = (a: number, b: number) => a + (b - a) * p;
  return { x: lerp(t.x, panel.x), y: lerp(t.y, panel.y), w: lerp(t.w, panel.w), h: lerp(t.h, panel.h), r: lerp(t.r, panel.r) };
}

type GooeyPopoverContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  progress: SharedValue<number>;
  side: GooeyPopoverSide;
  align: GooeyPopoverAlign;
  gap: number;
  panelRadius: number;
  gooStrength: number;
  color: string;
  dismissOnOutsidePress: boolean;
  triggerSize: { w: number; h: number };
  setTriggerSize: React.Dispatch<React.SetStateAction<{ w: number; h: number }>>;
  triggerScale: SharedValue<number>;
};

const GooeyPopoverContext = createContext<GooeyPopoverContextValue | null>(null);

function useGooeyPopoverContext(component: string) {
  const ctx = useContext(GooeyPopoverContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <GooeyPopover>.`);
  return ctx;
}

export interface GooeyPopoverProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: GooeyPopoverSide;
  align?: GooeyPopoverAlign;
  sideOffset?: number;
  panelRadius?: number;
  gooStrength?: number;
  /** Goo layer fill — the Skia canvas can't read className tokens, so this
   * defaults to the theme's card color (light `#ffffff` / dark `#18181b`,
   * matching the hex pair already used for canvas fills elsewhere, e.g.
   * area-chart's cursor dot) and only needs overriding for a non-card surface. */
  color?: string;
  dismissOnOutsidePress?: boolean;
}

/** Root: holds open/progress state and the trigger's measured size so
 * GooeyPopoverContent can compute where the panel should blob out from. */
export function GooeyPopover({
  children,
  className,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "bottom",
  align = "center",
  sideOffset = 14,
  panelRadius = 16,
  gooStrength = 8,
  color,
  dismissOnOutsidePress = true,
}: GooeyPopoverProps) {
  const scheme = useColorScheme();
  const resolvedColor = color ?? (scheme === "dark" ? "#18181b" : "#ffffff");
  const isControlled = controlledOpen !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolled;

  const progress = useSharedValue(defaultOpen ? 1 : 0);
  const triggerScale = useSharedValue(1);
  const [triggerSize, setTriggerSize] = useState({ w: 0, h: 0 });

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  useEffect(() => {
    progress.value = withSpring(open ? 1 : 0, open ? OPEN_SPRING : CLOSE_SPRING);
  }, [open, progress]);

  const ctx = useMemo<GooeyPopoverContextValue>(
    () => ({ open, setOpen, toggle, progress, side, align, gap: sideOffset, panelRadius, gooStrength, color: resolvedColor, dismissOnOutsidePress, triggerSize, setTriggerSize, triggerScale }),
    [open, setOpen, toggle, progress, side, align, sideOffset, panelRadius, gooStrength, resolvedColor, dismissOnOutsidePress, triggerSize, triggerScale],
  );

  const { width: screenW, height: screenH } = Dimensions.get("window");

  return (
    <GooeyPopoverContext.Provider value={ctx}>
      <View className={cn("relative", className)}>
        {open && dismissOnOutsidePress ? (
          <Pressable
            accessible={false}
            onPress={() => setOpen(false)}
            style={{ position: "absolute", left: -screenW, top: -screenH, width: screenW * 2, height: screenH * 2, zIndex: 5 }}
          />
        ) : null}
        {children}
      </View>
    </GooeyPopoverContext.Provider>
  );
}

export interface GooeyPopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  pressScale?: number;
}

export function GooeyPopoverTrigger({ children, className, pressScale = 0.94, ...props }: GooeyPopoverTriggerProps) {
  const { toggle, open, setTriggerSize, triggerScale } = useGooeyPopoverContext("GooeyPopoverTrigger");

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      setTriggerSize((prev: { w: number; h: number }) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    },
    [setTriggerSize],
  );

  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: triggerScale.value }] }));

  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onLayout={onLayout}
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
        className={cn("min-h-12 min-w-12 items-center justify-center rounded-full bg-primary px-4", className)}
        {...props}
      >
        {typeof children === "string" ? <Text className="text-sm font-medium text-primary-foreground">{children}</Text> : children}
      </Pressable>
    </Animated.View>
  );
}

export interface GooeyPopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

/** Content: measures its own natural size off-screen, then animates a clip
 * window (borderRadius + bounds) from the trigger's rect to the panel's rect
 * while a Skia goo layer blends trigger + panel shapes underneath. */
export function GooeyPopoverContent({ children, className }: GooeyPopoverContentProps) {
  const { progress, side, align, gap, panelRadius, gooStrength, color, open, triggerSize, triggerScale } =
    useGooeyPopoverContext("GooeyPopoverContent");

  const [contentSize, setContentSize] = useState({ w: 0, h: 0 });
  const onMeasure = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setContentSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
  }, []);

  const geo = useMemo(
    () => buildGeo(triggerSize.w, triggerSize.h, contentSize.w, contentSize.h, side, align, gap, panelRadius),
    [triggerSize, contentSize, side, align, gap, panelRadius],
  );
  const ready = geo.layerW > 0 && contentSize.w > 0;

  const rect = useDerivedValue(() => rectAt(geo, progress.value), [geo]);
  const rx = useDerivedValue(() => rect.value.x);
  const ry = useDerivedValue(() => rect.value.y);
  const rw = useDerivedValue(() => rect.value.w);
  const rh = useDerivedValue(() => rect.value.h);
  const rr = useDerivedValue(() => rect.value.r);

  const cx = geo.trigger.x + geo.trigger.w / 2;
  const cy = geo.trigger.y + geo.trigger.h / 2;
  const tx = useDerivedValue(() => cx - (geo.trigger.w * triggerScale.value) / 2, [geo]);
  const ty = useDerivedValue(() => cy - (geo.trigger.h * triggerScale.value) / 2, [geo]);
  const tw = useDerivedValue(() => geo.trigger.w * triggerScale.value, [geo]);
  const th = useDerivedValue(() => geo.trigger.h * triggerScale.value, [geo]);
  const tr = useDerivedValue(() => geo.trigger.r * triggerScale.value, [geo]);

  const clipStyle = useAnimatedStyle(() => {
    const m = rectAt(geo, progress.value);
    return { left: m.x, top: m.y, width: m.w, height: m.h, borderRadius: m.r };
  }, [geo]);

  const contentStyle = useAnimatedStyle(() => {
    const m = rectAt(geo, progress.value);
    return { left: geo.panel.x - m.x, top: geo.panel.y - m.y, opacity: interpolate(progress.value, [0, 0.45, 1], [0, 0.2, 1]) };
  }, [geo]);

  return (
    <>
      <View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, opacity: 0, zIndex: -2 }}>
        <View className={cn("max-w-[320px] p-4", className)} onLayout={onMeasure}>
          {children}
        </View>
      </View>

      {ready ? (
        <Canvas
          pointerEvents="none"
          style={{ position: "absolute", zIndex: 0, left: geo.left, top: geo.top, width: geo.layerW, height: geo.layerH }}
        >
          <Group
            layer={
              <Paint>
                <Blur blur={gooStrength} />
                <ColorMatrix matrix={GOO_MATRIX} />
              </Paint>
            }
          >
            <RoundedRect x={tx} y={ty} width={tw} height={th} r={tr} color={color} />
            <RoundedRect x={rx} y={ry} width={rw} height={rh} r={rr} color={color} />
          </Group>
        </Canvas>
      ) : null}

      <View
        pointerEvents={open ? "box-none" : "none"}
        style={{ position: "absolute", zIndex: 10, left: geo.left, top: geo.top, width: geo.layerW, height: geo.layerH }}
      >
        <Animated.View style={[{ position: "absolute", overflow: "hidden" }, clipStyle]}>
          <Animated.View className={cn("absolute max-w-[320px] p-4", className)} style={contentStyle}>
            {children}
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
}
