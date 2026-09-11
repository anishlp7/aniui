"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function PreviewPopoverDemo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex items-center gap-2" ref={ref}>
      <span className="text-sm text-foreground">Monthly budget</span>
      <button
        type="button"
        className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <InfoIcon />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 z-50 mt-2 w-64 rounded-xl border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-semibold text-card-foreground">How this is calculated</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your budget resets on the 1st of each month and includes all linked accounts.
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent cursor-pointer"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
