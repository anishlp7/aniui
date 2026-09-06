"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewFlexiButton({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((e) => !e)}
      aria-expanded={expanded}
      className={cn(
        "relative h-12 flex items-center justify-center overflow-hidden rounded-full bg-primary transition-[width] duration-300 ease-out cursor-pointer",
        expanded ? "w-36" : "w-12",
        className
      )}
    >
      <span className={cn("text-primary-foreground text-sm font-semibold whitespace-nowrap transition-opacity duration-200", expanded ? "opacity-100" : "opacity-0")}>
        {expanded ? "Clear all" : ""}
      </span>
      <svg
        className={cn("absolute h-4 w-4 text-primary-foreground transition-opacity duration-150", expanded ? "opacity-0" : "opacity-100")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    </button>
  );
}
