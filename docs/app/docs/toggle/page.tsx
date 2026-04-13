import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ToggleDemo, ToggleVariantsDemo, ToggleSizesDemo } from "./_demos";

const installCode = `npx @aniui/cli add toggle`;
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
        <ToggleDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="toggle" />
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
          <ToggleVariantsDemo />
        </ComponentPlayground>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <ToggleSizesDemo />
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
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with pressed state announced to screen readers.</li>
          <li>Supports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for selected/unselected.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/toggle.tsx" />
      </div>
    </div>
  );
}
