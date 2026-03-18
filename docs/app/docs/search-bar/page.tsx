"use client";

import React, { useState } from "react";
import { PreviewSearchBar } from "@/components/preview/search-bar";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add search-bar`;

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

export interface SearchBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "placeholderTextColor">,
    VariantProps<typeof searchBarVariants> {
  className?: string;
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
}

export function SearchBar({ size, className, value, onClear, showCancel, onCancel, ...props }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2">
      <View className={cn(searchBarVariants({ size }), className)}>
        <Text className="text-muted-foreground mr-2 text-base">⌕</Text>
        <TextInput
          className="flex-1 text-base text-foreground p-0"
          placeholderTextColor="hsl(240,3.8%,46.1%)"
          placeholder="Search..."
          value={value}
          accessibilityRole="search"
          {...props}
        />
        {value ? (
          <Pressable onPress={onClear} className="ml-1 h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/20" accessible={true} accessibilityRole="button" accessibilityLabel="Clear search">
            <Text className="text-xs text-muted-foreground">✕</Text>
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
        <CodeBlock code={installCode} />
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
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 pr-4">Prop</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">size</td><td className="py-2 pr-4 font-mono text-xs">{`"sm" | "md" | "lg"`}</td><td className="py-2 font-mono text-xs">{`"md"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">value</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onChangeText</td><td className="py-2 pr-4 font-mono text-xs">(text: string) =&gt; void</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onClear</td><td className="py-2 pr-4 font-mono text-xs">() =&gt; void</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">showCancel</td><td className="py-2 pr-4 font-mono text-xs">boolean</td><td className="py-2 font-mono text-xs">false</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onCancel</td><td className="py-2 pr-4 font-mono text-xs">() =&gt; void</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">placeholder</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">{`"Search..."`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">className</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/search-bar.tsx" />
      </div>
    </div>
  );
}
