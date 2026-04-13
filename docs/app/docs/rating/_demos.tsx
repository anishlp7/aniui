"use client";
import { useState } from "react";
import { PreviewRating } from "@/components/preview/rating";

export function InteractiveDemo() {
  const [value, setValue] = useState(3);
  return (
    <div className="flex items-center gap-4">
      <PreviewRating value={value} onChange={setValue} />
      <span className="text-sm text-muted-foreground">{value} / 5</span>
    </div>
  );
}
