import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type AnimatedStyle,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

/**
 * SwiftUI-`matchedGeometryEffect`-style shared-element transition primitive.
 *
 * Tag two `MatchedGeometryView`s with the same `id` — mounted and unmounted
 * in turn as a boolean/id-based state flips elsewhere in the tree (e.g. a
 * list-item view swapped for a detail-view) — and the outgoing view's last
 * measured rect morphs into the incoming view's freshly measured rect via a
 * shared animated overlay, while the incoming view cross-fades in over the
 * same duration. Only one `MatchedGeometryView` per `id` should be mounted
 * at a time; the provider should wrap the screen (or region) the transition
 * should be visible across.
 */

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MatchedGeometryContextValue {
  registerRect: (id: string, rect: Rect) => void;
  requestTransition: (
    id: string,
    rect: Rect,
    node: React.ReactNode,
    duration: number,
  ) => boolean;
  originRef: React.RefObject<{ x: number; y: number }>;
}

const MatchedGeometryContext =
  createContext<MatchedGeometryContextValue | null>(null);

const DEFAULT_TRANSITION_DURATION = 350;
const ZERO_RECT: Rect = { x: 0, y: 0, width: 0, height: 0 };
const TRANSITION_EASING = Easing.out(Easing.cubic);

export interface MatchedGeometryProviderProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

/** Wrap the screen (or region) within which shared-element transitions should be visible. */
export function MatchedGeometryProvider({
  children,
  className,
  style,
  ...props
}: MatchedGeometryProviderProps) {
  const rects = useRef<Map<string, Rect>>(new Map());
  const originRef = useRef({ x: 0, y: 0 });
  const rootRef = useRef<View>(null);
  const [overlayNode, setOverlayNode] = useState<React.ReactNode>(null);

  const from = useSharedValue<Rect>(ZERO_RECT);
  const to = useSharedValue<Rect>(ZERO_RECT);
  const progress = useSharedValue(0);

  const clearOverlay = useCallback(() => setOverlayNode(null), []);

  const registerRect = useCallback((id: string, rect: Rect) => {
    rects.current.set(id, rect);
  }, []);

  const requestTransition = useCallback(
    (id: string, rect: Rect, node: React.ReactNode, duration: number) => {
      const previous = rects.current.get(id);
      rects.current.set(id, rect);
      if (!previous) return false;

      from.value = previous;
      to.value = rect;
      progress.value = 0;
      setOverlayNode(node);
      progress.value = withTiming(
        1,
        { duration, easing: TRANSITION_EASING },
        (finished) => {
          if (finished) runOnJS(clearOverlay)();
        },
      );
      return true;
    },
    [clearOverlay, from, progress, to],
  );

  const handleRootLayout = useCallback((_e: LayoutChangeEvent) => {
    rootRef.current?.measureInWindow((x, y) => {
      originRef.current = { x, y };
    });
  }, []);

  const overlayStyle = useAnimatedStyle(() => {
    const f = from.value;
    const t = to.value;
    const p = progress.value;
    return {
      position: "absolute" as const,
      left: f.x + (t.x - f.x) * p,
      top: f.y + (t.y - f.y) * p,
      width: f.width + (t.width - f.width) * p,
      height: f.height + (t.height - f.height) * p,
    };
  });

  const contextValue = useMemo<MatchedGeometryContextValue>(
    () => ({ registerRect, requestTransition, originRef }),
    [registerRect, requestTransition],
  );

  return (
    <MatchedGeometryContext.Provider value={contextValue}>
      <View
        ref={rootRef}
        onLayout={handleRootLayout}
        className={cn("flex-1", className)}
        style={style}
        {...props}
      >
        {children}
        {overlayNode ? (
          <Animated.View style={overlayStyle} pointerEvents="none">
            {overlayNode}
          </Animated.View>
        ) : null}
      </View>
    </MatchedGeometryContext.Provider>
  );
}

export interface UseMatchedGeometryResult {
  ref: React.RefObject<View | null>;
  onLayout: () => void;
  animatedStyle: AnimatedStyle<{ opacity: number }>;
}

/**
 * Registers `content` under `id`. The first layout after a *different*
 * previously-registered rect exists for the same `id` triggers a morph
 * overlay from that old rect to this one; the first-ever mount for an `id`
 * just appears (nothing to morph from yet).
 */
export function useMatchedGeometry(
  id: string,
  content: React.ReactNode,
  duration: number = DEFAULT_TRANSITION_DURATION,
): UseMatchedGeometryResult {
  const ctx = useContext(MatchedGeometryContext);
  if (!ctx) {
    throw new Error(
      "useMatchedGeometry must be used within a MatchedGeometryProvider",
    );
  }
  const ref = useRef<View>(null);
  const opacity = useSharedValue(1);
  const hasLaidOut = useRef(false);

  const onLayout = useCallback(() => {
    ref.current?.measureInWindow((x, y, width, height) => {
      const rect: Rect = {
        x: x - ctx.originRef.current.x,
        y: y - ctx.originRef.current.y,
        width,
        height,
      };
      if (hasLaidOut.current) {
        ctx.registerRect(id, rect);
        return;
      }
      hasLaidOut.current = true;
      const didTransition = ctx.requestTransition(id, rect, content, duration);
      if (didTransition) {
        opacity.value = 0;
        opacity.value = withTiming(1, {
          duration,
          easing: TRANSITION_EASING,
        });
      } else {
        ctx.registerRect(id, rect);
      }
    });
  }, [content, ctx, duration, id, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return { ref, onLayout, animatedStyle };
}

export interface MatchedGeometryViewProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  id: string;
  duration?: number;
  className?: string;
}

/** Drop-in wrapper around `useMatchedGeometry` — tag two of these with the same `id` across a mount/unmount swap to get a shared-element morph for free. */
export function MatchedGeometryView({
  id,
  duration,
  className,
  style,
  children,
  ...props
}: MatchedGeometryViewProps) {
  const { ref, onLayout, animatedStyle } = useMatchedGeometry(
    id,
    children,
    duration,
  );
  return (
    <Animated.View
      ref={ref}
      onLayout={onLayout}
      style={[animatedStyle, style]}
      className={cn(className)}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
