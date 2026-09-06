import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  UnfoldMenu,
  UnfoldMenuTrigger,
  UnfoldMenuIcon,
  UnfoldMenuLabel,
  UnfoldMenuContent,
  UnfoldMenuHeader,
  UnfoldMenuTitle,
  UnfoldMenuClose,
  UnfoldMenuGrid,
  UnfoldMenuItem,
} from "@/components/ui/unfold-menu";
import { Share2, Star } from "lucide-react-native";

<UnfoldMenu onSelect={(value) => console.log(value)}>
  <UnfoldMenuTrigger>
    <UnfoldMenuIcon><Share2 size={20} color="#111111" /></UnfoldMenuIcon>
    <UnfoldMenuLabel>Share</UnfoldMenuLabel>
  </UnfoldMenuTrigger>
  <UnfoldMenuContent>
    <UnfoldMenuHeader>
      <UnfoldMenuTitle>Share</UnfoldMenuTitle>
      <UnfoldMenuClose />
    </UnfoldMenuHeader>
    <UnfoldMenuGrid columns={3}>
      <UnfoldMenuItem value="favorite">
        <Star size={20} color="#6d7480" />
      </UnfoldMenuItem>
    </UnfoldMenuGrid>
  </UnfoldMenuContent>
</UnfoldMenu>`;
const sourceCode = getComponentSource("unfold-menu");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Unfold Menu</h1>
        <p className="text-muted-foreground text-lg">Menu whose trigger unfolds into a full panel, its label morphing into the panel&apos;s title as it expands.</p>
      </div>
      <ShowcaseDocPlayground slug="unfold-menu" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="unfold-menu" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/unfold-menu.tsx" />
      </div>
    </div>
  );
}
