import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  SplitView,
  SplitViewTop,
  SplitViewTitle,
  SplitViewHandle,
  SplitViewBottom,
} from "@/components/ui/split-view";
import { Text } from "react-native";

<SplitView initialTopHeight={220}>
  <SplitViewTop>
    <SplitViewTitle>Map</SplitViewTitle>
  </SplitViewTop>
  <SplitViewHandle />
  <SplitViewBottom>
    <Text className="p-4 text-sm text-muted-foreground">Results list goes here.</Text>
  </SplitViewBottom>
</SplitView>`;
const sourceCode = getComponentSource("split-view");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Split View</h1>
        <p className="text-muted-foreground text-lg">Draggable, resizable top/bottom split pane with snap points and spring physics.</p>
      </div>
      <ShowcaseDocPlayground slug="split-view" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="split-view" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/split-view.tsx" />
      </div>
    </div>
  );
}
