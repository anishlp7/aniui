"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("flex items-center rounded-xl px-4 py-3.5 gap-3 text-sm font-medium border", {
  variants: {
    variant: {
      default: "bg-secondary/60 border-border text-foreground",
      info: "bg-primary/8 border-primary/15 text-primary",
      warning: "bg-[hsl(45_100%_96%)] border-[hsl(45_80%_75%)] text-[hsl(30_80%_30%)] dark:bg-[hsl(45_50%_12%)] dark:border-[hsl(45_40%_25%)] dark:text-[hsl(45_80%_65%)]",
      destructive: "bg-destructive/8 border-destructive/15 text-destructive",
      success: "bg-[hsl(145_60%_96%)] border-[hsl(145_40%_70%)] text-[hsl(145_60%_25%)] dark:bg-[hsl(145_30%_12%)] dark:border-[hsl(145_25%_25%)] dark:text-[hsl(145_50%_55%)]",
    },
  },
  defaultVariants: { variant: "default" },
});

const variantIcons: Record<string, React.ReactNode> = {
  default: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  destructive: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
};

export interface PreviewBannerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  className?: string;
  icon?: React.ReactNode;
  hideIcon?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function PreviewBanner({ variant, className, children, icon, hideIcon, actionLabel, onAction, dismissible = false, onDismiss, ...props }: PreviewBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const resolvedVariant = variant ?? "default";

  const handleDismiss = () => { setVisible(false); onDismiss?.(); };

  return (
    <div className={cn(bannerVariants({ variant }), className)} role="alert" {...props}>
      {!hideIcon && <span className="shrink-0 opacity-80">{icon ?? variantIcons[resolvedVariant]}</span>}
      <span className="flex-1">{children}</span>
      {actionLabel && <button onClick={onAction} className="shrink-0 font-semibold underline underline-offset-2 cursor-pointer hover:opacity-80">{actionLabel}</button>}
      {(dismissible || onDismiss) && (
        <button onClick={handleDismiss} className="shrink-0 ml-1 cursor-pointer rounded-md p-0.5 opacity-60 hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
