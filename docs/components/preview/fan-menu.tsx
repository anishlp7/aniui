"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const actions = ["Share", "Save", "Edit", "Delete"];

export function PreviewFanMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex h-36 w-36 items-end justify-center", className)}>
      {open &&
        actions.map((action, i) => {
          const angle = -90 + (i / (actions.length - 1)) * 90;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 56;
          const y = Math.sin(rad) * 56;
          return (
            <button
              key={action}
              type="button"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-2 py-1 text-[10px] font-medium text-foreground shadow-sm cursor-pointer"
              style={{ transform: `translate(calc(-50% + ${x}px), ${y}px)` }}
            >
              {action}
            </button>
          );
        })}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 h-12 w-12 rounded-full bg-primary text-primary-foreground text-xl font-bold cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
