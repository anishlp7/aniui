import React from "react";
import { View, Text, Pressable } from "react-native";
import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({ children, open, onOpenChange }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</DropdownMenuPrimitive.Root>;
}

export function DropdownMenuTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </DropdownMenuPrimitive.Trigger>
  );
}

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function DropdownMenuContent({ className, children, side = "bottom", sideOffset = 4, align = "start", ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Overlay className="absolute inset-0" />
      <DropdownMenuPrimitive.Content side={side} sideOffset={sideOffset} align={align} avoidCollisions>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <View className={cn("min-w-[180px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-lg", className)} {...props}>
            {children}
          </View>
        </Animated.View>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
}

export function DropdownMenuItem({ className, children, destructive, ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item asChild>
      <Pressable className={cn("flex-row items-center rounded-md px-3 py-2.5 min-h-11", className)} accessible={true} accessibilityRole="menuitem" {...props}>
        {typeof children === "string" ? (
          <Text className={cn("text-sm", destructive ? "text-red-500 dark:text-red-900" : "text-zinc-950 dark:text-zinc-50")}>{children}</Text>
        ) : children}
      </Pressable>
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <DropdownMenuPrimitive.Separator className={cn("my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)} />;
}
