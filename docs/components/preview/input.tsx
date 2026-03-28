"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-md border text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-12 px-4 text-base",
        lg: "h-14 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PreviewInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
}

export function PreviewInput({ variant, size, className, ...props }: PreviewInputProps) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/* ── Icon wrapper preview ─────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function PreviewInputLeadingIcon() {
  return (
    <div className={cn("flex items-center gap-2", inputVariants({ variant: "default", size: "md" }))}>
      <SearchIcon />
      <input className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" placeholder="Search..." />
    </div>
  );
}

export function PreviewInputTrailingIcon() {
  const [value, setValue] = React.useState("Hello world");
  return (
    <div className={cn("flex items-center gap-2", inputVariants({ variant: "default", size: "md" }))}>
      <input className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" placeholder="Type something..." value={value} onChange={(e) => setValue(e.target.value)} />
      {value && (
        <button onClick={() => setValue("")} className="p-1 rounded hover:bg-accent transition-colors cursor-pointer">
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export function PreviewInputPasswordToggle() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className={cn("flex items-center gap-2", inputVariants({ variant: "default", size: "md" }))}>
      <input type={visible ? "text" : "password"} className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" placeholder="Password" defaultValue="mysecretpass" />
      <button onClick={() => setVisible(!visible)} className="p-1 rounded hover:bg-accent transition-colors cursor-pointer">
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
