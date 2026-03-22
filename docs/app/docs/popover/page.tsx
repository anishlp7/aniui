"use client";
import { PreviewPopoverDemo } from "@/components/preview/popover";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add popover`;
const usageCode = `import { Text } from "react-native";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function MyScreen() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text className="text-sm text-card-foreground">
          This is the popover content. Place anything here.
        </Text>
      </PopoverContent>
    </Popover>
  );
}`;
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Modal } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

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
      {children}
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
      <Pressable className="flex-1" onPress={close}>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} className="flex-1 items-center justify-center">
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className={cn("w-72 rounded-lg border border-border bg-card p-4 shadow-lg", className)} {...props}>{children}</View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}`;
export default function PopoverPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Popover</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A popover that displays rich content in a floating panel triggered by a button press.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode} variant="inline">
        <PreviewPopoverDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> to be installed in your project.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">
          Popover is a compound component made up of several parts:
        </p>
        <ComponentTable components={[
          { name: "Popover", description: "Root component that manages open/closed state. Supports both controlled and uncontrolled usage." },
          { name: "PopoverTrigger", description: "The pressable element that toggles the popover." },
          { name: "PopoverContent", description: "The floating panel that displays the popover content." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Popover</h3>
        <PropsTable props={[
          { name: "open", type: "boolean" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Sub-components (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PopoverTrigger</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">PopoverContent</code>) accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/popover.tsx" />
      </div>
    </div>
  );
}