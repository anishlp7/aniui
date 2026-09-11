import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { BarcodeBadge } from "@/components/ui/barcode-badge";
<BarcodeBadge value="SKU-9281" label="Product ID" />`;
const sourceCode = getComponentSource("barcode-badge");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Barcode Badge</h1><p className="text-muted-foreground text-lg">Width-encoded barcode strip with a compound Bars/Label API and palette overrides.</p></div>
      <ShowcaseDocPlayground slug="barcode-badge" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="barcode-badge" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/barcode-badge.tsx" /></div>
    </div>
  );
}
