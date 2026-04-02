import React from "react";
import { View, Pressable, Text } from "react-native";
import * as DialogPrimitive from "@rn-primitives/dialog";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <DialogPrimitive.Trigger asChild>
      <Pressable className={cn("", className)} accessible={true} accessibilityRole="button" {...props}>{children}</Pressable>
    </DialogPrimitive.Trigger>
  );
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} className="absolute inset-0 bg-black/50" />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content asChild>
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}
          className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="dialog" {...props}>
          {children}
        </Animated.View>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <DialogPrimitive.Title asChild><Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} /></DialogPrimitive.Title>;
}

export function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <DialogPrimitive.Description asChild><Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} /></DialogPrimitive.Description>;
}

export function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function DialogClose({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children?: React.ReactNode }) {
  return (
    <DialogPrimitive.Close asChild>
      <Pressable className={cn("", className)} accessible={true} accessibilityRole="button" {...props}>{children}</Pressable>
    </DialogPrimitive.Close>
  );
}
