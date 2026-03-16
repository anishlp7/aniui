"use client";

import { PreviewRadioGroup, PreviewRadioGroupItem } from "@/components/preview/radio-group";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add radio-group`;

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

const sourceCode = `import React, { createContext, useContext } from "react";
import { View, Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

const RadioGroupContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({ value: "", onValueChange: () => {} });

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}

export function RadioGroup({ value, onValueChange, className, children, ...props }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View className={cn("gap-3", className)} accessibilityRole="radiogroup" {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  label?: string;
}

export function RadioGroupItem({ value, label, className, ...props }: RadioGroupItemProps) {
  const { value: selected, onValueChange } = useContext(RadioGroupContext);
  const isSelected = value === selected;

  return (
    <Pressable
      className={cn("flex-row items-center gap-3 min-h-12 min-w-12", className)}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessible={true}
      onPress={() => onValueChange(value)}
      {...props}
    >
      <View className={cn(
        "h-5 w-5 rounded-full border-2 items-center justify-center",
        isSelected ? "border-primary" : "border-input"
      )}>
        {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </View>
      {label && <Text className="text-base text-foreground">{label}</Text>}
    </Pressable>
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
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewRadioGroup value="option-1" onValueChange={() => {}}>
            <PreviewRadioGroupItem value="option-1" label="Option 1" />
            <PreviewRadioGroupItem value="option-2" label="Option 2" />
            <PreviewRadioGroupItem value="option-3" label="Option 3" />
          </PreviewRadioGroup>
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

      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <p className="text-sm text-muted-foreground">
          RadioGroup exports two components that work together:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">RadioGroup</td>
                <td className="px-4 py-3 text-xs">Root container that manages selection state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">RadioGroupItem</td>
                <td className="px-4 py-3 text-xs">Individual radio option with label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">RadioGroup</h3>
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
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: string) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-foreground mt-6">RadioGroupItem</h3>
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
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
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
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/radio-group.tsx" />
      </div>
    </div>
  );
}
