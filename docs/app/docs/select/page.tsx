"use client";
import { PreviewSelect } from "@/components/preview/select";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add select`;
const usageCode = `import { Select } from "@/components/ui/select";
import { useState } from "react";

export function MyScreen() {
  const [value, setValue] = useState("");
  return (
    <Select
      placeholder="Select a fruit..."
      options={[
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
        { label: "Grape", value: "grape" },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
}`;
const sourceCode = `import React, { useState } from "react";
import { View, Pressable, Text, Modal, ScrollView } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface SelectOption { label: string; value: string }
export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}
export function Select({ className, placeholder = "Select...", options, value, onValueChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value ?? "");
  const selected = value ?? internal;
  const label = options.find((o) => o.value === selected)?.label ?? placeholder;
  const pick = (val: string) => { setInternal(val); onValueChange?.(val); setOpen(false); };
  return (
    <>
      <Pressable
        className={cn("flex-row items-center justify-between rounded-md border border-input bg-background px-4 min-h-12", className)}
        onPress={() => setOpen(true)} accessible={true} accessibilityRole="button"
      >
        <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
        <Text className="text-muted-foreground">▾</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} className="flex-1 bg-black/50" />
        </Pressable>
        <Animated.View entering={SlideInDown.duration(250)} exiting={SlideOutDown.duration(200)} className="rounded-t-2xl bg-card pb-8">
          <View className="items-center pt-3 pb-2">
            <View className="h-1 w-10 rounded-full bg-muted-foreground/30" />
          </View>
          <ScrollView bounces={false} style={{ maxHeight: 320 }}>
            {options.map((o) => (
              <Pressable key={o.value} className={cn("flex-row items-center px-4 py-3.5 min-h-12", o.value === selected && "bg-accent")} onPress={() => pick(o.value)} accessible={true} accessibilityRole="button">
                <Text className={cn("text-base flex-1", o.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>{o.label}</Text>
                {o.value === selected && <Text className="text-primary">✓</Text>}
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </Modal>
    </>
  );
}`;
export default function SelectPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Select</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Modal-based dropdown select with animated slide-up picker.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <PreviewSelect
          options={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Cherry", value: "cherry" },
            { label: "Grape", value: "grape" },
          ]}
          placeholder="Pick a fruit..."
        />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "options", type: "SelectOption[]", default: "required" },
          { name: "value", type: "string" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "placeholder", type: "string", default: "\"Select...\"" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">SelectOption</h3>
        <PropsTable props={[
          { name: "label", type: "string" },
          { name: "value", type: "string" },
        ]} />
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/select.tsx" />
      </div>
    </div>
  );
}
