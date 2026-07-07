"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewAspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ratio?: number;
  label?: string;
}

export function PreviewAspectRatio({ ratio = 1, className, label, style, ...props }: PreviewAspectRatioProps) {
  return (
    <div
      className={cn("w-full overflow-hidden rounded-lg bg-secondary items-center justify-center flex", className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    >
      <span className="text-sm font-medium text-muted-foreground">{label ?? `${ratio}`}</span>
    </div>
  );
}
