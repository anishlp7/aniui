"use client";

import { PreviewBanner } from "@/components/preview/banner";

export function BannerDemo() {
  return (
    <PreviewBanner variant="info" onDismiss={() => {}}>
      New version available. Update now for the latest features.
    </PreviewBanner>
  );
}

export function BannerActionDemo() {
  return (
    <PreviewBanner
      variant="info"
      actionLabel="Update"
      onAction={() => {}}
      onDismiss={() => {}}
    >
      A new version is available.
    </PreviewBanner>
  );
}
