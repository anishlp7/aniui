import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { MorphingTabBar } from "@/components/ui/morphing-tabbar";
<MorphingTabBar tabs={tabs} activeKey={key} onTabPress={setKey} />`;
const sourceCode = getComponentSource("morphing-tabbar");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Morphing Tab Bar</h1><p className="text-muted-foreground text-lg">Segmented tab bar where each tab's own corner radii and spacing morph to split the active tab into a separated pill — no sliding indicator.</p></div>
      <ShowcaseDocPlayground slug="morphing-tabbar" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="morphing-tabbar" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/morphing-tabbar.tsx" /></div>
    </div>
  );
}
