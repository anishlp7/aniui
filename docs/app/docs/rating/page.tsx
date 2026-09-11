import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewRating } from "@/components/preview/rating";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { InteractiveDemo } from "./_demos";

const installCode = `npx @aniui/cli add rating`;
const usageCode = `import { Rating } from "@/components/ui/rating";

const [value, setValue] = useState(3);
<Rating value={value} onChange={setValue} />`;
const sizesCode = `<Rating size="sm" value={3} readOnly />
<Rating size="md" value={3} readOnly />
<Rating size="lg" value={3} readOnly />`;
const readOnlyCode = `<Rating value={4} readOnly />
<Rating value={2} max={10} readOnly />`;
const sourceCode = getComponentSource("rating");
export default function RatingPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Rating</h1>
        <p className="text-muted-foreground text-lg">Star rating component with interactive and read-only modes. Supports custom max value and sizes.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <InteractiveDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="rating" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3">
            <PreviewRating size="sm" value={3} readOnly />
            <PreviewRating size="md" value={3} readOnly />
            <PreviewRating size="lg" value={3} readOnly />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Read-Only</Heading>
        <p className="text-sm text-muted-foreground mb-4">Use <code>readOnly</code> to display a non-interactive rating. Use <code>max</code> to customize the number of stars.</p>
        <ComponentPlayground code={readOnlyCode}>
          <div className="space-y-3">
            <PreviewRating value={4} readOnly />
            <PreviewRating value={2} max={10} readOnly />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "number" },
          { name: "max", type: "number", default: "5" },
          { name: "onChange", type: "(value: number) => void" },
          { name: "readOnly", type: "boolean", default: "false" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with star labels.</li>
          <li>Each star is individually labeled for screen readers (e.g., "1 of 5 stars").</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/rating.tsx" />
      </div>
    </div>
  );
}
