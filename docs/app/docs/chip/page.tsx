import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewChip } from "@/components/preview/chip";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SelectableDemo, ClosableDemo } from "./_demos";

const installCode = `npx @aniui/cli add chip`;
const usageCode = `import { Chip } from "@/components/ui/chip";
<Chip variant="default">React Native</Chip>
<Chip variant="secondary">TypeScript</Chip>
<Chip variant="outline">NativeWind</Chip>`;
const variantsCode = `<Chip variant="default">Default</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="outline">Outline</Chip>
<Chip variant="destructive">Destructive</Chip>`;
const sizesCode = `<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`;
const selectableCode = `const [selected, setSelected] = useState<string[]>(["react-native"]);
const toggle = (id: string) =>
  setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
<Chip selected={selected.includes("react-native")} onPress={() => toggle("react-native")}>React Native</Chip>
<Chip selected={selected.includes("expo")} onPress={() => toggle("expo")}>Expo</Chip>
<Chip selected={selected.includes("nativewind")} onPress={() => toggle("nativewind")}>NativeWind</Chip>`;
const closableCode = `<Chip onClose={() => console.log("removed")}>Removable</Chip>
<Chip variant="secondary" onClose={() => {}}>Tag</Chip>`;
const sourceCode = getComponentSource("chip");
export default function ChipPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chip</h1>
        <p className="text-muted-foreground text-lg">Interactive tags for filters, categories, and multi-select. Unlike Badge (display-only), Chips are pressable and selectable.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip variant="default">React Native</PreviewChip>
            <PreviewChip variant="secondary">TypeScript</PreviewChip>
            <PreviewChip variant="outline">NativeWind</PreviewChip>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="chip" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip variant="default">Default</PreviewChip>
            <PreviewChip variant="secondary">Secondary</PreviewChip>
            <PreviewChip variant="outline">Outline</PreviewChip>
            <PreviewChip variant="destructive">Destructive</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-2">
            <PreviewChip size="sm">Small</PreviewChip>
            <PreviewChip size="md">Medium</PreviewChip>
            <PreviewChip size="lg">Large</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Selectable</Heading>
        <p className="text-sm text-muted-foreground mb-4">Use the <code>selected</code> prop for filter chips. Selected chips switch to the default (filled) variant automatically.</p>
        <ComponentPlayground code={selectableCode}>
          <SelectableDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Closable</Heading>
        <p className="text-sm text-muted-foreground mb-4">Add an <code>onClose</code> handler to show a remove button.</p>
        <ComponentPlayground code={closableCode}>
          <ClosableDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"destructive\"", default: "\"outline\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "children", type: "string" },
          { name: "selected", type: "boolean", default: "false" },
          { name: "onClose", type: "() => void" },
          { name: "textClassName", type: "string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with selected state for screen readers.</li>
          <li>Supports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> to indicate selection.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/chip.tsx" />
      </div>
    </div>
  );
}
