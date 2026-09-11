import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { InteractiveDemo, SizesDemo, StepDemo } from "./_demos";

const installCode = `npx @aniui/cli add stepper`;
const usageCode = `import { Stepper } from "@/components/ui/stepper";

const [count, setCount] = useState(1);
<Stepper value={count} onChange={setCount} min={0} max={10} />`;
const sizesCode = `<Stepper size="sm" value={1} onChange={setCount} />
<Stepper size="md" value={1} onChange={setCount} />
<Stepper size="lg" value={1} onChange={setCount} />`;
const customStepCode = `<Stepper value={0} onChange={setCount} min={0} max={100} step={5} />`;
const sourceCode = getComponentSource("stepper");
export default function StepperPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Stepper</h1>
        <p className="text-muted-foreground text-lg">Numeric increment/decrement control with min, max, and step support. Ideal for quantity selectors.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div style={{ maxWidth: 180 }}>
            <InteractiveDemo />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="stepper" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <SizesDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Custom Step</Heading>
        <p className="text-sm text-muted-foreground mb-4">Use the <code>step</code> prop to control the increment/decrement amount.</p>
        <ComponentPlayground code={customStepCode}>
          <div style={{ maxWidth: 180 }}>
            <StepDemo />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "number" },
          { name: "onChange", type: "(value: number) => void" },
          { name: "min", type: "number", default: "0" },
          { name: "max", type: "number", default: "99" },
          { name: "step", type: "number", default: "1" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with increment/decrement buttons.</li>
          <li>Current value is announced to screen readers via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityValue</code>.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/stepper.tsx" />
      </div>
    </div>
  );
}
