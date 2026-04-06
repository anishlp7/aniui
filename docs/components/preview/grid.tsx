"use client";

import React from "react";

export function PreviewGridDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-foreground font-medium">Item {i}</p>
          <p className="text-xs text-muted-foreground mt-1">Description</p>
        </div>
      ))}
    </div>
  );
}
