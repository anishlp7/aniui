"use client";
import { PreviewPieChartDefault, PreviewPieChartDonut, PreviewPieChartLabels, PreviewPieChartHalf, PreviewPieChartInteractive, PreviewPieChartNested } from "@/components/preview/pie-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add pie-chart`;

const defaultCode = `import { PieChart } from "@/components/ui/pie-chart";

const data = [
  { value: 275, color: "#2563eb", label: "Chrome" },
  { value: 200, color: "#f97316", label: "Safari" },
  { value: 187, color: "#8b5cf6", label: "Firefox" },
  { value: 173, color: "#06b6d4", label: "Edge" },
  { value: 90, color: "#6b7280", label: "Other" },
];

export function MyPieChart() {
  return <PieChart data={data} />;
}`;

const donutCode = `import { PieChart } from "@/components/ui/pie-chart";

// Set innerRadius to create a donut chart
export function DonutChart() {
  return <PieChart data={data} innerRadius={0.6} />;
}`;

const labelsCode = `import { PieChart } from "@/components/ui/pie-chart";

export function PieChartWithLabels() {
  return <PieChart data={data} showLabels />;
}`;

const halfCode = `import { PieChart } from "@/components/ui/pie-chart";

// Half pie using startAngle and endAngle
export function HalfPieChart() {
  return (
    <PieChart
      data={data}
      innerRadius={0.6}
      startAngle={180}
      endAngle={360}
    />
  );
}`;

const interactiveCode = `import { PieChart } from "@/components/ui/pie-chart";

export function InteractivePieChart() {
  return <PieChart data={data} innerRadius={0.6} />;
}`;

const nestedCode = `import { PieChart } from "@/components/ui/pie-chart";

// Nested pies can be achieved by layering
// two PieChart components
export function NestedPieChart() {
  return <PieChart data={data} innerRadius={0.5} />;
}`;

export default function PieChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Pie Chart</h1>
        <p className="text-muted-foreground text-lg">
          Show proportional data as segments of a circle. Supports donut, half-pie, and labels.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Donut</h2>
        <p className="text-sm text-muted-foreground mb-4">Pie chart with a hollow center.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartDonut />
        </div>
        <CodeBlock code={donutCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Labels</h2>
        <p className="text-sm text-muted-foreground mb-4">Percentage labels displayed on each segment.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartLabels />
        </div>
        <CodeBlock code={labelsCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Half Pie</h2>
        <p className="text-sm text-muted-foreground mb-4">Semi-circle chart using custom start and end angles.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartHalf />
        </div>
        <CodeBlock code={halfCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Interactive</h2>
        <p className="text-sm text-muted-foreground mb-4">Donut chart with segment padding for visual separation.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartInteractive />
        </div>
        <CodeBlock code={interactiveCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Nested</h2>
        <p className="text-sm text-muted-foreground mb-4">Inner and outer pie rings for hierarchical data.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewPieChartNested />
        </div>
        <CodeBlock code={nestedCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ value: number; color: string; label?: string }[]", default: "—" },
            { name: "height", type: "number", default: "200" },
            { name: "innerRadius", type: "number (0-1)", default: "0" },
            { name: "showLabels", type: "boolean", default: "false" },
            { name: "startAngle", type: "number", default: "0" },
            { name: "endAngle", type: "number", default: "360" },
            { name: "className", type: "string", default: "—" },
          ]}
        />
      </section>
    </div>
  );
}
