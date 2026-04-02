"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewPaginationDemo() {
  const [current, setCurrent] = useState(3);
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <button
        className="min-h-10 min-w-10 flex items-center justify-center rounded-md text-sm text-foreground cursor-pointer hover:bg-accent"
        onClick={() => setCurrent((c) => Math.max(1, c - 1))}
      >
        &#8249;
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={cn(
            "min-h-10 min-w-10 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer",
            p === current ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"
          )}
          onClick={() => setCurrent(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="min-h-10 min-w-10 flex items-center justify-center rounded-md text-sm text-foreground cursor-pointer hover:bg-accent"
        onClick={() => setCurrent((c) => Math.min(5, c + 1))}
      >
        &#8250;
      </button>
    </div>
  );
}
