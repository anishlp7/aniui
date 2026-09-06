import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { CarouselScale } from "@/components/ui/carousel-scale";
<CarouselScale data={slides} />`;
const sourceCode = getComponentSource("carousel-scale");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Carousel Scale</h1><p className="text-muted-foreground text-lg">Center-focused carousel with dramatic scale on the active slide.</p></div>
      <ShowcaseDocPlayground slug="carousel-scale" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="carousel-scale" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/carousel-scale.tsx" /></div>
    </div>
  );
}
