import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { Hamburger } from "@/components/ui/hamburger";
<Hamburger open={open} onOpenChange={setOpen} />`;
const sourceCode = getComponentSource("hamburger");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hamburger</h1>
        <p className="text-muted-foreground text-lg">Animated hamburger ⇄ close icon morph driven by a single progress value.</p>
      </div>
      <ShowcaseDocPlayground slug="hamburger" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="hamburger" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/hamburger.tsx" />
      </div>
    </div>
  );
}
