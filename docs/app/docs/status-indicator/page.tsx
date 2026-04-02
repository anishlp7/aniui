"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add status-indicator`;
const usageCode = `import { StatusIndicator } from "@/components/ui/status-indicator";

export function MyScreen() {
  return (
    <View className="flex-row items-center gap-2">
      <StatusIndicator status="online" pulse />
      <Text>Online</Text>
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusVariants = cva("rounded-full", {
  variants: {
    status: {
      online: "bg-green-500",
      offline: "bg-muted-foreground",
      away: "bg-amber-500",
      busy: "bg-destructive",
    },
    size: {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: { status: "offline", size: "md" },
});

export interface StatusIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof statusVariants> {
  className?: string;
  pulse?: boolean;
}

export function StatusIndicator({ status, size, pulse, className, ...props }: StatusIndicatorProps) {
  return (
    <View
      className={cn(
        statusVariants({ status, size }),
        pulse && status === "online" && "animate-pulse",
        className
      )}
      accessibilityLabel={\`Status: \${status ?? "offline"}\`}
      {...props}
    />
  );
}`;
export default function StatusIndicatorPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Status Indicator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Small colored dot indicating online, offline, away, or busy status.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="status-indicator" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "status", type: '"online" | "offline" | "away" | "busy"', default: '"offline"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "pulse", type: "boolean", default: "false" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/status-indicator.tsx" />
      </div>
    </div>
  );
}
