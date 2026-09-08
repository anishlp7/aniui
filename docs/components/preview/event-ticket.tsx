"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Deterministic thin (1-3px) bar heights derived from the ticket code, so the
// barcode always renders the same pattern for a given code — mirrors the
// mobile component's own seeded barcode.
const CODE = "AX7K2";
const BAR_COUNT = 18;
function buildBarHeights(seed: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const code = seed.charCodeAt(i % seed.length);
    return 1 + ((code * 7 + i * 11) % 3);
  });
}
const bars = buildBarHeights(CODE, BAR_COUNT);

export function PreviewEventTicket({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[260px] overflow-hidden rounded-2xl border border-border bg-card flex", className)}>
      <div className="flex-1 p-3 space-y-1.5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Event Ticket</p>
        <p className="text-sm font-semibold text-foreground">AniUI Live</p>
        <p className="text-xs text-muted-foreground">Sep 6, 2026 · 7:00 PM</p>
        <p className="text-xs text-muted-foreground">Mumbai, IN</p>
        <p className="text-xs font-medium text-foreground">Seat A-12</p>
      </div>
      <div className="w-px border-l border-dashed border-border my-2" />
      <div className="w-10 flex flex-col items-center justify-center gap-2 py-2">
        <div className="flex h-14 w-6 flex-col justify-between">
          {bars.map((height, i) => (
            <span key={i} className="w-full bg-foreground" style={{ height }} />
          ))}
        </div>
        <span className="text-[9px] font-mono text-muted-foreground rotate-90">{CODE}</span>
      </div>
    </div>
  );
}
