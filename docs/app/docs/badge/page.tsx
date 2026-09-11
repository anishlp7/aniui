import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewBadge } from "@/components/preview/badge";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add badge`;
const usageCode = `import { Badge } from "@/components/ui/badge";

export function MyScreen() {
  return (
    <Badge>New</Badge>
  );
}`;
const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`;
const sourceCode = getComponentSource("badge");
export default function BadgePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Badge</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Small status indicator with multiple variants.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewBadge>New</PreviewBadge>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="badge" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewBadge variant="default">Default</PreviewBadge>
            <PreviewBadge variant="secondary">Secondary</PreviewBadge>
            <PreviewBadge variant="outline">Outline</PreviewBadge>
            <PreviewBadge variant="destructive">Destructive</PreviewBadge>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"destructive\"", default: "\"default\"" },
          { name: "className", type: "string" },
          { name: "textClassName", type: "string" },
          { name: "children", type: "string", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Visual indicator -- use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for screen readers when the badge conveys meaning.</li>
          <li>Color alone does not convey status; pair with text content.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/badge.tsx" />
      </div>
    </div>
  );
}