import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ToggleDemo, ToggleVariantsDemo, ToggleSizesDemo } from "./_demos";

const installCode = `npx @aniui/cli add toggle`;
const usageCode = `import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export function MyScreen() {
  const [bold, setBold] = useState(false);
  return (
    <Toggle pressed={bold} onPressedChange={setBold}>
      B
    </Toggle>
  );
}`;
const variantsCode = `<Toggle variant="default" pressed={false}>Default</Toggle>
<Toggle variant="outline" pressed={false}>Outline</Toggle>`;
const sizesCode = `<Toggle size="sm">S</Toggle>
<Toggle size="md">M</Toggle>
<Toggle size="lg">L</Toggle>`;
const sourceCode = getComponentSource("toggle");
export default function TogglePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toggle</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A two-state button that can be toggled on or off.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <ToggleDemo />
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="toggle" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <ToggleVariantsDemo />
        </ComponentPlayground>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <ToggleSizesDemo />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"outline\"", default: "\"default\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "pressed", type: "boolean", default: "false" },
          { name: "onPressedChange", type: "(pressed: boolean) => void" },
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
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with pressed state announced to screen readers.</li>
          <li>Supports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for selected/unselected.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/toggle.tsx" />
      </div>
    </div>
  );
}
