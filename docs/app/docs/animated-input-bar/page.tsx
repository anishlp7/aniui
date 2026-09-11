import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { AnimatedInputBar } from "@/components/ui/animated-input-bar";

<AnimatedInputBar
  placeholders={["Search flights", "Search hotels", "Search cars"]}
  value={query}
  onChangeText={setQuery}
/>`;
const sourceCode = getComponentSource("animated-input-bar");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Animated Input Bar</h1>
        <p className="text-muted-foreground text-lg">Text input with a per-character animated placeholder that cycles through multiple strings.</p>
      </div>
      <ShowcaseDocPlayground slug="animated-input-bar" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="animated-input-bar" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/animated-input-bar.tsx" />
      </div>
    </div>
  );
}
