import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { ToastDemo } from "./_demos";

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
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <ToastDemo />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="toast" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for slide and fade animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <CodeBlock code={variantsCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">useToast</Heading>
        <p className="text-sm text-muted-foreground">
          Returns an object with a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">toast</code> function.
        </p>
        <PropsTable props={[
          { name: "title", type: "string", default: "required" },
          { name: "description", type: "string" },
          { name: "variant", type: "\"default\" | \"destructive\" | \"success\"", default: "\"default\"" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ToastProvider</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context provider with auto-dismiss timer</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="alert"</code> on each toast for screen reader announcements.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/toast.tsx" />
      </div>
    </div>
  );
}
