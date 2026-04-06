"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function PreviewEmptyState({ className, icon, title, description, actionLabel, onAction, ...props }: PreviewEmptyStateProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleAction = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
    onAction?.();
  };

  return (
    <div className={cn("flex flex-col items-center justify-center px-8 py-16", className)} {...props}>
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-foreground text-center mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground text-center mb-6 max-w-[280px]">{description}</p>}
      {actionLabel && (
        <button onClick={handleAction} disabled={refreshing} className="rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:bg-primary/90 cursor-pointer transition-colors disabled:opacity-60">
          {refreshing ? "Refreshing..." : actionLabel}
        </button>
      )}
    </div>
  );
}
