"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewShimmer({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[220px] space-y-2", className)}>
      {[["w-3/4", "h-3"], ["w-full", "h-3"], ["w-full", "h-16 rounded-lg"]].map(([w, h]) => (
        <div key={w + h} className={cn("relative overflow-hidden rounded-md bg-muted", w, h)}>
          <div className="absolute inset-y-0 w-1/2 -left-1/2 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-[shimmerSweep_1.4s_ease-in-out_infinite]" />
        </div>
      ))}
      <style>{`@keyframes shimmerSweep { 0% { transform: translateX(0); } 100% { transform: translateX(300%); } }`}</style>
    </div>
  );
}
