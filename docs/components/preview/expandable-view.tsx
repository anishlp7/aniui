"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewExpandableView({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("flex h-56 w-full items-center justify-center", className)}>
      <div
        className="relative flex items-center justify-center overflow-hidden bg-muted shadow-sm transition-all duration-300 ease-out"
        style={{
          width: expanded ? 220 : 150,
          height: expanded ? 180 : 46,
          borderRadius: expanded ? 24 : 999,
        }}
      >
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground cursor-pointer"
          >
            Tap to expand
          </button>
        ) : (
          <div className="flex h-full w-full flex-col p-4">
            <p className="text-sm text-foreground">Expanded content goes here.</p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
