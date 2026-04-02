"use client";

import React, { useState } from "react";
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
  defaultVariants: { variant: "default" },
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

export interface PreviewAlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  className?: string;
  title?: string;
  titleClassName?: string;
  dismissible?: boolean;
}

export function PreviewAlert({ variant, className, title, titleClassName, dismissible, children, ...props }: PreviewAlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className={cn(alertVariants({ variant }), "relative", className)} role="alert" {...props}>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground cursor-pointer">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
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
