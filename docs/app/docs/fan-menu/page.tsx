import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { FanMenu } from "@/components/ui/fan-menu";
<FanMenu items={actions} />`;
const sourceCode = getComponentSource("fan-menu");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Fan Menu</h1><p className="text-muted-foreground text-lg">Radial fan menu that staggers labeled actions out from a FAB, with tap-outside-to-dismiss backdrop.</p></div>
      <ShowcaseDocPlayground slug="fan-menu" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="fan-menu" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/fan-menu.tsx" /></div>
    </div>
  );
}
