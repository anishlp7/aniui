import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewToggleGroup, PreviewToggleGroupItem } from "@/components/preview/toggle-group";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ToggleGroupDemo } from "./_demos";

const installCode = `npx @aniui/cli add toggle-group`;
const usageCode = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function MyScreen() {
  const [value, setValue] = React.useState("center");
  return (
    <ToggleGroup value={value} onValueChange={setValue}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`;
const exampleCode = `<ToggleGroup value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;
const sourceCode = getComponentSource("toggle-group");
export default function ToggleGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toggle Group</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A group of toggle items where only one can be active at a time, perfect for selection controls like text alignment.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <ToggleGroupDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="toggle-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Examples */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Examples</Heading>
        <ComponentPlayground code={exampleCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewToggleGroup value="center">
              <PreviewToggleGroupItem value="left">Left</PreviewToggleGroupItem>
              <PreviewToggleGroupItem value="center">Center</PreviewToggleGroupItem>
              <PreviewToggleGroupItem value="right">Right</PreviewToggleGroupItem>
            </PreviewToggleGroup>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props - ToggleGroup */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">ToggleGroup</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "onValueChange", type: "(value: string) => void", default: "required" },
          { name: "variant", type: "\"default\" | \"outline\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        {/* Props - ToggleGroupItem */}
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ToggleGroupItem</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "variant", type: "\"default\" | \"outline\"", default: "inherited from group" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "inherited from group" },
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Group of toggle buttons with single or multiple selection.</li>
          <li>Each toggle item has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with selected state.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/toggle-group.tsx" />
      </div>
    </div>
  );
}
