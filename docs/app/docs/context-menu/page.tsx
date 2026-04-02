"use client";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add context-menu`;
const usageCode = `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

<ContextMenu>
  <ContextMenuTrigger>
    <View className="h-40 w-full items-center justify-center rounded-lg border border-dashed border-border">
      <Text>Long press me</Text>
    </View>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onPress={() => {}}>Edit</ContextMenuItem>
    <ContextMenuItem onPress={() => {}}>Duplicate</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem destructive onPress={() => {}}>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;
const sourceCode = `// See components/ui/context-menu.tsx
// Built on @rn-primitives/context-menu
// Triggered by long press on ContextMenuTrigger`;

export default function ContextMenuPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Context Menu</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A long-press context menu with items, separators, and destructive actions. Built on @rn-primitives/context-menu.
        </p>
      </div>

      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="h-32 w-full flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500">
            Long press to open context menu
          </div>
        </ComponentPlayground>
      </PreviewToggle>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="context-menu" />
        <p className="text-sm text-muted-foreground">
          Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/context-menu</code> and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>.
          Add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"<PortalHost />"}</code> to your root layout.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <ComponentTable components={[
          { name: "ContextMenu", description: "Root wrapper — manages open/close state" },
          { name: "ContextMenuTrigger", description: "Long-press target that opens the menu" },
          { name: "ContextMenuContent", description: "Menu panel with items" },
          { name: "ContextMenuItem", description: "Individual menu action" },
          { name: "ContextMenuSeparator", description: "Visual divider between items" },
        ]} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">ContextMenu</h3>
        <PropsTable props={[
          { name: "open", type: "boolean", description: "Controlled open state" },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when state changes" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">ContextMenuItem</h3>
        <PropsTable props={[
          { name: "destructive", type: "boolean", default: "false", description: "Renders in destructive color" },
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/context-menu</code> for proper menu semantics</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="menuitem"</code> on each item</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityHint="Long press for options"</code> on trigger</li>
          <li>Collision detection for screen edge positioning</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"<PortalHost />"}</code> at app root</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/context-menu.tsx" />
      </div>
    </div>
  );
}
