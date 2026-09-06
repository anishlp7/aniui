"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewMorphLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-4 w-4 rounded-full bg-primary animate-[morph_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
      <style>{`@keyframes morph { 0%,100%{border-radius:9999px;transform:scale(1)} 50%{border-radius:4px;transform:scale(0.7)} }`}</style>
    </div>
  );
}
