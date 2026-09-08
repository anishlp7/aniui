"use client";

import React from "react";

export function PreviewPriceDemo() {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-lg font-semibold text-muted-foreground line-through">$129.99</span>
      <span className="text-2xl font-bold text-foreground">$89.99</span>
      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">Save 31%</span>
    </div>
  );
}
