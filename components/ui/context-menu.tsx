import React from "react";
import { View, Text, Pressable } from "react-native";
import * as ContextMenuPrimitive from "@rn-primitives/context-menu";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface ContextMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ContextMenu({ children, open, onOpenChange }: ContextMenuProps) {
  return <ContextMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</ContextMenuPrimitive.Root>;
}

export function ContextMenuTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <ContextMenuPrimitive.Trigger asChild>
      <Pressable className={cn("", className)} accessible={true} accessibilityRole="button" accessibilityHint="Long press for options" {...props}>
        {children}
      </Pressable>
    </ContextMenuPrimitive.Trigger>
  );
}

export interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function ContextMenuContent({ className, children, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Overlay className="absolute inset-0" />
      <ContextMenuPrimitive.Content avoidCollisions>
        <Animated.View entering={entering.fadeIn} exiting={exiting.fadeOut}>
          <View className={cn("min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg", className)} {...props}>
            {children}
          </View>
        </Animated.View>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
}

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
}

export function ContextMenuItem({ className, children, destructive, ...props }: ContextMenuItemProps) {
  return (
    <ContextMenuPrimitive.Item asChild>
      <Pressable className={cn("flex-row items-center rounded-md px-3 py-2.5 min-h-11", className)} accessible={true} accessibilityRole="menuitem" {...props}>
        {typeof children === "string" ? (
          <Text className={cn("text-sm", destructive ? "text-destructive" : "text-foreground")}>{children}</Text>
        ) : children}
      </Pressable>
    </ContextMenuPrimitive.Item>
  );
}

export function ContextMenuSeparator({ className }: { className?: string }) {
  return <ContextMenuPrimitive.Separator className={cn("my-1 h-px bg-border", className)} />;
}
