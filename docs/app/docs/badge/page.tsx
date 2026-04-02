"use client";
import { PreviewBadge } from "@/components/preview/badge";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add badge`;
const usageCode = `import { Badge } from "@/components/ui/badge";

export function MyScreen() {
  return (
    <Badge>New</Badge>
  );
}`;
const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("flex-row items-center rounded-full px-2.5 py-0.5", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      outline: "border border-border bg-transparent",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      destructive: "text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  textClassName?: string;
  children: string;
}
export function Badge({ variant, className, textClassName, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }), textClassName)}>{children}</Text>
    </View>
  );
}`;
export default function BadgePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Badge</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Small status indicator with multiple variants.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewBadge>New</PreviewBadge>
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="badge" />
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
            <PreviewBadge variant="default">Default</PreviewBadge>
            <PreviewBadge variant="secondary">Secondary</PreviewBadge>
            <PreviewBadge variant="outline">Outline</PreviewBadge>
            <PreviewBadge variant="destructive">Destructive</PreviewBadge>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"destructive\"", default: "\"default\"" },
          { name: "className", type: "string" },
          { name: "textClassName", type: "string" },
          { name: "children", type: "string", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/badge.tsx" />
      </div>
    </div>
  );
}