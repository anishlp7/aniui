import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewNumberInputDemo } from "@/components/preview/number-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add number-input`;
const usageCode = `import { NumberInput } from "@/components/ui/number-input";

export function MyScreen() {
  const [quantity, setQuantity] = useState(1);

  return (
    <NumberInput
      value={quantity}
      onValueChange={setQuantity}
      min={1}
      max={99}
      step={1}
    />
  );
}`;
const sourceCode = getComponentSource("number-input");
export default function NumberInputPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Number Input</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Numeric input with increment and decrement buttons.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="number-input" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewNumberInputDemo />
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
          { name: "value", type: "number", default: "-" },
          { name: "onValueChange", type: "(value: number) => void", default: "-" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "999999" },
          { name: "step", type: "number", default: "1" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">value</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onChangeText</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Increment/decrement buttons with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityValue</code> for current value.</li>
          <li>Min/max boundaries are enforced and announced to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/number-input.tsx" />
      </div>
    </div>
  );
}
