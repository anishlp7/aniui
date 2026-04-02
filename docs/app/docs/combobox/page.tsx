"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add combobox`;
const usageCode = `import { Combobox } from "@/components/ui/combobox";

const frameworks = [
  { label: "React Native", value: "rn" },
  { label: "Flutter", value: "flutter" },
  { label: "SwiftUI", value: "swiftui" },
  { label: "Jetpack Compose", value: "compose" },
];

export function MyScreen() {
  const [value, setValue] = useState("");

  return (
    <Combobox
      options={frameworks}
      value={value}
      onValueChange={setValue}
      placeholder="Select framework..."
      searchPlaceholder="Search frameworks..."
      emptyText="No frameworks found"
    />
  );
}`;
const sourceCode = `import React, { useState, useMemo } from "react";
import { View, TextInput, Pressable, Text, FlatList, Modal } from "react-native";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function Combobox({
  className,
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())),
    [options, search]
  );

  return (
    <View className={cn("", className)} {...props}>
      <Pressable
        className="flex-row items-center justify-between min-h-12 px-4 rounded-md border border-input bg-background"
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={selected ? \`Selected: \${selected.label}\` : placeholder}
      >
        <Text className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
          {selected?.label ?? placeholder}
        </Text>
        <Text className="text-muted-foreground text-xs">\u25BC</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/50 justify-end" onPress={() => setOpen(false)}>
          <Pressable className="bg-card rounded-t-2xl max-h-96 pb-8" onPress={() => {}}>
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-muted" />
            </View>
            <View className="px-4 pb-3">
              <TextInput
                className="min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor="hsl(240 3.8% 46.1%)"
                value={search}
                onChangeText={setSearch}
                autoFocus
                accessibilityLabel="Search options"
              />
            </View>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              ListEmptyComponent={
                <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
              }
              renderItem={({ item }) => (
                <Pressable
                  className={cn("px-5 py-3", item.value === value && "bg-accent")}
                  onPress={() => { onValueChange?.(item.value); setOpen(false); setSearch(""); }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item.value === value }}
                >
                  <Text className="text-foreground">{item.label}</Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}`;
export default function ComboboxPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Combobox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Searchable select dropdown with type-to-filter functionality.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="combobox" />
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
          { name: "options", type: "ComboboxOption[]", default: "-" },
          { name: "value", type: "string", default: "-" },
          { name: "onValueChange", type: "(value: string) => void", default: "-" },
          { name: "placeholder", type: "string", default: '"Select..."' },
          { name: "searchPlaceholder", type: "string", default: '"Search..."' },
          { name: "emptyText", type: "string", default: '"No results found"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">ComboboxOption</h3>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "value", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Searchable select with type-to-filter functionality.</li>
          <li>Options list is announced to screen readers as results are filtered.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/combobox.tsx" />
      </div>
    </div>
  );
}
