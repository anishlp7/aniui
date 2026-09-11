import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { FillingStack } from "@/components/ui/filling-stack";

<FillingStack
  data={cards}
  renderItem={(card) => <Card {...card} />}
  onIndexChange={setIndex}
/>`;
const sourceCode = getComponentSource("filling-stack");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Filling Stack</h1>
        <p className="text-muted-foreground text-lg">Vertically browsable card stack with fling gestures and a blur &quot;filling&quot; transition between cards.</p>
      </div>
      <ShowcaseDocPlayground slug="filling-stack" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="filling-stack" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/filling-stack.tsx" />
      </div>
    </div>
  );
}
