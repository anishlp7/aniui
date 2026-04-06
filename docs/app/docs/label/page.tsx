"use client";
import { PreviewLabel } from "@/components/preview/label";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
const installCode = `npx @aniui/cli add label`;
const usageCode = `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <View>
      <Label>Email</Label>
      <Input placeholder="Enter your email..." />
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { Text } from "react-native";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}
export function Label({ className, ...props }: LabelProps) {
  return (
    <Text
      className={cn("text-sm font-medium text-foreground leading-none", className)}
      {...props}
    />
  );
}`;
export default function LabelPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Label</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Form field label for inputs and controls.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm space-y-5">
            <div>
              <PreviewLabel className="mb-2 block">Email</PreviewLabel>
              <div className="rounded-md border border-input bg-background px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Enter your email...</span>
              </div>
            </div>
            <div>
              <PreviewLabel className="mb-2 block">Password</PreviewLabel>
              <div className="rounded-md border border-input bg-background px-4 py-2.5">
                <span className="text-sm text-muted-foreground">Enter your password...</span>
              </div>
            </div>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="label" />
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
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Associates with form fields for screen readers.</li>
          <li>Use with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativeID</code> to link labels to their corresponding inputs.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/label.tsx" />
      </div>
    </div>
  );
}
