import React from "react";
import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as PopoverPrimitive from "@rn-primitives/popover";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Popover({ open, onOpenChange, children }: PopoverProps) {
  return <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</PopoverPrimitive.Root>;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function PopoverTrigger({ className, children, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        <View className="flex-1 items-center justify-center">{children}</View>
      </Pressable>
    </PopoverPrimitive.Trigger>
  );
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function PopoverContent({ className, children, side = "bottom", sideOffset = 8, align = "center", ...props }: PopoverContentProps) {
  const insets = useSafeAreaInsets();
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Overlay className="absolute inset-0" />
      <PopoverPrimitive.Content side={side} sideOffset={sideOffset} align={align} avoidCollisions insets={insets}>
        <Animated.View entering={entering.fadeIn} exiting={exiting.fadeOut}>
          <View className={cn("w-72 rounded-lg border border-border bg-card p-4 shadow-lg", className)} {...props}>
            {children}
          </View>
        </Animated.View>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverClose({ children, className, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children?: React.ReactNode }) {
  return (
    <PopoverPrimitive.Close asChild>
      <Pressable className={cn("", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </PopoverPrimitive.Close>
  );
}
