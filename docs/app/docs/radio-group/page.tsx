import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { RadioGroupDemo } from "./_demos";

const installCode = `npx @aniui/cli add radio-group`;
const usageCode = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function MyScreen() {
  const [value, setValue] = useState("pro");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <RadioGroupItem value="free" label="Free — $0/mo" />
      <RadioGroupItem value="pro" label="Pro — $12/mo" />
      <RadioGroupItem value="team" label="Team — $29/mo per seat" />
    </RadioGroup>
  );
}`;
const sourceCode = getComponentSource("radio-group");
export default function RadioGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">RadioGroup</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Radio button group for single-selection from a list of options.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <RadioGroupDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="radio-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</Heading>
        <p className="text-sm text-muted-foreground">
          RadioGroup exports two components that work together:
        </p>
        <ComponentTable components={[
          { name: "RadioGroup", description: "Root container that manages selection state" },
          { name: "RadioGroupItem", description: "Individual radio option with label" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">RadioGroup</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "onValueChange", type: "(value: string) => void", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">RadioGroupItem</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "label", type: "string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/radio-group</code> for arrow key navigation.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="radiogroup"</code> on container with individual radio items properly associated.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/radio-group.tsx" />
      </div>
    </div>
  );
}
