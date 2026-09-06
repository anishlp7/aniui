import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { ArcList, ArcListItem, ArcListLabel } from "@/components/ui/arc-list";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

<ArcList itemHeight={56} height={280} onValueChange={(index) => console.log(index)}>
  {days.map((day) => (
    <ArcListItem key={day}>
      <ArcListLabel>{day}</ArcListLabel>
    </ArcListItem>
  ))}
</ArcList>`;
const sourceCode = getComponentSource("arc-list");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Arc List</h1>
        <p className="text-muted-foreground text-lg">Items laid out along a curved arc with proximity scale/opacity, snap-to-focus, and a haptic tick on snap.</p>
      </div>
      <ShowcaseDocPlayground slug="arc-list" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="arc-list" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/arc-list.tsx" />
      </div>
    </div>
  );
}
