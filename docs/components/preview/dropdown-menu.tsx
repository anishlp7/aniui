"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewDropdownMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative inline-block", className)}>
      <button onClick={() => setOpen(!open)} className="h-10 w-10 rounded-md border border-input flex items-center justify-center hover:bg-accent cursor-pointer">
        <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg">
            <button onClick={() => setOpen(false)} className="w-full text-left rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer">Edit</button>
            <button onClick={() => setOpen(false)} className="w-full text-left rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer">Duplicate</button>
            <button onClick={() => setOpen(false)} className="w-full text-left rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent cursor-pointer">Share</button>
            <div className="my-1 h-px bg-border" />
            <button onClick={() => setOpen(false)} className="w-full text-left rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent cursor-pointer">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
