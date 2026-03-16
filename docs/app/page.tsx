"use client";

import Link from "next/link";
import { PreviewButton } from "@/components/preview/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6">
      <div className="max-w-3xl text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          React Native Component Library
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
          Beautiful components{" "}
          <span className="bg-gradient-to-r from-foreground/80 to-foreground/40 bg-clip-text text-transparent">
            for React Native
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
          Copy and paste components for your React Native app. Open source.
          Customizable. Built with NativeWind and TypeScript.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/docs">
            <PreviewButton size="lg">Get Started</PreviewButton>
          </Link>
          <Link href="/docs/button">
            <PreviewButton variant="outline" size="lg">
              Browse Components
            </PreviewButton>
          </Link>
        </div>

        {/* Install command */}
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-center rounded-lg border border-border bg-secondary/50 px-4 py-3 font-mono text-sm text-muted-foreground">
            <span className="text-foreground/60 mr-2">$</span>
            npx aniui init
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {[
            "NativeWind Styling",
            "TypeScript",
            "Expo & Bare RN",
            "iOS + Android",
            "Dark Mode",
            "Accessible",
            "Copy & Paste",
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
