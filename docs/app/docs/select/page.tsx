import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { SelectDemo } from "./_demos";

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
const sourceCode = `import React, { useState, useRef } from "react";
import { View, Text, Pressable, TextInput, Modal, ScrollView, Dimensions, LayoutChangeEvent, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react-native";

export interface SelectOption { label: string; value: string }

export interface SelectProps {
  className?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function Select({
  className, placeholder = "Select...", options, value,
  onValueChange, label, searchable = false, searchPlaceholder = "Search...",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const triggerRef = useRef<View>(null);
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const insets = useSafeAreaInsets();
  // Fabric (new arch, mandatory on Expo SDK 55+) reports measureInWindow
  // excluding the safe-area top inset on both iOS and Android edge-to-edge,
  // but Modal (with statusBarTranslucent) renders from the screen origin.
  // Add the inset back so the dropdown anchors to the trigger visually.
  const isNewArch = !!(globalThis as { nativeFabricUIManager?: unknown }).nativeFabricUIManager;
  const yOffset = isNewArch ? insets.top : 0;
  const selected = options.find((o) => o.value === value);
  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setPos({ x, y, w: width, h: height });
      setOpen(true);
    });
  };

  const close = () => { setOpen(false); setSearch(""); };
  const pick = (val: string) => { onValueChange?.(val); close(); };

  const screenH = Dimensions.get("window").height;
  const triggerY = pos.y + yOffset;
  const belowY = triggerY + pos.h + 4;
  const listH = Math.min(filtered.length * 48, 264);
  const totalH = listH + (searchable ? 60 : 0);
  const fitsBelow = belowY + totalH < screenH;

  return (
    <View collapsable={false}>
      <Pressable
        ref={triggerRef}
        className={cn("flex-row items-center justify-between h-12 px-4 border border-input rounded-lg bg-background active:bg-accent/30", className)}
        onPress={handleOpen}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
      >
        <Text className={cn("text-base flex-1", selected ? "text-foreground" : "text-muted-foreground")} numberOfLines={1}>
          {selected?.label ?? placeholder}
        </Text>
        <ChevronDown size={16} color="#71717a" />
      </Pressable>

      <Modal visible={open} transparent animationType="none" onRequestClose={close} statusBarTranslucent>
        {/* Backdrop */}
        <Pressable style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} onPress={close} />

        {/* Dropdown */}
        <View
          style={{
            position: "absolute",
            left: pos.x,
            width: pos.w,
            ...(fitsBelow
              ? { top: belowY }
              : { bottom: screenH - triggerY + 4 }),
          }}
          className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {searchable && (
            <View className="px-3 pt-3 pb-2">
              <TextInput
                className="h-11 px-4 rounded-lg border border-input bg-background text-foreground text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
                keyboardAppearance={dark ? "dark" : "light"}
                selectionColor={caret}
                cursorColor={caret}
                value={search}
                onChangeText={setSearch}
                autoFocus
              />
            </View>
          )}

          <ScrollView style={{ height: listH }} bounces={false} keyboardShouldPersistTaps="handled">
            {filtered.map((o) => {
              const isSelected = o.value === value;
              return (
                <Pressable
                  key={o.value}
                  className={cn("flex-row items-center h-12 px-4 active:bg-accent/50", isSelected && "bg-accent")}
                  onPress={() => pick(o.value)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text className={cn("flex-1 text-base text-foreground", isSelected && "font-semibold")} numberOfLines={1}>{o.label}</Text>
                  {isSelected && <Check size={16} color={caret} strokeWidth={3} />}
                </Pressable>
              );
            })}
            {filtered.length === 0 && (
              <View className="h-12 items-center justify-center">
                <Text className="text-sm text-muted-foreground">No results</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}`;
export default function SelectPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Select</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Dropdown select with optional search filtering.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <SelectDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="select" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "SelectOption[]", default: "required" },
          { name: "value", type: "string" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "placeholder", type: "string", default: "\"Select...\"" },
          { name: "label", type: "string" },
          { name: "searchable", type: "boolean", default: "false" },
          { name: "searchPlaceholder", type: "string", default: "\"Search...\"" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">SelectOption</Heading>
        <PropsTable props={[
          { name: "label", type: "string" },
          { name: "value", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses Modal with anchored dropdown positioning. Supports searchable prop for filtering options.</li>
          <li>Selected state announced to screen readers</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/select.tsx" />
      </div>
    </div>
  );
}
