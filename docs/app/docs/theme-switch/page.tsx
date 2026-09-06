import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { ThemeSwitch } from "@/components/ui/theme-switch";
<ThemeSwitch isDark={isDark} onToggle={() => setIsDark((d) => !d)} wipe />`;
const sourceCode = getComponentSource("theme-switch");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Theme Switch</h1>
        <p className="text-muted-foreground text-lg">Sun/moon icon-morph theme toggle with an optional full-screen circular wipe transition.</p>
      </div>
      <ShowcaseDocPlayground slug="theme-switch" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="theme-switch" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/theme-switch.tsx" />
      </div>
    </div>
  );
}
