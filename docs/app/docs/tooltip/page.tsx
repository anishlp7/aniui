import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewTooltip } from "@/components/preview/tooltip";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add tooltip`;
const usageCode = `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Text } from "react-native";

export function MyScreen() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Text>Press and hold me</Text>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  );
}`;
const sidesCode = `<Tooltip>
  <TooltipTrigger><Text>Top tooltip</Text></TooltipTrigger>
  <TooltipContent side="top">Tooltip above</TooltipContent>
</Tooltip>
<Tooltip>
  <TooltipTrigger><Text>Bottom tooltip</Text></TooltipTrigger>
  <TooltipContent side="bottom">Tooltip below</TooltipContent>
</Tooltip>`;
const sourceCode = getComponentSource("tooltip");
export default function TooltipPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tooltip</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A tooltip that displays informative text when users press and hold an element.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4 py-6">
          <span className="text-sm text-foreground">Sync status</span>
          <PreviewTooltip content="Changes sync automatically every 30 seconds while you're online.">
            <button type="button" className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">
              ?
            </button>
          </PreviewTooltip>
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="tooltip" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/tooltip</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sides */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Tooltip Position</Heading>
        <ComponentPlayground code={sidesCode}>
          <div className="flex flex-wrap items-center gap-8 py-8">
            <PreviewTooltip content="Tooltip above" side="top">
              <button type="button" className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">Top</button>
            </PreviewTooltip>
            <PreviewTooltip content="Tooltip below" side="bottom">
              <button type="button" className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">Bottom</button>
            </PreviewTooltip>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Tooltip</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TooltipTrigger</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TooltipContent</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode | string", default: "required" },
          { name: "side", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "\"top\"" },
          { name: "sideOffset", type: "number", default: "8" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/tooltip</code> for trigger-relative positioning</li>
          <li>Collision detection prevents overflow</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/tooltip.tsx" />
      </div>
    </div>
  );
}