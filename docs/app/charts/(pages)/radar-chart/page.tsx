"use client";
import { PreviewRadarChartDefault, PreviewRadarChartMultiple, PreviewRadarChartFilled, PreviewRadarChartDots, PreviewRadarChartGrid, PreviewRadarChartLegend } from "@/components/preview/radar-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add radar-chart`;

const defaultCode = `import { RadarChart } from "@/components/ui/radar-chart";

const data = [
  { label: "Math", value: 120 },
  { label: "Chinese", value: 98 },
  { label: "English", value: 86 },
  { label: "Geography", value: 99 },
  { label: "Physics", value: 85 },
  { label: "History", value: 65 },
];

export function MyRadarChart() {
  return <RadarChart data={data} />;
}`;

const multipleCode = `import { RadarChart } from "@/components/ui/radar-chart";

const series = [
  { data, color: "#2563eb" },
  { data: data2, color: "#f97316" },
];

export function MultiRadarChart() {
  return <RadarChart series={series} />;
}`;

const filledCode = `import { RadarChart } from "@/components/ui/radar-chart";

export function FilledRadarChart() {
  return <RadarChart data={data} fillOpacity={0.5} />;
}`;

const dotsCode = `import { RadarChart } from "@/components/ui/radar-chart";

export function RadarChartWithDots() {
  return <RadarChart data={data} showDots />;
}`;

const gridCode = `import { RadarChart } from "@/components/ui/radar-chart";

export function RadarChartCircleGrid() {
  return <RadarChart data={data} gridLevels={5} />;
}`;

const legendCode = `import { RadarChart } from "@/components/ui/radar-chart";

export function RadarChartWithLegend() {
  return (
    <RadarChart
      series={series}
      showLabels
      showDots
      height={240}
    />
  );
}`;

export default function RadarChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Radar Chart</h1>
        <p className="text-muted-foreground text-lg">
          Compare multivariate data across axes on a radial polygon grid.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Multiple Series</h2>
        <p className="text-sm text-muted-foreground mb-4">Overlay multiple data series for comparison.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartMultiple />
        </div>
        <CodeBlock code={multipleCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Filled</h2>
        <p className="text-sm text-muted-foreground mb-4">Higher fill opacity for a solid appearance.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartFilled />
        </div>
        <CodeBlock code={filledCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Dots</h2>
        <p className="text-sm text-muted-foreground mb-4">Data points visible at each axis vertex.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartDots />
        </div>
        <CodeBlock code={dotsCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Custom Grid</h2>
        <p className="text-sm text-muted-foreground mb-4">Configurable number of concentric grid levels.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartGrid />
        </div>
        <CodeBlock code={gridCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Legend</h2>
        <p className="text-sm text-muted-foreground mb-4">Multi-series radar chart with axis labels and dots.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadarChartLegend />
        </div>
        <CodeBlock code={legendCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ label: string; value: number }[]", default: "—" },
            { name: "height", type: "number", default: "200" },
            { name: "color", type: "string", default: '"#2563eb"' },
            { name: "fillOpacity", type: "number", default: "0.2" },
            { name: "showGrid", type: "boolean", default: "true" },
            { name: "showDots", type: "boolean", default: "false" },
            { name: "showLabels", type: "boolean", default: "true" },
            { name: "gridLevels", type: "number", default: "4" },
            { name: "series", type: "{ data, color, fillOpacity? }[]", default: "—" },
            { name: "className", type: "string", default: "—" },
          ]}
        />
      </section>
    </div>
  );
}
