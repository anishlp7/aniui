import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { SocialButton } from "@/components/ui/social-button";
<SocialButton provider="apple" variant="filled" onPress={signIn} />`;
const sourceCode = getComponentSource("social-button");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Social Button</h1><p className="text-muted-foreground text-lg">Branded social sign-in button with built-in Google/Apple/GitHub/X marks and outline/filled/ghost variants.</p></div>
      <ShowcaseDocPlayground slug="social-button" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="social-button" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/social-button.tsx" /></div>
    </div>
  );
}
