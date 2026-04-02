import React from "react";
import { View, Pressable } from "react-native";
import * as CollapsiblePrimitive from "@rn-primitives/collapsible";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Collapsible({ open, onOpenChange, className, children, ...props }: CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root open={open} onOpenChange={onOpenChange} asChild>
      <View className={cn("", className)} {...props}>{children}</View>
    </CollapsiblePrimitive.Root>
  );
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </CollapsiblePrimitive.Trigger>
  );
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Content>
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
        <View className={cn("", className)} {...props}>{children}</View>
      </Animated.View>
    </CollapsiblePrimitive.Content>
  );
}
