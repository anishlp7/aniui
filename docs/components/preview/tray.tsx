"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewTray({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex h-40 w-full items-end justify-center overflow-hidden rounded-xl border border-border bg-muted/30", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute bottom-3 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm cursor-pointer"
        style={{ opacity: open ? 0 : 1 }}
      >
        Open Settings
      </button>

      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />

      <div
        className="absolute inset-x-2 bottom-2 rounded-2xl border border-border bg-card shadow-lg transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${open ? "0%" : "115%"})` }}
      >
        <div className="flex items-center justify-center pb-1 pt-2">
          <div className="h-1 w-9 rounded-full bg-foreground/25" />
        </div>
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <p className="text-sm font-semibold text-foreground">Settings</p>
          <button type="button" onClick={() => setOpen(false)} className="text-xs text-muted-foreground cursor-pointer">
            ✕
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 pb-3">
          <img
            src="https://picsum.photos/seed/aniui-tray-avatar/96/96"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Anish</p>
            <p className="truncate text-xs text-muted-foreground">anish@aniui.dev · Free plan</p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <button type="button" className="w-full rounded-md bg-primary py-2 text-xs font-medium text-primary-foreground cursor-pointer">
            Manage account
          </button>
        </div>
      </div>
    </div>
  );
}
