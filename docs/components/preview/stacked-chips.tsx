"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewStackedChips({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div className={cn("relative flex h-12 items-center", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="z-10 flex h-9 items-center rounded-full bg-secondary px-4 text-xs font-medium text-secondary-foreground cursor-pointer"
      >
        Filters
      </button>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full bg-secondary/95 py-1 pl-3 pr-2 transition-all duration-300 -ml-3",
          open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          onClick={() => setSubOpen((o) => !o)}
          className="flex h-8 items-center rounded-full bg-card px-3 text-xs font-medium text-foreground cursor-pointer"
        >
          Color
        </button>
        <div
          className={cn(
            "flex items-center gap-1 transition-all duration-300",
            subOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0 pointer-events-none"
          )}
        >
          <span className="rounded-full bg-card px-2 py-1 text-[10px] text-foreground">Red</span>
          <span className="rounded-full bg-card px-2 py-1 text-[10px] text-foreground">Blue</span>
        </div>
      </div>
    </div>
  );
}
