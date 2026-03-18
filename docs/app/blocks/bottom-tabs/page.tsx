"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const tabs = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "cart", label: "Cart" },
  { key: "profile", label: "Profile" },
] as const;

type TabKey = typeof tabs[number]["key"];

function TabIcon({ tabKey, active }: { tabKey: TabKey; active: boolean }) {
  if (tabKey === "home") return <HomeIcon active={active} />;
  if (tabKey === "search") return <SearchIcon />;
  if (tabKey === "cart") return <CartIcon active={active} />;
  return <ProfileIcon active={active} />;
}

export function BottomTabBar({
  active,
  onTabPress,
}: {
  active: TabKey;
  onTabPress: (key: TabKey) => void;
}) {
  return (
    <View className="flex-row border-t border-border bg-background pb-6 pt-2 px-2">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            className="flex-1 items-center gap-1 py-1"
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View className={cn(isActive ? "text-primary" : "text-muted-foreground opacity-50")}>
              <TabIcon tabKey={tab.key} active={isActive} />
            </View>
            <Text
              className={cn(
                "text-[10px] leading-none",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {tab.label}
            </Text>
            {isActive && (
              <View className="absolute -bottom-0 h-0.5 w-5 rounded-full bg-primary" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export function BottomTabsScreen() {
  const [active, setActive] = useState<TabKey>("home");
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text variant="h3" className="capitalize mb-1">{active}</Text>
        <Text variant="muted">Screen content goes here</Text>
      </View>
      <BottomTabBar active={active} onTabPress={setActive} />
    </View>
  );
}`;

// SVG icons for the preview
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

type TabKey = "home" | "search" | "cart" | "profile";

const tabs: { key: TabKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "cart", label: "Cart" },
  { key: "profile", label: "Profile" },
];

function TabIcon({ tabKey, active }: { tabKey: TabKey; active: boolean }) {
  if (tabKey === "home") return <HomeIcon active={active} />;
  if (tabKey === "search") return <SearchIcon />;
  if (tabKey === "cart") return <CartIcon active={active} />;
  return <ProfileIcon active={active} />;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      <div className="flex justify-center pt-2 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      <div className="flex justify-center pb-2 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function BottomTabsPreview() {
  const [active, setActive] = useState<TabKey>("home");

  return (
    <PhoneFrame>
      {/* Screen content area */}
      <div className="flex items-center justify-center min-h-[420px] px-5 py-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-border flex items-center justify-center mx-auto mb-4 text-primary/40">
            <TabIcon tabKey={active} active={false} />
          </div>
          <p className="text-base font-semibold text-foreground capitalize mb-1">{active}</p>
          <p className="text-xs text-muted-foreground">Screen content goes here</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-t border-border bg-background pt-2 pb-4">
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={[
                "flex-1 flex flex-col items-center gap-1 py-1 cursor-pointer relative transition-colors",
                isActive ? "text-primary" : "text-muted-foreground opacity-50",
              ].join(" ")}
            >
              <TabIcon tabKey={tab.key} active={isActive} />
              <span
                className={[
                  "text-[10px] leading-none",
                  isActive ? "font-semibold" : "",
                ].join(" ")}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </PhoneFrame>
  );
}

export default function BottomTabsBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bottom Tabs</h1>
        <p className="text-muted-foreground text-lg">
          Mobile bottom tab navigation bar with active state indicators. Works as a custom{" "}
          <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">tabBar</code> for
          React Navigation.
        </p>
      </div>

      {/* Interactive preview */}
      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <BottomTabsPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="components/bottom-tab-bar.tsx" />
      </div>
    </div>
  );
}
