import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { FlipCard } from "@/components/ui/flip-card";
<FlipCard front={<CardFront />} back={<CardBack />} />`;
const sourceCode = getComponentSource("flip-card");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Flip Card</h1>
        <p className="text-muted-foreground text-lg">Tap-to-flip card with horizontal, vertical, or depth 3D rotation, mid-flip glass blur, and haptic feedback.</p>
      </div>
      <ShowcaseDocPlayground slug="flip-card" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="flip-card" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/flip-card.tsx" />
      </div>
    </div>
  );
}
