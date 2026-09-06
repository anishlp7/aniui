import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  ExpandableView,
  ExpandableViewCollapsed,
  ExpandableViewExpanded,
  ExpandableViewClose,
} from "@/components/ui/expandable-view";
import { Text } from "react-native";

<ExpandableView>
  <ExpandableViewCollapsed>
    <Text className="text-sm font-medium text-foreground">Tap to expand</Text>
  </ExpandableViewCollapsed>
  <ExpandableViewExpanded>
    <Text className="p-4 text-sm text-foreground">Expanded content goes here.</Text>
    <ExpandableViewClose />
  </ExpandableViewExpanded>
</ExpandableView>`;
const sourceCode = getComponentSource("expandable-view");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Expandable View</h1>
        <p className="text-muted-foreground text-lg">Generic expand/collapse container with spring-driven width/height/corner-radius morphing and a slot API.</p>
      </div>
      <ShowcaseDocPlayground slug="expandable-view" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="expandable-view" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/expandable-view.tsx" />
      </div>
    </div>
  );
}
