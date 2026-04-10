"use client";
import { PreviewCheckbox } from "@/components/preview/checkbox";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add checkbox`;
const usageCode = `import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function MyScreen() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onCheckedChange={setChecked} />
  );
}`;
const statesCode = `<Checkbox checked={false} />
<Checkbox checked={true} />
<Checkbox disabled />`;
const sourceCode = `import React from "react";
import { Pressable, View, Text } from "react-native";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({ checked = false, onCheckedChange, className, disabled, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      asChild
    >
      <Pressable
        className="min-h-12 min-w-12 items-center justify-center"
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled: !!disabled }}
        onPress={() => !disabled && onCheckedChange?.(!checked)}
        {...props}
      >
        <View
          className={cn(
            "h-5 w-5 items-center justify-center rounded border",
            checked ? "border-primary bg-primary" : "border-input bg-background",
            disabled && "opacity-50",
            className
          )}
        >
          <CheckboxPrimitive.Indicator>
            <Text className="text-xs text-primary-foreground font-bold">✓</Text>
          </CheckboxPrimitive.Indicator>
        </View>
      </Pressable>
    </CheckboxPrimitive.Root>
  );
}`;
export default function CheckboxPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkbox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Checkbox with checked, unchecked, and disabled states.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewCheckbox />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="checkbox" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* States */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">States</h2>
        <ComponentPlayground code={statesCode}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <PreviewCheckbox checked={false} />
              <span className="text-sm text-muted-foreground">Unchecked</span>
            </div>
            <div className="flex items-center gap-2">
              <PreviewCheckbox checked={true} />
              <span className="text-sm text-muted-foreground">Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <PreviewCheckbox disabled />
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "checked", type: "boolean", default: "false" },
          { name: "onCheckedChange", type: "(checked: boolean) => void" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/checkbox</code> for checked/indeterminate state management.</li>
          <li>Checked state is announced to screen readers automatically.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/checkbox.tsx" />
      </div>
    </div>
  );
}