"use client";

import React, { useState } from "react";
import { PreviewButton } from "@/components/preview/button";
import { PreviewCard, PreviewCardHeader, PreviewCardTitle, PreviewCardDescription, PreviewCardContent, PreviewCardFooter } from "@/components/preview/card";
import { PreviewCheckbox } from "@/components/preview/checkbox";
import { PreviewSwitch } from "@/components/preview/switch";
import { PreviewBadge } from "@/components/preview/badge";
import { PreviewLabel } from "@/components/preview/label";
import { PreviewSeparator } from "@/components/preview/separator";
import { PreviewProgress } from "@/components/preview/progress";
import { PreviewAvatar } from "@/components/preview/avatar";
import { PreviewTabs, PreviewTabsList, PreviewTabsTrigger, PreviewTabsContent } from "@/components/preview/tabs";
import { PreviewRadioGroup, PreviewRadioGroupItem } from "@/components/preview/radio-group";
import { PreviewAlert, PreviewAlertDescription } from "@/components/preview/alert";
import { PreviewSearchBar } from "@/components/preview/search-bar";
import { PreviewSlider } from "@/components/preview/slider";
import { PreviewChip } from "@/components/preview/chip";
import { PreviewAccordion, PreviewAccordionItem } from "@/components/preview/accordion";
import { PreviewRating } from "@/components/preview/rating";
import { PreviewSegmentedControl } from "@/components/preview/segmented-control";
import { PreviewStepper } from "@/components/preview/stepper";
import { PreviewSkeleton } from "@/components/preview/skeleton";

