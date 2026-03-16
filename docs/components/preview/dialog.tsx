"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function PreviewDialog({ open, onOpenChange, children }: PreviewDialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 animate-in fade-in-0 zoom-in-95">
        {children}
      </div>
    </div>
  );
}

export interface PreviewDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewDialogContent({ className, ...props }: PreviewDialogContentProps) {
  return (
    <div
      className={cn("w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      role="dialog"
      {...props}
    />
  );
}

export interface PreviewDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewDialogHeader({ className, ...props }: PreviewDialogHeaderProps) {
  return <div className={cn("pb-4", className)} {...props} />;
}

export interface PreviewDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function PreviewDialogTitle({ className, ...props }: PreviewDialogTitleProps) {
  return <h3 className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface PreviewDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function PreviewDialogDescription({ className, ...props }: PreviewDialogDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface PreviewDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewDialogFooter({ className, ...props }: PreviewDialogFooterProps) {
  return <div className={cn("flex flex-row justify-end gap-3 pt-4", className)} {...props} />;
}
