import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Modal } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "../../lib/utils";

const PopoverCtx = createContext<{ open: boolean; toggle: () => void; close: () => void }>({ open: false, toggle: () => {}, close: () => {} });

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function Popover({ open: controlled, onOpenChange, children }: PopoverProps) {
  const [internal, setInternal] = useState(false);
  const isOpen = controlled ?? internal;
  const setOpen = (v: boolean) => { setInternal(v); onOpenChange?.(v); };
  return <PopoverCtx.Provider value={{ open: isOpen, toggle: () => setOpen(!isOpen), close: () => setOpen(false) }}>{children}</PopoverCtx.Provider>;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function PopoverTrigger({ className, children, ...props }: PopoverTriggerProps) {
  const { toggle } = useContext(PopoverCtx);
  return (
    <Pressable className={cn("min-h-12 min-w-12", className)} onPress={toggle} accessible={true} accessibilityRole="button" {...props}>
      <View pointerEvents="none">{children}</View>
    </Pressable>
  );
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const { open, close } = useContext(PopoverCtx);
  if (!open) return null;
  return (
    <Modal transparent animationType="none" onRequestClose={close}>
      <Pressable style={{ flex: 1 }} onPress={close}>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className={cn("w-72 rounded-lg border border-border bg-card p-4 shadow-lg", className)} {...props}>{children}</View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
