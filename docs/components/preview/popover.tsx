"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

function BellIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="inline-flex items-center gap-2 justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <BellIcon />
        Notifications
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 z-50 mt-2 w-64 rounded-xl border border-border bg-card p-3 shadow-lg">
          <p className="text-sm font-semibold text-card-foreground mb-2">Notifications</p>
          <div className="space-y-2">
            {[
              { title: "New message", desc: "Alex sent you a photo", time: "2m" },
              { title: "Reminder", desc: "Meeting in 30 minutes", time: "15m" },
              { title: "Update", desc: "App version 2.1 available", time: "1h" },
            ].map((n) => (
              <div key={n.title} className="flex items-start gap-2 rounded-lg p-2 hover:bg-accent/50 cursor-pointer">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
