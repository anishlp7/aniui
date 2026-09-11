import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SelectDemo } from "./_demos";

const usageCode = `import { Select } from "@/components/ui/select";
import { useState } from "react";

export function MyScreen() {
  const [sort, setSort] = useState("popular");
  return (
    <Select
      label="Sort Results"
      placeholder="Sort by..."
      options={[
        { label: "Most Popular", value: "popular" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Newest", value: "newest" },
      ]}
      value={sort}
      onValueChange={setSort}
    />
  );
}`;
const sourceCode = getComponentSource("select");
export default function SelectPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Select</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Dropdown select with optional search filtering.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <SelectDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="select" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "SelectOption[]", default: "required" },
          { name: "value", type: "string" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "placeholder", type: "string", default: "\"Select...\"" },
          { name: "label", type: "string" },
          { name: "searchable", type: "boolean", default: "false" },
          { name: "searchPlaceholder", type: "string", default: "\"Search...\"" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">SelectOption</Heading>
        <PropsTable props={[
          { name: "label", type: "string" },
          { name: "value", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses Modal with anchored dropdown positioning. Supports searchable prop for filtering options.</li>
          <li>Selected state announced to screen readers</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/select.tsx" />
      </div>
    </div>
  );
}
