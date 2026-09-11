import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { Marquee } from "@/components/ui/marquee";
<Marquee reverse pauseOnPress>Beautiful React Native components</Marquee>`;
const sourceCode = getComponentSource("marquee");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Marquee</h1>
        <p className="text-muted-foreground text-lg">Horizontally scrolling marquee for any content with a seamless loop — supports reverse direction, tap-to-pause, and press-and-hold-to-speed-up.</p>
      </div>
      <ShowcaseDocPlayground slug="marquee" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="marquee" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/marquee.tsx" />
      </div>
    </div>
  );
}
