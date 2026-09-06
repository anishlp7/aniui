"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewRadiantButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "relative overflow-hidden rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground min-h-12 cursor-pointer",
        className
      )}
    >
      <span className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)]" />
      <span className="relative z-10">Upgrade Now</span>
    </button>
  );
}
