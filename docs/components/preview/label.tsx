"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export function PreviewLabel({ className, ...props }: PreviewLabelProps) {
  return (
    <label
      className={cn("text-sm font-medium text-foreground leading-none", className)}
      {...props}
    />
  );
}
