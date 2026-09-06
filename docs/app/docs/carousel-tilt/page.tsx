import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { CarouselTilt } from "@/components/ui/carousel-tilt";
<CarouselTilt data={slides} rotationAngle={18} useBlur />`;
const sourceCode = getComponentSource("carousel-tilt");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Carousel Tilt</h1><p className="text-muted-foreground text-lg">Horizontal carousel with perspective tilt on off-center slides and an optional blur overlay.</p></div>
      <ShowcaseDocPlayground slug="carousel-tilt" code={usageCode} variant="inline" />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="carousel-tilt" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/carousel-tilt.tsx" /></div>
    </div>
  );
}
