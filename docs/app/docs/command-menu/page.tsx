import { Heading } from "@/components/heading";
import { PreviewCommandMenuDemo } from "@/components/preview/command-menu";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { useState } from "react";
import { CommandMenu } from "@/components/ui/command-menu";
import { Button } from "@/components/ui/button";

const items = [
  { label: "New File", value: "new-file", group: "Actions" },
  { label: "Save", value: "save", group: "Actions" },
  { label: "Home", value: "home", group: "Navigation" },
  { label: "Settings", value: "settings", group: "Navigation" },
];

export function MyScreen() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Command Menu</Button>
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        items={items}
        onSelect={(value) => console.log("Selected:", value)}
      />
    </>
  );
}`;
const groupsCode = `const items = [
  { label: "New File", value: "new-file", group: "Actions" },
  { label: "Save", value: "save", group: "Actions" },
  { label: "Export", value: "export", group: "Actions" },
  { label: "Home", value: "home", group: "Navigation" },
  { label: "Settings", value: "settings", group: "Navigation" },
  { label: "Profile", value: "profile", group: "Navigation" },
];

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={items}
  onSelect={handleSelect}
/>`;
const shortcutsCode = `const items = [
  { label: "New File", value: "new-file", shortcut: "Cmd+N", group: "Actions" },
  { label: "Save", value: "save", shortcut: "Cmd+S", group: "Actions" },
  { label: "Export", value: "export", shortcut: "Cmd+E", group: "Actions" },
  { label: "Settings", value: "settings", shortcut: "Cmd+,", group: "Navigation" },
];

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={items}
  onSelect={handleSelect}
/>`;
const iconsCode = `import Svg, { Path } from "react-native-svg";

const FileIcon = (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <Path d="M14 2v6h6" />
  </Svg>
);

const items = [
  { label: "New File", value: "new-file", icon: FileIcon, group: "Actions" },
  { label: "Settings", value: "settings", icon: GearIcon, group: "Navigation" },
];

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={items}
  onSelect={handleSelect}
/>`;
const disabledCode = `const items = [
  { label: "New File", value: "new-file", group: "Actions" },
  { label: "Delete All", value: "delete-all", group: "Actions", disabled: true },
  { label: "Home", value: "home", group: "Navigation" },
];

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={items}
  onSelect={handleSelect}
/>`;
const customPlaceholderCode = `<CommandMenu
  open={open}
  onOpenChange={setOpen}
  items={items}
  placeholder="What do you need?"
  emptyText="Nothing matches your search."
  onSelect={handleSelect}
/>`;
const sourceCode = `import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable, Modal, SectionList } from "react-native";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

