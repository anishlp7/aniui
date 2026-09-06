import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { CarouselParallax } from "@/components/ui/carousel-parallax";
<CarouselParallax data={slides} />`;
const sourceCode = getComponentSource("carousel-parallax");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carousel Parallax</h1>
        <p className="text-muted-foreground text-lg">Horizontal carousel with inner-layer parallax translation and a haptic tick on release.</p>
      </div>
      <ShowcaseDocPlayground slug="carousel-parallax" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="carousel-parallax" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/carousel-parallax.tsx" />
      </div>
    </div>
  );
}
