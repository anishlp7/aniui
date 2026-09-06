import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { PhotoStack } from "@/components/ui/photo-stack";
<PhotoStack sources={[{ uri: "..." }, { uri: "..." }]} onPress={(index) => console.log(index)} />`;
const sourceCode = getComponentSource("photo-stack");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Photo Stack</h1><p className="text-muted-foreground text-lg">Overlapping stacked photos with a press-lift-and-straighten spring and optional per-photo onPress.</p></div>
      <ShowcaseDocPlayground slug="photo-stack" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="photo-stack" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/photo-stack.tsx" /></div>
    </div>
  );
}
