import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  GooeySearchTabs,
  GooeySearchTabsTrigger,
  GooeySearchTabsTabs,
  GooeySearchTabsTab,
  GooeySearchTabsTabIcon,
  GooeySearchTabsTabLabel,
} from "@/components/ui/gooey-search-tabs";
import { Home, User } from "lucide-react-native";

<GooeySearchTabs onSearch={(query) => console.log(query)}>
  <GooeySearchTabsTrigger />
  <GooeySearchTabsTabs>
    <GooeySearchTabsTab value="home">
      <GooeySearchTabsTabIcon><Home size={18} color="#1d1d1f" /></GooeySearchTabsTabIcon>
      <GooeySearchTabsTabLabel>Home</GooeySearchTabsTabLabel>
    </GooeySearchTabsTab>
    <GooeySearchTabsTab value="profile">
      <GooeySearchTabsTabIcon><User size={18} color="#1d1d1f" /></GooeySearchTabsTabIcon>
      <GooeySearchTabsTabLabel>Profile</GooeySearchTabsTabLabel>
    </GooeySearchTabsTab>
  </GooeySearchTabsTabs>
</GooeySearchTabs>`;
const sourceCode = getComponentSource("gooey-search-tabs");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gooey Search Tabs</h1>
        <p className="text-muted-foreground text-lg">Skia gooey pill that morphs between a search bar and a tab switcher.</p>
      </div>
      <ShowcaseDocPlayground slug="gooey-search-tabs" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="gooey-search-tabs" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/gooey-search-tabs.tsx" />
      </div>
    </div>
  );
}
