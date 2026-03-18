"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("flex items-center px-4 py-3 gap-3 text-sm font-medium", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      info: "bg-blue-500 text-white",
      warning: "bg-yellow-500 text-white",
      destructive: "bg-destructive text-destructive-foreground",
      success: "bg-green-600 text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface PreviewBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  className?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export function PreviewBanner({ variant, className, children, icon, actionLabel, onAction, onDismiss, ...props }: PreviewBannerProps) {
  return (
    <div className={cn(bannerVariants({ variant }), className)} role="alert" {...props}>
      {icon}
      <span className="flex-1">{children}</span>
      {actionLabel && <button onClick={onAction} className="underline cursor-pointer">{actionLabel}</button>}
      {onDismiss && (
        <button onClick={onDismiss} className="ml-1 cursor-pointer hover:opacity-70">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
