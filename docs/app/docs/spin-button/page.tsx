import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { SpinButton } from "@/components/ui/spin-button";
<SpinButton saving={saving} onSavingChange={setSaving} />`;
const sourceCode = getComponentSource("spin-button");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Spin Button</h1>
        <p className="text-muted-foreground text-lg">Toggle button with a custom SVG arc spinner and crossfading label on press.</p>
      </div>
      <ShowcaseDocPlayground slug="spin-button" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="spin-button" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/spin-button.tsx" />
      </div>
    </div>
  );
}
