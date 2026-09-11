"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewBookPage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[220px] aspect-[3/4] overflow-hidden rounded-r-md rounded-l-sm border border-border shadow-lg [transform:perspective(1000px)_rotateY(-8deg)]",
        className
      )}
    >
      <img
        src="https://picsum.photos/seed/aniui-book/400/560"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/40" />
      <div className="absolute inset-y-0 left-0 w-2.5 bg-black/25" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <p className="text-[10px] uppercase tracking-widest text-white/70">AniUI Press</p>
        <div className="space-y-2">
          <p className="text-xl font-bold leading-tight text-white">The AniUI Way</p>
          <p className="border-t border-white/20 pt-2 text-[10px] text-white/80">First Edition · 2026</p>
        </div>
      </div>
    </div>
  );
}
