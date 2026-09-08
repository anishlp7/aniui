"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewBottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewBottomSheet({ className, children, ...props }: PreviewBottomSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[320px]" {...props}>
      {/* Trigger */}
      <div className="flex items-center justify-center h-full min-h-[320px]">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Share Post
        </button>
      </div>

      {/* Bottom sheet overlay */}
      {open && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className={cn("relative z-20 rounded-t-2xl bg-card border-t border-border shadow-xl", className)}>
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="p-4">
              {children ?? (
                <div className="space-y-3 pb-4">
                  <p className="text-sm font-semibold text-foreground">Share this post</p>
                  <p className="text-sm text-muted-foreground">Choose where to send it.</p>
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      className="w-full rounded-md border border-input bg-background py-2.5 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      Messages
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-md border border-input bg-background py-2.5 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      Twitter / X
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-md border border-input bg-background py-2.5 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
