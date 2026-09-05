import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewCollapsible, PreviewCollapsibleTrigger, PreviewCollapsibleContent } from "@/components/preview/collapsible";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add collapsible`;
const usageCode = `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export function MyScreen() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Text>Toggle content</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>This content can be shown or hidden.</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`;
const controlledCode = `const [open, setOpen] = useState(false);
<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>
    <Text>{open ? "Hide" : "Show"} details</Text>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <Text>Controlled collapsible content.</Text>
  </CollapsibleContent>
</Collapsible>`;
const sourceCode = getComponentSource("collapsible");
export default function CollapsiblePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Collapsible</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated collapsible container that can be toggled open and closed.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewCollapsible>
              <PreviewCollapsibleTrigger>
                <span className="text-sm font-medium text-foreground">Toggle content</span>
              </PreviewCollapsibleTrigger>
              <PreviewCollapsibleContent>
                <p className="text-sm text-muted-foreground pt-2">This content can be shown or hidden.</p>
              </PreviewCollapsibleContent>
            </PreviewCollapsible>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="collapsible" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for animations.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Controlled */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Controlled</Heading>
        <p className="text-sm text-muted-foreground">Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">open</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onOpenChange</code> props for controlled behavior.</p>
        <CodeBlock code={controlledCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</Heading>
        <ComponentTable components={[
          { name: "Collapsible", description: "Root container managing open/closed state" },
          { name: "CollapsibleTrigger", description: "Pressable element that toggles the content" },
          { name: "CollapsibleContent", description: "Animated container for collapsible content" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Collapsible</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "false (uncontrolled)" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context with Reanimated FadeIn/FadeOut animations</li>
          <li>Trigger button announces expanded/collapsed state to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/collapsible.tsx" />
      </div>
    </div>
  );
}
