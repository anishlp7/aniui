import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { Polaroid } from "@/components/ui/polaroid";
<Polaroid source={{ uri: "..." }} caption="Summer" tape onPress={() => {}} />`;
const sourceCode = getComponentSource("polaroid");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Polaroid</h1>
        <p className="text-muted-foreground text-lg">Polaroid-style photo frame with a press-lift-and-straighten spring and optional washi-tape decoration.</p>
      </div>
      <ShowcaseDocPlayground slug="polaroid" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="polaroid" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/polaroid.tsx" />
      </div>
    </div>
  );
}
