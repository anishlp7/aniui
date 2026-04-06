"use client";

import React from "react";

export function PreviewSafeAreaDemo() {
  return (
    <div className="w-40 mx-auto">
      <div className="border-2 border-foreground/20 rounded-[2rem] p-1 bg-background">
        <div className="rounded-[1.5rem] overflow-hidden bg-muted">
          {/* Status bar area */}
          <div className="h-8 bg-primary/10 flex items-center justify-center">
            <span className="text-[8px] text-muted-foreground">Safe area (top)</span>
          </div>
          {/* Content area */}
          <div className="h-24 bg-background flex items-center justify-center border-y border-dashed border-border">
            <span className="text-xs text-foreground">Content</span>
          </div>
          {/* Bottom safe area */}
          <div className="h-6 bg-primary/10 flex items-center justify-center">
            <span className="text-[8px] text-muted-foreground">Safe area (bottom)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
