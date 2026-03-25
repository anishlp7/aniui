"use client";
import { PreviewAreaChartDefault, PreviewAreaChartStacked, PreviewAreaChartStep, PreviewAreaChartGradient, PreviewAreaChartInteractive, PreviewAreaChartAxes } from "@/components/preview/area-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add area-chart`;

const defaultCode = `import { AreaChart } from "@/components/ui/area-chart";

const data = [
  { label: "Jan", value: 186 },
  { label: "Feb", value: 305 },
  { label: "Mar", value: 237 },
  { label: "Apr", value: 173 },
  { label: "May", value: 409 },
  { label: "Jun", value: 214 },
];

export function MyChart() {
  return <AreaChart data={data} color="#2563eb" />;
}`;

const stackedCode = `import { AreaChart } from "@/components/ui/area-chart";

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

export function StackedAreaChart() {
  return <AreaChart data={series[0].data} series={series} />;
}`;

const stepCode = `import { AreaChart } from "@/components/ui/area-chart";

export function StepAreaChart() {
  return <AreaChart data={data} curved={false} />;
}`;

const gradientCode = `import { AreaChart } from "@/components/ui/area-chart";

export function GradientAreaChart() {
  return <AreaChart data={data} color="#8b5cf6" fillOpacity={0.5} />;
}`;

const interactiveCode = `import { AreaChart } from "@/components/ui/area-chart";
import { ChartTooltip } from "@/components/ui/chart-tooltip";

// The AreaChart component supports press interactions
// Wrap with a tooltip for interactive data display
export function InteractiveAreaChart() {
  return <AreaChart data={data} color="#2563eb" showGrid />;
}`;

const axesCode = `import { AreaChart } from "@/components/ui/area-chart";

export function AreaChartWithAxes() {
  return (
    <AreaChart
      data={data}
      showGrid
      showLabels
      color="#2563eb"
      height={220}
    />
  );
}`;

const sourceCode = `// See full source: components/ui/area-chart.tsx
// Install with: npx @aniui/cli add area-chart
// Dependencies: react-native-svg`;

export default function AreaChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Area Chart</h1>
        <p className="text-muted-foreground text-lg">
          Visualize data trends with filled areas under lines. Built on react-native-svg.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Stacked</h2>
        <p className="text-sm text-muted-foreground mb-4">Multiple overlapping area series.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartStacked />
        </div>
        <CodeBlock code={stackedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Step</h2>
        <p className="text-sm text-muted-foreground mb-4">Stepped area chart with sharp transitions.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartStep />
        </div>
        <CodeBlock code={stepCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Gradient</h2>
        <p className="text-sm text-muted-foreground mb-4">Custom gradient fill with adjustable opacity.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartGradient />
        </div>
        <CodeBlock code={gradientCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Interactive</h2>
        <p className="text-sm text-muted-foreground mb-4">Area chart with tooltip on data point press.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartInteractive />
        </div>
        <CodeBlock code={interactiveCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Axes</h2>
        <p className="text-sm text-muted-foreground mb-4">Area chart with X/Y axis labels and grid lines.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewAreaChartAxes />
        </div>
        <CodeBlock code={axesCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ label: string; value: number }[]", default: "\u2014" },
            { name: "height", type: "number", default: "200" },
            { name: "color", type: "string", default: '"#2563eb"' },
            { name: "fillOpacity", type: "number", default: "0.3" },
            { name: "showGrid", type: "boolean", default: "true" },
            { name: "showLabels", type: "boolean", default: "false" },
            { name: "curved", type: "boolean", default: "true" },
            { name: "series", type: "{ data, color }[]", default: "\u2014" },
            { name: "className", type: "string", default: "\u2014" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/area-chart.tsx" />
      </section>
    </div>
  );
}
