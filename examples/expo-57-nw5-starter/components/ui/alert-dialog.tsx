import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import Animated from "react-native-reanimated";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View entering={entering.fadeIn} exiting={exiting.fadeOut} className="flex-1 items-center justify-center bg-black/50">
        <Animated.View entering={entering.zoomIn} exiting={exiting.zoomOut}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export function AlertDialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode }) {
  return (
    <View className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="alert" {...props}>
      {children}
    </View>
  );
}

export function AlertDialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function AlertDialogAction({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <Pressable className={cn("items-center justify-center rounded-md bg-primary px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
      {typeof children === "string" ? <Text className="text-sm font-medium text-primary-foreground">{children}</Text> : children}
    </Pressable>
  );
}

export function AlertDialogCancel({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <Pressable className={cn("items-center justify-center rounded-md border border-input px-4 py-2.5 min-h-12", className)} accessible={true} accessibilityRole="button" {...props}>
      {typeof children === "string" ? <Text className="text-sm font-medium text-foreground">{children}</Text> : children}
    </Pressable>
  );
}
