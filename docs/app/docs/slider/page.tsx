"use client";
import { PreviewSlider } from "@/components/preview/slider";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
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
import { View, PanResponder } from "react-native";
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
  const [trackWidth, setTrackWidth] = useState(0);
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const thumbSize = size === "lg" ? 24 : size === "sm" ? 16 : 20;

  const clampValue = (raw: number) => {
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  };

  const calcValue = (locationX: number) => {
    if (trackWidth <= 0) return value;
    const ratio = Math.max(0, Math.min(1, locationX / trackWidth));
    return clampValue(min + ratio * (max - min));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: (e) => {
      onValueChange?.(calcValue(e.nativeEvent.locationX));
    },
    onPanResponderMove: (e) => {
      onValueChange?.(calcValue(e.nativeEvent.locationX));
    },
  });

  return (
    <View
      className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
      accessible={true}
      accessibilityRole="adjustable"
      accessibilityValue={{ min, max, now: value }}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
      {...props}
    >
      <View className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <View className="h-full rounded-full bg-primary" style={{ width: \`\${pct}%\` }} />
      </View>
      <View
        style={{
          position: "absolute",
          left: \`\${pct}%\`,
          marginLeft: -(thumbSize / 2),
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
          borderWidth: 2,
          borderColor: "#18181b",
          backgroundColor: "#ffffff",
        }}
      />
    </View>
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
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
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
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses PanResponder for smooth gesture-based dragging</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with min/max/now values exposed to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/slider.tsx" />
      </div>
    </div>
  );
}
