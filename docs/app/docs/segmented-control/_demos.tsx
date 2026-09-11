"use client";
import { useState } from "react";
import { PreviewSegmentedControl } from "@/components/preview/segmented-control";

const revenueByRange: Record<string, string> = { Day: "$482", Week: "$3,140", Month: "$12,860" };

export function SegmentedControlDemo() {
  const [range, setRange] = useState("Week");
  return (
    <div className="w-full max-w-xs space-y-4">
      <PreviewSegmentedControl options={["Day", "Week", "Month"]} value={range} onValueChange={setRange} />
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-6 text-center">
        <p className="text-2xl font-semibold text-foreground">{revenueByRange[range]}</p>
        <p className="text-xs text-muted-foreground mt-1">Total revenue this {range.toLowerCase()}</p>
      </div>
    </div>
  );
}

export function SizesDemo() {
  const [sm, setSm] = useState("Day");
  const [md, setMd] = useState("Week");
  const [lg, setLg] = useState("Month");
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Small</p>
        <PreviewSegmentedControl size="sm" options={["Day", "Week", "Month"]} value={sm} onValueChange={setSm} />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Medium (default)</p>
        <PreviewSegmentedControl size="md" options={["Day", "Week", "Month"]} value={md} onValueChange={setMd} />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Large</p>
        <PreviewSegmentedControl size="lg" options={["Day", "Week", "Month"]} value={lg} onValueChange={setLg} />
      </div>
    </div>
  );
}
