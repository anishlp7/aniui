"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[260px] overflow-hidden rounded-lg border border-border bg-card py-2", className)}>
      <div className="flex w-max animate-[marquee_8s_linear_infinite] gap-8 px-4 text-sm font-medium text-foreground whitespace-nowrap">
        <span>AniUI · Beautiful React Native components · Copy · Paste · Ship ·</span>
        <span>AniUI · Beautiful React Native components · Copy · Paste · Ship ·</span>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
