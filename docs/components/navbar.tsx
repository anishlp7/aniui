"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <button
            className="mr-4 md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-foreground mr-8">
            <span className="text-lg">AniUI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/docs/button" className="text-muted-foreground hover:text-foreground transition-colors">
              Components
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="https://github.com/anish/aniui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <GitHubIcon />
            </a>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 bg-background md:hidden">
          <nav className="space-y-4 p-6">
            <Link href="/docs" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Introduction
            </Link>
            <Link href="/docs/installation" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Installation
            </Link>
            <Link href="/docs/cli" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              CLI
            </Link>
            <Link href="/docs/theming" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Theming
            </Link>
            <Link href="/docs/dark-mode" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
              Dark Mode
            </Link>
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-xs font-semibold text-foreground mb-2">Components</p>
              {[
                ["Accordion", "/docs/accordion"],
                ["Action Sheet", "/docs/action-sheet"],
                ["Alert", "/docs/alert"],
                ["Alert Dialog", "/docs/alert-dialog"],
                ["Avatar", "/docs/avatar"],
                ["Badge", "/docs/badge"],
                ["Banner", "/docs/banner"],
                ["Bottom Sheet", "/docs/bottom-sheet"],
                ["Button", "/docs/button"],
                ["Calendar", "/docs/calendar"],
                ["Card", "/docs/card"],
                ["Carousel", "/docs/carousel"],
                ["Checkbox", "/docs/checkbox"],
                ["Chip", "/docs/chip"],
                ["Collapsible", "/docs/collapsible"],
                ["Date Picker", "/docs/date-picker"],
                ["Dialog", "/docs/dialog"],
                ["Drawer", "/docs/drawer"],
                ["Dropdown Menu", "/docs/dropdown-menu"],
                ["Empty State", "/docs/empty-state"],
                ["FAB", "/docs/fab"],
                ["Image", "/docs/image"],
                ["Input", "/docs/input"],
                ["Input OTP", "/docs/input-otp"],
                ["Label", "/docs/label"],
                ["List", "/docs/list"],
                ["Popover", "/docs/popover"],
                ["Progress", "/docs/progress"],
                ["Radio Group", "/docs/radio-group"],
                ["Rating", "/docs/rating"],
                ["Search Bar", "/docs/search-bar"],
                ["Segmented Control", "/docs/segmented-control"],
                ["Select", "/docs/select"],
                ["Separator", "/docs/separator"],
                ["Skeleton", "/docs/skeleton"],
                ["Slider", "/docs/slider"],
                ["Spinner", "/docs/spinner"],
                ["Stepper", "/docs/stepper"],
                ["Switch", "/docs/switch"],
                ["Table", "/docs/table"],
                ["Tabs", "/docs/tabs"],
                ["Text", "/docs/text"],
                ["Textarea", "/docs/textarea"],
                ["Toast", "/docs/toast"],
                ["Toggle", "/docs/toggle"],
                ["Toggle Group", "/docs/toggle-group"],
                ["Tooltip", "/docs/tooltip"],
              ].map(([title, href], i) => (
                <Link key={href} href={href} className={`block text-sm text-muted-foreground hover:text-foreground${i > 0 ? " mt-2" : ""}`} onClick={() => setMobileOpen(false)}>
                  {title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
