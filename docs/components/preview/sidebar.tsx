"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewSidebar({ className, ...props }: PreviewSidebarProps) {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={cn("flex h-48 w-full flex-row overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full overflow-hidden border-r border-border bg-secondary transition-all duration-300",
          open ? "w-40 p-3" : "w-0 p-0"
        )}
      >
        <div className="flex flex-col gap-1">
          <div className="rounded-sm bg-card px-2 py-2 text-sm font-medium text-foreground">Dashboard</div>
          <div className="rounded-sm px-2 py-2 text-sm text-muted-foreground">Analytics</div>
          <div className="rounded-sm px-2 py-2 text-sm text-muted-foreground">Projects</div>
          <div className="rounded-sm px-2 py-2 text-sm text-muted-foreground">Team</div>
          <div className="rounded-sm px-2 py-2 text-sm text-muted-foreground">Settings</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-lg text-foreground hover:bg-secondary"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <p className="text-sm text-muted-foreground">Content for the Dashboard section.</p>
      </div>
    </div>
  );
}
