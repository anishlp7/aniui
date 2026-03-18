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
              <p className="text-xs font-semibold text-foreground mb-2">Tier 1 - Core</p>
              <Link href="/docs/button" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                Button
              </Link>
              <Link href="/docs/text" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Text
              </Link>
              <Link href="/docs/input" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Input
              </Link>
              <Link href="/docs/card" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Card
              </Link>
              <Link href="/docs/badge" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Badge
              </Link>
              <Link href="/docs/separator" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Separator
              </Link>
              <Link href="/docs/avatar" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Avatar
              </Link>
              <Link href="/docs/alert" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Alert
              </Link>
              <Link href="/docs/label" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Label
              </Link>
              <Link href="/docs/switch" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Switch
              </Link>
              <Link href="/docs/checkbox" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Checkbox
              </Link>
              <Link href="/docs/radio-group" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Radio Group
              </Link>
              <Link href="/docs/progress" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Progress
              </Link>
              <Link href="/docs/spinner" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Spinner
              </Link>
              <Link href="/docs/textarea" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Textarea
              </Link>
              <Link href="/docs/list" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                List
              </Link>
              <Link href="/docs/slider" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Slider
              </Link>
              <Link href="/docs/toggle" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Toggle
              </Link>
              <Link href="/docs/toggle-group" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Toggle Group
              </Link>
              <Link href="/docs/input-otp" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Input OTP
              </Link>
              <Link href="/docs/table" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Table
              </Link>
              <Link href="/docs/calendar" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Calendar
              </Link>
              <Link href="/docs/date-picker" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Date Picker
              </Link>
              <Link href="/docs/search-bar" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                SearchBar
              </Link>
              <Link href="/docs/chip" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Chip
              </Link>
              <Link href="/docs/fab" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                FAB
              </Link>
              <Link href="/docs/empty-state" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                EmptyState
              </Link>
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-xs font-semibold text-foreground mb-2">Tier 2 - Animated</p>
              <Link href="/docs/skeleton" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                Skeleton
              </Link>
              <Link href="/docs/accordion" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Accordion
              </Link>
              <Link href="/docs/tabs" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Tabs
              </Link>
              <Link href="/docs/collapsible" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Collapsible
              </Link>
              <Link href="/docs/toast" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Toast
              </Link>
              <Link href="/docs/dialog" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Dialog
              </Link>
              <Link href="/docs/alert-dialog" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Alert Dialog
              </Link>
              <Link href="/docs/tooltip" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Tooltip
              </Link>
              <Link href="/docs/popover" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Popover
              </Link>
              <Link href="/docs/drawer" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Drawer
              </Link>
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-xs font-semibold text-foreground mb-2">Tier 3 - Native</p>
              <Link href="/docs/bottom-sheet" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                Bottom Sheet
              </Link>
              <Link href="/docs/action-sheet" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Action Sheet
              </Link>
              <Link href="/docs/select" className="block text-sm text-muted-foreground hover:text-foreground mt-2" onClick={() => setMobileOpen(false)}>
                Select
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
