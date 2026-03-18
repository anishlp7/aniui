"use client";
import { PreviewSeparator } from "@/components/preview/separator";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx aniui add separator`;
const usageCode = `import { Separator } from "@/components/ui/separator";

export function MyScreen() {
  return (
    <View>
      <Text>Above</Text>
      <Separator />
      <Text>Below</Text>
    </View>
  );
}`;
const orientationCode = `<Separator orientation="horizontal" />
<Separator orientation="vertical" />`;
const sourceCode = `import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  orientation?: "horizontal" | "vertical";
}
export function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  return (
    <View
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}`;
export default function SeparatorPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Separator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Visual divider for separating content sections.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="space-y-4 w-full max-w-sm">
          <p className="text-sm text-foreground">Above the separator</p>
          <PreviewSeparator />
          <p className="text-sm text-foreground">Below the separator</p>
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
      {/* Orientation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Orientation</h2>
        <ComponentPlayground code={orientationCode}>
          <div className="flex items-center gap-6">
            <div className="space-y-3 w-48">
              <p className="text-xs text-muted-foreground">Horizontal</p>
              <PreviewSeparator orientation="horizontal" />
            </div>
            <div className="flex items-center gap-3 h-16">
              <p className="text-xs text-muted-foreground">Vertical</p>
              <PreviewSeparator orientation="vertical" />
            </div>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/separator.tsx" />
      </div>
    </div>
  );
}