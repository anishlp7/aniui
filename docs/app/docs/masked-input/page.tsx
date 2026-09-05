import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewMaskedInputDemo } from "@/components/preview/masked-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add masked-input`;
const usageCode = `import { MaskedInput } from "@/components/ui/masked-input";

export function MyScreen() {
  return (
    <View className="gap-4">
      {/* Credit card preset */}
      <MaskedInput
        preset="credit-card"
        placeholder="1234 5678 9012 3456"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Phone preset */}
      <MaskedInput
        preset="phone"
        placeholder="(555) 123-4567"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Date preset */}
      <MaskedInput
        preset="date"
        placeholder="MM/DD/YYYY"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
      {/* Custom mask */}
      <MaskedInput
        mask="###-##-####"
        placeholder="SSN"
        onChangeText={(masked, raw) => console.log(masked, raw)}
      />
    </View>
  );
}`;
const sourceCode = getComponentSource("masked-input");
export default function MaskedInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Masked Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Text input with auto-formatting masks for credit cards, phones, and dates.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="masked-input" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewMaskedInputDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: '"default" | "ghost"', default: '"default"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "mask", type: "string", default: "-" },
          { name: "preset", type: '"credit-card" | "phone" | "date"', default: "-" },
          { name: "onChangeText", type: "(masked: string, raw: string) => void", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="text"</code> with auto-formatting for credit card, phone, and date masks.</li>
          <li>Formatted value is announced to screen readers as the user types.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/masked-input.tsx" />
      </div>
    </div>
  );
}
