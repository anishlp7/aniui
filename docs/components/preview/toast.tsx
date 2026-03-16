"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive" | "success";
type ToastData = { id: string; title: string; description?: string; variant?: ToastVariant };

const ToastContext = createContext<{
  toast: (data: Omit<ToastData, "id">) => void;
}>({ toast: () => {} });

export function usePreviewToast() {
  return useContext(ToastContext);
}

export interface PreviewToastProviderProps {
  children: React.ReactNode;
}

export function PreviewToastProvider({ children }: PreviewToastProviderProps) {
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
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <PreviewToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-card border-border",
  destructive: "bg-destructive border-destructive",
  success: "bg-green-600 border-green-600",
};

function PreviewToastItem({ data, onDismiss }: { data: ToastData; onDismiss: () => void }) {
  const variant = data.variant ?? "default";
  const isDefault = variant === "default";

  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-lg cursor-pointer animate-in slide-in-from-top-2 min-w-64",
        variantStyles[variant]
      )}
      onClick={onDismiss}
      role="alert"
    >
      <p className={cn("text-sm font-semibold", isDefault ? "text-foreground" : "text-white")}>
        {data.title}
      </p>
      {data.description && (
        <p className={cn("text-xs mt-1", isDefault ? "text-muted-foreground" : "text-white/80")}>
          {data.description}
        </p>
      )}
    </div>
  );
}
