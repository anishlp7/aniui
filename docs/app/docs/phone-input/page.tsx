import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewPhoneInputDemo } from "@/components/preview/phone-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add phone-input`;
const usageCode = `import { PhoneInput } from "@/components/ui/phone-input";

export function MyScreen() {
  return (
    <PhoneInput
      defaultCountry="US"
      onChangeText={(phone, dial, raw) => {
        console.log(phone); // "+15551234567"
        console.log(dial);  // "+1"
        console.log(raw);   // "5551234567"
      }}
    />
  );
}`;
const sourceCode = getComponentSource("phone-input");
export default function PhoneInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Phone Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Phone number input with country code selector.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="phone-input" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewPhoneInputDemo />
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
          { name: "defaultCountry", type: "string", default: '"US"' },
          { name: "onChangeText", type: "(phone: string, dial: string, raw: string) => void", default: "-" },
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
          <li>Phone number input with country code picker.</li>
          <li>Country selector and input field are separately focusable for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/phone-input.tsx" />
      </div>
    </div>
  );
}
