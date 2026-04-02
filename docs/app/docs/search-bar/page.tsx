"use client";
import React, { useState } from "react";
import { PreviewSearchBar } from "@/components/preview/search-bar";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add search-bar`;
const usageCode = `import { SearchBar } from "@/components/ui/search-bar";

function MyScreen() {
  const [query, setQuery] = useState("");
  return (
    <SearchBar
      value={query}
      onChangeText={setQuery}
      onClear={() => setQuery("")}
    />
  );
}`;
const sizesCode = `<SearchBar size="sm" placeholder="Small search..." />
<SearchBar size="md" placeholder="Medium search..." />
<SearchBar size="lg" placeholder="Large search..." />`;
const cancelCode = `const [query, setQuery] = useState("");
const [focused, setFocused] = useState(false);
<SearchBar
  value={query}
  onChangeText={setQuery}
  onClear={() => setQuery("")}
  onFocus={() => setFocused(true)}
  showCancel={focused}
  onCancel={() => { setQuery(""); setFocused(false); }}
/>`;
const iconCode = `import { Ionicons } from "@expo/vector-icons";

<SearchBar
  icon={<Ionicons name="search" size={18} color="#71717a" style={{ marginRight: 8 }} />}
  value={query}
  onChangeText={setQuery}
  onClear={() => setQuery("")}
/>`;
const sourceCode = `import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva(
  "flex-row items-center rounded-lg bg-muted px-3 min-h-12",
  {
    variants: {
      size: {
        sm: "min-h-10 px-2.5",
        md: "min-h-12 px-3",
        lg: "min-h-14 px-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const iconSizes = { sm: 14, md: 16, lg: 20 } as const;

export interface SearchBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "placeholderTextColor">,
    VariantProps<typeof searchBarVariants> {
  className?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
}
export function SearchBar({ size = "md", className, value, icon, onClear, showCancel, onCancel, ...props }: SearchBarProps) {
  const iconSize = iconSizes[size ?? "md"];
  return (
    <View className="flex-row items-center gap-2">
      <View className={cn(searchBarVariants({ size }), className)}>
        <View className="mr-2">
          {icon ?? <Text style={{ fontSize: iconSize, color: "#71717a" }}>\\u2315</Text>}
        </View>
        <TextInput
          className="flex-1 text-base text-foreground p-0"
          placeholderTextColor="#71717a"
          placeholder="Search..."
          value={value}
          accessibilityRole="search"
          {...props}
        />
        {value ? (
          <Pressable onPress={onClear} className="ml-1 h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/20" accessible={true} accessibilityRole="button" accessibilityLabel="Clear search">
            <Text className="text-xs text-muted-foreground">\\u2715</Text>
          </Pressable>
        ) : null}
      </View>
      {showCancel && (
        <Pressable onPress={onCancel} accessible={true} accessibilityRole="button">
          <Text className="text-base text-primary">Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}`;
function SearchBarDemo() {
  const [query, setQuery] = useState("");
  return <PreviewSearchBar value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />;
}
function CancelDemo() {
  const [query, setQuery] = useState("react native");
  return <PreviewSearchBar value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} showCancel onCancel={() => setQuery("")} />;
}
export default function SearchBarPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">SearchBar</h1>
        <p className="text-muted-foreground text-lg">A search input with icon, clear button, and optional cancel action.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <SearchBarDemo />
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="search-bar" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <CodeBlock code={usageCode} title="search-screen.tsx" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">Three sizes to fit different layouts.</p>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3 w-full">
            <PreviewSearchBar size="sm" placeholder="Small search..." />
            <PreviewSearchBar size="md" placeholder="Medium search..." />
            <PreviewSearchBar size="lg" placeholder="Large search..." />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">With Cancel Button</h2>
        <p className="text-sm text-muted-foreground mb-4">Show a cancel button when the search bar is focused (iOS pattern).</p>
        <ComponentPlayground code={cancelCode}>
          <CancelDemo />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Custom Icon</h2>
        <p className="text-sm text-muted-foreground mb-4">Pass any React element via the <code>icon</code> prop. The icon size adjusts automatically based on the <code>size</code> variant (sm: 14, md: 16, lg: 20).</p>
        <CodeBlock code={iconCode} title="custom-icon.tsx" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "value", type: "string" },
          { name: "onChangeText", type: "(text: string) => void" },
          { name: "icon", type: "React.ReactNode", default: "search icon" },
          { name: "onClear", type: "() => void" },
          { name: "showCancel", type: "boolean", default: "false" },
          { name: "onCancel", type: "() => void" },
          { name: "placeholder", type: "string", default: "\"Search...\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole</code> and search icon.</li>
          <li>Clear button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for screen readers.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/search-bar.tsx" />
      </div>
    </div>
  );
}