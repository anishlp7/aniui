"use client";
import { PreviewRadialChartDefault, PreviewRadialChartMultiple, PreviewRadialChartText, PreviewRadialChartStacked, PreviewRadialChartHalf, PreviewRadialChartLabel } from "@/components/preview/radial-chart";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add radial-chart`;

const defaultCode = `import { RadialChart } from "@/components/ui/radial-chart";

const data = [
  { value: 72, maxValue: 100, color: "#2563eb" },
];

export function MyRadialChart() {
  return <RadialChart data={data} />;
}`;

const multipleCode = `import { RadialChart } from "@/components/ui/radial-chart";

const data = [
  { value: 72, color: "#2563eb" },
  { value: 55, color: "#f97316" },
  { value: 88, color: "#8b5cf6" },
];

export function MultipleRadialChart() {
  return <RadialChart data={data} />;
}`;

const textCode = `import { RadialChart } from "@/components/ui/radial-chart";

export function RadialChartWithText() {
  return (
    <RadialChart
      data={[{ value: 72, color: "#2563eb" }]}
      centerText="72%"
      centerSubText="Progress"
    />
  );
}`;

const stackedCode = `import { RadialChart } from "@/components/ui/radial-chart";

const data = [
  { value: 60, color: "#2563eb", label: "Tasks" },
  { value: 40, color: "#f97316", label: "Bugs" },
  { value: 80, color: "#06b6d4", label: "Features" },
];

export function StackedRadialChart() {
  return <RadialChart data={data} showLabels />;
}`;

const halfCode = `import { RadialChart } from "@/components/ui/radial-chart";

// Half circle using startAngle/endAngle
export function HalfRadialChart() {
  return (
    <RadialChart
      data={[{ value: 72, color: "#2563eb" }]}
      startAngle={180}
      endAngle={360}
    />
  );
}`;

const labelCode = `import { RadialChart } from "@/components/ui/radial-chart";

export function RadialChartWithLabels() {
  return (
    <RadialChart
      data={data}
      showLabels
      strokeWidth={14}
    />
  );
}`;

export default function RadialChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Radial Chart</h1>
        <p className="text-muted-foreground text-lg">
          Display progress and metrics with circular arc tracks.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/chart-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Multiple</h2>
        <p className="text-sm text-muted-foreground mb-4">Concentric radial tracks for multiple metrics.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartMultiple />
        </div>
        <CodeBlock code={multipleCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Text</h2>
        <p className="text-sm text-muted-foreground mb-4">Center text displaying the primary metric.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartText />
        </div>
        <CodeBlock code={textCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Stacked</h2>
        <p className="text-sm text-muted-foreground mb-4">Multiple labeled tracks stacked vertically.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartStacked />
        </div>
        <CodeBlock code={stackedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Half Circle</h2>
        <p className="text-sm text-muted-foreground mb-4">Semi-circular gauge using custom angle range.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartHalf />
        </div>
        <CodeBlock code={halfCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Labels</h2>
        <p className="text-sm text-muted-foreground mb-4">Value labels next to each radial track.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewRadialChartLabel />
        </div>
        <CodeBlock code={labelCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "data", type: "{ value: number; maxValue?: number; color: string; label?: string }[]", default: "—" },
            { name: "height", type: "number", default: "200" },
            { name: "strokeWidth", type: "number", default: "12" },
            { name: "showLabels", type: "boolean", default: "false" },
            { name: "startAngle", type: "number", default: "0" },
            { name: "endAngle", type: "number", default: "360" },
            { name: "centerText", type: "string", default: "—" },
            { name: "centerSubText", type: "string", default: "—" },
            { name: "className", type: "string", default: "—" },
          ]}
        />
      </section>
    </div>
  );
}
