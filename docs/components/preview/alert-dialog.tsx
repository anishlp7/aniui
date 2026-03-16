"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface PreviewAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function PreviewAlertDialog({ open, onOpenChange, children }: PreviewAlertDialogProps) {
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

export interface PreviewAlertDialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewAlertDialogContent({ className, ...props }: PreviewAlertDialogContentProps) {
  return (
    <div
      className={cn("w-80 rounded-lg bg-card p-6 shadow-xl", className)}
      role="alertdialog"
      {...props}
    />
  );
}

export interface PreviewAlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewAlertDialogHeader({ className, ...props }: PreviewAlertDialogHeaderProps) {
  return <div className={cn("pb-4", className)} {...props} />;
}

export interface PreviewAlertDialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function PreviewAlertDialogTitle({ className, ...props }: PreviewAlertDialogTitleProps) {
  return <h3 className={cn("text-lg font-semibold text-card-foreground", className)} {...props} />;
}

export interface PreviewAlertDialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function PreviewAlertDialogDescription({ className, ...props }: PreviewAlertDialogDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />;
}

export interface PreviewAlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewAlertDialogFooter({ className, ...props }: PreviewAlertDialogFooterProps) {
  return <div className={cn("flex flex-row justify-end gap-3 pt-4", className)} {...props} />;
}

export interface PreviewAlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function PreviewAlertDialogAction({ className, ...props }: PreviewAlertDialogActionProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors",
        className
      )}
      {...props}
    />
  );
}

export interface PreviewAlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function PreviewAlertDialogCancel({ className, ...props }: PreviewAlertDialogCancelProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      {...props}
    />
  );
}
