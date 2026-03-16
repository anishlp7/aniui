"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewList({ className, ...props }: PreviewListProps) {
  return <div className={cn("", className)} {...props} />;
}

export interface PreviewListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewListItem({ className, ...props }: PreviewListItemProps) {
  return (
    <div
      className={cn("flex flex-row items-center px-4 py-3 min-h-12 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors", className)}
      {...props}
    />
  );
}

export interface PreviewListItemTitleProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function PreviewListItemTitle({ className, ...props }: PreviewListItemTitleProps) {
  return <span className={cn("text-base font-medium text-foreground", className)} {...props} />;
}

export interface PreviewListItemDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function PreviewListItemDescription({ className, ...props }: PreviewListItemDescriptionProps) {
  return <span className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
