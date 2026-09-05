import Link from "next/link";
import { Heading } from "@/components/heading";
import { AutoCompleteDemo, AsyncDemo } from "./_demos";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add autocomplete`;
const usageCode = `import { AutoComplete } from "@/components/ui/autocomplete";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

export function MyScreen() {
  return (
    <AutoComplete
      options={FRUITS}
      placeholder="Search fruit..."
      onSelect={(option) => console.log(option.value)}
    />
  );
}`;
const filterCode = `<AutoComplete
  options={users}
  filterFn={(option, query) =>
    option.label.toLowerCase().startsWith(query.toLowerCase())
  }
  minCharsToTrigger={2}
/>`;
const asyncCode = `const [options, setOptions] = useState<AutoCompleteOption[]>([]);
const [loading, setLoading] = useState(false);

<AutoComplete
  options={options}
  loading={loading}
  onChangeText={async (text) => {
    setLoading(true);
    setOptions(await searchUsers(text));
    setLoading(false);
  }}
  filterFn={() => true} // results already come pre-filtered from the server
/>`;
const sourceCode = `import React, { useState } from "react";
import { View, TextInput, Pressable, Text, ScrollView, Keyboard, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react-native";
import { cn } from "@/lib/utils";

// Matches input.tsx's size scale so Input, SearchBar, and AutoComplete read as one family.
const autoCompleteVariants = cva("flex-row items-center rounded-md border py-2", {
  variants: {
    variant: {
      default: "border-input bg-background",
      ghost: "border-transparent bg-transparent",
    },
    size: {
      sm: "min-h-9 px-3",
      md: "min-h-12 px-4",
      lg: "min-h-14 px-5",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

const fontSizes = { sm: 14, md: 16, lg: 18 } as const;

export interface AutoCompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface AutoCompleteProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "value" | "onChangeText">,
    VariantProps<typeof autoCompleteVariants> {
  className?: string;
  options: AutoCompleteOption[];
  value?: string;
  onChangeText?: (text: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
  filterFn?: (option: AutoCompleteOption, query: string) => boolean;
  minCharsToTrigger?: number;
  loading?: boolean;
  emptyText?: string;
  maxVisibleOptions?: number;
}

const defaultFilter = (option: AutoCompleteOption, query: string) =>
  option.label.toLowerCase().includes(query.toLowerCase());

// Suggestions render as a normal View below the input, not position: "absolute" —
// RN has no reliable viewport-relative overlay without a portal, so this pushes
// sibling content down instead; keep AutoComplete out of tight-height rows.
export function AutoComplete({
  variant, size = "md", className, options, value, onChangeText, onSelect,
  filterFn = defaultFilter, minCharsToTrigger = 1, loading, emptyText = "No results",
  maxVisibleOptions = 5, style, ...props
}: AutoCompleteProps) {
  const [internal, setInternal] = useState("");
  const [open, setOpen] = useState(false);
  const dark = useColorScheme() === "dark";
  const caret = dark ? "#fafafa" : "#18181b";
  const resolvedSize = size ?? "md";
  const text = value ?? internal;

  const setText = (t: string) => {
    if (value === undefined) setInternal(t);
    onChangeText?.(t);
    setOpen(t.length >= minCharsToTrigger);
  };

  const handleSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    onSelect?.(option);
    if (value === undefined) setInternal(option.label);
    setOpen(false);
    Keyboard.dismiss();
  };

  const showDropdown = open && text.length >= minCharsToTrigger;
  const filtered = showDropdown ? options.filter((o) => filterFn(o, text)) : [];

  return (
    <View>
      <View className={cn(autoCompleteVariants({ variant, size }), className)}>
        <TextInput
          value={text}
          onChangeText={setText}
          onFocus={() => setOpen(text.length >= minCharsToTrigger)}
          className="flex-1 self-stretch p-0 text-foreground placeholder:text-muted-foreground"
          style={[{ fontSize: fontSizes[resolvedSize] }, style]}
          textAlignVertical="center"
          placeholderTextColor={dark ? "#a1a1aa" : "#71717a"}
          keyboardAppearance={dark ? "dark" : "light"}
          selectionColor={caret}
          cursorColor={caret}
          {...props}
        />
        {!!text && (
          <Pressable
            onPress={() => { setText(""); setOpen(false); }}
            className="ms-2 min-h-8 min-w-8 items-center justify-center"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Clear"
          >
            <X size={16} color="#71717a" />
          </Pressable>
        )}
      </View>
      {showDropdown && (
        <View className="mt-1 rounded-md border border-border bg-card shadow-lg overflow-hidden">
          <ScrollView
            style={{ maxHeight: maxVisibleOptions * 48 }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {loading ? (
              <View className="h-12 items-center justify-center"><Text className="text-sm text-muted-foreground">Loading…</Text></View>
            ) : filtered.length === 0 ? (
              <View className="h-12 items-center justify-center"><Text className="text-sm text-muted-foreground">{emptyText}</Text></View>
            ) : (
              filtered.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={cn("min-h-12 min-w-12 justify-center px-4", option.disabled && "opacity-40")}
                  accessible
                  accessibilityRole="button"
                  accessibilityState={{ disabled: option.disabled }}
                >
                  <Text className="text-base text-foreground" numberOfLines={1}>{option.label}</Text>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}`;

export default function AutoCompletePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AutoComplete</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Free-text input with inline filtered suggestions — type-ahead search with a keyboard-safe dropdown, async loading state, and a disabled-option affordance.
        </p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <AutoCompleteDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Not the same as Combobox.</span>{" "}
        <Link href="/docs/combobox" className="text-primary hover:underline">Combobox</Link> opens a modal
        to pick from a fixed list. AutoComplete is a real text field — the suggestion list renders inline,
        below the input, and pushes the rest of the layout down rather than floating over it (React Native
        has no reliable viewport-relative overlay without a portal). Keep it out of tight-height rows.
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="autocomplete" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/search.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom filtering</Heading>
        <p className="text-sm text-muted-foreground">
          Override <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">filterFn</code> for
          prefix matching, fuzzy search, or anything else — and raise{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">minCharsToTrigger</code> so
          the dropdown only opens once there&apos;s enough input to filter meaningfully.
        </p>
        <CodeBlock code={filterCode} title="Custom filter" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Async suggestions</Heading>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">loading</code> while a
          server request is in flight — the dropdown swaps its list for a loading row instead of showing
          stale or empty results.
        </p>
        <ComponentPlayground code={asyncCode}>
          <AsyncDemo />
        </ComponentPlayground>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "AutoCompleteOption[]", default: "-", description: "{ label, value, disabled? }[]" },
          { name: "value", type: "string", default: "-", description: "Controlled text — pair with onChangeText." },
          { name: "onChangeText", type: "(text: string) => void", default: "-" },
          { name: "onSelect", type: "(option: AutoCompleteOption) => void", default: "-" },
          { name: "filterFn", type: "(option, query) => boolean", default: "case-insensitive substring match" },
          { name: "minCharsToTrigger", type: "number", default: "1" },
          { name: "loading", type: "boolean", default: "false" },
          { name: "emptyText", type: "string", default: '"No results"' },
          { name: "maxVisibleOptions", type: "number", default: "5", description: "Caps the dropdown's scroll height." },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "variant", type: "\"default\" | \"ghost\"", default: "\"default\"" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Each suggestion and the clear button set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> and meet the 48dp minimum touch target.</li>
          <li>Disabled options expose <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState={"{ disabled: true }"}</code> and ignore presses.</li>
          <li>Selecting a suggestion calls <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Keyboard.dismiss()</code> so the dropdown and keyboard close together.</li>
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        See also: <Link href="/docs/input" className="text-primary hover:underline">Input</Link>{" "}
        &middot; <Link href="/docs/search-bar" className="text-primary hover:underline">Search Bar</Link>
      </p>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/autocomplete.tsx" />
      </div>
    </div>
  );
}
