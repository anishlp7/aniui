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
      {/* rn-primitives measures this exact box to position PopoverContent below
          it — min-h-12/min-w-12 would force a 48x48 measured box even when the
          child is a small icon, opening the content ~48px below the trigger's
          top edge instead of just past the icon. hitSlop expands the tappable
          area to the 48dp minimum without inflating what gets measured. */}
      <Pressable hitSlop={14} className={cn("", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
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
