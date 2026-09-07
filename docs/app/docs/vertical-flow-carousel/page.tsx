import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { VerticalFlowCarousel } from "@/components/ui/vertical-flow-carousel";
<VerticalFlowCarousel data={cards} onIndexChange={setIndex} />`;
const sourceCode = getComponentSource("vertical-flow-carousel");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Vertical Flow Carousel</h1><p className="text-muted-foreground text-lg">Vertical coverflow — the centered card scales up and sharpens, its neighbors tilt, shrink, and blur away.</p></div>
      <ShowcaseDocPlayground slug="vertical-flow-carousel" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="vertical-flow-carousel" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/vertical-flow-carousel.tsx" /></div>
    </div>
  );
}
