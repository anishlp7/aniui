"use client";
import { PreviewCollapsible, PreviewCollapsibleTrigger, PreviewCollapsibleContent } from "@/components/preview/collapsible";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add collapsible`;
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
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
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
      <View pointerEvents="none">
        {children}
      </View>
    </Pressable>
  );
}
export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function CollapsibleContent({ className, children, ...props }: CollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleContext);
  if (!isOpen) return null;
  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
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
      <PreviewToggle>
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
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="collapsible" />
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
        <ComponentTable components={[
          { name: "Collapsible", description: "Root container managing open/closed state" },
          { name: "CollapsibleTrigger", description: "Pressable element that toggles the content" },
          { name: "CollapsibleContent", description: "Animated container for collapsible content" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Collapsible</h3>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "false (uncontrolled)" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context with Reanimated FadeIn/FadeOut animations</li>
          <li>Trigger button announces expanded/collapsed state to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/collapsible.tsx" />
      </div>
    </div>
  );
}