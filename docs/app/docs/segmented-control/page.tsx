import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SegmentedControlDemo, SizesDemo } from "./_demos";

const installCode = `npx @aniui/cli add segmented-control`;
const usageCode = `import { SegmentedControl } from "@/components/ui/segmented-control";

const [view, setView] = useState("List");
<SegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />`;
const sizesCode = `<SegmentedControl size="sm" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="md" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="lg" options={["S", "M", "L"]} value={size} onValueChange={setSize} />`;
const enumCode = `// SegmentedControl is generic over the value type, so it binds cleanly to enums or string unions.
enum Model { P0 = "p0", P1 = "p1", Litter = "litter", A3 = "a3" }
const [model, setModel] = useState<Model>(Model.P0);

<SegmentedControl<Model>
  options={Object.values(Model)}
  labels={[t("p0"), t("p1"), "猫砂盆", "A3"]}
  value={model}
  onValueChange={setModel}
/>`;
const objectCode = `// Pair each value with its label in one array — safest for i18n (no index-drift risk).
<SegmentedControl<Model>
  options={[
    { value: Model.P0,     label: t("p0") },
    { value: Model.P1,     label: t("p1"), disabled: true },
    { value: Model.Litter, label: "猫砂盆" },
    { value: Model.A3,     label: "A3" },
  ]}
  value={model}
  onValueChange={setModel}
/>`;
const sourceCode = getComponentSource("segmented-control");
export default function SegmentedControlPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Segmented Control</h1>
        <p className="text-muted-foreground text-lg">iOS-style segmented control for switching between views or filter options. Generic over the value type — binds cleanly to enums and string unions.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <SegmentedControlDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="segmented-control" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <SizesDemo />
        </ComponentPlayground>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-xl font-semibold">Generic value type and i18n</Heading>
        <p className="text-sm text-muted-foreground">
          Bind to an enum or string union by passing the type parameter. Use the parallel <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">labels</code> array when you already have <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Object.values(MyEnum)</code>.
        </p>
        <CodeBlock code={enumCode} />
        <p className="text-sm text-muted-foreground">
          Or pass an array of objects so each value is paired with its label — safer for i18n since the two cannot drift out of order. The object form also accepts <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code> per item.
        </p>
        <CodeBlock code={objectCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "T[] | { value: T; label?: string; disabled?: boolean }[]", description: "Either a list of values, or a list of objects pairing each value with its label." },
          { name: "labels", type: "string[]", description: "Parallel labels array. Only used when options is T[]. Indices must align with options." },
          { name: "value", type: "T", description: "Currently selected value. Inferred from the options type." },
          { name: "onValueChange", type: "(value: T) => void", description: "Fires only when a different segment is tapped." },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground mt-3">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props (testID, onLayout, accessibilityHint, style, etc.).
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Tab-like control with selected state announced to screen readers.</li>
          <li>Each segment has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for selected, unselected, and disabled.</li>
          <li>Long labels are truncated to one line so layout stays stable across locales.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/segmented-control.tsx" />
      </div>
    </div>
  );
}
