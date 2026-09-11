"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewPolaroid({ className }: { className?: string }) {
  return (
    <div className={cn("w-[160px] rounded-sm border border-border bg-card p-3 pb-8 shadow-md rotate-[-2deg]", className)}>
      <img
        src="https://picsum.photos/seed/aniui-polaroid/300/300"
        alt=""
        className="aspect-square w-full rounded-sm object-cover"
      />
      <p className="mt-3 text-center text-xs font-medium text-foreground">Summer '26</p>
    </div>
  );
}
