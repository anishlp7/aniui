"use client";
import { PreviewChartTooltipDefault, PreviewChartTooltipCustom, PreviewChartTooltipIndicator, PreviewChartTooltipAnimated, PreviewChartTooltipStyled, PreviewChartTooltipFormatter } from "@/components/preview/chart-tooltip";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add chart-tooltip`;

const defaultCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

export function DefaultTooltip() {
  return (
    <ChartTooltip
      label="January"
      value={186}
      color="#2563eb"
    />
  );
}`;

const customCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

export function CustomTooltip() {
  return (
    <ChartTooltip
      label="January 2024"
      items={[
        { label: "Desktop", value: 186, color: "#2563eb" },
        { label: "Mobile", value: 120, color: "#f97316" },
      ]}
    />
  );
}`;

const indicatorCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

// Use indicator="line" for a vertical bar indicator
export function IndicatorTooltip() {
  return (
    <ChartTooltip
      label="Revenue"
      indicator="line"
      items={[
        { label: "Current", value: "$1,234", color: "#2563eb" },
        { label: "Previous", value: "$987", color: "#f97316" },
      ]}
    />
  );
}`;

const animatedCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

// Animate with Reanimated entering/exiting
// transitions when showing/hiding
export function AnimatedTooltip() {
  return <ChartTooltip label="March" value={237} color="#8b5cf6" />;
}`;

const styledCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

// Override styles with className prop
export function StyledTooltip() {
  return (
    <ChartTooltip
      className="bg-primary border-primary"
      label="Revenue"
      value="$4,890"
      color="#fff"
    />
  );
}`;

const formatterCode = `import { ChartTooltip } from "@/components/ui/chart-tooltip";

// Use indicator="dashed" for a muted indicator style
export function FormatterTooltip() {
  return (
    <ChartTooltip
      label="Sales Report"
      indicator="dashed"
      items={[
        { label: "Units", value: "1,234 pcs", color: "#2563eb" },
        { label: "Revenue", value: "$12.3K", color: "#f97316" },
      ]}
    />
  );
}`;

export default function ChartTooltipPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Tooltip</h1>
        <p className="text-muted-foreground text-lg">
          Contextual data overlays for chart interactions. Works with all chart types.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Default</h2>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipDefault />
        </div>
        <CodeBlock code={defaultCode} title="app/tooltip-demo.tsx" />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-2">Installation</h2>
        <CodeBlock code={installCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Custom Content</h2>
        <p className="text-sm text-muted-foreground mb-4">Multi-item tooltip with color indicators.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipCustom />
        </div>
        <CodeBlock code={customCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Indicator Line</h2>
        <p className="text-sm text-muted-foreground mb-4">Vertical line indicator instead of dots.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipIndicator />
        </div>
        <CodeBlock code={indicatorCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Animated</h2>
        <p className="text-sm text-muted-foreground mb-4">Smooth fade and slide entrance animation.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipAnimated />
        </div>
        <CodeBlock code={animatedCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Styled</h2>
        <p className="text-sm text-muted-foreground mb-4">Fully custom styled tooltip with primary background.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipStyled />
        </div>
        <CodeBlock code={styledCode} />
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">With Formatter</h2>
        <p className="text-sm text-muted-foreground mb-4">Custom value formatting and dashed indicators.</p>
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <PreviewChartTooltipFormatter />
        </div>
        <CodeBlock code={formatterCode} />
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight mb-4">Props</h2>
        <PropsTable
          props={[
            { name: "label", type: "string", default: "—" },
            { name: "value", type: "string | number", default: "—" },
            { name: "color", type: "string", default: '"#000"' },
            { name: "indicator", type: '"dot" | "line" | "dashed"', default: '"dot"' },
            { name: "items", type: "{ label, value, color }[]", default: "—" },
            { name: "className", type: "string", default: "—" },
          ]}
        />
      </section>
    </div>
  );
}
