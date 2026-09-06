import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { SaveButton } from "@/components/ui/save-button";
<SaveButton label="Save" onSave={async () => await saveDraft()} onSaved={() => console.log("saved")} />`;
const sourceCode = getComponentSource("save-button");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Save Button</h1>
        <p className="text-muted-foreground text-lg">Idle → loading → success → done state-machine save button with animated phase transitions.</p>
      </div>
      <ShowcaseDocPlayground slug="save-button" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="save-button" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/save-button.tsx" />
      </div>
    </div>
  );
}
