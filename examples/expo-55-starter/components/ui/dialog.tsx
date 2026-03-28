import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "../../lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(100)}
        className="flex-1 items-center justify-center bg-black/50"
      >
        <Pressable className="absolute inset-0" onPress={() => onOpenChange(false)} />
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <View
      className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      accessibilityRole="alert"
      {...props}
    />
  );
}

export interface DialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface DialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}
