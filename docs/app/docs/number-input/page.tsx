import { Heading } from "@/components/heading";
import { PreviewNumberInputDemo } from "@/components/preview/number-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add number-input`;
const usageCode = `import { NumberInput } from "@/components/ui/number-input";

export function MyScreen() {
  const [quantity, setQuantity] = useState(1);

  return (
    <NumberInput
      value={quantity}
      onValueChange={setQuantity}
      min={1}
      max={99}
      step={1}
    />
  );
}`;
const sourceCode = `import React, { useState, useCallback } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const numberVariants = cva("flex-row items-center rounded-md border", {
  variants: {
    variant: {
      default: "border-input bg-background",
      ghost: "border-transparent bg-transparent",
    },
    size: {
      sm: "min-h-9 px-2",
      md: "min-h-12 px-3",
      lg: "min-h-14 px-4",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface NumberInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "value" | "onChangeText">,
    VariantProps<typeof numberVariants> {
  className?: string;
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput({
  variant,
  size,
  className,
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 999999,
  step = 1,
  ...props
}: NumberInputProps) {
  const [internal, setInternal] = useState(controlledValue ?? min);
  const value = controlledValue ?? internal;

  const update = useCallback(
    (next: number) => {
      const clamped = Math.min(max, Math.max(min, next));
      setInternal(clamped);
      onValueChange?.(clamped);
    },
    [min, max, onValueChange]
  );

  return (
    <View className={cn(numberVariants({ variant, size }), className)}>
      <Pressable
        onPress={() => update(value - step)}
        disabled={value <= min}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Text className={cn("text-lg font-bold", value <= min ? "text-muted" : "text-foreground")}>\u2212</Text>
      </Pressable>
      <TextInput
        className="flex-1 text-center text-foreground text-base p-0"
        keyboardType="number-pad"
        value={String(value)}
        onChangeText={(t) => update(Number(t) || min)}
        accessibilityLabel="Number value"
        {...props}
      />
      <Pressable
        onPress={() => update(value + step)}
        disabled={value >= max}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Increase"
        className="min-h-10 min-w-10 items-center justify-center"
      >
        <Text className={cn("text-lg font-bold", value >= max ? "text-muted" : "text-foreground")}>+</Text>
      </Pressable>
    </View>
  );
}`;
export default function NumberInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Number Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Numeric input with increment and decrement buttons.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="number-input" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewNumberInputDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: '"default" | "ghost"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "value", type: "number", default: "-" },
          { name: "onValueChange", type: "(value: number) => void", default: "-" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "999999" },
          { name: "step", type: "number", default: "1" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">value</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Increment/decrement buttons with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityValue</code> for current value.</li>
          <li>Min/max boundaries are enforced and announced to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/number-input.tsx" />
      </div>
    </div>
  );
}
