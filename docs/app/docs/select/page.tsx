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
      label="Fruit"
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
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from "react-native-reanimated";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

export function Select({ placeholder = "Select...", options, value, onValueChange, label }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(value ?? "");
  const selected = value ?? internal;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
  const isPlaceholder = !selected;

  const pick = (val: string) => {
    setInternal(val);
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 48,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "#e4e4e7",
          borderRadius: 8,
          backgroundColor: "#ffffff",
        }}
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
      >
        <Text style={{ fontSize: 16, color: isPlaceholder ? "#a1a1aa" : "#09090b" }}>{selectedLabel}</Text>
        <Text style={{ fontSize: 12, color: "#a1a1aa" }}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="none" onRequestClose={() => setOpen(false)}>
        {/* Backdrop */}
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} />
        </Pressable>

        {/* Sheet */}
        <Animated.View
          entering={SlideInUp.duration(300)}
          exiting={SlideOutDown.duration(200)}
          style={{ backgroundColor: "#ffffff", borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 34 }}
        >
          {/* Handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: "#d4d4d8" }} />
          </View>

          {/* Title + Done */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#09090b" }}>{label ?? placeholder}</Text>
            <Pressable onPress={() => setOpen(false)} accessible={true} accessibilityRole="button" accessibilityLabel="Done">
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#3b82f6" }}>Done</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: "#f4f4f5" }} />

          {/* Options */}
          <ScrollView bounces={false} style={{ maxHeight: 320 }}>
            {options.map((o) => {
              const isSelected = o.value === selected;
              return (
                <Pressable
                  key={o.value}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                    backgroundColor: isSelected ? "#f4f4f5" : "transparent",
                  }}
                  onPress={() => pick(o.value)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text style={{ flex: 1, fontSize: 16, color: "#09090b", fontWeight: isSelected ? "600" : "400" }}>{o.label}</Text>
                  {isSelected && <Text style={{ fontSize: 16, color: "#3b82f6", fontWeight: "700" }}>✓</Text>}
                </Pressable>
              );
            })}
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
          label="Fruit"
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
          { name: "label", type: "string" },
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
