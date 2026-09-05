"use client";

import React, { useState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExpoSnack } from "@/components/expo-snack";
import { activePillSpring, reducedMotionTransition } from "@/lib/motion";

const GLOBAL_QR_URL = "https://qr.expo.dev/eas-update?slug=exp&projectId=4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0&groupId=92d11b98-2c25-469d-bafd-8ae5522e9487&host=u.expo.dev";

// Set once a real "AniUI Playground" Snack (importing examples/expo-starter) is
// published at snack.expo.dev — publishing is a manual step tied to an Expo
// account, not something this code can do on its own. Until then the native
// tab falls back to the QR code only, same as before this was wired up.
const GLOBAL_SNACK_ID: string | null = null;

interface PreviewToggleProps {
  /** Web preview content (component playground) */
  children: React.ReactNode;
  /** Override QR code URL (defaults to global AniUI demo QR) */
  qrCodeUrl?: string;
  /** Published Expo Snack ID to embed live above the QR code (defaults to the global AniUI playground Snack, once published) */
  snackId?: string | null;
}

export function PreviewToggle({ children, qrCodeUrl, snackId }: PreviewToggleProps) {
  const resolvedSnackId = snackId !== undefined ? snackId : GLOBAL_SNACK_ID;
  const [mode, setMode] = useState<"web" | "native">("web");
  const prefersReducedMotion = useReducedMotion();
  const layoutId = useId();

  const transition = prefersReducedMotion ? reducedMotionTransition : activePillSpring;

  return (
    <div className="w-full">
      {/* Toggle bar */}
      <div className="flex items-center gap-1 mb-3 p-1 rounded-lg bg-secondary/40 w-fit">
        {(["web", "native"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              mode === m
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {mode === m && (
              <motion.span
                layoutId={`preview-toggle-${layoutId}`}
                className="absolute inset-0 rounded-md bg-background shadow-sm"
                transition={transition}
              />
            )}
            <span className="relative capitalize">{m}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {mode === "web" ? (
            children
          ) : (
            <div className="w-full rounded-lg border border-border overflow-hidden">
              <div className="flex flex-col items-center gap-4 p-8 bg-card/50">
                {resolvedSnackId && (
                  <ExpoSnack snackId={resolvedSnackId} height={420} platform="mydevice" />
                )}
                <motion.img
                  src={qrCodeUrl || GLOBAL_QR_URL}
                  alt="Scan with Expo Go"
                  className="w-36 h-36 sm:w-48 sm:h-48 rounded-xl"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                />
                <div className="text-center max-w-sm">
                  <p className="text-base font-semibold text-foreground">Preview on your device</p>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Scan this QR code with <strong>Expo Go</strong> to try all 89 AniUI components on a real iOS or Android device.
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
