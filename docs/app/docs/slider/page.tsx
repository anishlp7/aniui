"use client";

import { PreviewSlider } from "@/components/preview/slider";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add slider`;

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
        <CodeBlock code={installCode} />
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
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">0</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">min</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">0</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">max</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">100</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">step</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">1</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 font-mono text-xs">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"md"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: number) => void`}</td>
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
