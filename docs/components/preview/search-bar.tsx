"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const searchBarVariants = cva(
  "flex items-center rounded-lg bg-muted px-3",
  {
    variants: {
      size: {
        sm: "h-10 px-2.5",
        md: "h-12 px-3",
        lg: "h-14 px-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const iconSizes = { sm: 14, md: 16, lg: 20 } as const;

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg className="text-muted-foreground mr-2 shrink-0" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ClearButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="ml-1 h-5 w-5 flex items-center justify-center rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 cursor-pointer">
      <svg className="h-3 w-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export interface PreviewSearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchBarVariants> {
  className?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  showCancel?: boolean;
  onCancel?: () => void;
}

export function PreviewSearchBar({ size = "md", className, value, icon, onClear, showCancel, onCancel, ...props }: PreviewSearchBarProps) {
  const iconSize = iconSizes[size ?? "md"];

  return (
    <div className="flex items-center gap-2">
      <div className={cn(searchBarVariants({ size }), className)}>
        {icon ?? <SearchIcon size={iconSize} />}
        <input
          className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Search..."
          value={value}
          {...props}
        />
        {value && <ClearButton onClick={onClear} />}
      </div>
      {showCancel && (
        <button onClick={onCancel} className="text-base text-primary hover:text-primary/80 cursor-pointer">Cancel</button>
      )}
    </div>
  );
}
