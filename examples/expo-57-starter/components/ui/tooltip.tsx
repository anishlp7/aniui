import React from "react";
import { View, Text, Pressable } from "react-native";
import * as TooltipPrimitive from "@rn-primitives/tooltip";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({ children, open, onOpenChange }: TooltipProps) {
  return <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</TooltipPrimitive.Root>;
}

export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function TooltipTrigger({ className, children, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </TooltipPrimitive.Trigger>
  );
}

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function TooltipContent({ className, children, side = "top", sideOffset = 8, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content side={side} sideOffset={sideOffset} avoidCollisions>
        <Animated.View entering={entering.fadeIn} exiting={exiting.fadeOut}>
          <View className={cn("rounded-md bg-primary px-3 py-1.5", className)} {...props}>
            {typeof children === "string" ? (
              <Text className="text-xs text-primary-foreground text-center">{children}</Text>
            ) : children}
          </View>
        </Animated.View>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
