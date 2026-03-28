import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

type ViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
type TextProps = React.ComponentPropsWithoutRef<typeof Text> & { className?: string };
type PressableProps = React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode };

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export function AlertDialogContent({ className, ...props }: ViewProps) {
  return <View className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="alert" {...props} />;
}

export function AlertDialogHeader({ className, ...props }: ViewProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: TextProps) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: TextProps) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: ViewProps) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function AlertDialogAction({ className, children, ...props }: PressableProps) {
  return (
    <Pressable className={cn("items-center justify-center rounded-md bg-primary px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
      {typeof children === "string" ? <Text className="text-sm font-medium text-primary-foreground">{children}</Text> : children}
    </Pressable>
  );
}

export function AlertDialogCancel({ className, children, ...props }: PressableProps) {
  return (
    <Pressable className={cn("items-center justify-center rounded-md border border-input px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
      {typeof children === "string" ? <Text className="text-sm font-medium text-foreground">{children}</Text> : children}
    </Pressable>
  );
}
