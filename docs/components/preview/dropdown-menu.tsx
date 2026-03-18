"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PreviewDropdownMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={cn("relative inline-flex", className)} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 px-4 rounded-lg border border-input bg-background flex items-center gap-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer transition-colors"
      >
        <span>Open Menu</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform", open && "rotate-180")}><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 min-w-[180px] rounded-xl border border-border bg-card p-1 shadow-lg animate-in fade-in-0 zoom-in-95">
          <button onClick={() => setOpen(false)} className="w-full text-left rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer transition-colors">Edit</button>
          <button onClick={() => setOpen(false)} className="w-full text-left rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer transition-colors">Duplicate</button>
          <button onClick={() => setOpen(false)} className="w-full text-left rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer transition-colors">Share</button>
          <div className="my-1 h-px bg-border mx-2" />
          <button onClick={() => setOpen(false)} className="w-full text-left rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer transition-colors">Delete</button>
        </div>
      )}
    </div>
  );
}
