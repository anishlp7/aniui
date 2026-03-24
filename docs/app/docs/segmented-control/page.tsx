"use client";
import React, { useState } from "react";
import { PreviewSegmentedControl } from "@/components/preview/segmented-control";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add segmented-control`;
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
      lg: "h-14",
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
  const [sm, setSm] = useState("Day");
  const [md, setMd] = useState("Week");
  const [lg, setLg] = useState("Month");
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Small</p>
        <PreviewSegmentedControl size="sm" options={["Day", "Week", "Month"]} value={sm} onValueChange={setSm} />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Medium (default)</p>
        <PreviewSegmentedControl size="md" options={["Day", "Week", "Month"]} value={md} onValueChange={setMd} />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Large</p>
        <PreviewSegmentedControl size="lg" options={["Day", "Week", "Month"]} value={lg} onValueChange={setLg} />
      </div>
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
        <div className="w-full max-w-xs space-y-4">
          <PreviewSegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-6 text-center">
            <p className="text-xs text-muted-foreground">Showing <span className="font-medium text-foreground">{view}</span> view</p>
          </div>
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
        <PropsTable props={[
          { name: "options", type: "string[]" },
          { name: "value", type: "string" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/segmented-control.tsx" />
      </div>
    </div>
  );
}