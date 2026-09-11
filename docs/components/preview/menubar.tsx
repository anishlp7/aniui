"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewMenubarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewMenubar({ className, ...props }: PreviewMenubarProps) {
  return (
    <div className={cn("flex flex-col items-start gap-1", className)} {...props}>
      <div className="flex h-10 flex-row items-center gap-1 rounded-md border border-border bg-card px-1">
        <span className="flex h-8 items-center rounded-sm bg-secondary px-3 text-sm font-medium text-foreground">
          File
        </span>
        <span className="flex h-8 items-center rounded-sm px-3 text-sm font-medium text-foreground">
          Edit
        </span>
      </div>
      <div className="min-w-40 rounded-md border border-border bg-card p-1">
        <div className="flex min-h-10 items-center rounded-sm px-2 text-sm text-foreground hover:bg-secondary cursor-pointer">
          New Document
        </div>
        <div className="flex min-h-10 items-center rounded-sm px-2 text-sm text-foreground hover:bg-secondary cursor-pointer">
          Open…
        </div>
        <div className="flex min-h-10 items-center rounded-sm px-2 text-sm text-foreground hover:bg-secondary cursor-pointer">
          Save
        </div>
      </div>
    </div>
  );
}
