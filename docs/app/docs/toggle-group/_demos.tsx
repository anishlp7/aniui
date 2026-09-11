"use client";
import { useState } from "react";
import { PreviewToggleGroup, PreviewToggleGroupItem } from "@/components/preview/toggle-group";

export function ToggleGroupDemo() {
  const [value, setValue] = useState("grid");
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PreviewToggleGroup value={value} onValueChange={setValue}>
        <PreviewToggleGroupItem value="list">List</PreviewToggleGroupItem>
        <PreviewToggleGroupItem value="grid">Grid</PreviewToggleGroupItem>
      </PreviewToggleGroup>
    </div>
  );
}
