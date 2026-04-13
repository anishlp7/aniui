"use client";
import { useState } from "react";
import { PreviewToggleGroup, PreviewToggleGroupItem } from "@/components/preview/toggle-group";

export function ToggleGroupDemo() {
  const [value, setValue] = useState("center");
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PreviewToggleGroup value={value} onValueChange={setValue}>
        <PreviewToggleGroupItem value="left">Left</PreviewToggleGroupItem>
        <PreviewToggleGroupItem value="center">Center</PreviewToggleGroupItem>
        <PreviewToggleGroupItem value="right">Right</PreviewToggleGroupItem>
      </PreviewToggleGroup>
    </div>
  );
}
