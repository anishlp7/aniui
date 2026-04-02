"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add labeled-separator`;
const usageCode = `import { LabeledSeparator } from "@/components/ui/labeled-separator";

export function MyScreen() {
  return (
    <View>
      <Text>Sign in with email</Text>
      <LabeledSeparator label="or" />
      <Button>Sign in with Google</Button>
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface LabeledSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label: string;
  labelClassName?: string;
}

export function LabeledSeparator({ label, className, labelClassName, ...props }: LabeledSeparatorProps) {
  return (
    <View className={cn("flex-row items-center gap-3 my-2", className)} {...props}>
      <View className="flex-1 h-px bg-border" />
      <Text className={cn("text-sm text-muted-foreground", labelClassName)}>{label}</Text>
      <View className="flex-1 h-px bg-border" />
    </View>
  );
}`;
export default function LabeledSeparatorPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Labeled Separator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Horizontal separator with a centered text label.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="labeled-separator" />
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
          { name: "label", type: "string", default: "-" },
          { name: "className", type: "string", default: "-" },
          { name: "labelClassName", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Decorative separator with centered label text.</li>
          <li>The label text is readable by screen readers; the separator lines are decorative.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/labeled-separator.tsx" />
      </div>
    </div>
  );
}
