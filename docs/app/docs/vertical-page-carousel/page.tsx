import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { VerticalPageCarousel } from "@/components/ui/vertical-page-carousel";
<VerticalPageCarousel data={pages} onIndexChange={setIndex} />`;
const sourceCode = getComponentSource("vertical-page-carousel");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Vertical Page Carousel</h1><p className="text-muted-foreground text-lg">Full-bleed vertical pager — one card fills the screen at a time, with a haptic tick on release.</p></div>
      <ShowcaseDocPlayground slug="vertical-page-carousel" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="vertical-page-carousel" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/vertical-page-carousel.tsx" /></div>
    </div>
  );
}
