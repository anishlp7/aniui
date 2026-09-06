import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { StackedChips, StackedChipsTrigger, StackedChipsContent } from "@/components/ui/stacked-chips";

<StackedChips>
  <StackedChipsTrigger>Filters</StackedChipsTrigger>
  <StackedChipsContent>
    <StackedChips>
      <StackedChipsTrigger>Color</StackedChipsTrigger>
      <StackedChipsContent>
        <Text>Red</Text>
        <Text>Blue</Text>
      </StackedChipsContent>
    </StackedChips>
  </StackedChipsContent>
</StackedChips>`;
const sourceCode = getComponentSource("stacked-chips");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stacked Chips</h1>
        <p className="text-muted-foreground text-lg">Nested, depth-aware expandable chip menu — a trigger reveals further stacked chips.</p>
      </div>
      <ShowcaseDocPlayground slug="stacked-chips" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="stacked-chips" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/stacked-chips.tsx" />
      </div>
    </div>
  );
}
