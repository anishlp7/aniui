import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { SquircleView } from "@/components/ui/squircle-view";

<SquircleView width={120} height={120} cornerRadius={28} cornerSmoothing={0.8} backgroundColor="#6366f1">
  <Text>Squircle</Text>
</SquircleView>`;
const sourceCode = getComponentSource("squircle-view");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Squircle View</h1>
        <p className="text-muted-foreground text-lg">True superellipse squircle container with an animatable corner-smoothing parameter.</p>
      </div>
      <ShowcaseDocPlayground slug="squircle-view" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="squircle-view" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/squircle-view.tsx" />
      </div>
    </div>
  );
}
