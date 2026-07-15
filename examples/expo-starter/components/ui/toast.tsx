import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { Portal } from "@rn-primitives/portal";
import { entering, exiting } from "@/components/ui/animate";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive" | "success";
export type ToastPosition = "top" | "bottom";
export type ToastFrom = "top" | "bottom" | "left" | "right";
type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  from?: ToastFrom;
};
const positions: ToastPosition[] = ["top", "bottom"];
// Monotonic id — Date.now() collides for toasts fired in the same millisecond.
let nextId = 0;
const ToastContext = createContext<{ toast: (data: Omit<ToastData, "id">) => void }>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export interface ToastProviderProps {
  children: React.ReactNode;
  defaultPosition?: ToastPosition;
  defaultFrom?: ToastFrom;
}

// Reanimated naming: SlideIn<Side> = the element STARTS on that side, so
// `from: "top"` maps to SlideInUp; exits mirror in the same direction.
const animationFor: Record<ToastFrom, { enter: typeof entering.slideInUp; exit: typeof exiting.slideOutUp }> = {
  top:    { enter: entering.slideInUp,    exit: exiting.slideOutUp },
  bottom: { enter: entering.slideInDown,  exit: exiting.slideOutDown },
  left:   { enter: entering.slideInLeft,  exit: exiting.slideOutLeft },
  right:  { enter: entering.slideInRight, exit: exiting.slideOutRight },
};

const containerStyles: Record<ToastPosition, string> = {
  top:    "absolute top-14 start-4 end-4 gap-2 z-50",
  bottom: "absolute bottom-14 start-4 end-4 gap-2 z-50",
};

export function ToastProvider({ children, defaultPosition = "top", defaultFrom }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = String(++nextId);
    const position = data.position ?? defaultPosition;
    const from = data.from ?? defaultFrom ?? position;
    setToasts((prev) => [...prev, { ...data, id, position, from }]);
    timers.current.set(id, setTimeout(() => dismiss(id), 3000));
  }, [defaultPosition, defaultFrom, dismiss]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Portal anchors toasts to the screen, not the provider's ancestor. */}
      <Portal name="aniui-toast">
        {positions.map((pos) => {
          const items = toasts.filter((t) => t.position === pos);
          if (items.length === 0) return null;
          return (
            <View key={pos} className={containerStyles[pos]} pointerEvents="box-none">
              {items.map((t) => (
                <ToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
              ))}
            </View>
          );
        })}
      </Portal>
    </ToastContext.Provider>
  );
}

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-card border-border",
  destructive: "bg-destructive border-destructive",
  success: "bg-green-600 border-green-600",
};

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: () => void }) {
  const variant = data.variant ?? "default";
  const isDefault = variant === "default";
  const { enter, exit } = animationFor[data.from ?? "top"];

  return (
    <Animated.View entering={enter} exiting={exit}>
      <Pressable
        className={cn("rounded-lg border p-4 shadow-lg", variantStyles[variant])}
        onPress={onDismiss}
        accessible={true}
        accessibilityRole="alert"
      >
        <Text className={cn("text-sm font-semibold", isDefault ? "text-foreground" : "text-white")}>{data.title}</Text>
        {data.description && (
          <Text className={cn("text-xs mt-1", isDefault ? "text-muted-foreground" : "text-white/80")}>{data.description}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
