"use client";
import React, { useState } from "react";
import { PreviewStepper } from "@/components/preview/stepper";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add stepper`;
const usageCode = `import { Stepper } from "@/components/ui/stepper";

const [count, setCount] = useState(1);
<Stepper value={count} onChange={setCount} min={0} max={10} />`;
const sizesCode = `<Stepper size="sm" value={1} onChange={setCount} />
<Stepper size="md" value={1} onChange={setCount} />
<Stepper size="lg" value={1} onChange={setCount} />`;
const customStepCode = `<Stepper value={0} onChange={setCount} min={0} max={100} step={5} />`;
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";

const sizes = {
  sm: { height: 36, width: 36 },
  md: { height: 44, width: 44 },
  lg: { height: 56, width: 56 },
} as const;
export interface StepperProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
}
export function Stepper({ size = "md", className, value, onChange, min = 0, max = 99, step = 1, ...props }: StepperProps) {
  const s = sizes[size];
  const canDec = value - step >= min;
  const canInc = value + step <= max;
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", height: s.height, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 8, alignSelf: "flex-start" }}
      accessibilityRole="adjustable" accessibilityValue={{ min, max, now: value }}
      {...props}
    >
      <Pressable
        style={{ width: s.width, height: "100%", alignItems: "center", justifyContent: "center", borderRightWidth: 1, borderRightColor: "#e4e4e7", opacity: canDec ? 1 : 0.3 }}
        onPress={() => { if (canDec) onChange(value - step); }}
        disabled={!canDec} accessible={true} accessibilityRole="button" accessibilityLabel="Decrease"
      >
        <Text style={{ fontSize: 18, color: "#09090b" }}>−</Text>
      </Pressable>
      <View style={{ width: 56, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#09090b" }}>{value}</Text>
      </View>
      <Pressable
        style={{ width: s.width, height: "100%", alignItems: "center", justifyContent: "center", borderLeftWidth: 1, borderLeftColor: "#e4e4e7", opacity: canInc ? 1 : 0.3 }}
        onPress={() => { if (canInc) onChange(value + step); }}
        disabled={!canInc} accessible={true} accessibilityRole="button" accessibilityLabel="Increase"
      >
        <Text style={{ fontSize: 18, color: "#09090b" }}>+</Text>
      </Pressable>
    </View>
  );
}`;
function InteractiveDemo() {
  const [count, setCount] = useState(1);
  return <PreviewStepper value={count} onChange={setCount} min={0} max={10} />;
}
function SizesDemo() {
  const [s1, setS1] = useState(1);
  const [s2, setS2] = useState(1);
  const [s3, setS3] = useState(1);
  return (
    <div className="space-y-3" style={{ maxWidth: 180 }}>
      <PreviewStepper size="sm" value={s1} onChange={setS1} />
      <PreviewStepper size="md" value={s2} onChange={setS2} />
      <PreviewStepper size="lg" value={s3} onChange={setS3} />
    </div>
  );
}
function StepDemo() {
  const [val, setVal] = useState(0);
  return (
    <div className="flex items-center gap-4">
      <PreviewStepper value={val} onChange={setVal} min={0} max={100} step={5} />
      <span className="text-sm text-muted-foreground">Step: 5</span>
    </div>
  );
}
export default function StepperPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stepper</h1>
        <p className="text-muted-foreground text-lg">Numeric increment/decrement control with min, max, and step support. Ideal for quantity selectors.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <div style={{ maxWidth: 180 }}>
          <InteractiveDemo />
        </div>
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="stepper" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <SizesDemo />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Custom Step</h2>
        <p className="text-sm text-muted-foreground mb-4">Use the <code>step</code> prop to control the increment/decrement amount.</p>
        <ComponentPlayground code={customStepCode}>
          <div style={{ maxWidth: 180 }}>
            <StepDemo />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "value", type: "number" },
          { name: "onChange", type: "(value: number) => void" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "99" },
          { name: "step", type: "number", default: "1" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with increment/decrement buttons.</li>
          <li>Current value is announced to screen readers via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityValue</code>.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/stepper.tsx" />
      </div>
    </div>
  );
}