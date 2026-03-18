"use client";

import React, { useState } from "react";
import { PreviewSegmentedControl } from "@/components/preview/segmented-control";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add segmented-control`;

const usageCode = `import { SegmentedControl } from "@/components/ui/segmented-control";

const [view, setView] = useState("List");

<SegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />`;

const sizesCode = `<SegmentedControl size="sm" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="md" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="lg" options={["S", "M", "L"]} value={size} onValueChange={setSize} />`;

const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentVariants = cva("rounded-lg bg-muted p-1 flex-row", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-11",
      lg: "h-13",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SegmentedControlProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof segmentVariants> {
  className?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SegmentedControl({ size, className, options, value, onValueChange, ...props }: SegmentedControlProps) {
  return (
    <View className={cn(segmentVariants({ size }), className)} accessibilityRole="tablist" {...props}>
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            className={cn("flex-1 items-center justify-center rounded-md", active && "bg-background shadow-sm")}
            onPress={() => onValueChange(option)}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}`;

function SizesDemo() {
  const [sm, setSm] = useState("S");
  const [md, setMd] = useState("M");
  const [lg, setLg] = useState("L");
  return (
    <div className="space-y-3 max-w-xs">
      <PreviewSegmentedControl size="sm" options={["S", "M", "L"]} value={sm} onValueChange={setSm} />
      <PreviewSegmentedControl size="md" options={["S", "M", "L"]} value={md} onValueChange={setMd} />
      <PreviewSegmentedControl size="lg" options={["S", "M", "L"]} value={lg} onValueChange={setLg} />
    </div>
  );
}

export default function SegmentedControlPage() {
  const [view, setView] = useState("List");
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Segmented Control</h1>
        <p className="text-muted-foreground text-lg">iOS-style segmented control for switching between views or filter options.</p>
      </div>

      <ComponentPlayground code={usageCode}>
        <div className="max-w-xs">
          <PreviewSegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />
        </div>
      </ComponentPlayground>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <SizesDemo />
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 pr-4">Prop</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">options</td><td className="py-2 pr-4 font-mono text-xs">string[]</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">value</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onValueChange</td><td className="py-2 pr-4 font-mono text-xs">{`(value: string) => void`}</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">size</td><td className="py-2 pr-4 font-mono text-xs">{`"sm" | "md" | "lg"`}</td><td className="py-2 font-mono text-xs">{`"md"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">className</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/segmented-control.tsx" />
      </div>
    </div>
  );
}
