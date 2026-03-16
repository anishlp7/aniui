"use client";

import { PreviewCollapsible, PreviewCollapsibleTrigger, PreviewCollapsibleContent } from "@/components/preview/collapsible";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add collapsible`;

const usageCode = `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export function MyScreen() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Text>Toggle content</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This content can be shown or hidden.</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`;

const controlledCode = `const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>
    <Text>{open ? "Hide" : "Show"} details</Text>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <Text>Controlled collapsible content.</Text>
  </CollapsibleContent>
</Collapsible>`;

const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const CollapsibleContext = createContext<{ isOpen: boolean; toggle: () => void }>({
  isOpen: false,
  toggle: () => {},
});

export interface CollapsibleProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export function Collapsible({ open: controlledOpen, onOpenChange, className, children, ...props }: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const toggle = () => {
    const next = !isOpen;
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </CollapsibleContext.Provider>
  );
}

export interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleTrigger({ className, children, ...props }: CollapsibleTriggerProps) {
  const { isOpen, toggle } = useContext(CollapsibleContext);
  return (
    <Pressable
      className={cn("min-h-12 min-w-12", className)}
      onPress={toggle}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleContext);
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
  }, [isOpen, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: progress.value === 0 ? 0 : undefined,
    opacity: progress.value,
    overflow: "hidden" as const,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View className={cn("", className)} {...props}>{children}</View>
    </Animated.View>
  );
}`;

export default function CollapsiblePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Collapsible</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated collapsible container that can be toggled open and closed.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewCollapsible>
            <PreviewCollapsibleTrigger>
              <span className="text-sm font-medium text-foreground">Toggle content</span>
            </PreviewCollapsibleTrigger>
            <PreviewCollapsibleContent>
              <p className="text-sm text-muted-foreground pt-2">This content can be shown or hidden.</p>
            </PreviewCollapsibleContent>
          </PreviewCollapsible>
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for animations.
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Controlled */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Controlled</h2>
        <p className="text-sm text-muted-foreground">Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">open</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onOpenChange</code> props for controlled behavior.</p>
        <CodeBlock code={controlledCode} title="app/index.tsx" />
      </div>

      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">Collapsible</td>
                <td className="px-4 py-3 text-xs">Root container managing open/closed state</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">CollapsibleTrigger</td>
                <td className="px-4 py-3 text-xs">Pressable element that toggles the content</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">CollapsibleContent</td>
                <td className="px-4 py-3 text-xs">Animated container for collapsible content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Collapsible</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">open</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false (uncontrolled)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onOpenChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(open: boolean) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/collapsible.tsx" />
      </div>
    </div>
  );
}
