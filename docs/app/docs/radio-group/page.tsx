import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { RadioGroupDemo } from "./_demos";

const installCode = `npx @aniui/cli add radio-group`;
const usageCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function MyScreen() {
  const [value, setValue] = useState("option-1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioGroupItem value="option-1" label="Option 1" />
      <RadioGroupItem value="option-2" label="Option 2" />
      <RadioGroupItem value="option-3" label="Option 3" />
    </RadioGroup>
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import * as RadioGroupPrimitive from "@rn-primitives/radio-group";
import { cn } from "@/lib/utils";

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root value={value} onValueChange={onValueChange} asChild>
      <View className={cn("gap-3", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </RadioGroupPrimitive.Root>
  );
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  label?: string;
}

export function RadioGroupItem({ value, label, className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item value={value} asChild>
      <Pressable
        className={cn("flex-row items-center gap-3 min-h-12 min-w-12", className)}
        accessible={true}
        {...props}
      >
        <View className="h-5 w-5 rounded-full border-2 border-input items-center justify-center">
          <RadioGroupPrimitive.Indicator>
            <View className="h-2.5 w-2.5 rounded-full bg-primary" />
          </RadioGroupPrimitive.Indicator>
        </View>
        {label && <Text className="text-base text-foreground">{label}</Text>}
      </Pressable>
    </RadioGroupPrimitive.Item>
  );
}`;
export default function RadioGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">RadioGroup</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Radio button group for single-selection from a list of options.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <RadioGroupDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="radio-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <p className="text-sm text-muted-foreground">
          RadioGroup exports two components that work together:
        </p>
        <ComponentTable components={[
          { name: "RadioGroup", description: "Root container that manages selection state" },
          { name: "RadioGroupItem", description: "Individual radio option with label" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">RadioGroup</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "onValueChange", type: "(value: string) => void", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">RadioGroupItem</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "label", type: "string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/radio-group</code> for arrow key navigation.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="radiogroup"</code> on container with individual radio items properly associated.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/radio-group.tsx" />
      </div>
    </div>
  );
}
