"use client";
import { PreviewLineChartDefault, PreviewLineChartMultiSeries, PreviewLineChartCurved, PreviewLineChartDotted, PreviewLineChartInteractive, PreviewLineChartLegend } from "@/components/preview/line-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add line-chart`;

const defaultCode = `import { LineChart } from "@/components/ui/line-chart";

const data = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: 305 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: 173 },
  { label: "May", value: 409 },
  { label: "Jun", value: 214 },
];

export function MyLineChart() {
  return <LineChart data={data} />;
}`;

const multiCode = `import { LineChart } from "@/components/ui/line-chart";

const series = [
  {
    data: [
      { label: "Jan", value: 186 },
      { label: "Feb", value: 305 },
      { label: "Mar", value: 237 },
    ],
    color: "#2563eb",
  },
  {
    data: [
      { label: "Jan", value: 120 },
      { label: "Feb", value: 210 },
      { label: "Mar", value: 180 },
    ],
    color: "#f97316",
  },
];

export function MultiSeriesLineChart() {
  return <LineChart series={series} />;
}`;

const curvedCode = `import { LineChart } from "@/components/ui/line-chart";

// Smooth curves are the default. Set curved={false} for straight lines.
export function CurvedLineChart() {
  return <LineChart data={data} curved showDots />;
}`;

const dottedCode = `import { LineChart } from "@/components/ui/line-chart";

const series = [
  { data, color: "#2563eb" },
  { data: data2, color: "#f97316", dashed: true },
];

// Use dashed lines to distinguish series
export function DottedLineChart() {
  return <LineChart series={series} showDots={false} />;
}`;

const interactiveCode = `import { LineChart } from "@/components/ui/line-chart";

export function InteractiveLineChart() {
  return <LineChart data={data} showDots showGrid />;
}`;

const legendCode = `import { LineChart } from "@/components/ui/line-chart";

export function LineChartWithLegend() {
  return (
    <LineChart
      series={series}
      showLabels
      showGrid
      height={220}
    />
  );
}`;

export default function LineChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Line Chart</h1>
        <p className="text-muted-foreground text-lg">
          Track changes over time with connected data points and smooth curves.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Multi-Series</h2>
        <p className="text-sm text-muted-foreground mb-4">Multiple lines on the same chart.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartMultiSeries />
        </div>
        <CodeBlock code={multiCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Curved</h2>
        <p className="text-sm text-muted-foreground mb-4">Smooth natural curves with visible data points.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartCurved />
        </div>
        <CodeBlock code={curvedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Dashed</h2>
        <p className="text-sm text-muted-foreground mb-4">Dashed lines to distinguish different series.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartDotted />
        </div>
        <CodeBlock code={dottedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Interactive</h2>
        <p className="text-sm text-muted-foreground mb-4">Line chart with tooltip on hover.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartInteractive />
        </div>
        <CodeBlock code={interactiveCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Legend</h2>
        <p className="text-sm text-muted-foreground mb-4">Multi-series chart with axis labels and legend.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewLineChartLegend />
        </div>
        <CodeBlock code={legendCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ label: string; value: number }[]", default: "\u2014" },
            { name: "height", type: "number", default: "200" },
            { name: "color", type: "string", default: '"#2563eb"' },
            { name: "showDots", type: "boolean", default: "true" },
            { name: "showGrid", type: "boolean", default: "true" },
            { name: "showLabels", type: "boolean", default: "false" },
            { name: "curved", type: "boolean", default: "true" },
            { name: "series", type: "{ data, color, dashed? }[]", default: "\u2014" },
            { name: "className", type: "string", default: "\u2014" },
          ]}
        />
      </section>
    </div>
  );
}
