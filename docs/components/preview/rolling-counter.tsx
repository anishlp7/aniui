"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewRollingCounter({ className }: { className?: string }) {
  const [value, setValue] = useState(1284);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex items-center gap-0.5 text-3xl font-bold tabular-nums text-foreground">
        <span className="text-muted-foreground text-2xl mr-1">$</span>
        {String(value).split("").map((d, i) => (
          <span key={i} className="inline-block transition-transform duration-300">{d}</span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setValue((v) => v + 137)}
        className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent cursor-pointer"
      >
        +137
      </button>
    </div>
  );
}
