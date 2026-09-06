"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewBarcodeBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2", className)}>
      <div className="flex h-10 gap-0.5">
        {[3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1].map((w, i) => (
          <span key={i} className="bg-foreground" style={{ width: w, height: "100%" }} />
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">Order #4821</p>
        <p className="text-[10px] text-muted-foreground">Scan at pickup</p>
      </div>
    </div>
  );
}
