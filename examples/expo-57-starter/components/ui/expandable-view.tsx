import React, {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type SharedValue,
  type WithSpringConfig,
} from "react-native-reanimated";
import { X } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PRESS_SPRING: WithSpringConfig = { damping: 12, stiffness: 250, mass: 0.5 };
const EXPAND_SPRING: WithSpringConfig = { damping: 13, stiffness: 120, mass: 0.5 };

interface ExpandableViewContextValue {
  progress: SharedValue<number>;
  expanded: boolean;
  expand: () => void;
  collapse: () => void;
}

const ExpandableViewContext = createContext<ExpandableViewContextValue | null>(null);

function useExpandableView(component: string) {
  const ctx = useContext(ExpandableViewContext);
  if (!ctx) throw new Error(`${component} must be rendered inside <ExpandableView>.`);
  return ctx;
}

export interface ExpandableViewSlotProps {
  children?: React.ReactNode;
}

// Slot markers — never rendered directly. ExpandableView pulls each one's
// children out via Children.forEach and puts them in their own absolutely
// positioned animated layer, so the collapsed pill and the expanded panel can
// cross-fade over each other instead of one replacing the other in the tree.
type SlotRole = "collapsed" | "expanded";
interface SlotComponent {
  (props: ExpandableViewSlotProps): null;
  role?: SlotRole;
}

export const ExpandableViewCollapsed: SlotComponent = () => null;
ExpandableViewCollapsed.role = "collapsed";

export const ExpandableViewExpanded: SlotComponent = () => null;
ExpandableViewExpanded.role = "expanded";

export interface ExpandableViewProps extends React.ComponentPropsWithoutRef<typeof Animated.View> {
  children: React.ReactNode;
  className?: string;
  collapsedWidth?: number;
  expandedWidth?: number;
  collapsedHeight?: number;
  expandedHeight?: number;
  collapsedRadius?: number;
  expandedRadius?: number;
  pressSpring?: WithSpringConfig;
  expandSpring?: WithSpringConfig;
  onExpandedChange?: (expanded: boolean) => void;
}

/**
 * Generic expand/collapse container: a collapsed pill morphs (width, height,
 * corner radius, all spring-driven) into an expanded panel. Reusable
 * primitive — screens compose their own collapsed/expanded content via the
 * `Collapsed`/`Expanded` slots and an optional `Close` button.
 */
export function ExpandableView({
  children,
  className,
  collapsedWidth = 170,
  expandedWidth = 330,
  collapsedHeight = 50,
  expandedHeight = 350,
  collapsedRadius = 99,
  expandedRadius = 30,
  pressSpring = PRESS_SPRING,
  expandSpring = EXPAND_SPRING,
  onExpandedChange,
  style,
  ...props
}: ExpandableViewProps) {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const [expanded, setExpanded] = useState(false);

  const { collapsedNode, expandedNode } = useMemo(() => {
    let collapsedNode: React.ReactNode = null;
    let expandedNode: React.ReactNode = null;
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const role = (child.type as SlotComponent).role;
      const slotProps = child.props as ExpandableViewSlotProps;
      if (role === "collapsed") collapsedNode = slotProps.children;
      else if (role === "expanded") expandedNode = slotProps.children;
    });
    return { collapsedNode, expandedNode };
  }, [children]);

  const expand = useCallback(() => {
    setExpanded(true);
    onExpandedChange?.(true);
    scale.value = withSpring(1, pressSpring);
    progress.value = withSpring(1, expandSpring);
  }, [onExpandedChange, scale, progress, pressSpring, expandSpring]);

  const collapse = useCallback(() => {
    setExpanded(false);
    onExpandedChange?.(false);
    progress.value = withSpring(0, expandSpring);
  }, [onExpandedChange, progress, expandSpring]);

  const ctx = useMemo(
    () => ({ progress, expanded, expand, collapse }),
    [progress, expanded, expand, collapse]
  );

  const containerStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [collapsedWidth, expandedWidth]),
    height: interpolate(progress.value, [0, 1], [collapsedHeight, expandedHeight]),
    borderRadius: interpolate(progress.value, [0, 1], [collapsedRadius, expandedRadius]),
    transform: [{ scale: scale.value }],
  }));

  const collapsedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5], [1, 0]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 60]) }],
  }));

  const expandedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.15, 1], [0, 1]),
  }));

  return (
    <ExpandableViewContext.Provider value={ctx}>
      <Animated.View
        className={cn("items-center justify-center overflow-hidden bg-muted", className)}
        style={[containerStyle, style]}
        {...props}
      >
        <Animated.View
          className="absolute"
          style={[expandedStyle, { width: expandedWidth, height: expandedHeight }]}
          pointerEvents={expanded ? "auto" : "none"}
        >
          {expandedNode}
        </Animated.View>

        <AnimatedPressable
          className="absolute inset-0 min-h-12 min-w-12 flex-row items-center justify-center gap-2"
          style={collapsedStyle}
          pointerEvents={expanded ? "none" : "auto"}
          onPress={expand}
          onPressIn={() => {
            if (!expanded) scale.value = withSpring(1.06, pressSpring);
          }}
          onPressOut={() => {
            scale.value = withSpring(1, pressSpring);
          }}
          accessible={true}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
        >
          {collapsedNode}
        </AnimatedPressable>
      </Animated.View>
    </ExpandableViewContext.Provider>
  );
}

export interface ExpandableViewCloseProps {
  children?: React.ReactNode;
  className?: string;
}

/** Fades in once the panel is mostly expanded; collapses the view on press. */
export function ExpandableViewClose({ children, className }: ExpandableViewCloseProps) {
  const { progress, collapse } = useExpandableView("ExpandableViewClose");
  const colors = useThemeColors();

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.6, 1], [0, 1]),
  }));

  return (
    <Animated.View className="absolute right-2 top-2 z-10" style={style}>
      <Pressable
        className={cn(
          "min-h-12 min-w-12 items-center justify-center rounded-full bg-background",
          className
        )}
        onPress={collapse}
        hitSlop={8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Collapse"
      >
        {children ?? <X size={18} color={colors.foreground} strokeWidth={2.5} />}
      </Pressable>
    </Animated.View>
  );
}
