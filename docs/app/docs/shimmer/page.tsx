import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { Shimmer } from "@/components/ui/shimmer";
import { Text } from "react-native";

<Shimmer isLoading={isLoading} className="h-12 w-full">
  <Text>Real content, revealed once isLoading is false</Text>
</Shimmer>`;
const sourceCode = getComponentSource("shimmer");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shimmer</h1>
        <p className="text-muted-foreground text-lg">Content-aware skeleton with sweep/pulse variants, 4 sweep directions, named color presets, and an isLoading/children reveal for the real content.</p>
      </div>
      <ShowcaseDocPlayground slug="shimmer" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="shimmer" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/shimmer.tsx" />
      </div>
    </div>
  );
}
