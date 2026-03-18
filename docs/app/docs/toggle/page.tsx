"use client";
import { PreviewToggle } from "@/components/preview/toggle";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx aniui add toggle`;
const usageCode = `import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export function MyScreen() {
  const [bold, setBold] = useState(false);
  return (
    <Toggle pressed={bold} onPressedChange={setBold}>
      B
    </Toggle>
  );
}`;
const variantsCode = `<Toggle variant="default" pressed={false}>Default</Toggle>
<Toggle variant="outline" pressed={false}>Outline</Toggle>`;
const sizesCode = `<Toggle size="sm">S</Toggle>
<Toggle size="md">M</Toggle>
<Toggle size="lg">L</Toggle>`;
const sourceCode = `import React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
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
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof toggleVariants> {
  className?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
}
export function Toggle({
  pressed = false, onPressedChange, variant, size, className, children, ...props
}: ToggleProps) {
  return (
    <Pressable
      className={cn(
        toggleVariants({ variant, size }),
        pressed && "bg-accent",
        className
      )}
      onPress={() => onPressedChange?.(!pressed)}
      accessibilityRole="button"
      accessibilityState={{ selected: pressed }}
      accessible={true}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", pressed ? "text-accent-foreground" : "text-muted-foreground")}>
          {children}
        </Text>
      ) : children}
    </Pressable>
  );
}`;
export default function TogglePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toggle</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A two-state button that can be toggled on or off.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex items-center gap-2">
          <PreviewToggle pressed={true}><span className="font-bold">B</span></PreviewToggle>
          <PreviewToggle><span className="italic">I</span></PreviewToggle>
          <PreviewToggle><span className="underline">U</span></PreviewToggle>
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
      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewToggle variant="default">Default</PreviewToggle>
            <PreviewToggle variant="outline">Outline</PreviewToggle>
          </div>
        </ComponentPlayground>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewToggle size="sm">S</PreviewToggle>
            <PreviewToggle size="md">M</PreviewToggle>
            <PreviewToggle size="lg">L</PreviewToggle>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"outline\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "pressed", type: "boolean", default: "false" },
          { name: "onPressedChange", type: "(pressed: boolean) => void" },
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/toggle.tsx" />
      </div>
    </div>
  );
}