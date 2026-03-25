"use client";
import { PreviewBarChartDefault, PreviewBarChartHorizontal, PreviewBarChartStacked, PreviewBarChartGrouped, PreviewBarChartNegative, PreviewBarChartLabels } from "@/components/preview/bar-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add bar-chart`;

const defaultCode = `import { BarChart } from "@/components/ui/bar-chart";

const data = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: 305 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: 173 },
  { label: "May", value: 409 },
  { label: "Jun", value: 214 },
];

export function MyBarChart() {
  return <BarChart data={data} color="#2563eb" />;
}`;

const horizontalCode = `import { BarChart } from "@/components/ui/bar-chart";

export function HorizontalBarChart() {
  return <BarChart data={data} horizontal showLabels />;
}`;

const stackedCode = `import { BarChart } from "@/components/ui/bar-chart";

const grouped = [
  { key: "desktop", color: "#2563eb" },
  { key: "mobile", color: "#f97316" },
];
const groupedData = [
  { label: "Jan", values: [186, 120] },
  { label: "Feb", values: [305, 210] },
];

// Use stacked bars by passing grouped + groupedData
export function StackedBarChart() {
  return <BarChart data={[]} grouped={grouped} groupedData={groupedData} />;
}`;

const groupedCode = `import { BarChart } from "@/components/ui/bar-chart";

// Grouped bars side by side
export function GroupedBarChart() {
  return (
    <BarChart
      data={[]}
      grouped={grouped}
      groupedData={groupedData}
      showLabels
    />
  );
}`;

const negativeCode = `import { BarChart } from "@/components/ui/bar-chart";

const data = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: -80 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: -50 },
];

// Negative values render below the baseline
export function NegativeBarChart() {
  return <BarChart data={data} />;
}`;

const labelsCode = `import { BarChart } from "@/components/ui/bar-chart";

export function BarChartWithLabels() {
  return (
    <BarChart
      data={data}
      showGrid
      showLabels
      height={220}
    />
  );
}`;

export default function BarChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Bar Chart</h1>
        <p className="text-muted-foreground text-lg">
          Compare values across categories with vertical and horizontal bars.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Horizontal</h2>
        <p className="text-sm text-muted-foreground mb-4">Bars rendered horizontally.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartHorizontal />
        </div>
        <CodeBlock code={horizontalCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Stacked</h2>
        <p className="text-sm text-muted-foreground mb-4">Multiple series stacked on top of each other.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartStacked />
        </div>
        <CodeBlock code={stackedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Grouped</h2>
        <p className="text-sm text-muted-foreground mb-4">Multiple series displayed side by side.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartGrouped />
        </div>
        <CodeBlock code={groupedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Negative Values</h2>
        <p className="text-sm text-muted-foreground mb-4">Bars that extend below the baseline for negative values.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartNegative />
        </div>
        <CodeBlock code={negativeCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Labels</h2>
        <p className="text-sm text-muted-foreground mb-4">Bar chart with axis labels, grid lines, and tooltip.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewBarChartLabels />
        </div>
        <CodeBlock code={labelsCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ label: string; value: number; color?: string }[]", default: "\u2014" },
            { name: "height", type: "number", default: "200" },
            { name: "color", type: "string", default: '"#2563eb"' },
            { name: "horizontal", type: "boolean", default: "false" },
            { name: "showGrid", type: "boolean", default: "true" },
            { name: "showLabels", type: "boolean", default: "false" },
            { name: "barRadius", type: "number", default: "4" },
            { name: "grouped", type: "{ key, color }[]", default: "\u2014" },
            { name: "groupedData", type: "{ label, values[] }[]", default: "\u2014" },
            { name: "className", type: "string", default: "\u2014" },
          ]}
        />
      </section>
    </div>
  );
}
