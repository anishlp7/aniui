import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { ComboboxDemo } from "./_demos";

const usageCode = `import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

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
    />
  );
}`;
const multipleCode = `import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const tags = [
  { label: "React Native", value: "rn" },
  { label: "TypeScript", value: "ts" },
  { label: "NativeWind", value: "nw" },
  { label: "Expo", value: "expo" },
];

export function MultiSelect() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Combobox
      multiple
      options={tags}
      selectedValues={selected}
      onSelectedValuesChange={setSelected}
      placeholder="Select tags..."
    />
  );
}`;
const groupsCode = `<Combobox
  groups={[
    {
      label: "Frameworks",
      options: [
        { label: "React Native", value: "rn" },
        { label: "Flutter", value: "flutter" },
      ],
    },
    {
      label: "Languages",
      options: [
        { label: "TypeScript", value: "ts" },
        { label: "Dart", value: "dart" },
      ],
    },
  ]}
  options={[]}
  value={value}
  onValueChange={setValue}
/>`;
const clearableCode = `<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  clearable
  placeholder="Select..."
/>`;
const invalidCode = `<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  invalid
  placeholder="Select framework..."
/>`;
const disabledCode = `<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  disabled
  placeholder="Disabled..."
/>`;
const customItemCode = `<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  renderItem={(option, selected) => (
    <View className="flex-row items-center px-5 py-3 gap-3">
      <View className={cn(
        "h-4 w-4 rounded-full border",
        selected ? "bg-primary border-primary" : "border-input"
      )} />
      <Text className="text-foreground">{option.label}</Text>
    </View>
  )}
/>`;
const popupCode = `<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  mode="popup"
  placeholder="Choose..."
/>`;
const sourceCode = `import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  SectionList,
  Modal,
  ScrollView,
  useColorScheme,
  Keyboard,
  Platform,
} from "react-native";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react-native";

export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

export interface ComboboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  multiple?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  groups?: ComboboxGroup[];
  renderItem?: (option: ComboboxOption, selected: boolean) => React.ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  autoHighlight?: boolean;
  mode?: "select" | "popup";
  triggerClassName?: string;
}

// Inline chip for multi-select display
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <View className="flex-row items-center rounded-full bg-secondary ps-2.5 pe-1 py-0.5 me-1.5 mb-1">
      <Text className="text-xs text-secondary-foreground me-1">{label}</Text>
      <Pressable
        onPress={onRemove}
        className="rounded-full p-0.5"
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={\`Remove \${label}\`}
      >
        <X size={12} color="#71717a" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

export function Combobox({
  className,
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  multiple = false,
  selectedValues = [],
  onSelectedValuesChange,
  groups,
  renderItem: renderItemProp,
  invalid = false,
  disabled = false,
  clearable = false,
  autoHighlight = false,
  mode = "select",
  triggerClassName,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [kbHeight, setKbHeight] = useState(0);
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";

  // RN Modal doesn't resize for the keyboard on Android (and the sheet is
  // bottom-anchored), so track the keyboard height and pad the sheet up.
  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const show = Keyboard.addListener(showEvt, (e) => setKbHeight(e.endCoordinates.height));
    const hide = Keyboard.addListener(hideEvt, () => setKbHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const allOptions = useMemo(
    () => (groups ? groups.flatMap((g) => g.options) : options),
    [groups, options]
  );

  const selected = allOptions.find((o) => o.value === value);

  const isSelected = useCallback(
    (val: string) => (multiple ? selectedValues.includes(val) : val === value),
    [multiple, selectedValues, value]
  );

  // Filter logic
  const filterFn = (opts: ComboboxOption[]) =>
    opts.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  const filteredOptions = useMemo(() => filterFn(allOptions), [allOptions, search]);

  const filteredSections = useMemo(() => {
    if (!groups) return [];
    return groups
      .map((g) => ({ title: g.label, data: filterFn(g.options) }))
      .filter((s) => s.data.length > 0);
  }, [groups, search]);

  const handleSelect = (val: string) => {
    if (multiple) {
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      onSelectedValuesChange?.(next);
    } else {
      onValueChange?.(val);
      setOpen(false);
    }
    setSearch("");
  };

  const handleClear = () => {
    if (multiple) {
      onSelectedValuesChange?.([]);
    } else {
      onValueChange?.("");
    }
  };

  const hasValue = multiple ? selectedValues.length > 0 : !!value;

  // Trigger display
  const triggerLabel = multiple
    ? selectedValues.length > 0
      ? \`\${selectedValues.length} selected\`
      : placeholder
    : selected?.label ?? placeholder;

  const renderOption = (item: ComboboxOption) => {
    const sel = isSelected(item.value);
    if (renderItemProp) {
      return (
        <Pressable
          key={item.value}
          onPress={() => !item.disabled && handleSelect(item.value)}
          disabled={item.disabled}
          className={cn(item.disabled && "opacity-40")}
        >
          {renderItemProp(item, sel)}
        </Pressable>
      );
    }
    return (
      <Pressable
        className={cn(
          "ps-5 pe-5 py-3",
          sel && "bg-accent",
          item.disabled && "opacity-40",
          autoHighlight && filteredOptions[0]?.value === item.value && !sel && "bg-accent/50"
        )}
        onPress={() => !item.disabled && handleSelect(item.value)}
        disabled={item.disabled}
        accessibilityRole="button"
        accessibilityState={{ selected: sel }}
      >
        <Text className="text-foreground">{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <View className={cn("", className)} {...props}>
      {/* Trigger */}
      <Pressable
        className={cn(
          "flex-row items-center justify-between min-h-12 px-4 rounded-md border bg-background",
          invalid ? "border-destructive" : "border-input",
          disabled && "opacity-50",
          mode === "popup" && "bg-secondary",
          triggerClassName
        )}
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={selected ? \`Selected: \${selected.label}\` : placeholder}
        accessibilityState={{ disabled }}
      >
        <Text
          className={cn(
            "text-base flex-1",
            hasValue ? "text-foreground" : "text-muted-foreground",
            invalid && "text-destructive"
          )}
          numberOfLines={1}
        >
          {triggerLabel}
        </Text>
        <View className="flex-row items-center">
          {clearable && hasValue && (
            <Pressable
              onPress={(e) => { e.stopPropagation(); handleClear(); }}
              className="p-1 me-1"
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
            >
              <X size={14} color="#71717a" strokeWidth={2} />
            </Pressable>
          )}
          <ChevronDown size={16} color="#71717a" strokeWidth={2} />
        </View>
      </Pressable>

      {/* Multi-select chips */}
      {multiple && selectedValues.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
          <View className="flex-row flex-wrap">
            {selectedValues.map((val) => {
              const opt = allOptions.find((o) => o.value === val);
              return opt ? (
                <Chip
                  key={val}
                  label={opt.label}
                  onRemove={() => {
                    onSelectedValuesChange?.(selectedValues.filter((v) => v !== val));
                  }}
                />
              ) : null;
            })}
          </View>
        </ScrollView>
      )}

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          style={{ paddingBottom: kbHeight }}
          onPress={() => setOpen(false)}
        >
          <Pressable className="bg-card rounded-t-2xl max-h-96 pb-8" onPress={() => {}}>
            <View className="items-center py-3">
              <View className="w-10 h-1 rounded-full bg-muted" />
            </View>
            <View className="px-4 pb-3">
              <TextInput
                className="min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-base"
                placeholder={searchPlaceholder}
                placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
                keyboardAppearance={dark ? "dark" : "light"}
                selectionColor={caret}
                cursorColor={caret}
                value={search}
                onChangeText={setSearch}
                autoFocus
                accessibilityLabel="Search options"
              />
            </View>
            {groups ? (
              <SectionList
                sections={filteredSections}
                keyExtractor={(item) => item.value}
                renderSectionHeader={({ section }) => (
                  <View className="px-5 py-2 bg-card">
                    <Text className="text-xs font-semibold text-muted-foreground uppercase">
                      {section.title}
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => renderOption(item)}
                ListEmptyComponent={
                  <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
                }
              />
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                ListEmptyComponent={
                  <Text className="text-muted-foreground text-center py-4">{emptyText}</Text>
                }
                renderItem={({ item }) => renderOption(item)}
              />
            )}
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
          Searchable select with multi-select, groups, clear button, and custom rendering.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="combobox" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <ComboboxDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Multiple */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Multiple Selection</Heading>
        <p className="text-sm text-muted-foreground">
          Enable multi-select mode with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">multiple</code> prop. Selected items display as removable chips.
        </p>
        <CodeBlock code={multipleCode} title="Multi-select" />
      </div>
      {/* Groups */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Groups</Heading>
        <p className="text-sm text-muted-foreground">
          Organize options under group headers using the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">groups</code> prop. Groups render as sticky section headers.
        </p>
        <CodeBlock code={groupsCode} title="Grouped options" />
      </div>
      {/* Clear Button */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Clear Button</Heading>
        <p className="text-sm text-muted-foreground">
          Add a clear button to reset the selection with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">clearable</code>.
        </p>
        <CodeBlock code={clearableCode} title="Clearable" />
      </div>
      {/* Custom Items */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom Items</Heading>
        <p className="text-sm text-muted-foreground">
          Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">renderItem</code> prop for custom option rendering.
        </p>
        <CodeBlock code={customItemCode} title="Custom item rendering" />
      </div>
      {/* Invalid */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Invalid</Heading>
        <p className="text-sm text-muted-foreground">
          Show error styling with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">invalid</code> prop.
        </p>
        <CodeBlock code={invalidCode} title="Invalid state" />
      </div>
      {/* Disabled */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Disabled</Heading>
        <p className="text-sm text-muted-foreground">
          Prevent interaction with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code> prop.
        </p>
        <CodeBlock code={disabledCode} title="Disabled" />
      </div>
      {/* Popup Mode */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Popup Mode</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">mode=&quot;popup&quot;</code> for a button-like trigger style.
        </p>
        <CodeBlock code={popupCode} title="Popup mode" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">ComboboxProps</Heading>
        <PropsTable props={[
          { name: "options", type: "ComboboxOption[]", default: "-" },
          { name: "value", type: "string", default: "-" },
          { name: "onValueChange", type: "(value: string) => void", default: "-" },
          { name: "multiple", type: "boolean", default: "false" },
          { name: "selectedValues", type: "string[]", default: "[]" },
          { name: "onSelectedValuesChange", type: "(values: string[]) => void", default: "-" },
          { name: "groups", type: "ComboboxGroup[]", default: "-" },
          { name: "renderItem", type: "(option, selected) => ReactNode", default: "-" },
          { name: "invalid", type: "boolean", default: "false" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "clearable", type: "boolean", default: "false" },
          { name: "autoHighlight", type: "boolean", default: "false" },
          { name: "mode", type: '"select" | "popup"', default: '"select"' },
          { name: "placeholder", type: "string", default: '"Select..."' },
          { name: "searchPlaceholder", type: "string", default: '"Search..."' },
          { name: "emptyText", type: "string", default: '"No results found"' },
          { name: "className", type: "string", default: "-" },
          { name: "triggerClassName", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ComboboxOption</Heading>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "value", type: "string", default: "-" },
          { name: "disabled", type: "boolean", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ComboboxGroup</Heading>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "options", type: "ComboboxOption[]", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Searchable select with type-to-filter functionality.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger and options.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> tracks selected and disabled states.</li>
          <li>Clear button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel=&quot;Clear selection&quot;</code>.</li>
          <li>Multi-select chips have individual <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for removal.</li>
          <li>Uses logical properties for RTL support.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/combobox.tsx" />
      </div>
    </div>
  );
}
