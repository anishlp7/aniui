import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { ComboboxDemo } from "./_demos";

const usageCode = `import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const teammates = [
  { label: "Ava Chen", value: "ava" },
  { label: "Liam Brooks", value: "liam" },
  { label: "Sofia Reyes", value: "sofia" },
  { label: "Noah Patel", value: "noah" },
];

export function MyScreen() {
  const [value, setValue] = useState("");

  return (
    <Combobox
      options={teammates}
      value={value}
      onValueChange={setValue}
      placeholder="Select teammate..."
      searchPlaceholder="Search teammates..."
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
const sourceCode = getComponentSource("combobox");
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