export function ThemePreview({ vars, radius }: { vars: Record<string, string>; radius: string }) {
  // ── State ──
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [plan, setPlan] = useState("pro");
  const [rating, setRating] = useState(4);
  const [volume, setVolume] = useState(72);
  const [brightness, setBrightness] = useState(50);
  const [quantity, setQuantity] = useState(2);
  const [view, setView] = useState("Grid");
  const [search, setSearch] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [filters, setFilters] = useState<string[]>(["React Native", "TypeScript"]);
  const [loading, setLoading] = useState(false);

  const toggleFilter = (f: string) =>
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  // Build CSS variable overrides so components pick up the theme
  const cssVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    cssVars[key] = value;
  }

  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      style={{ ...cssVars, "--radius": radius } as React.CSSProperties}
    >
      {/* ── 1. Dashboard Card (full width) ── */}
      <PreviewCard className="col-span-full lg:col-span-2">
        <PreviewCardHeader>
          <div className="flex items-center justify-between">
            <div>
              <PreviewCardTitle className="text-lg">Dashboard</PreviewCardTitle>
              <PreviewCardDescription>Your project overview at a glance.</PreviewCardDescription>
            </div>
            <div className="flex gap-2">
              <PreviewBadge>Live</PreviewBadge>
              <PreviewBadge variant="outline">v2.4.1</PreviewBadge>
            </div>
          </div>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-5">
          <PreviewSearchBar
            size="sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Users", value: "2,847", change: "+12%" },
              { label: "Revenue", value: "$48.2k", change: "+8.1%" },
              { label: "Active", value: "1,024", change: "+24%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-background p-3">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-green-500 font-medium">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Filter by tags</p>
            <div className="flex flex-wrap gap-2">
              {["React Native", "TypeScript", "NativeWind", "Expo", "iOS", "Android"].map((tag) => (
                <PreviewChip
                  key={tag}
                  size="sm"
                  selected={filters.includes(tag)}
                  onClick={() => toggleFilter(tag)}
                >
                  {tag}
                </PreviewChip>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Sprint progress</span>
              <span className="font-medium text-foreground">76%</span>
            </div>
            <PreviewProgress value={76} />
          </div>
        </PreviewCardContent>
        <PreviewCardFooter className="gap-3">
          <PreviewButton size="sm" onClick={handleAction} loading={loading}>Deploy</PreviewButton>
          <PreviewButton size="sm" variant="outline">View Logs</PreviewButton>
          <PreviewButton size="sm" variant="ghost">Settings</PreviewButton>
        </PreviewCardFooter>
      </PreviewCard>

      {/* ── 2. Notifications ── */}
      <PreviewCard>
        <PreviewCardHeader>
          <PreviewCardTitle className="text-base">Preferences</PreviewCardTitle>
          <PreviewCardDescription>Manage your notification settings.</PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-4">
          {[
            { label: "Push notifications", desc: "Mobile alerts", state: notifications, set: setNotifications },
            { label: "Marketing emails", desc: "Product updates", state: marketing, set: setMarketing },
            { label: "Security alerts", desc: "Login activity", state: updates, set: setUpdates },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <PreviewSwitch checked={item.state} onCheckedChange={item.set} />
              </div>
              <PreviewSeparator className="mt-4" />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <PreviewCheckbox checked={agreed} onCheckedChange={setAgreed} />
            <span className="text-xs text-muted-foreground">Enable digest mode</span>
          </div>
        </PreviewCardContent>
      </PreviewCard>

      {/* ── 3. Pricing / Plan ── */}
      <PreviewCard>
        <PreviewCardHeader>
          <div className="flex items-center justify-between">
            <PreviewCardTitle className="text-base">Choose Plan</PreviewCardTitle>
            <PreviewBadge variant="secondary">Popular</PreviewBadge>
          </div>
          <PreviewCardDescription>Select your subscription tier.</PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-4">
          <PreviewRadioGroup value={plan} onValueChange={setPlan} className="gap-3">
            <PreviewRadioGroupItem value="free" label="Free — $0/mo" />
            <PreviewRadioGroupItem value="pro" label="Pro — $9/mo" />
            <PreviewRadioGroupItem value="team" label="Team — $29/mo" />
            <PreviewRadioGroupItem value="enterprise" label="Enterprise — Custom" />
          </PreviewRadioGroup>
          <PreviewSeparator />
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Satisfaction</p>
            <PreviewRating value={rating} onChange={setRating} size="md" />
          </div>
        </PreviewCardContent>
        <PreviewCardFooter>
          <PreviewButton size="sm" className="w-full">
            {plan === "free" ? "Get Started" : "Upgrade Now"}
          </PreviewButton>
        </PreviewCardFooter>
      </PreviewCard>

      {/* ── 4. Controls ── */}
      <PreviewCard>
        <PreviewCardHeader>
          <PreviewCardTitle className="text-base">Controls</PreviewCardTitle>
          <PreviewCardDescription>Interactive sliders, steppers, and segments.</PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-5">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <PreviewLabel className="text-xs">Volume</PreviewLabel>
              <span className="font-medium text-foreground">{volume}%</span>
            </div>
            <PreviewSlider value={volume} onValueChange={setVolume} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <PreviewLabel className="text-xs">Brightness</PreviewLabel>
              <span className="font-medium text-foreground">{brightness}%</span>
            </div>
            <PreviewSlider value={brightness} onValueChange={setBrightness} />
          </div>
          <PreviewSeparator />
          <div className="space-y-2">
            <PreviewLabel className="text-xs">Quantity</PreviewLabel>
            <PreviewStepper size="sm" value={quantity} onChange={setQuantity} min={1} max={10} />
          </div>
          <div className="space-y-2">
            <PreviewLabel className="text-xs">View mode</PreviewLabel>
            <PreviewSegmentedControl
              size="sm"
              options={["List", "Grid", "Board"]}
              value={view}
              onValueChange={setView}
            />
          </div>
        </PreviewCardContent>
      </PreviewCard>

      {/* ── 5. Team + Tabs ── */}
      <PreviewCard>
        <PreviewCardHeader>
          <PreviewCardTitle className="text-base">Team</PreviewCardTitle>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-4">
          <PreviewTabs defaultValue="members">
            <PreviewTabsList className="w-full">
              <PreviewTabsTrigger value="members">Members</PreviewTabsTrigger>
              <PreviewTabsTrigger value="activity">Activity</PreviewTabsTrigger>
            </PreviewTabsList>
            <PreviewTabsContent value="members" className="space-y-3 pt-3">
              {[
                { name: "Alice Chen", role: "Admin", initials: "AC" },
                { name: "Bob Smith", role: "Developer", initials: "BS" },
                { name: "Carol Davis", role: "Designer", initials: "CD" },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <PreviewAvatar fallback={m.initials} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <PreviewBadge variant={m.role === "Admin" ? "default" : "secondary"} className="text-[10px]">{m.role}</PreviewBadge>
                </div>
              ))}
            </PreviewTabsContent>
            <PreviewTabsContent value="activity" className="space-y-3 pt-3">
              {[
                { text: "Alice pushed 3 commits", time: "2m ago" },
                { text: "Bob opened a pull request", time: "15m ago" },
                { text: "Carol updated design tokens", time: "1h ago" },
              ].map((a) => (
                <div key={a.text} className="flex justify-between items-start">
                  <p className="text-xs text-foreground">{a.text}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{a.time}</span>
                </div>
              ))}
            </PreviewTabsContent>
          </PreviewTabs>
        </PreviewCardContent>
        <PreviewCardFooter>
          <PreviewButton size="sm" variant="outline" className="w-full">+ Invite Member</PreviewButton>
        </PreviewCardFooter>
      </PreviewCard>

      {/* ── 6. FAQ / Accordion + Alerts ── */}
      <PreviewCard>
        <PreviewCardHeader>
          <PreviewCardTitle className="text-base">FAQ</PreviewCardTitle>
          <PreviewCardDescription>Common questions about AniUI.</PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-2">
          <PreviewAccordion defaultValue="q1">
            <PreviewAccordionItem value="q1" trigger="Is AniUI free?">
              <p className="text-sm text-muted-foreground">Yes! AniUI is MIT licensed and completely free to use in personal and commercial projects.</p>
            </PreviewAccordionItem>
            <PreviewAccordionItem value="q2" trigger="Does it support Expo?">
              <p className="text-sm text-muted-foreground">AniUI supports Expo SDK 53 & 54, as well as bare React Native CLI 0.76+.</p>
            </PreviewAccordionItem>
            <PreviewAccordionItem value="q3" trigger="Can I customize themes?">
              <p className="text-sm text-muted-foreground">Absolutely — AniUI uses CSS variables for theming. Customize everything in global.css.</p>
            </PreviewAccordionItem>
          </PreviewAccordion>
          <div className="pt-2">
            <PreviewAlert variant="success" title="Tip">
              <PreviewAlertDescription>You own every line of code. Fork, modify, and ship.</PreviewAlertDescription>
            </PreviewAlert>
          </div>
        </PreviewCardContent>
      </PreviewCard>

      {/* ── 7. Loading States ── */}
      <PreviewCard className="col-span-full lg:col-span-1">
        <PreviewCardHeader>
          <PreviewCardTitle className="text-base">Loading States</PreviewCardTitle>
          <PreviewCardDescription>Skeleton and button loading patterns.</PreviewCardDescription>
        </PreviewCardHeader>
        <PreviewCardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <PreviewSkeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <PreviewSkeleton className="h-3 w-3/4 rounded" />
              <PreviewSkeleton className="h-3 w-1/2 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <PreviewSkeleton className="h-3 w-full rounded" />
            <PreviewSkeleton className="h-3 w-5/6 rounded" />
            <PreviewSkeleton className="h-3 w-4/6 rounded" />
          </div>
          <PreviewSeparator />
          <div className="flex flex-wrap gap-2">
            <PreviewButton size="sm" loading>Loading</PreviewButton>
            <PreviewButton size="sm" variant="outline" disabled>Disabled</PreviewButton>
            <PreviewButton size="sm" variant="destructive">Delete</PreviewButton>
          </div>
          <div className="flex gap-2">
            <PreviewBadge variant="destructive">Error</PreviewBadge>
            <PreviewBadge variant="outline">Pending</PreviewBadge>
            <PreviewBadge>Success</PreviewBadge>
          </div>
        </PreviewCardContent>
      </PreviewCard>

    </div>
  );
}
