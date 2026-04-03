import React, { createContext, useCallback, useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive" | "success";
type ToastData = { id: string; title: string; description?: string; variant?: ToastVariant };

const ToastContext = createContext<{ toast: (data: Omit<ToastData, "id">) => void }>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export interface ToastProviderProps { children: React.ReactNode }

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...data, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <View className="absolute top-14 left-4 right-4 gap-2 z-50" pointerEvents="box-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </View>
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

  return (
    <Animated.View entering={SlideInUp.duration(300)} exiting={SlideOutUp.duration(200)}>
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
