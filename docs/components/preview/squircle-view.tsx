"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewSquircleView({ className }: { className?: string }) {
  const [smoothing, setSmoothing] = useState(0.6);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className="flex h-24 w-24 items-center justify-center bg-primary text-xs font-semibold text-primary-foreground transition-[border-radius] duration-200"
        style={{ borderRadius: `${18 + smoothing * 24}%` }}
      >
        Squircle
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={smoothing}
        onChange={(e) => setSmoothing(Number(e.target.value))}
        className="w-32 accent-primary"
        aria-label="Corner smoothing"
      />
    </div>
  );
}
