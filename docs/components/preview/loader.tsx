"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase text-muted-foreground">Circle</span>
        <div className="h-8 w-8 rounded-full border-2 border-muted border-t-primary animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs uppercase text-muted-foreground">Dots</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
