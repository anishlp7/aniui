"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewBookPage({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[220px] rounded-r-lg rounded-l-sm border border-border bg-card p-4 shadow-md", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-sm bg-gradient-to-r from-muted to-transparent" />
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Chapter 3</p>
      <p className="text-sm font-semibold text-foreground mt-1">Design Systems</p>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
        Tokens, variants, and composition patterns for mobile UI.
      </p>
    </div>
  );
}
