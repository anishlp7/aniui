import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewSwitch } from "@/components/preview/switch";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
const installCode = `npx @aniui/cli add switch`;
const usageCode = `import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function MyScreen() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch value={enabled} onValueChange={setEnabled} />
  );
}`;
const sourceCode = getComponentSource("switch");
export default function SwitchPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Switch</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Toggle switch for boolean settings.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex items-center gap-4">
            <PreviewSwitch />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="switch" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "boolean", default: "false" },
          { name: "onValueChange", type: "(value: boolean) => void" },
          { name: "trackColorOff", type: "string", description: "Override the off-state track color. Defaults adapt to light/dark mode." },
          { name: "trackColorOn", type: "string", description: "Override the on-state track color. Defaults adapt to light/dark mode." },
          { name: "thumbColor", type: "string", description: "Override the thumb color. Defaults to a value that contrasts with the active track on both iOS and Android." },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Switch</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="switch"</code> wrapping the native React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Switch</code>.</li>
          <li>On/off state is announced automatically by the platform.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/switch.tsx" />
      </div>
    </div>
  );
}
