import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { FlexiButton } from "@/components/ui/flexi-button";
<FlexiButton label="Clear all" onExpandedChange={(expanded) => console.log(expanded)} />`;
const sourceCode = getComponentSource("flexi-button");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Flexi Button</h1>
        <p className="text-muted-foreground text-lg">Adaptive-width pill button that springs open to reveal a label, with a dimension-change callback.</p>
      </div>
      <ShowcaseDocPlayground slug="flexi-button" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="flexi-button" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/flexi-button.tsx" />
      </div>
    </div>
  );
}
