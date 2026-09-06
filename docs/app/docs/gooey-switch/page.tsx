import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { GooeySwitch } from "@/components/ui/gooey-switch";
<GooeySwitch value={on} onValueChange={setOn} />`;
const sourceCode = getComponentSource("gooey-switch");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Gooey Switch</h1><p className="text-muted-foreground text-lg">Skia gooey/blob toggle with a spring thumb — tap or drag to toggle.</p><p className="text-sm text-muted-foreground mt-2">Tier 4 — needs Skia + Reanimated.</p></div>
      <ShowcaseDocPlayground slug="gooey-switch" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="gooey-switch" /><p className="text-sm text-muted-foreground mt-3">Then install Skia: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx expo install @shopify/react-native-skia</code></p></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/gooey-switch.tsx" /></div>
    </div>
  );
}
