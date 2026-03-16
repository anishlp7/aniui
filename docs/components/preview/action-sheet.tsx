"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewActionSheetAction {
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}

export interface PreviewActionSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  actions: PreviewActionSheetAction[];
  onCancel?: () => void;
}

export function PreviewActionSheet({ className, title, actions, onCancel, ...props }: PreviewActionSheetProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-t-xl bg-card border border-border shadow-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="px-4 pb-6">
        {title && (
          <p className="text-sm text-muted-foreground text-center py-3">{title}</p>
        )}
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            className="w-full py-4 text-center border-b border-border cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={action.onPress}
          >
            <span className={cn("text-base font-medium", action.destructive ? "text-destructive" : "text-foreground")}>
              {action.label}
            </span>
          </button>
        ))}
        {onCancel && (
          <button
            type="button"
            className="w-full py-4 text-center mt-2 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={onCancel}
          >
            <span className="text-base font-semibold text-muted-foreground">Cancel</span>
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center pb-3">
        Native component powered by @gorhom/bottom-sheet
      </p>
    </div>
  );
}
