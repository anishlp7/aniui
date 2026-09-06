"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewGooeySwitch({ className }: { className?: string }) {
  const [on, setOn] = useState(true);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn("relative h-8 w-14 rounded-full transition-colors cursor-pointer", on ? "bg-foreground" : "bg-muted", className)}
    >
      <span
        className={cn(
          "absolute top-1 h-6 w-6 rounded-full bg-background shadow transition-all duration-300 blur-[0.3px]",
          on ? "left-7" : "left-1"
        )}
      />
    </button>
  );
}
