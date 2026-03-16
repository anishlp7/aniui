import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Animated.View
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(100)}
        className="flex-1 items-center justify-center bg-black/50"
      >
        <Animated.View entering={ZoomIn.duration(200)} exiting={ZoomOut.duration(150)}>
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

export interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogContent({ className, ...props }: AlertDialogContentProps) {
  return (
    <View
      className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      accessibilityRole="alert"
      {...props}
    />
  );
}

export interface AlertDialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
}

export function AlertDialogAction({ className, children, ...props }: AlertDialogActionProps) {
  return (
    <Pressable
      className={cn("items-center justify-center rounded-md bg-primary px-4 py-2.5 min-h-12", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-primary-foreground">{children}</Text>
      ) : children}
    </Pressable>
  );
}

export interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
}

export function AlertDialogCancel({ className, children, ...props }: AlertDialogCancelProps) {
  return (
    <Pressable
      className={cn("items-center justify-center rounded-md border border-input px-4 py-2.5 min-h-12", className)}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-foreground">{children}</Text>
      ) : children}
    </Pressable>
  );
}
