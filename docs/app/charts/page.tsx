"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { PreviewAreaChartDefault, PreviewAreaChartStacked, PreviewAreaChartStep, PreviewAreaChartGradient, PreviewAreaChartInteractive, PreviewAreaChartAxes } from "@/components/preview/area-chart";
import { PreviewBarChartDefault, PreviewBarChartHorizontal, PreviewBarChartStacked, PreviewBarChartGrouped, PreviewBarChartNegative, PreviewBarChartLabels } from "@/components/preview/bar-chart";
import { PreviewLineChartDefault, PreviewLineChartMultiSeries, PreviewLineChartCurved, PreviewLineChartDotted, PreviewLineChartInteractive, PreviewLineChartLegend } from "@/components/preview/line-chart";
import { PreviewPieChartDefault, PreviewPieChartDonut, PreviewPieChartLabels, PreviewPieChartHalf, PreviewPieChartInteractive, PreviewPieChartNested } from "@/components/preview/pie-chart";
import { PreviewRadarChartDefault, PreviewRadarChartMultiple, PreviewRadarChartFilled, PreviewRadarChartDots, PreviewRadarChartGrid, PreviewRadarChartLegend } from "@/components/preview/radar-chart";
import { PreviewRadialChartDefault, PreviewRadialChartMultiple, PreviewRadialChartText, PreviewRadialChartStacked, PreviewRadialChartHalf, PreviewRadialChartLabel } from "@/components/preview/radial-chart";
import { PreviewChartTooltipDefault, PreviewChartTooltipCustom, PreviewChartTooltipIndicator, PreviewChartTooltipAnimated, PreviewChartTooltipStyled, PreviewChartTooltipFormatter } from "@/components/preview/chart-tooltip";

/* ── Icons ──────────────────────────────────────────────────── */

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────────── */

type ChartExample = {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
};

type TabData = {
  id: string;
  label: string;
  href: string;
  examples: ChartExample[];
};

