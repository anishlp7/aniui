"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewGradientPoint {
  x: number;
  y: number;
}

export interface PreviewGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  colors?: string[];
  start?: PreviewGradientPoint;
  end?: PreviewGradientPoint;
  children?: React.ReactNode;
}

export function PreviewGradient({
  colors = ["#18181b", "#3f3f46"],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  className,
  style,
  children,
  ...props
}: PreviewGradientProps) {
  // CSS gradient angle: 0deg points up, 90deg points right.
  const angle = 180 - (Math.atan2(end.x - start.x, end.y - start.y) * 180) / Math.PI;
  const stops = colors
    .map((color, i) => `${color} ${(i / Math.max(colors.length - 1, 1)) * 100}%`)
    .join(", ");

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ backgroundImage: `linear-gradient(${angle}deg, ${stops})`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
