"use client";

import { PreviewToggleGroup, PreviewToggleGroupItem } from "@/components/preview/toggle-group";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add toggle-group`;

const usageCode = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function MyScreen() {
  const [value, setValue] = React.useState("center");

  return (
    <ToggleGroup value={value} onValueChange={setValue}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`;

const exampleCode = `<ToggleGroup value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;

const sourceCode = `import React, { createContext, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const itemVariants = cva(
  "items-center justify-center rounded-md min-h-12 min-w-12",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent",
      },
      size: {
        sm: "px-2 py-1.5",
        md: "px-3 py-2",
        lg: "px-4 py-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type GroupCtx = { value: string; onValueChange: (v: string) => void };
const Ctx = createContext<GroupCtx>({ value: "", onValueChange: () => {} });

export interface ToggleGroupProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof itemVariants> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function ToggleGroup({ value, onValueChange, variant, size, className, children, ...props }: ToggleGroupProps) {
  return (
    <Ctx.Provider value={{ value, onValueChange }}>
      <View className={cn("flex-row gap-1", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </Ctx.Provider>
  );
}

export interface ToggleGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export function ToggleGroupItem({ value, className, children, ...props }: ToggleGroupItemProps) {
  const { value: selected, onValueChange } = useContext(Ctx);
  const active = selected === value;
  return (
    <Pressable
      className={cn(itemVariants({ variant: "default", size: "md" }), active && "bg-accent", className)}
      onPress={() => onValueChange(value)}
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessible={true}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", active ? "text-accent-foreground" : "text-muted-foreground")}>
          {children}
        </Text>
      ) : children}
    </Pressable>
  );
}`;

export default function ToggleGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toggle Group</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A group of toggle items where only one can be active at a time, perfect for selection controls like text alignment.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewToggleGroup>
            <PreviewToggleGroupItem value="left">Left</PreviewToggleGroupItem>
            <PreviewToggleGroupItem value="center">Center</PreviewToggleGroupItem>
            <PreviewToggleGroupItem value="right">Right</PreviewToggleGroupItem>
          </PreviewToggleGroup>
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>
        <ComponentPlayground code={exampleCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewToggleGroup>
              <PreviewToggleGroupItem value="left">Left</PreviewToggleGroupItem>
              <PreviewToggleGroupItem value="center">Center</PreviewToggleGroupItem>
              <PreviewToggleGroupItem value="right">Right</PreviewToggleGroupItem>
            </PreviewToggleGroup>
          </div>
        </ComponentPlayground>
      </div>

      {/* Props - ToggleGroup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">ToggleGroup</h3>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: string) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>

        {/* Props - ToggleGroupItem */}
        <h3 className="text-lg font-medium text-foreground mt-6">ToggleGroupItem</h3>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 font-mono text-xs">ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/toggle-group.tsx" />
      </div>
    </div>
  );
}
