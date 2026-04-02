"use client";
import { PreviewSlider } from "@/components/preview/slider";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add slider`;
const usageCode = `import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function MyScreen() {
  const [value, setValue] = useState(50);
  return (
    <Slider
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
    />
  );
}`;
const disabledCode = `<Slider value={30} disabled />`;
const sourceCode = `import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sliderVariants = cva("w-full justify-center", {
  variants: {
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: { size: "md" },
});
export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof sliderVariants> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
}
export function Slider({
  value = 0, min = 0, max = 100, step = 1, disabled, size,
  onValueChange, className, ...props
}: SliderProps) {
  const [width, setWidth] = useState(0);
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const handlePress = (e: { nativeEvent: { locationX: number } }) => {
    if (disabled) return;
    const raw = min + ((e.nativeEvent.locationX / width) * (max - min));
    const stepped = Math.round(raw / step) * step;
    onValueChange?.(Math.max(min, Math.min(max, stepped)));
  };
  return (
    <Pressable
      className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      disabled={disabled}
      {...props}
    >
      <View className="h-1.5 w-full rounded-full bg-secondary">
        <View className="h-full rounded-full bg-primary" style={{ width: \`\${pct}%\` }} />
      </View>
      <View
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background"
        style={{ left: \`\${pct}%\`, marginLeft: -10 }}
      />
    </Pressable>
  );
}`;
export default function SliderPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Slider</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          An interactive slider component for selecting a value within a range.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex w-full items-center gap-4">
          <PreviewSlider />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="slider" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Default */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Default</h2>
        <ComponentPlayground code={usageCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider />
          </div>
        </ComponentPlayground>
      </div>
      {/* Disabled */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Disabled</h2>
        <ComponentPlayground code={disabledCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider disabled />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "value", type: "number", default: "0" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "100" },
          { name: "step", type: "number", default: "1" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "onValueChange", type: "(value: number) => void" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/slider.tsx" />
      </div>
    </div>
  );
}
