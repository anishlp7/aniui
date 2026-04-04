import React, { createContext, useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const CollapsibleCtx = createContext<{ isOpen: boolean; toggle: () => void }>({ isOpen: false, toggle: () => {} });

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Collapsible({ open: controlledOpen, onOpenChange, className, children, ...props }: CollapsibleProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const isOpen = controlledOpen ?? uncontrolled;
  const toggle = () => {
    const next = !isOpen;
    setUncontrolled(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleCtx.Provider value={{ isOpen, toggle }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </CollapsibleCtx.Provider>
  );
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  const { toggle } = useContext(CollapsibleCtx);
  return (
    <Pressable className={cn("", className)} onPress={toggle} accessible={true} accessibilityRole="button" {...props}>
      {children}
    </Pressable>
  );
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleCtx);
  if (!isOpen) return null;
  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
      <View className={cn("", className)} {...props}>{children}</View>
    </Animated.View>
  );
}
