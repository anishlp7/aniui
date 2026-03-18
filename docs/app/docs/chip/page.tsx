"use client";

import React, { useState } from "react";
import { PreviewChip } from "@/components/preview/chip";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add chip`;

const usageCode = `import { Chip } from "@/components/ui/chip";

<Chip variant="default">React Native</Chip>
<Chip variant="secondary">TypeScript</Chip>
<Chip variant="outline">NativeWind</Chip>`;

const variantsCode = `<Chip variant="default">Default</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="outline">Outline</Chip>
<Chip variant="destructive">Destructive</Chip>`;

const sizesCode = `<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`;

const selectableCode = `const [selected, setSelected] = useState<string[]>(["react-native"]);

const toggle = (id: string) =>
  setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

<Chip selected={selected.includes("react-native")} onPress={() => toggle("react-native")}>React Native</Chip>
<Chip selected={selected.includes("expo")} onPress={() => toggle("expo")}>Expo</Chip>
<Chip selected={selected.includes("nativewind")} onPress={() => toggle("nativewind")}>NativeWind</Chip>`;

const closableCode = `<Chip onClose={() => console.log("removed")}>Removable</Chip>
<Chip variant="secondary" onClose={() => {}}>Tag</Chip>`;

const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "flex-row items-center rounded-full min-h-8",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-input bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-2.5 py-1 gap-1",
        md: "px-3 py-1.5 gap-1.5",
        lg: "px-4 py-2 gap-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const chipTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ChipProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof chipVariants> {
  className?: string;
  textClassName?: string;
  children: string;
  selected?: boolean;
  onClose?: () => void;
}

export function Chip({ variant, size, className, textClassName, children, selected, onClose, ...props }: ChipProps) {
  const v = selected ? "default" : (variant ?? "outline");
  return (
    <Pressable className={cn(chipVariants({ variant: v, size }), className)} accessible={true} accessibilityRole="button" accessibilityState={{ selected }} {...props}>
      <Text className={cn(chipTextVariants({ variant: v, size }), textClassName)}>{children}</Text>
      {onClose && (
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={\`Remove \${children}\`} className="ml-0.5">
          <Text className={cn("text-xs", v === "outline" ? "text-muted-foreground" : chipTextVariants({ variant: v, size: "sm" }))}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}`;

function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>(["react-native"]);
  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  return (
    <div className="flex flex-wrap gap-2">
      <PreviewChip selected={selected.includes("react-native")} onClick={() => toggle("react-native")}>React Native</PreviewChip>
      <PreviewChip selected={selected.includes("expo")} onClick={() => toggle("expo")}>Expo</PreviewChip>
      <PreviewChip selected={selected.includes("nativewind")} onClick={() => toggle("nativewind")}>NativeWind</PreviewChip>
      <PreviewChip selected={selected.includes("typescript")} onClick={() => toggle("typescript")}>TypeScript</PreviewChip>
    </div>
  );
}

export default function ChipPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chip</h1>
        <p className="text-muted-foreground text-lg">Interactive tags for filters, categories, and multi-select. Unlike Badge (display-only), Chips are pressable and selectable.</p>
      </div>

      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap gap-2">
          <PreviewChip variant="default">React Native</PreviewChip>
          <PreviewChip variant="secondary">TypeScript</PreviewChip>
          <PreviewChip variant="outline">NativeWind</PreviewChip>
        </div>
      </ComponentPlayground>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip variant="default">Default</PreviewChip>
            <PreviewChip variant="secondary">Secondary</PreviewChip>
            <PreviewChip variant="outline">Outline</PreviewChip>
            <PreviewChip variant="destructive">Destructive</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-2">
            <PreviewChip size="sm">Small</PreviewChip>
            <PreviewChip size="md">Medium</PreviewChip>
            <PreviewChip size="lg">Large</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Selectable</h2>
        <p className="text-sm text-muted-foreground mb-4">Use the <code>selected</code> prop for filter chips. Selected chips switch to the default (filled) variant automatically.</p>
        <ComponentPlayground code={selectableCode}>
          <SelectableDemo />
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Closable</h2>
        <p className="text-sm text-muted-foreground mb-4">Add an <code>onClose</code> handler to show a remove button.</p>
        <ComponentPlayground code={closableCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip onClose={() => {}}>Removable</PreviewChip>
            <PreviewChip variant="secondary" onClose={() => {}}>Tag</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 pr-4">Prop</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">variant</td><td className="py-2 pr-4 font-mono text-xs">{`"default" | "secondary" | "outline" | "destructive"`}</td><td className="py-2 font-mono text-xs">{`"outline"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">size</td><td className="py-2 pr-4 font-mono text-xs">{`"sm" | "md" | "lg"`}</td><td className="py-2 font-mono text-xs">{`"md"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">children</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">selected</td><td className="py-2 pr-4 font-mono text-xs">boolean</td><td className="py-2 font-mono text-xs">false</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onClose</td><td className="py-2 pr-4 font-mono text-xs">() =&gt; void</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">textClassName</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">className</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/chip.tsx" />
      </div>
    </div>
  );
}
