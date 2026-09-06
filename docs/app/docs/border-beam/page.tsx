import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { BorderBeam } from "@/components/ui/border-beam";
<BorderBeam><Text>Featured card</Text></BorderBeam>`;
const sourceCode = getComponentSource("border-beam");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Border Beam</h1><p className="text-muted-foreground text-lg">Sweeping multi-hue beam with an ambient glow, traced around a rounded border.</p><p className="text-sm text-muted-foreground mt-2">Requires @shopify/react-native-skia (Tier 4).</p></div>
      <ShowcaseDocPlayground slug="border-beam" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="border-beam" /><p className="text-sm text-muted-foreground mt-3">Then install Skia: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx expo install @shopify/react-native-skia</code></p></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/border-beam.tsx" /></div>
    </div>
  );
}
