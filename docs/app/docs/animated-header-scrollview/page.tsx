import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { AnimatedHeaderScrollView } from "@/components/ui/animated-header-scrollview";

<AnimatedHeaderScrollView title="Settings" subtitle="Manage your account">
  {items.map((item) => <ListRow key={item.id} {...item} />)}
</AnimatedHeaderScrollView>`;
const sourceCode = getComponentSource("animated-header-scrollview");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Animated Header ScrollView</h1>
        <p className="text-muted-foreground text-lg">iOS-style collapsing large-title header ScrollView with blur backdrop on scroll.</p>
      </div>
      <ShowcaseDocPlayground slug="animated-header-scrollview" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="animated-header-scrollview" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/animated-header-scrollview.tsx" />
      </div>
    </div>
  );
}
