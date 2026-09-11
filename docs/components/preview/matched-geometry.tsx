"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewMatchedGeometry({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("flex h-48 w-full flex-col items-center justify-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="rounded-2xl bg-primary shadow-sm transition-all duration-300 ease-out cursor-pointer"
        style={{
          width: expanded ? 220 : 64,
          height: expanded ? 130 : 64,
          borderRadius: expanded ? 20 : 999,
        }}
        aria-label="Toggle matched geometry transition"
      />
      <p className="text-[10px] text-muted-foreground">Tap to morph</p>
    </div>
  );
}
