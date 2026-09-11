import { getComponentSource } from "@/lib/registry-source";
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
const iconsCode = `import { FileText, Settings } from "lucide-react-native";

const items = [
  { label: "New File", value: "new-file", icon: <FileText size={16} color="#71717a" />, group: "Actions" },
  { label: "Settings", value: "settings", icon: <Settings size={16} color="#71717a" />, group: "Navigation" },
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
const sourceCode = getComponentSource("command-menu");
export default function CommandMenuPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Menu</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Spotlight/kbar-style searchable command palette — portal-based overlay with groups, keyboard shortcuts, and solid keyboard handling on iOS and Android.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="command-menu" />
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
          <p className="font-medium">Requires a PortalHost</p>
          <p className="mt-1 text-muted-foreground">
            The palette renders through <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>, so your root layout needs a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code>. <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui add command-menu</code> injects it automatically — if you installed via the shadcn CLI or copied manually, add it yourself:
          </p>
          <CodeBlock
            code={`import { PortalHost } from "@rn-primitives/portal";

export default function RootLayout() {
  return (
    <>
      {/* your app */}
      <PortalHost />
    </>
  );
}`}
            title="app/_layout.tsx"
          />
        </div>
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
          <li>Backdrop press closes the menu for intuitive dismissal.</li>
          <li>Keyboard-aware: the palette tracks <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">keyboardWillShow</code>/<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">keyboardDidShow</code> directly, so results stay visible above the keyboard on both iOS and Android (RN Modal-style <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">adjustResize</code> doesn&apos;t apply to portals).</li>
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
