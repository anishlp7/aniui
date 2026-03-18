"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewList({ className, ...props }: PreviewListProps) {
  return <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)} {...props} />;
}

export interface PreviewListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function PreviewListItem({ className, icon, trailing, children, ...props }: PreviewListItemProps) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-3 px-4 py-3.5 min-h-12 border-b border-border last:border-b-0 cursor-pointer hover:bg-accent/50 transition-colors",
        className
      )}
      {...props}
    >
      {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing ?? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50 shrink-0">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </div>
  );
}

export interface PreviewListItemTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function PreviewListItemTitle({ className, ...props }: PreviewListItemTitleProps) {
  return <span className={cn("text-sm font-medium text-foreground block", className)} {...props} />;
}

export interface PreviewListItemDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function PreviewListItemDescription({ className, ...props }: PreviewListItemDescriptionProps) {
  return <span className={cn("text-xs text-muted-foreground block mt-0.5", className)} {...props} />;
}
