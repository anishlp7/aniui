import React from "react";
import { View, Pressable, Text } from "react-native";
import * as AlertDialogPrimitive from "@rn-primitives/alert-dialog";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</AlertDialogPrimitive.Root>;
}

export function AlertDialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay asChild>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} className="absolute inset-0 bg-black/50" />
      </AlertDialogPrimitive.Overlay>
      <AlertDialogPrimitive.Content asChild>
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}
          className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="alert" {...props}>
          {children}
        </Animated.View>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <AlertDialogPrimitive.Title asChild><Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} /></AlertDialogPrimitive.Title>;
}

export function AlertDialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <AlertDialogPrimitive.Description asChild><Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} /></AlertDialogPrimitive.Description>;
}

export function AlertDialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function AlertDialogAction({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Pressable className={cn("items-center justify-center rounded-md bg-primary px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {typeof children === "string" ? <Text className="text-sm font-medium text-primary-foreground">{children}</Text> : children}
      </Pressable>
    </AlertDialogPrimitive.Action>
  );
}

export function AlertDialogCancel({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Pressable className={cn("items-center justify-center rounded-md border border-input px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {typeof children === "string" ? <Text className="text-sm font-medium text-foreground">{children}</Text> : children}
      </Pressable>
    </AlertDialogPrimitive.Cancel>
  );
}
