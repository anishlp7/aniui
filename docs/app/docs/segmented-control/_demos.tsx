"use client";
import { useState } from "react";
import { PreviewSegmentedControl } from "@/components/preview/segmented-control";

export function SegmentedControlDemo() {
  const [view, setView] = useState("List");
  return (
    <div className="w-full max-w-xs space-y-4">
      <PreviewSegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">Showing <span className="font-medium text-foreground">{view}</span> view</p>
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
