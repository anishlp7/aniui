"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewVerifiedBadge({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2", className)}>
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">Anish</span>
        <span className="text-xs text-muted-foreground">@aniui</span>
      </div>
    </div>
  );
}
