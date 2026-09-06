"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewEventTicket({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[260px] overflow-hidden rounded-2xl border border-border bg-card flex", className)}>
      <div className="flex-1 p-3 space-y-1.5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Event Ticket</p>
        <p className="text-sm font-semibold text-foreground">AniUI Live</p>
        <p className="text-xs text-muted-foreground">Sep 6 · 7:00 PM</p>
        <p className="text-xs text-muted-foreground">Mumbai, IN</p>
      </div>
      <div className="w-px border-l border-dashed border-border my-2" />
      <div className="w-10 flex items-center justify-center">
        <span className="text-[9px] font-mono text-muted-foreground rotate-90">A12</span>
      </div>
    </div>
  );
}
