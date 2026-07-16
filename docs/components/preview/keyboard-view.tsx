"use client";

import React from "react";

export function PreviewKeyboardViewDemo() {
  return (
    <div className="w-48 mx-auto">
      <div className="border-2 border-foreground/20 rounded-[2rem] p-1 bg-background">
        <div className="rounded-[1.5rem] overflow-hidden bg-background">
          {/* Screen content pushed up by the keyboard */}
          <div className="h-20 flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Sign in</span>
          </div>
          {/* Form stays visible above the keyboard */}
          <div className="px-3 pb-3 space-y-2">
            <div className="h-8 rounded-md border border-input bg-background flex items-center px-2">
              <span className="text-[10px] text-muted-foreground">Email</span>
            </div>
            <div className="h-8 rounded-md border border-input bg-background flex items-center px-2">
              <span className="text-[10px] text-muted-foreground">Password</span>
            </div>
            <div className="h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-[10px] font-medium text-primary-foreground">Sign In</span>
            </div>
          </div>
          {/* Keyboard area */}
          <div className="h-16 bg-muted border-t border-border flex items-center justify-center">
            <span className="text-[8px] text-muted-foreground">Keyboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
