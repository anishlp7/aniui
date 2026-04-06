"use client";

import React from "react";

interface ExpoSnackProps {
  /** Expo Snack ID or full URL */
  snackId: string;
  /** Height of the embed */
  height?: number;
  /** Preview mode */
  preview?: "true" | "false";
  /** Platform to preview */
  platform?: "web" | "ios" | "android" | "mydevice";
  /** Theme */
  theme?: "light" | "dark";
}

export function ExpoSnack({
  snackId,
  height = 500,
  preview = "true",
  platform = "ios",
  theme = "light",
}: ExpoSnackProps) {
  const url = snackId.startsWith("http")
    ? snackId
    : `https://snack.expo.dev/embedded/${snackId}?preview=${preview}&platform=${platform}&theme=${theme}`;

  return (
    <div className="w-full rounded-lg border border-border overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
          <rect width="7" height="12" x="2" y="6" rx="1" />
          <rect width="7" height="12" x="15" y="6" rx="1" />
        </svg>
        <span className="text-sm font-medium text-muted-foreground">Try on a real device with Expo Snack</span>
      </div>
      <iframe
        src={url}
        style={{ width: "100%", height, border: 0 }}
        loading="lazy"
        title="Expo Snack"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
