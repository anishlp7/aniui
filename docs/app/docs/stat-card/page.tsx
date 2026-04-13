import { PreviewStatCardDemo } from "@/components/preview/stat-card";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add stat-card`;
const usageCode = `import { StatCard } from "@/components/ui/stat-card";

export function MyScreen() {
  return (
    <View className="flex-row gap-4 p-4">
      <StatCard
        label="Revenue"
        value="$12,345"
        change={12.5}
        trend="up"
        className="flex-1"
      />
      <StatCard
        label="Users"
        value="1,234"
        change={-3.2}
        trend="down"
        className="flex-1"
      />
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({ className, label, value, change, trend, icon, ...props }: StatCardProps) {
  const trendColor =
    trend === "up" ? "text-green-500" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const trendArrow = trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "";

  return (
    <View
      className={cn("rounded-lg border border-border bg-card p-4", className)}
      accessibilityRole="summary"
      {...props}
    >
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm text-muted-foreground">{label}</Text>
        {icon && <View>{icon}</View>}
      </View>
      <Text className="text-2xl font-bold text-card-foreground">{value}</Text>
      {change !== undefined && (
        <View className="flex-row items-center mt-1 gap-1">
          <Text className={cn("text-sm font-medium", trendColor)}>
            {trendArrow} {change > 0 ? "+" : ""}{change}%
          </Text>
        </View>
      )}
    </View>
  );
}`;
export default function StatCardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Stat Card</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          KPI display card with value, trend indicator, and change percentage.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="stat-card" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewStatCardDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "value", type: "string | number", default: "-" },
          { name: "change", type: "number", default: "-" },
          { name: "trend", type: '"up" | "down" | "neutral"', default: "-" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="summary"</code> for KPI display.</li>
          <li>Value, trend, and change percentage are announced together for context.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/stat-card.tsx" />
      </div>
    </div>
  );
}
