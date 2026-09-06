import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { GooeyPopover, GooeyPopoverTrigger, GooeyPopoverContent } from "@/components/ui/gooey-popover";
import { Text } from "react-native";

<GooeyPopover side="bottom" align="center">
  <GooeyPopoverTrigger>Options</GooeyPopoverTrigger>
  <GooeyPopoverContent>
    <Text className="text-sm text-foreground">Popover content goes here.</Text>
  </GooeyPopoverContent>
</GooeyPopover>`;
const sourceCode = getComponentSource("gooey-popover");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gooey Popover</h1>
        <p className="text-muted-foreground text-lg">Skia gooey popover that morphs its trigger into the content panel.</p>
      </div>
      <ShowcaseDocPlayground slug="gooey-popover" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="gooey-popover" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/gooey-popover.tsx" />
      </div>
    </div>
  );
}
