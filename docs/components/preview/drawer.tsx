"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewDrawerProps {
  className?: string;
  side?: "left" | "right";
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

export function PreviewDrawer({ side = "left", trigger, children, className }: PreviewDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {trigger ?? "Open Drawer"}
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div
            className={cn(
              "absolute top-0 bottom-0 w-72 bg-background border-border p-4 shadow-lg transition-transform",
              side === "left" ? "left-0 border-r" : "right-0 border-l",
              className
            )}
          >
            <button
              type="button"
              className="absolute top-3 right-3 rounded-md p-1 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {children ?? (
              <div className="mt-8 space-y-2">
                <p className="text-sm font-semibold text-foreground">Drawer Content</p>
                <p className="text-sm text-muted-foreground">This is a slide-in panel.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
