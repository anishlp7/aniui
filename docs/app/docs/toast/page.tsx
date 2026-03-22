"use client";
import { PreviewToastProvider, usePreviewToast } from "@/components/preview/toast";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

function ToastButtons() {
  const { toast } = usePreviewToast();
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => toast({ title: "Success!", description: "Your action was completed." })}
        className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
      >
        Default
      </button>
      <button
        onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })}
        className="inline-flex items-center justify-center rounded-md bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:bg-destructive/90 transition-colors cursor-pointer"
      >
        Destructive
      </button>
      <button
        onClick={() => toast({ title: "Saved!", description: "Changes saved successfully.", variant: "success" })}
        className="inline-flex items-center justify-center rounded-md border border-input bg-background text-foreground px-4 py-2 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
      >
        Success
      </button>
    </div>
  );
}

function ToastDemo() {
  return (
    <PreviewToastProvider>
      <ToastButtons />
    </PreviewToastProvider>
  );
}
const installCode = `npx @aniui/cli add toast`;
const usageCode = `import { ToastProvider, useToast } from "@/components/ui/toast";
// Wrap your app with ToastProvider
export function App() {
  return (
    <ToastProvider>
      <MyScreen />
    </ToastProvider>
  );
}
function MyScreen() {
  const { toast } = useToast();
  return (
    <Button
      onPress={() =>
        toast({ title: "Success!", description: "Your action was completed." })
      }
    >
      Show Toast
    </Button>
  );
}`;
const variantsCode = `// Default toast
toast({ title: "Notification", description: "Something happened." });
// Destructive toast
toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
// Success toast
toast({ title: "Saved", description: "Changes saved successfully.", variant: "success" });`;
const sourceCode = `import React, { createContext, useCallback, useContext, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { SlideInUp, SlideOutUp, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";
type ToastVariant = "default" | "destructive" | "success";
type ToastData = { id: string; title: string; description?: string; variant?: ToastVariant };
const ToastContext = createContext<{
  toast: (data: Omit<ToastData, "id">) => void;
}>({ toast: () => {} });
export function useToast() {
  return useContext(ToastContext);
}
export interface ToastProviderProps {
  children: React.ReactNode;
}
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
    <Animated.View entering={SlideInUp.duration(300)} exiting={SlideOutUp.merge(FadeOut).duration(200)}>
      <Pressable
        className={cn("rounded-lg border p-4 shadow-lg", variantStyles[variant])}
        onPress={onDismiss}
        accessible={true}
        accessibilityRole="alert"
      >
        <Text className={cn("text-sm font-semibold", isDefault ? "text-foreground" : "text-white")}>
          {data.title}
        </Text>
        {data.description && (
          <Text className={cn("text-xs mt-1", isDefault ? "text-muted-foreground" : "text-white/80")}>
            {data.description}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}`;
export default function ToastPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toast</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Notification toast with slide-in animation and auto-dismiss.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <ToastDemo />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for slide and fade animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Variants</h2>
        <CodeBlock code={variantsCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">useToast</h3>
        <p className="text-sm text-muted-foreground">
          Returns an object with a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">toast</code> function.
        </p>
        <PropsTable props={[
          { name: "title", type: "string", default: "required" },
          { name: "description", type: "string" },
          { name: "variant", type: "\"default\" | \"destructive\" | \"success\"", default: "\"default\"" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">ToastProvider</h3>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/toast.tsx" />
      </div>
    </div>
  );
}