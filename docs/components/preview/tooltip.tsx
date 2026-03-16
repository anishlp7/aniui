"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewTooltipProps {
  content: string;
  side?: "top" | "bottom";
  children: React.ReactNode;
  className?: string;
}

export function PreviewTooltip({ content, side = "top", children, className }: PreviewTooltipProps) {
  return (
    <div className={cn("group relative inline-flex", className)}>
      {children}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 scale-95 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100",
          "rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md whitespace-nowrap",
          side === "top" && "bottom-full mb-2",
          side === "bottom" && "top-full mt-2"
        )}
        role="tooltip"
      >
        {content}
      </div>
    </div>
  );
}
