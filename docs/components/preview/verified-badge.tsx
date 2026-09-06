"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewVerifiedBadge({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1", className)}>
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>
      <span className="text-xs font-semibold text-foreground">Verified</span>
    </div>
  );
}
