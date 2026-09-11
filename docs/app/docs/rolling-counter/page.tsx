import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { RollingCounter } from "@/components/ui/rolling-counter";
<RollingCounter value={1284} prefix="$" />`;
const sourceCode = getComponentSource("rolling-counter");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Rolling Counter</h1><p className="text-muted-foreground text-lg">Animated odometer-style rolling number counter.</p></div>
      <ShowcaseDocPlayground slug="rolling-counter" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="rolling-counter" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/rolling-counter.tsx" /></div>
    </div>
  );
}
