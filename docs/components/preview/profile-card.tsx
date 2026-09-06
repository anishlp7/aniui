"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function PreviewProfileCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[240px] rounded-[28px] border border-border bg-background p-2", className)}>
      <div className="relative rounded-3xl bg-card overflow-hidden">
        <img
          src="https://picsum.photos/seed/aniui-profile-cover/480/160"
          alt=""
          className="h-20 w-full rounded-b-2xl object-cover"
        />
        <div className="absolute right-4 top-11 h-12 w-12 overflow-hidden rounded-2xl border-2 border-card bg-muted">
          <img
            src="https://picsum.photos/seed/aniui-profile-avatar/96/96"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1.5 p-4">
          <div className="flex items-baseline gap-1.5">
            <p className="text-sm font-bold text-foreground">Anish Lawrence</p>
            <p className="text-[10px] text-muted-foreground">@anishlp</p>
          </div>
          <p className="text-xs text-muted-foreground">Building AniUI.</p>
          <p className="text-[10px] text-muted-foreground">San Francisco, CA</p>
          <span className="mt-1 self-start rounded-xl bg-secondary px-3 py-1.5 text-[10px] font-semibold text-secondary-foreground">Follow</span>
        </div>
      </div>
    </div>
  );
}
