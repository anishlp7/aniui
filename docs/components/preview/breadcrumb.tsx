"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewBreadcrumb({ className, ...props }: PreviewBreadcrumbProps) {
  return (
    <div className={cn("flex flex-row flex-wrap items-center gap-1.5", className)} {...props}>
      <span className="text-sm text-muted-foreground cursor-pointer">Home</span>
      <span className="text-sm text-muted-foreground">/</span>
      <span className="text-sm text-muted-foreground cursor-pointer">Components</span>
      <span className="text-sm text-muted-foreground">/</span>
      <span className="text-sm font-medium text-foreground">Breadcrumb</span>
    </div>
  );
}
