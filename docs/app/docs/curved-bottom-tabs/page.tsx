import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { CurvedBottomTabs } from "@/components/ui/curved-bottom-tabs";
<CurvedBottomTabs tabs={tabs} activeIndex={activeIndex} onTabPress={setActiveIndex} />`;
const sourceCode = getComponentSource("curved-bottom-tabs");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Curved Bottom Tabs</h1><p className="text-muted-foreground text-lg">Bottom tab bar with a curved notch that glides to whichever tab is active — any tab can rise into the floating button, not just a fixed center one.</p></div>
      <ShowcaseDocPlayground slug="curved-bottom-tabs" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="curved-bottom-tabs" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/curved-bottom-tabs.tsx" /></div>
    </div>
  );
}
