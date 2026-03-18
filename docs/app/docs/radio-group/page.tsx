"use client";
import { useState } from "react";
import { PreviewRadioGroup, PreviewRadioGroupItem } from "@/components/preview/radio-group";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

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
function RadioGroupDemo() {
  const [value, setValue] = useState("option-1");
  return (
    <div className="w-full max-w-sm">
      <PreviewRadioGroup value={value} onValueChange={setValue}>
        <PreviewRadioGroupItem value="option-1" label="Option 1" />
        <PreviewRadioGroupItem value="option-2" label="Option 2" />
        <PreviewRadioGroupItem value="option-3" label="Option 3" />
      </PreviewRadioGroup>
    </div>
  );
}
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
        <RadioGroupDemo />
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
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/radio-group.tsx" />
      </div>
    </div>
  );
}