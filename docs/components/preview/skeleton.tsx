"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewSkeleton({ className, style, ...props }: PreviewSkeletonProps) {
  return (
    <div
      className={cn("rounded-md bg-muted", className)}
      style={{
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        ...style,
      }}
      {...props}
    >
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }`}</style>
    </div>
  );
}
