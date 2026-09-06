import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import {
  VerifiedBadge,
  VerifiedBadgeCheck,
  VerifiedBadgeContent,
  VerifiedBadgeName,
  VerifiedBadgeHandle,
} from "@/components/ui/verified-badge";

export function MyScreen() {
  return (
    <VerifiedBadge>
      <VerifiedBadgeCheck />
      <VerifiedBadgeContent>
        <VerifiedBadgeName>Anish Lawrence</VerifiedBadgeName>
        <VerifiedBadgeHandle>@anishlp</VerifiedBadgeHandle>
      </VerifiedBadgeContent>
    </VerifiedBadge>
  );
}`;
const sourceCode = getComponentSource("verified-badge");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Verified Badge</h1><p className="text-muted-foreground text-lg">Verified check badge with a Name/Handle layout and palette overrides.</p></div>
      <ShowcaseDocPlayground slug="verified-badge" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="verified-badge" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/verified-badge.tsx" /></div>
    </div>
  );
}
