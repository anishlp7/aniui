"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewActionSheetAction {
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}

export interface PreviewActionSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string;
  title?: string;
  actions: PreviewActionSheetAction[];
  onCancel?: () => void;
}

export function PreviewActionSheet({ className, title, actions, onCancel, ...props }: PreviewActionSheetProps) {
  const [open, setOpen] = useState(false);

  const handleAction = (action: PreviewActionSheetAction) => {
    action.onPress?.();
    setOpen(false);
  };

  return (
    <div className="relative w-full min-h-[320px]" {...props}>
      {/* Trigger */}
      <div className="flex items-center justify-center h-full min-h-[320px]">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Show Actions
        </button>
      </div>

      {/* Action sheet overlay */}
      {open && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className={cn("relative z-20 rounded-t-2xl bg-card shadow-xl", className)}>
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="px-2 pb-2">
              {title && (
                <p className="text-sm text-muted-foreground text-center py-2 px-4">{title}</p>
              )}
              {actions.map((action, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-full py-3.5 text-center rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleAction(action)}
                >
                  <span className={cn("text-sm font-medium", action.destructive ? "text-destructive" : "text-foreground")}>
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="px-2 pb-4">
              <button
                type="button"
                className="w-full py-3 text-center rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => { onCancel?.(); setOpen(false); }}
              >
                <span className="text-sm font-semibold text-foreground">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
