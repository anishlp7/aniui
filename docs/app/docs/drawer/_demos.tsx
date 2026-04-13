"use client";
import { PreviewDrawer } from "@/components/preview/drawer";

export function DrawerDefaultDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <PreviewDrawer />
    </div>
  );
}

export function DrawerLeftDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewDrawer side="left" />
    </div>
  );
}

export function DrawerRightDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PreviewDrawer side="right" />
    </div>
  );
}
