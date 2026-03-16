"use client";

import { PreviewSwitch } from "@/components/preview/switch";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add switch`;

const usageCode = `import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function MyScreen() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch value={enabled} onValueChange={setEnabled} />
  );
}`;

const sourceCode = `import React from "react";
import { View, Switch as RNSwitch, Platform } from "react-native";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof RNSwitch> {
  className?: string;
}

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <View className={cn("", className)}>
      <RNSwitch
        trackColor={{
          false: "hsl(240, 4.8%, 95.9%)",
          true: "hsl(240, 5.9%, 10%)",
        }}
        thumbColor={Platform.OS === "android" ? "hsl(0, 0%, 98%)" : undefined}
        ios_backgroundColor="hsl(240, 4.8%, 95.9%)"
        accessibilityRole="switch"
        {...props}
      />
    </View>
  );
}`;

export default function SwitchPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Switch</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Toggle switch for boolean settings.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex items-center gap-4">
          <PreviewSwitch />
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

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: boolean) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Switch</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/switch.tsx" />
      </div>
    </div>
  );
}
