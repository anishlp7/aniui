"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewBarcodeBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 rounded-md border border-border bg-card p-3", className)}>
      <div className="flex h-8 items-stretch gap-px">
        {[3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1].map((w, i) => (
          <span key={i} className="bg-foreground" style={{ width: w, height: "100%" }} />
        ))}
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-foreground">ANIUI-2026</p>
    </div>
  );
}
