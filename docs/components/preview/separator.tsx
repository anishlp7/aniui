"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function PreviewSeparator({ orientation = "horizontal", className, ...props }: PreviewSeparatorProps) {
  return (
    <div
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  );
}
