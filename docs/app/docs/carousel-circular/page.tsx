import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { CarouselCircular } from "@/components/ui/carousel-circular";
<CarouselCircular data={avatars} onIndexChange={setIndex} />`;
const sourceCode = getComponentSource("carousel-circular");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Carousel Circular</h1><p className="text-muted-foreground text-lg">Scroll-driven coverflow — the centered card lifts forward and sharpens while its neighbors tilt, shrink, and blur away.</p></div>
      <ShowcaseDocPlayground slug="carousel-circular" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="carousel-circular" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/carousel-circular.tsx" /></div>
    </div>
  );
}
