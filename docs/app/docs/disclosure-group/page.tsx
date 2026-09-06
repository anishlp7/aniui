import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { DisclosureGroup, DisclosureItem } from "@/components/ui/disclosure-group";
<DisclosureGroup><DisclosureItem value="a" title="General">...</DisclosureItem></DisclosureGroup>`;
const sourceCode = getComponentSource("disclosure-group");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Disclosure Group</h1>
        <p className="text-muted-foreground text-lg">iOS-style grouped expandable disclosure sections with measured-height reveal and an optional frosted-blur panel.</p>
      </div>
      <ShowcaseDocPlayground slug="disclosure-group" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="disclosure-group" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/disclosure-group.tsx" />
      </div>
    </div>
  );
}
