"use client";

import React from "react";

export function PreviewLabeledSeparatorDemo() {
  return (
    <div className="w-full max-w-xs flex items-center gap-3">
      <div className="flex-1 h-px bg-border" />
      <span className="text-sm text-muted-foreground">OR</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
