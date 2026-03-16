"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewCard({ className, ...props }: PreviewCardProps) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-card p-6", className)}
      {...props}
    />
  );
}

export interface PreviewCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewCardHeader({ className, ...props }: PreviewCardHeaderProps) {
  return <div className={cn("pb-4", className)} {...props} />;
}

export interface PreviewCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function PreviewCardTitle({ className, ...props }: PreviewCardTitleProps) {
  return (
    <h3
      className={cn("text-2xl font-semibold text-card-foreground tracking-tight", className)}
      {...props}
    />
  );
}

export interface PreviewCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function PreviewCardDescription({ className, ...props }: PreviewCardDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export interface PreviewCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewCardContent({ className, ...props }: PreviewCardContentProps) {
  return <div className={cn("py-2", className)} {...props} />;
}

export interface PreviewCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewCardFooter({ className, ...props }: PreviewCardFooterProps) {
  return <div className={cn("flex flex-row items-center pt-4", className)} {...props} />;
}
