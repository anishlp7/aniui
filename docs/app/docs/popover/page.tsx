import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewPopoverDemo } from "@/components/preview/popover";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add popover`;
const usageCode = `import { Text } from "react-native";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function MyScreen() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text className="text-sm text-card-foreground">
          This is the popover content. Place anything here.
        </Text>
      </PopoverContent>
    </Popover>
  );
}`;
const sourceCode = getComponentSource("popover");
export default function PopoverPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Popover</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A popover that displays rich content in a floating panel triggered by a button press.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode} variant="inline">
        <PreviewPopoverDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="popover" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/popover</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Components</Heading>
        <p className="text-sm text-muted-foreground">
          Popover is a compound component made up of several parts:
        </p>
        <ComponentTable components={[
          { name: "Popover", description: "Root component that manages open/closed state. Supports both controlled and uncontrolled usage." },
          { name: "PopoverTrigger", description: "The pressable element that toggles the popover." },
          { name: "PopoverContent", description: "The floating panel that displays the popover content. Supports side, sideOffset, and align props." },
          { name: "PopoverClose", description: "Pressable element that closes the popover." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Popover</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">PopoverContent</Heading>
        <PropsTable props={[
          { name: "side", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "\"bottom\"" },
          { name: "sideOffset", type: "number", default: "8" },
          { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"center\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          All sub-components also accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/popover</code> for proper trigger-relative positioning</li>
          <li>Collision detection prevents overflow off screen edges</li>
          <li>BackHandler dismisses on Android</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/popover.tsx" />
      </div>
    </div>
  );
}