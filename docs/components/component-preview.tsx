"use client";

import React from "react";

export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border border-border bg-background p-10">
      {children}
    </div>
  );
}
