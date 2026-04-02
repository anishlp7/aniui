"use client";
import { PreviewSpinner } from "@/components/preview/spinner";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add spinner`;
const usageCode = `import { Spinner } from "@/components/ui/spinner";

export function MyScreen() {
  return <Spinner />;
}`;
const sizesCode = `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`;
const sourceCode = `import React from "react";
import { ActivityIndicator, View } from "react-native";
import { cn } from "@/lib/utils";

const sizeMap = { sm: "small", md: "small", lg: "large" } as const;
export interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}
export function Spinner({ size = "md", color, className, ...props }: SpinnerProps) {
  return (
    <View className={cn("items-center justify-center", className)} {...props}>
      <ActivityIndicator
        size={sizeMap[size]}
        color={color ?? "hsl(240, 5.9%, 10%)"}
        accessibilityRole="progressbar"
      />
    </View>
  );
}`;
export default function SpinnerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Spinner</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A loading spinner component with size variants, built on React Native&apos;s ActivityIndicator.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewSpinner />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="spinner" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-6">
            <PreviewSpinner size="sm" />
            <PreviewSpinner size="md" />
            <PreviewSpinner size="lg" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "color", type: "string", default: "\"hsl(240, 5.9%, 10%)\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/spinner.tsx" />
      </div>
    </div>
  );
}