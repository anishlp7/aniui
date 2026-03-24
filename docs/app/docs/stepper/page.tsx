"use client";
import React, { useState } from "react";
import { PreviewStepper } from "@/components/preview/stepper";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

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
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex-row items-center rounded-lg border border-input", {
  variants: {
    size: {
      sm: "h-9",
      md: "h-11",
      lg: "h-14",
    },
  },
  defaultVariants: { size: "md" },
});
const btnSizes = { sm: "w-9", md: "w-11", lg: "w-14" } as const;
export interface StepperProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof stepperVariants> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}
export function Stepper({ size, className, value, onChange, min = 0, max = 99, step = 1, ...props }: StepperProps) {
  const s = size ?? "md";
  const canDec = value - step >= min;
  const canInc = value + step <= max;
  return (
    <View className={cn(stepperVariants({ size }), className)} accessibilityRole="adjustable" accessibilityValue={{ min, max, now: value }} {...props}>
      <Pressable
        className={cn("items-center justify-center border-r border-input", btnSizes[s], !canDec && "opacity-30")}
        onPress={() => canDec && onChange(value - step)}
        disabled={!canDec}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
      >
        <Text className="text-lg text-foreground">−</Text>
      </Pressable>
      <View className="flex-1 items-center justify-center px-3">
        <Text className="text-base font-medium text-foreground">{value}</Text>
      </View>
      <Pressable
        className={cn("items-center justify-center border-l border-input", btnSizes[s], !canInc && "opacity-30")}
        onPress={() => canInc && onChange(value + step)}
        disabled={!canInc}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
      >
        <Text className="text-lg text-foreground">+</Text>
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
        <CodeBlock code={installCode} />
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
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/stepper.tsx" />
      </div>
    </div>
  );
}