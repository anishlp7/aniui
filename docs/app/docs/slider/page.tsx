import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewSlider } from "@/components/preview/slider";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add slider`;
const usageCode = `import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function MyScreen() {
  const [value, setValue] = useState(50);
  return (
    <Slider
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
    />
  );
}`;
const disabledCode = `<Slider value={30} disabled />`;
const sourceCode = getComponentSource("slider");
export default function SliderPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Slider</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          An interactive slider component for selecting a value within a range.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="slider" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Default */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Default</Heading>
        <ComponentPlayground code={usageCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider />
          </div>
        </ComponentPlayground>
      </div>
      {/* Disabled */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Disabled</Heading>
        <ComponentPlayground code={disabledCode}>
          <div className="flex w-full items-center gap-4">
            <PreviewSlider disabled />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "number", default: "0" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "100" },
          { name: "step", type: "number", default: "1" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "onValueChange", type: "(value: number) => void" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses PanResponder for smooth gesture-based dragging</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with min/max/now values exposed to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/slider.tsx" />
      </div>
    </div>
  );
}
