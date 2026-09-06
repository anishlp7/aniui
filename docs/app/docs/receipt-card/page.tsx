import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { ReceiptCard } from "@/components/ui/receipt-card";
<ReceiptCard
  merchant="Cafe"
  date="Today"
  lines={[{ label: "Latte", value: "$5.00" }]}
  total="$12"
  code="123456789012"
/>`;
const sourceCode = getComponentSource("receipt-card");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Receipt Card</h1>
        <p className="text-muted-foreground text-lg">Tilted, torn-edge receipt card with dotted item leaders and an optional printed barcode.</p>
      </div>
      <ShowcaseDocPlayground slug="receipt-card" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="receipt-card" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/receipt-card.tsx" />
      </div>
    </div>
  );
}
