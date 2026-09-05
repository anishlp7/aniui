import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewCheckbox } from "@/components/preview/checkbox";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add checkbox`;
const usageCode = `import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function MyScreen() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onCheckedChange={setChecked} />
  );
}`;
const statesCode = `<Checkbox checked={false} />
<Checkbox checked={true} />
<Checkbox disabled />`;
const sourceCode = getComponentSource("checkbox");
export default function CheckboxPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkbox</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Checkbox with checked, unchecked, and disabled states.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewCheckbox />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="checkbox" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* States */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">States</Heading>
        <ComponentPlayground code={statesCode}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <PreviewCheckbox checked={false} />
              <span className="text-sm text-muted-foreground">Unchecked</span>
            </div>
            <div className="flex items-center gap-2">
              <PreviewCheckbox checked={true} />
              <span className="text-sm text-muted-foreground">Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <PreviewCheckbox disabled />
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "checked", type: "boolean", default: "false" },
          { name: "onCheckedChange", type: "(checked: boolean) => void" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/checkbox</code> for checked/indeterminate state management.</li>
          <li>Checked state is announced to screen readers automatically.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/checkbox.tsx" />
      </div>
    </div>
  );
}