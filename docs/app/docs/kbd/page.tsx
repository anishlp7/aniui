import { PreviewKbdDemo, PreviewKbdGroupDemo, PreviewKbdSizes } from "@/components/preview/kbd";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function MyScreen() {
  return (
    <KbdGroup>
      <Kbd>Cmd</Kbd>
      <Kbd>C</Kbd>
    </KbdGroup>
  );
}`;
const groupCode = `import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function MyScreen() {
  return (
    <KbdGroup separator="+">
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  );
}`;
const sizesCode = `import { Kbd } from "@/components/ui/kbd";

export function MyScreen() {
  return (
    <>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Tab</Kbd>
      <Kbd size="lg">Enter</Kbd>
    </>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "items-center justify-center rounded-md border border-border bg-muted",
  {
    variants: {
      size: {
        sm: "min-h-5 px-1",
        md: "min-h-6 px-1.5",
        lg: "min-h-7 px-2",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const kbdTextVariants = cva("font-mono text-muted-foreground", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
});

export interface KbdProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof kbdVariants> {
  className?: string;
  textClassName?: string;
  children: string;
}

export function Kbd({ size, className, textClassName, children, ...props }: KbdProps) {
  return (
    <View className={cn(kbdVariants({ size }), className)} {...props}>
      <Text className={cn(kbdTextVariants({ size }), textClassName)}>{children}</Text>
    </View>
  );
}

export interface KbdGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  separator?: string;
  children: React.ReactNode;
}

export function KbdGroup({ className, separator = "+", children, ...props }: KbdGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <View className={cn("flex-row items-center gap-1", className)} {...props}>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {i < items.length - 1 && (
            <Text className="text-xs text-muted-foreground">{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}`;
export default function KbdPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Kbd</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Display keyboard input keys. Useful for iPad keyboard hints and help screens.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewKbdDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="kbd" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* KbdGroup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">KbdGroup</h2>
        <PreviewToggle>
          <ComponentPlayground code={groupCode}>
            <PreviewKbdGroupDemo />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <PreviewToggle>
          <ComponentPlayground code={sizesCode}>
            <div className="flex flex-row items-center gap-3">
              <PreviewKbdSizes />
            </div>
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">
          Kbd provides two components:
        </p>
        <ComponentTable components={[
          { name: "Kbd", description: "A single keyboard key indicator with size variants." },
          { name: "KbdGroup", description: "Groups multiple Kbd elements with a separator character between them." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Kbd</h3>
        <PropsTable props={[
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "className", type: "string", default: "-" },
          { name: "textClassName", type: "string", default: "-" },
          { name: "children", type: "string", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">KbdGroup</h3>
        <PropsTable props={[
          { name: "separator", type: "string", default: '"+"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses monospaced font for consistent key display.</li>
          <li>Pair with descriptive text so screen readers convey the shortcut meaning, not just the key names.</li>
          <li>Consider using <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> on the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">KbdGroup</code> to describe the full shortcut (e.g. &quot;Copy shortcut: Command plus C&quot;).</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/kbd.tsx" />
      </div>
    </div>
  );
}
