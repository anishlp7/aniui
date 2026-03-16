import React, { createContext, useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const CollapsibleContext = createContext<{ isOpen: boolean; toggle: () => void }>({
  isOpen: false,
  toggle: () => {},
});

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Collapsible({ open: controlledOpen, onOpenChange, className, children, ...props }: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const toggle = () => {
    const next = !isOpen;
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </CollapsibleContext.Provider>
  );
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  const { isOpen, toggle } = useContext(CollapsibleContext);
  return (
    <Pressable
      className={cn("min-h-12 min-w-12", className)}
      onPress={toggle}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleContext);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
  }, [isOpen, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: progress.value === 0 ? 0 : undefined,
    opacity: progress.value,
    overflow: "hidden" as const,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View className={cn("", className)} {...props}>{children}</View>
    </Animated.View>
  );
}
