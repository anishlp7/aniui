"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewReceiptCard({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full items-center justify-center rounded-2xl bg-[#0a0a0a] py-8", className)}>
      <div className="w-full max-w-[240px] rounded-t-2xl rounded-b-lg border border-border bg-card overflow-hidden shadow-xl">
        <div className="p-4 space-y-2 border-b border-dashed border-border">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Receipt</p>
          <p className="text-sm font-semibold text-foreground">Blue Bottle Coffee</p>
          <p className="text-[10px] text-muted-foreground">Sep 6, 2026</p>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Flat White</span>
            <span>$5.50</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Croissant</span>
            <span>$4.00</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Tax</span>
            <span>$0.86</span>
          </div>
        </div>
        <div className="flex justify-between px-4 py-3 text-sm font-bold text-foreground">
          <span>Total</span>
          <span>$10.36</span>
        </div>
        <div className="h-2 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,hsl(var(--border))_6px,hsl(var(--border))_12px)]" />
      </div>
    </div>
  );
}
