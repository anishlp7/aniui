"use client";

import { useState } from "react";

type Platform = "expo54" | "expo55" | "bare";

function PlatformSwitcher({ platform, onSwitch }: { platform: Platform; onSwitch: (p: Platform) => void }) {
  const tabs: { key: Platform; label: string }[] = [
    { key: "expo54", label: "Expo SDK 53/54" },
    { key: "expo55", label: "Expo SDK 55" },
    { key: "bare", label: "Bare React Native" },
  ];
  return (
    <div className="flex rounded-lg border border-border p-1 bg-muted/30 w-fit">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onSwitch(t.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            platform === t.key
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function ManualSetupToggle({
  sdk54Steps,
  sdk55Steps,
  bareSteps,
}: {
  sdk54Steps: React.ReactNode;
  sdk55Steps: React.ReactNode;
  bareSteps: React.ReactNode;
}) {
  const [platform, setPlatform] = useState<Platform>("expo54");
  const [showManual, setShowManual] = useState(false);

  return (
    <>
      <div>
        <button
          onClick={() => setShowManual(!showManual)}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className={`transition-transform ${showManual ? "rotate-90" : ""}`}>&#9654;</span>
          Manual Setup (platform-specific steps)
        </button>
        <p className="text-sm text-muted-foreground mt-1">
          If you prefer to install dependencies yourself or need platform-specific guidance.
        </p>
      </div>

      {showManual && (
        <div className="space-y-6 pl-4 border-l-2 border-border">
          <PlatformSwitcher platform={platform} onSwitch={setPlatform} />
          {platform === "expo54" && sdk54Steps}
          {platform === "expo55" && sdk55Steps}
          {platform === "bare" && bareSteps}
        </div>
      )}
    </>
  );
}
