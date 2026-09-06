"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewBorderBeam({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[240px] rounded-xl p-[2px] overflow-hidden", className)}>
      <div className="absolute inset-0 rounded-xl animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#71717a_90deg,#fafafa_180deg,#71717a_270deg,transparent_360deg)] opacity-80" />
      <div className="relative rounded-[10px] bg-card border border-border p-4">
        <p className="text-sm font-semibold text-foreground">Pro Plan</p>
        <p className="text-xs text-muted-foreground mt-1">Animated border beam</p>
      </div>
    </div>
  );
}