const tabs: TabData[] = [
  {
    id: "area",
    label: "Area Charts",
    href: "/charts/area-chart",
    examples: [
      {
        title: "Area Chart - Interactive",
        description: "Showing total visitors for the last 3 months",
        component: <PreviewAreaChartInteractive />,
        code: `npx @aniui/cli add area-chart`,
      },
      {
        title: "Area Chart - Default",
        description: "A simple area chart with gradient fill",
        component: <PreviewAreaChartDefault />,
        code: `npx @aniui/cli add area-chart`,
      },
      {
        title: "Area Chart - Stacked",
        description: "Multiple overlapping area series",
        component: <PreviewAreaChartStacked />,
        code: `npx @aniui/cli add area-chart`,
      },
      {
        title: "Area Chart - Step",
        description: "Stepped area chart with sharp transitions",
        component: <PreviewAreaChartStep />,
        code: `npx @aniui/cli add area-chart`,
      },
      {
        title: "Area Chart - Gradient",
        description: "Custom gradient fill with adjustable opacity",
        component: <PreviewAreaChartGradient />,
        code: `npx @aniui/cli add area-chart`,
      },
      {
        title: "Area Chart - Axes & Labels",
        description: "With X/Y axis labels and grid lines",
        component: <PreviewAreaChartAxes />,
        code: `npx @aniui/cli add area-chart`,
      },
    ],
  },
  {
    id: "bar",
    label: "Bar Charts",
    href: "/charts/bar-chart",
    examples: [
      {
        title: "Bar Chart - Default",
        description: "Vertical bar chart with rounded corners",
        component: <PreviewBarChartDefault />,
        code: `npx @aniui/cli add bar-chart`,
      },
      {
        title: "Bar Chart - Horizontal",
        description: "Bars rendered horizontally with labels",
        component: <PreviewBarChartHorizontal />,
        code: `npx @aniui/cli add bar-chart`,
      },
      {
        title: "Bar Chart - Stacked",
        description: "Multiple series stacked on top of each other",
        component: <PreviewBarChartStacked />,
        code: `npx @aniui/cli add bar-chart`,
      },
      {
        title: "Bar Chart - Grouped",
        description: "Multiple series displayed side by side",
        component: <PreviewBarChartGrouped />,
        code: `npx @aniui/cli add bar-chart`,
      },
      {
        title: "Bar Chart - Negative Values",
        description: "Bars that extend below the baseline",
        component: <PreviewBarChartNegative />,
        code: `npx @aniui/cli add bar-chart`,
      },
      {
        title: "Bar Chart - With Labels",
        description: "Axis labels, grid lines, and tooltip",
        component: <PreviewBarChartLabels />,
        code: `npx @aniui/cli add bar-chart`,
      },
    ],
  },
  {
    id: "line",
    label: "Line Charts",
    href: "/charts/line-chart",
    examples: [
      {
        title: "Line Chart - Default",
        description: "Simple line chart with data points",
        component: <PreviewLineChartDefault />,
        code: `npx @aniui/cli add line-chart`,
      },
      {
        title: "Line Chart - Multi-Series",
        description: "Multiple lines on the same chart",
        component: <PreviewLineChartMultiSeries />,
        code: `npx @aniui/cli add line-chart`,
      },
      {
        title: "Line Chart - Curved",
        description: "Smooth natural curves with visible data points",
        component: <PreviewLineChartCurved />,
        code: `npx @aniui/cli add line-chart`,
      },
      {
        title: "Line Chart - Dashed",
        description: "Dashed lines to distinguish different series",
        component: <PreviewLineChartDotted />,
        code: `npx @aniui/cli add line-chart`,
      },
      {
        title: "Line Chart - Interactive",
        description: "With tooltip on hover",
        component: <PreviewLineChartInteractive />,
        code: `npx @aniui/cli add line-chart`,
      },
      {
        title: "Line Chart - With Legend",
        description: "Multi-series chart with axis labels and legend",
        component: <PreviewLineChartLegend />,
        code: `npx @aniui/cli add line-chart`,
      },
    ],
  },
  {
    id: "pie",
    label: "Pie Charts",
    href: "/charts/pie-chart",
    examples: [
      {
        title: "Pie Chart - Default",
        description: "Standard pie chart with color segments",
        component: <PreviewPieChartDefault />,
        code: `npx @aniui/cli add pie-chart`,
      },
      {
        title: "Pie Chart - Donut",
        description: "Pie chart with a hollow center",
        component: <PreviewPieChartDonut />,
        code: `npx @aniui/cli add pie-chart`,
      },
      {
        title: "Pie Chart - With Labels",
        description: "Percentage labels on each segment",
        component: <PreviewPieChartLabels />,
        code: `npx @aniui/cli add pie-chart`,
      },
      {
        title: "Pie Chart - Half",
        description: "Semi-circle chart with custom angle range",
        component: <PreviewPieChartHalf />,
        code: `npx @aniui/cli add pie-chart`,
      },
      {
        title: "Pie Chart - Interactive",
        description: "With segment padding and tooltip",
        component: <PreviewPieChartInteractive />,
        code: `npx @aniui/cli add pie-chart`,
      },
      {
        title: "Pie Chart - Nested",
        description: "Inner and outer rings for hierarchical data",
        component: <PreviewPieChartNested />,
        code: `npx @aniui/cli add pie-chart`,
      },
    ],
  },
  {
    id: "radar",
    label: "Radar Charts",
    href: "/charts/radar-chart",
    examples: [
      {
        title: "Radar Chart - Default",
        description: "Standard radar/spider chart",
        component: <PreviewRadarChartDefault />,
        code: `npx @aniui/cli add radar-chart`,
      },
      {
        title: "Radar Chart - Multiple Series",
        description: "Overlay multiple data series for comparison",
        component: <PreviewRadarChartMultiple />,
        code: `npx @aniui/cli add radar-chart`,
      },
      {
        title: "Radar Chart - Filled",
        description: "Higher fill opacity for a solid appearance",
        component: <PreviewRadarChartFilled />,
        code: `npx @aniui/cli add radar-chart`,
      },
      {
        title: "Radar Chart - With Dots",
        description: "Data points visible at each axis vertex",
        component: <PreviewRadarChartDots />,
        code: `npx @aniui/cli add radar-chart`,
      },
      {
        title: "Radar Chart - Circle Grid",
        description: "Circular grid lines with radius axis",
        component: <PreviewRadarChartGrid />,
        code: `npx @aniui/cli add radar-chart`,
      },
      {
        title: "Radar Chart - With Legend",
        description: "Multi-series with legend and labels",
        component: <PreviewRadarChartLegend />,
        code: `npx @aniui/cli add radar-chart`,
      },
    ],
  },
  {
    id: "radial",
    label: "Radial Charts",
    href: "/charts/radial-chart",
    examples: [
      {
        title: "Radial Chart - Default",
        description: "Single circular progress arc",
        component: <PreviewRadialChartDefault />,
        code: `npx @aniui/cli add radial-chart`,
      },
      {
        title: "Radial Chart - Multiple",
        description: "Concentric tracks for multiple metrics",
        component: <PreviewRadialChartMultiple />,
        code: `npx @aniui/cli add radial-chart`,
      },
      {
        title: "Radial Chart - With Text",
        description: "Center text displaying the primary metric",
        component: <PreviewRadialChartText />,
        code: `npx @aniui/cli add radial-chart`,
      },
      {
        title: "Radial Chart - Stacked",
        description: "Multiple labeled tracks with legend",
        component: <PreviewRadialChartStacked />,
        code: `npx @aniui/cli add radial-chart`,
      },
      {
        title: "Radial Chart - Half Circle",
        description: "Semi-circular gauge",
        component: <PreviewRadialChartHalf />,
        code: `npx @aniui/cli add radial-chart`,
      },
      {
        title: "Radial Chart - With Labels",
        description: "Value labels on each radial track",
        component: <PreviewRadialChartLabel />,
        code: `npx @aniui/cli add radial-chart`,
      },
    ],
  },
  {
    id: "tooltip",
    label: "Tooltips",
    href: "/charts/tooltip",
    examples: [
      {
        title: "Tooltip - Default",
        description: "Simple single-value tooltip with dot indicator",
        component: <PreviewChartTooltipDefault />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
      {
        title: "Tooltip - Custom Content",
        description: "Multi-item tooltip with color indicators",
        component: <PreviewChartTooltipCustom />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
      {
        title: "Tooltip - Indicator Line",
        description: "Vertical line indicator instead of dots",
        component: <PreviewChartTooltipIndicator />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
      {
        title: "Tooltip - Animated",
        description: "Smooth fade and slide entrance animation",
        component: <PreviewChartTooltipAnimated />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
      {
        title: "Tooltip - Styled",
        description: "Fully custom styled with primary background",
        component: <PreviewChartTooltipStyled />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
      {
        title: "Tooltip - With Formatter",
        description: "Custom value formatting and dashed indicators",
        component: <PreviewChartTooltipFormatter />,
        code: `npx @aniui/cli add chart-tooltip`,
      },
    ],
  },
];

/* ── Copy button ──────────────────────────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ── Main page ────────────────────────────────────────────── */

export default function ChartsPage() {
  const [activeTab, setActiveTab] = useState("area");
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-16">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="text-center pt-12 pb-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Beautiful Charts & Graphs
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          A collection of ready-to-use chart components built with react-native-svg.
          <br />
          From basic charts to rich data displays, copy and paste into your apps.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => {
              document.getElementById("charts-tabs")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse Charts
          </button>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Documentation
          </Link>
        </div>
      </section>

      {/* ── Tabs ────────────────────────────────────────── */}
      <div id="charts-tabs">
        <div className="flex items-center gap-1 border-b border-border overflow-x-auto scrollbar-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Chart examples grid ──────────────────────── */}
        <div className="grid gap-6 mt-8 sm:grid-cols-2 xl:grid-cols-3">
          {currentTab.examples.map((example, i) => (
            <div
              key={`${currentTab.id}-${i}`}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ChartIcon />
                  <span className="text-xs font-medium">
                    {currentTab.label.replace("s", "").replace(" Chart", " Chart")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CopyButton text={example.code} />
                  <Link
                    href={currentTab.href}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <CodeIcon />
                    View Code
                  </Link>
                </div>
              </div>

              {/* Card body */}
              <div className="px-4 pb-2">
                <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{example.description}</p>
              </div>

              {/* Chart preview */}
              <div className="px-4 pb-4 pt-2 pointer-events-none">
                {example.component}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
