"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext<{ value: string; onValueChange: (v: string) => void }>({
  value: "",
  onValueChange: () => {},
});

export interface PreviewTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultValue: string;
}

export function PreviewTabs({ defaultValue, className, children, ...props }: PreviewTabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={cn("", className)} {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface PreviewTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewTabsList({ className, ...props }: PreviewTabsListProps) {
  return (
    <div className={cn("inline-flex flex-row rounded-lg bg-muted p-1", className)} {...props} />
  );
}

export interface PreviewTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  value: string;
}

export function PreviewTabsTrigger({ value, className, children, ...props }: PreviewTabsTriggerProps) {
  const { value: selected, onValueChange } = useContext(TabsContext);
  const isActive = selected === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
        "flex-1 items-center justify-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors",
        isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface PreviewTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value: string;
}

export function PreviewTabsContent({ value, className, ...props }: PreviewTabsContentProps) {
  const { value: selected } = useContext(TabsContext);
  if (selected !== value) return null;
  return <div className={cn("mt-2", className)} {...props} />;
}
