"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewVerifiedShine({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border bg-card px-3 py-1.5", className)}>
      <span className="absolute inset-0 animate-[shine_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>
      <span className="relative text-xs font-semibold text-foreground">Verified creator</span>
      <style>{`@keyframes shine { 0%{transform:translateX(-120%)} 100%{transform:translateX(120%)} }`}</style>
    </div>
  );
}
