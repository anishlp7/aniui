"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemePreview } from "@/components/theme-preview";
import { ThemeSelect } from "@/components/theme-select";
import { useTheme } from "@/components/theme-provider";
import { type ColorDef, themeColors, radiusOptions, resolveVars, generateCSS, hsl, shuffleTheme } from "@/lib/theme-data";

/* ── Icons ─────────────────────────────────────────────────── */

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}

/* ── Main ──────────────────────────────────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AniUI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS, Android",
  description: "shadcn/ui for React Native. 80+ accessible components built with NativeWind and TypeScript.",
  url: "https://aniui.dev",
  author: { "@type": "Person", name: "Anish" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", ratingCount: "1" },
};

const sitelinksJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AniUI",
  url: "https://aniui.dev",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://aniui.dev/docs/{search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  const { theme } = useTheme();
  const [selectedPreset, setSelectedPreset] = useState("blue");
  const [customColor, setCustomColor] = useState<ColorDef | null>(null);
  const [selectedRadius, setSelectedRadius] = useState("0.75rem");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">(theme);
  const userPickedMode = useRef(false);

  useEffect(() => {
    if (!userPickedMode.current) {
      setPreviewMode(theme);
    }
  }, [theme]);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  const color = customColor ?? themeColors.find((c) => c.name === selectedPreset) ?? themeColors[0];
  const vars = useMemo(() => resolveVars(color, previewMode), [color, previewMode]);
  const cssCode = useMemo(() => generateCSS(color, selectedRadius), [color, selectedRadius]);

  const handlePresetChange = (name: string) => {
    setSelectedPreset(name);
    setCustomColor(null);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npx @aniui/cli init");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  const handleShuffle = () => {
    userPickedMode.current = true;
    const result = shuffleTheme(selectedRadius, previewMode);
    setCustomColor(result.color);
    setSelectedRadius(result.radius);
    setPreviewMode(result.mode);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksJsonLd) }} />
    <div className="mx-auto max-w-[1400px] px-6">
      {/* ── Hero ─── */}
      <div className="flex flex-col items-center text-center pt-20 pb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-3xl leading-[1.1]">
          Beautiful React Native components.{" "}
          <span className="bg-gradient-to-r from-foreground/70 to-foreground/30 bg-clip-text text-transparent">
            Copy. Paste. Ship.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          80+ accessible components built with NativeWind and TypeScript.
          No npm install — you own every line of code.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
          {["Expo", "Bare RN", "NativeWind", "Uniwind", "TypeScript", "New Architecture"].map((label) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="text-green-500">✓</span> {label}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <Link
            href="/docs"
            className="h-11 px-7 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            href="/docs/button"
            className="h-11 px-7 rounded-md border border-border bg-background text-foreground text-sm font-medium flex items-center hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </div>

        {/* Install command */}
        <button
          onClick={handleCopyInstall}
          className="mt-6 inline-flex items-center gap-3 rounded-lg border border-border bg-secondary/30 px-5 py-2.5 font-mono text-sm text-muted-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
        >
          <span><span className="text-foreground/40 select-none">$</span> npx @aniui/cli init</span>
          <span className="text-muted-foreground/60">
            {copiedInstall ? <CheckIcon /> : <CopyIcon />}
          </span>
        </button>

        {/* Preview on device */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 rounded-lg border border-border bg-card/50 px-5 py-4">
          <img
            src="https://qr.expo.dev/eas-update?slug=exp&projectId=4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0&groupId=699b0812-e1e7-4baa-a451-1814bdbdd5e7&host=u.expo.dev"
            alt="Scan with Expo Go"
            className="w-24 h-24 rounded-lg"
          />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-foreground">Preview on your device</p>
            <p className="text-xs text-muted-foreground mt-1">
              Scan with Expo Go to try all 80+ components on a real device.
              Each component page also has an Expo Snack embed.
            </p>
          </div>
        </div>
      </div>

      {/* ── How it works ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-16">
        {[
          { step: "1", title: "Initialize", desc: "Run npx @aniui/cli init to set up theming, Tailwind config, and utilities in your Expo or bare RN project." },
          { step: "2", title: "Add components", desc: "Pick what you need with npx @aniui/cli add button card dialog — source files are copied directly into your project." },
          { step: "3", title: "Make it yours", desc: "Every component is a single file you own. Customize variants, tweak styles, or extend freely — no lock-in." },
        ].map((item) => (
          <div key={item.step} className="rounded-lg border border-border bg-card p-6">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-3">
              {item.step}
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Live Theme Preview ─── */}
      <div className="pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Make it yours</h2>
            <p className="text-sm text-muted-foreground mt-1">Pick a preset, shuffle a random color, and copy the CSS into your project.</p>
          </div>
          <Link href="/create" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            Open full theme editor &rarr;
          </Link>
        </div>

        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <ThemeSelect value={customColor ? "" : selectedPreset} onChange={handlePresetChange} />

          {/* Radius */}
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
            {radiusOptions.map((r) => (
              <button
                key={r.value}
                onClick={() => setSelectedRadius(r.value)}
                className={`h-7 px-2.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                  selectedRadius === r.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Mode */}
          <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => { userPickedMode.current = true; setPreviewMode(mode); }}
                className={`h-7 px-3 rounded text-xs font-medium capitalize transition-colors cursor-pointer ${
                  previewMode === mode
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Shuffle */}
          <button
            onClick={handleShuffle}
            className="h-8 px-3 rounded-md border border-border bg-background text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <ShuffleIcon /> Random
          </button>

          {/* Random color indicator */}
          {customColor && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: hsl(customColor.light["--primary"]) }} />
              {customColor.label}
            </span>
          )}

          <div className="sm:ml-auto">
            <button
              onClick={handleCopyCSS}
              className="h-8 px-4 rounded-md bg-primary text-primary-foreground text-xs font-medium inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
            >
              {copiedCSS ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy CSS</>}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border p-6" style={{ backgroundColor: hsl(vars["--background"]) }}>
          <ThemePreview vars={vars} radius={selectedRadius} />
        </div>
      </div>

    </div>
    </>
  );
}
