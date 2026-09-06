import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { Coupon } from "@/components/ui/coupon";
<Coupon code="ANIUI20" discount="20% OFF" />`;
const sourceCode = getComponentSource("coupon");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Coupon</h1>
        <p className="text-muted-foreground text-lg">Two-section promotional coupon with a real tear-line, ticket icon, and orientation prop.</p>
      </div>
      <ShowcaseDocPlayground slug="coupon" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="coupon" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/coupon.tsx" />
      </div>
    </div>
  );
}
