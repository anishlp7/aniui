"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewSkeleton({ className, ...props }: PreviewSkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
