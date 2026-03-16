"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewBottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewBottomSheet({ className, children, ...props }: PreviewBottomSheetProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-t-xl bg-card border border-border shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="p-4">
        {children ?? (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              This is a native bottom sheet component powered by @gorhom/bottom-sheet.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Preview shows a static mockup. See the mobile demo for full behavior.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
