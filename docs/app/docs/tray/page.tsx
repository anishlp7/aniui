import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  Tray,
  TrayTrigger,
  TrayContent,
  TrayHeader,
  TrayTitle,
  TrayClose,
  TrayBody,
} from "@/components/ui/tray";
import { Text } from "react-native";

<Tray detents={["50%", "90%"]}>
  <TrayTrigger>
    <Text className="text-sm font-medium text-foreground">Open Tray</Text>
  </TrayTrigger>
  <TrayContent>
    <TrayHeader>
      <TrayTitle>Settings</TrayTitle>
      <TrayClose />
    </TrayHeader>
    <TrayBody>
      <Text className="text-sm text-muted-foreground">Tray content goes here.</Text>
    </TrayBody>
  </TrayContent>
</Tray>`;
const sourceCode = getComponentSource("tray");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tray</h1>
        <p className="text-muted-foreground text-lg">Compound bottom-sheet/navigation-tray system with multi-view push/back navigation, draggable detents, and scroll hand-off.</p>
      </div>
      <ShowcaseDocPlayground slug="tray" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="tray" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/tray.tsx" />
      </div>
    </div>
  );
}
