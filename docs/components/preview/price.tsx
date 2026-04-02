"use client";

import React from "react";

export function PreviewPriceDemo() {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-lg font-semibold text-muted-foreground line-through">$49.99</span>
      <span className="text-2xl font-bold text-foreground">$29.99</span>
      <span className="text-sm text-muted-foreground">USD</span>
    </div>
  );
}
