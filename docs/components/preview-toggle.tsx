"use client";

import React, { useState } from "react";

interface PreviewToggleProps {
  /** Web preview content (component playground) */
  children: React.ReactNode;
  /** Expo Snack ID for native preview */
  snackId?: string;
  /** Full Expo Snack URL */
  snackUrl?: string;
  /** QR code image path for Expo Go scanning */
  qrCodeUrl?: string;
}

export function PreviewToggle({ children, snackId, snackUrl, qrCodeUrl }: PreviewToggleProps) {
  const [mode, setMode] = useState<"web" | "native">("web");
  const hasNative = !!(snackId || snackUrl || qrCodeUrl);

  const resolvedSnackUrl = snackUrl
    || (snackId ? `https://snack.expo.dev/embedded/${snackId}?preview=true&platform=ios&theme=light` : null);

  return (
    <div className="w-full">
      {/* Toggle bar */}
      {hasNative && (
        <div className="flex items-center gap-1 mb-3 p-1 rounded-lg bg-secondary/40 w-fit">
          <button
            onClick={() => setMode("web")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              mode === "web"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Web Preview
          </button>
          <button
            onClick={() => setMode("native")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              mode === "native"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Native Preview
          </button>
        </div>
      )}

      {/* Content */}
      {mode === "web" ? (
        children
      ) : (
        <div className="w-full rounded-lg border border-border overflow-hidden">
          {resolvedSnackUrl && (
            <iframe
              src={resolvedSnackUrl}
              style={{ width: "100%", height: 500, border: 0 }}
              loading="lazy"
              title="Expo Snack — Native Preview"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          )}

          {qrCodeUrl && (
            <div className="flex flex-col items-center gap-3 p-6 border-t border-border bg-card/50">
              <img src={qrCodeUrl} alt="Scan with Expo Go" className="w-40 h-40 rounded-lg" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Scan with Expo Go</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Open the Expo Go app on your device and scan this QR code
                </p>
              </div>
            </div>
          )}

          {!resolvedSnackUrl && !qrCodeUrl && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <p className="text-sm text-muted-foreground">
                Native preview coming soon. Clone the example app to test on device:
              </p>
              <code className="mt-2 text-xs bg-secondary/50 px-3 py-1.5 rounded-md font-mono text-foreground">
                cd examples/expo-starter && npx expo start
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
