"use client";

import React, { useState } from "react";

const GLOBAL_QR_URL = "https://qr.expo.dev/eas-update?slug=exp&projectId=cf032338-2612-4ba6-9212-f2ec55f6a254&groupId=3f6e025d-ab3a-40cf-961d-b6297832c439&host=u.expo.dev";

interface PreviewToggleProps {
  /** Web preview content (component playground) */
  children: React.ReactNode;
  /** Override QR code URL (defaults to global AniUI demo QR) */
  qrCodeUrl?: string;
}

export function PreviewToggle({ children, qrCodeUrl }: PreviewToggleProps) {
  const [mode, setMode] = useState<"web" | "native">("web");

  return (
    <div className="w-full">
      {/* Toggle bar */}
      <div className="flex items-center gap-1 mb-3 p-1 rounded-lg bg-secondary/40 w-fit">
        <button
          onClick={() => setMode("web")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            mode === "web"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Web
        </button>
        <button
          onClick={() => setMode("native")}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            mode === "native"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Native
        </button>
      </div>

      {/* Content */}
      {mode === "web" ? (
        children
      ) : (
        <div className="w-full rounded-lg border border-border overflow-hidden">
          <div className="flex flex-col items-center gap-4 p-8 bg-card/50">
            <img
              src={qrCodeUrl || GLOBAL_QR_URL}
              alt="Scan with Expo Go"
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-xl"
            />
            <div className="text-center max-w-sm">
              <p className="text-base font-semibold text-foreground">Preview on your device</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Scan this QR code with <strong>Expo Go</strong> to try all 81 AniUI components on a real iOS or Android device.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href="https://apps.apple.com/app/expo-go/id982107779"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                iOS App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
