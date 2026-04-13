import { PreviewSafeAreaDemo } from "@/components/preview/safe-area";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add safe-area`;
const usageCode = `import { SafeArea } from "@/components/ui/safe-area";

export function MyScreen() {
  return (
    <SafeArea variant="default">
      {/* Screen content */}
    </SafeArea>
  );
}`;
const edgesCode = `// Only apply safe area to top and bottom
<SafeArea edges={["top", "bottom"]}>
  {/* Content */}
</SafeArea>

// Card background variant
<SafeArea variant="card">
  {/* Content */}
</SafeArea>`;
const sourceCode = `import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const safeAreaVariants = cva("flex-1", {
  variants: {
    variant: {
      default: "bg-background",
      card: "bg-card",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface SafeAreaProps
  extends React.ComponentPropsWithoutRef<typeof SafeAreaView>,
    VariantProps<typeof safeAreaVariants> {
  className?: string;
}

export function SafeArea({ variant, className, ...props }: SafeAreaProps) {
  return (
    <SafeAreaView
      className={cn(safeAreaVariants({ variant }), className)}
      {...props}
    />
  );
}`;
export default function SafeAreaPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Safe Area</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Styled SafeAreaView wrapper with theme-aware variants.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="safe-area" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewSafeAreaDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Edges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Examples</h2>
        <CodeBlock code={edgesCode} title="Edges and variants" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: '"default" | "card" | "transparent"', default: '"default"' },
          { name: "className", type: "string", default: "-" },
          { name: "edges", type: '("top" | "bottom" | "left" | "right")[]', default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SafeAreaView</code> props from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-safe-area-context</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SafeAreaView</code> wrapper that respects device safe areas.</li>
          <li>No additional accessibility concerns -- content within inherits standard behavior.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/safe-area.tsx" />
      </div>
    </div>
  );
}
