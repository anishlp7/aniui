"use client";

import { PreviewSelect } from "@/components/preview/select";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add select`;

const depInstallCode = `npx expo install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated`;

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

const sourceCode = `import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { View, Pressable, Text } from "react-native";
import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<GorhomBottomSheet, SelectProps>(
  ({ className, placeholder = "Select...", options, value, onValueChange }, ref) => {
    const [internalValue, setInternalValue] = useState(value ?? "");
    const selected = value ?? internalValue;
    const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
    const sheetRef = useRef<GorhomBottomSheet>(null);

    useImperativeHandle(ref, () => sheetRef.current as GorhomBottomSheet);

    const renderBackdrop = useCallback(
      (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
        <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    const handleSelect = (val: string) => {
      setInternalValue(val);
      onValueChange?.(val);
      sheetRef.current?.close();
    };

    return (
      <>
        <Pressable
          className={cn("flex-row items-center justify-between rounded-md border border-input bg-background px-4 min-h-12", className)}
          onPress={() => sheetRef.current?.expand()}
          accessible={true}
          accessibilityRole="button"
        >
          <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
            {selectedLabel}
          </Text>
          <Text className="text-muted-foreground">▾</Text>
        </Pressable>

        <GorhomBottomSheet
          ref={sheetRef}
          index={-1}
          enableDynamicSizing
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: "hsl(0, 0%, 100%)" }}
          handleIndicatorStyle={{ backgroundColor: "hsl(240, 3.8%, 46.1%)" }}
        >
          <BottomSheetView>
            <View className="pb-8">
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  className={cn(
                    "flex-row items-center px-4 py-3 min-h-12",
                    option.value === selected && "bg-accent"
                  )}
                  onPress={() => handleSelect(option.value)}
                  accessible={true}
                  accessibilityRole="button"
                >
                  <Text className={cn("text-base flex-1", option.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>
                    {option.label}
                  </Text>
                  {option.value === selected && <Text className="text-primary">✓</Text>}
                </Pressable>
              ))}
            </View>
          </BottomSheetView>
        </GorhomBottomSheet>
      </>
    );
  }
);

Select.displayName = "Select";`;

export default function SelectPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Select</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Dropdown select using a bottom sheet for option picking.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewSelect
            options={[
              { label: "Apple", value: "apple" },
              { label: "Banana", value: "banana" },
              { label: "Cherry", value: "cherry" },
            ]}
            placeholder="Pick a fruit..."
          />
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires additional dependencies:
        </p>
        <CodeBlock code={depInstallCode} />
        <p className="text-sm text-muted-foreground">
          You also need to wrap your app with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code> from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code>.
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">options</td>
                <td className="px-4 py-3 font-mono text-xs">SelectOption[]</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(value: string) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">{`"Select..."`}</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-foreground mt-6">SelectOption</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Property</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/select.tsx" />
      </div>
    </div>
  );
}
