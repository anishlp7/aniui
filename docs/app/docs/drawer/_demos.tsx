"use client";
import { PreviewDrawer } from "@/components/preview/drawer";

export function DrawerDefaultDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PreviewDrawer trigger="Open Navigation" title="Navigation" />
    </div>
  );
}

export function DrawerLeftDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewDrawer side="left" trigger="Open Navigation" title="Navigation" />
    </div>
  );
}

export function DrawerRightDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewDrawer side="right" trigger="Open Filters" title="Filters">
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
              In stock only
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-input" />
              Free shipping
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-input" />
              On sale
            </label>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex-1 rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer">
              Apply
            </button>
            <button type="button" className="flex-1 rounded-md border border-input bg-background py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </PreviewDrawer>
    </div>
  );
}
