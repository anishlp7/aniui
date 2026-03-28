import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { View, Pressable, Modal, Dimensions } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

type Layout = { x: number; y: number; w: number; h: number };
const PopoverCtx = createContext<{
  open: boolean; layout: Layout; measure: (ref: View) => void; close: () => void;
}>({ open: false, layout: { x: 0, y: 0, w: 0, h: 0 }, measure: () => {}, close: () => {} });

export interface PopoverProps { open?: boolean; onOpenChange?: (v: boolean) => void; children: React.ReactNode }

export function Popover({ open: controlled, onOpenChange, children }: PopoverProps) {
  const [internal, setInternal] = useState(false);
  const [layout, setLayout] = useState<Layout>({ x: 0, y: 0, w: 0, h: 0 });
  const isOpen = controlled ?? internal;
  const set = (v: boolean) => { setInternal(v); onOpenChange?.(v); };
  const measure = useCallback((ref: View) => {
    ref.measureInWindow((x, y, w, h) => { setLayout({ x, y, w, h }); set(!isOpen); });
  }, [isOpen]);
  return <PopoverCtx.Provider value={{ open: isOpen, layout, measure, close: () => set(false) }}>{children}</PopoverCtx.Provider>;
}

export interface PopoverTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string; children?: React.ReactNode;
}

export function PopoverTrigger({ className, children, ...props }: PopoverTriggerProps) {
  const ref = useRef<View>(null);
  const { measure } = useContext(PopoverCtx);
  return (
    <Pressable ref={ref} className={cn("min-h-12 min-w-12", className)}
      onPress={() => ref.current && measure(ref.current)} accessible={true} accessibilityRole="button" {...props}>
      <View pointerEvents="none">{children}</View>
    </Pressable>
  );
}

export interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string; children?: React.ReactNode;
}

export function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const { open, layout, close } = useContext(PopoverCtx);
  if (!open) return null;
  const { width: screenW, height: screenH } = Dimensions.get("window");
  const top = layout.y + layout.h + 8;
  const showAbove = top + 200 > screenH;
  const contentTop = showAbove ? layout.y - 8 : top;
  const left = Math.max(8, Math.min(layout.x, screenW - 296));
  return (
    <Modal transparent animationType="none" onRequestClose={close}>
      <Pressable style={{ flex: 1 }} onPress={close}>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
          <Pressable onPress={(e) => e.stopPropagation()}
            style={{ position: "absolute", top: contentTop, left, ...(showAbove ? { bottom: screenH - layout.y + 8 } : {}) }}>
            <View className={cn("w-72 rounded-lg border border-border bg-card p-4 shadow-lg", className)} {...props}>{children}</View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