export interface CommandItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  shortcut?: string;
  group?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandMenuProps extends React.ComponentPropsWithoutRef<typeof View> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyText?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export function CommandMenu({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search...",
  emptyText = "No results found.",
  onSelect,
  className,
  ...props
}: CommandMenuProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q) ||
        (item.group ?? "").toLowerCase().includes(q)
    );
  }, [items, search]);

  const sections = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      const key = item.group ?? "";
      (groups[key] ??= []).push(item);
    }
    return Object.entries(groups).map(([title, data]) => ({ title, data }));
  }, [filtered]);

  const handleSelect = (item: CommandItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    onSelect?.(item.value);
    onOpenChange(false);
    setSearch("");
  };

  const close = () => {
    onOpenChange(false);
    setSearch("");
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
      <Pressable className="flex-1 bg-black/50 justify-start pt-24" onPress={close}>
        <Pressable
          className={cn("mx-4 rounded-xl border border-border bg-card shadow-lg overflow-hidden max-h-[70%]", className)}
          onPress={() => {}}
          {...props}
        >
          <View className="flex-row items-center px-4 border-b border-border">
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5Z" />
              <Path d="m16 16 4.5 4.5" />
            </Svg>
            <TextInput
              className="flex-1 min-h-12 ps-3 text-base text-foreground"
              placeholder={placeholder}
              placeholderTextColor="#71717a"
              value={search}
              onChangeText={setSearch}
              autoFocus
              accessibilityLabel="Command search"
            />
          </View>
          {filtered.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-sm text-muted-foreground">{emptyText}</Text>
            </View>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.value}
              renderSectionHeader={({ section }) =>
                section.title ? (
                  <View className="px-4 pt-3 pb-1.5 bg-card">
                    <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </Text>
                  </View>
                ) : null
              }
              renderItem={({ item }) => (
                <Pressable
                  className={cn(
                    "flex-row items-center px-4 py-2.5 gap-3",
                    item.disabled && "opacity-40"
                  )}
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: item.disabled }}
                >
                  {item.icon && <View className="w-5 items-center">{item.icon}</View>}
                  <Text className="flex-1 text-sm text-foreground">{item.label}</Text>
                  {item.shortcut && (
                    <View className="flex-row items-center gap-0.5">
                      {item.shortcut.split("+").map((key, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <Text className="text-[10px] text-muted-foreground">+</Text>}
                          <View className="items-center justify-center rounded border border-border bg-muted px-1.5 min-h-5">
                            <Text className="text-[10px] font-mono text-muted-foreground">{key.trim()}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>
                  )}
                </Pressable>
              )}
              stickySectionHeadersEnabled={false}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function CommandInput({ className, ...props }: CommandInputProps) {
  return (
    <TextInput
      className={cn("min-h-12 px-4 text-base text-foreground border-b border-border", className)}
      placeholderTextColor="#71717a"
      {...props}
    />
  );
}

export function CommandEmpty({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <View className={cn("py-8 items-center", className)}>
      <Text className="text-sm text-muted-foreground">{children ?? "No results found."}</Text>
    </View>
  );
}

export function CommandSeparator({ className }: { className?: string }) {
  return <View className={cn("h-px bg-border", className)} />;
}`;
export default function CommandMenuPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Menu</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Spotlight-style searchable command palette with groups and keyboard shortcuts.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="command-menu" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewCommandMenuDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Groups */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Groups</Heading>
        <p className="text-sm text-muted-foreground">
          Organize items under section headers using the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">group</code> property on each item. Items with the same group are rendered together with a header.
        </p>
        <CodeBlock code={groupsCode} title="Grouped items" />
      </div>
      {/* Keyboard Shortcuts */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Shortcuts</Heading>
        <p className="text-sm text-muted-foreground">
          Add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">shortcut</code> to items to display keyboard shortcut badges. Shortcuts are split on <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">+</code> and rendered as individual key caps.
        </p>
        <CodeBlock code={shortcutsCode} title="Keyboard shortcuts" />
      </div>
      {/* Custom Icons */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom Icons</Heading>
        <p className="text-sm text-muted-foreground">
          Pass any <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">React.ReactNode</code> as the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">icon</code> property. Icons render in a fixed-width container to the left of the label.
        </p>
        <CodeBlock code={iconsCode} title="Custom icons" />
      </div>
      {/* Disabled Items */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Disabled Items</Heading>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled: true</code> on items to prevent selection. Disabled items appear at reduced opacity.
        </p>
        <CodeBlock code={disabledCode} title="Disabled items" />
      </div>
      {/* Custom Placeholder */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom Placeholder</Heading>
        <p className="text-sm text-muted-foreground">
          Customize the search <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">placeholder</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">emptyText</code> for when no results match.
        </p>
        <CodeBlock code={customPlaceholderCode} title="Custom text" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">CommandMenuProps</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "-" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "-" },
          { name: "items", type: "CommandItem[]", default: "-" },
          { name: "placeholder", type: "string", default: '"Type a command or search..."' },
          { name: "emptyText", type: "string", default: '"No results found."' },
          { name: "onSelect", type: "(value: string) => void", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">CommandItem</Heading>
        <PropsTable props={[
          { name: "label", type: "string", default: "-" },
          { name: "value", type: "string", default: "-" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "shortcut", type: "string", default: "-" },
          { name: "group", type: "string", default: "-" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "onSelect", type: "() => void", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Sub-components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Sub-components</Heading>
        <p className="text-sm text-muted-foreground">
          For advanced composition, the module also exports convenience sub-components:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">CommandInput</code> -- Styled search TextInput with border-bottom.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">CommandEmpty</code> -- Empty state placeholder view.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">CommandSeparator</code> -- Horizontal rule between groups.</li>
        </ul>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Search input has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel=&quot;Command search&quot;</code>.</li>
          <li>Each item has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code>.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> tracks <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code> state for each item.</li>
          <li>Modal can be dismissed via Android back button (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onRequestClose</code>).</li>
          <li>Backdrop press closes the menu for intuitive dismissal.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/command-menu.tsx" />
      </div>
    </div>
  );
}
