"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewGooeyPopover({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex h-40 w-full items-start justify-center pt-4", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm cursor-pointer"
      >
        Options
      </button>
      <div
        className="absolute left-1/2 top-4 w-48 -translate-x-1/2 origin-top rounded-2xl border border-border bg-card p-3 shadow-lg transition-all duration-300 ease-out"
        style={{
          opacity: open ? 1 : 0,
          transform: `translate(-50%, ${open ? "44px" : "0px"}) scale(${open ? 1 : 0.3})`,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <p className="text-xs text-muted-foreground">Popover content goes here.</p>
      </div>
    </div>
  );
}
