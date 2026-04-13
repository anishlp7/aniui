"use client";

import React from "react";

export function PreviewFieldDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input className="flex w-full min-h-12 rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="you@example.com" />
        <p className="text-xs text-muted-foreground">We&apos;ll never share your email.</p>
      </div>
    </div>
  );
}

export function PreviewFieldHorizontal() {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-row items-start gap-3">
        <label className="text-sm font-medium text-foreground min-w-[100px] pt-3">Full name</label>
        <div className="flex-1 space-y-1.5">
          <input className="flex w-full min-h-12 rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="John Doe" />
          <p className="text-xs text-muted-foreground">As it appears on your ID.</p>
        </div>
      </div>
    </div>
  );
}

export function PreviewFieldError() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <label className="text-sm font-medium text-foreground">Password</label>
      <input className="flex w-full min-h-12 rounded-md border border-destructive bg-background px-4 text-sm text-foreground" defaultValue="abc" />
      <p className="text-sm text-destructive">Password must be at least 8 characters.</p>
    </div>
  );
}
