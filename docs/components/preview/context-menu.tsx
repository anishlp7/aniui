"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PreviewContextMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={cn("relative w-full max-w-[260px]", className)} ref={ref}>
      <button
        type="button"
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-28 w-full items-center justify-center rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground cursor-pointer hover:bg-accent/30"
      >
        Right-click or tap
      </button>
      {open && (
        <div className="absolute left-1/2 top-1/2 z-50 min-w-[160px] -translate-x-1/2 translate-y-2 rounded-xl border border-border bg-card p-1 shadow-lg">
          {["Edit", "Duplicate", "Share"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setOpen(false)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-accent cursor-pointer"
            >
              {item}
            </button>
          ))}
          <div className="my-1 h-px bg-border mx-2" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
