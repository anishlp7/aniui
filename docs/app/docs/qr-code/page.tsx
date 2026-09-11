import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { QrCode } from "@/components/ui/qr-code";
<QrCode
  value="https://aniui.dev"
  label="Show QR Code"
  onCopy={(value) => Clipboard.setStringAsync(value)}
/>`;
const sourceCode = getComponentSource("qr-code");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">QR Code</h1><p className="text-muted-foreground text-lg">Tap-to-reveal "Show QR Code" pill that springs open into a card with a real, scannable QR code plus copy and close actions.</p></div>
      <ShowcaseDocPlayground slug="qr-code" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="qr-code" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/qr-code.tsx" /></div>
    </div>
  );
}
