"use client";

import React from "react";

export function PreviewRefreshControlDemo() {
  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-2 py-4">
      <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="text-xs text-muted-foreground">Pull to refresh</span>
    </div>
  );
}
