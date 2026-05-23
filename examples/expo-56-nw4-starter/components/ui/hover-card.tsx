import React from "react";
import { View, Pressable } from "react-native";
import * as HoverCardPrimitive from "@rn-primitives/hover-card";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

export function HoverCard({ children, open, onOpenChange, openDelay, closeDelay }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      {children}
    </HoverCardPrimitive.Root>
  );
}

export interface HoverCardTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function HoverCardTrigger({ className, children, ...props }: HoverCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger asChild>
      <Pressable
        className={cn("min-h-12 min-w-12", className)}
        accessible={true}
        accessibilityRole="button"
        {...props}
      >
        {children}
      </Pressable>
    </HoverCardPrimitive.Trigger>
  );
}

export interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function HoverCardContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Overlay className="absolute inset-0" />
      <HoverCardPrimitive.Content
        side={side}
        sideOffset={sideOffset}
        align={align}
        avoidCollisions
      >
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <View
            className={cn("w-64 rounded-lg border border-border bg-card p-4 shadow-lg", className)}
            {...props}
          >
            {children}
          </View>
        </Animated.View>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}
