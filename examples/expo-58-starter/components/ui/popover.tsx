import React from "react";
import { View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as PopoverPrimitive from "@rn-primitives/popover";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { useFoldFeatures } from "@/components/ui/fold";
import { cn } from "@/lib/utils";

export interface PopoverProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

// @rn-primitives' Popover Root is uncontrolled — see context-menu.tsx.
export function Popover({ onOpenChange, children }: PopoverProps) {
  return <PopoverPrimitive.Root onOpenChange={onOpenChange}>{children}</PopoverPrimitive.Root>;
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
  // Primitive only supports vertical sides.
  side?: "top" | "bottom";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function PopoverContent({ className, children, side = "bottom", sideOffset = 8, align = "center", ...props }: PopoverContentProps) {
  const insets = useSafeAreaInsets();
  const fold = useFoldFeatures();
  // Teach the primitive's collision avoider about the fold line: treat it as
  // a right-side inset so the panel stays within one pane. Both left/right
  // kept as max(real inset, fold inset) so a trigger on the right pane also
  // gets clamped on its *left* side correctly. Null on non-fold devices.
  const foldInsets = fold.foldX
    ? { ...insets, left: Math.max(insets.left, fold.foldX), right: Math.max(insets.right, fold.foldX) }
    : insets;
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Overlay className="absolute inset-0" />
      <PopoverPrimitive.Content side={side} sideOffset={sideOffset} align={align} avoidCollisions insets={foldInsets}>
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
