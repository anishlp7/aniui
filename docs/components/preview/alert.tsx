"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-lg border p-4", {
  variants: {
    variant: {
      default: "border-border bg-background",
      destructive: "border-destructive/50 bg-destructive/10",
      success: "border-green-500/50 bg-green-500/10",
      warning: "border-yellow-500/50 bg-yellow-500/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTitleVariants = cva("text-base font-semibold mb-1", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface PreviewAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  className?: string;
  title?: string;
  titleClassName?: string;
}

export function PreviewAlert({ variant, className, title, titleClassName, children, ...props }: PreviewAlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      {title && <p className={cn(alertTitleVariants({ variant }), titleClassName)}>{title}</p>}
      {children}
    </div>
  );
}

export interface PreviewAlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function PreviewAlertDescription({ className, ...props }: PreviewAlertDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
