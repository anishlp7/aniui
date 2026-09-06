"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewCoupon({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-[260px] flex rounded-xl overflow-hidden border border-border", className)}>
      <div className="flex-1 bg-primary px-4 py-5 text-primary-foreground">
        <p className="text-[10px] uppercase tracking-widest opacity-80">Coupon</p>
        <p className="text-2xl font-bold mt-1">20% OFF</p>
        <p className="text-xs mt-1 opacity-90">First order · ANIUI20</p>
      </div>
      <div className="w-px border-l border-dashed border-primary-foreground/30 my-3" />
      <div className="w-12 flex items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground rotate-90">
        SAVE
      </div>
    </div>
  );
}
