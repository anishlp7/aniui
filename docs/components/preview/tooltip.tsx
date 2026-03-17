"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewTooltipProps {
  content: string;
  side?: "top" | "bottom";
  children: React.ReactNode;
  className?: string;
}

export function PreviewTooltip({ content, side = "top", children, className }: PreviewTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible((v) => !v)}
    >
      {children}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 transition-all duration-150",
          "rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md whitespace-nowrap",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
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
