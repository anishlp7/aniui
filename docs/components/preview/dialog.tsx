"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[280px]">
      {/* Trigger */}
      <div className="flex items-center justify-center h-full min-h-[280px]">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Open Dialog
        </button>
      </div>

      {/* Modal overlay — absolute, contained in phone frame */}
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <div className="absolute inset-0 bg-black/50 rounded-lg" onClick={() => setOpen(false)} />
          <div className="relative z-20 w-[260px] rounded-xl bg-card p-5 shadow-xl">
            <div className="pb-3">
              <h3 className="text-base font-semibold text-card-foreground">Edit Profile</h3>
              <p className="text-sm text-muted-foreground mt-1">Make changes to your profile here.</p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="flex flex-row justify-end gap-2 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
