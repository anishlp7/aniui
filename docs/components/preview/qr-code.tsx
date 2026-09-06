"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/** Simplified illustration of the real component's expand/collapse reveal:
 *  a "Show QR Code" pill that springs open into a card with a QR-like grid
 *  plus copy/close actions. */
export function PreviewQrCode({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const grid = [
    "111001101",
    "101010101",
    "111001101",
    "000111000",
    "101010101",
    "111001101",
    "101010101",
    "111001101",
  ];

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className={cn(
          "cursor-pointer rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-105",
          className
        )}
      >
        Show QR Code
      </button>
    );
  }

  return (
    <div className={cn("w-[220px] rounded-3xl border border-border bg-card p-4", className)}>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
        {grid.flatMap((row, y) =>
          row.split("").map((cell, x) => (
            <span
              key={`${x}-${y}`}
              className={cn("aspect-square rounded-[1px]", cell === "1" ? "bg-foreground" : "bg-transparent")}
            />
          ))
        )}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button type="button" className="cursor-pointer rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium text-foreground">
          Copy
        </button>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="cursor-pointer rounded-full bg-muted px-3 py-1.5 text-[11px] font-medium text-foreground"
        >
          Close
        </button>
      </div>
    </div>
  );
}
