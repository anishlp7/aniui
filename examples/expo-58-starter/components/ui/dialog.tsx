import React from "react";
import { View, Pressable, Text, Modal } from "react-native";
import { cn } from "@/lib/utils";
import { useFoldFeatures } from "@/components/ui/fold";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const fold = useFoldFeatures();
  // On an unfolded iPhone Duo / foldable, center the dialog inside the left
  // pane instead of across the fold line. foldX is null on every other device,
  // so this is a no-op pre-fold.
  const foldPadding = fold.foldX ? { paddingRight: fold.foldX } : undefined;
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <View className="flex-1 items-center justify-center bg-black/50" style={foldPadding}>
        <Pressable className="absolute inset-0" onPress={() => onOpenChange(false)} />
        {children}
      </View>
    </Modal>
  );
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode }) {
  return (
    <View className={cn("mx-6 w-80 rounded-lg bg-card p-6 shadow-xl", className)} accessibilityRole="alert" accessible={true} {...props}>
      {children}
    </View>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("pb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text> & { className?: string }) {
  return <Text className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
  return <View className={cn("flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DialogClose({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
