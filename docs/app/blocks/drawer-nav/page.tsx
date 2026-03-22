"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

// SVG icons — Lucide-style, 20x20, strokeWidth 1.5
// Reference: https://lucide.dev

const rnCode = `import React, { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Icon components — Lucide React Native
// https://github.com/lucide-icons/lucide
import {
  House,
  User,
  BarChart2,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
} from "lucide-react-native";

type MenuItem = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ size: number; strokeWidth: number; color: string }>;
};

const menuItems: MenuItem[] = [
  { key: "home",          label: "Home",          Icon: House },
  { key: "profile",       label: "Profile",       Icon: User },
  { key: "analytics",    label: "Analytics",     Icon: BarChart2 },
  { key: "messages",     label: "Messages",      Icon: MessageCircle },
  { key: "notifications",label: "Notifications", Icon: Bell },
  { key: "settings",     label: "Settings",      Icon: Settings },
];

export function DrawerNavContent({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (key: string) => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* User section */}
      <View className="px-5 py-6">
        <Avatar fallback="JD" size="lg" className="mb-3" />
        <Text variant="p" className="font-semibold text-foreground">John Doe</Text>
        <Text variant="small" className="text-muted-foreground">john@example.com</Text>
      </View>

      <Separator />

      {/* Menu items */}
      <ScrollView className="flex-1 px-3 py-3" showsVerticalScrollIndicator={false}>
        {menuItems.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <Pressable
              key={key}
              onPress={() => onNavigate(key)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={label}
              className={cn(
                "flex-row items-center gap-3 px-3 py-3 rounded-lg mb-0.5",
                isActive ? "bg-accent" : "active:bg-accent/50"
              )}
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                color={isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
              />
              <Text
                variant="small"
                className={cn(
                  isActive
                    ? "font-semibold text-foreground"
                    : "font-normal text-muted-foreground"
                )}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Separator />

      {/* Log Out */}
      <Pressable
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Log Out"
        className="flex-row items-center gap-3 px-6 py-4 active:opacity-70"
        onPress={() => {}}
      >
        <LogOut size={18} strokeWidth={1.5} color="hsl(var(--destructive))" />
        <Text variant="small" className="font-semibold text-destructive">Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}`;

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────

function IconHome({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function IconUser({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconBarChart({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  );
}

function IconMessage({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconBell({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function IconSettings({ active }: { active: boolean }) {
  const stroke = active ? "currentColor" : "var(--color-muted-foreground, #888)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconLogOut() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ─── Menu Items Config ─────────────────────────────────────────────────────────

type MenuItemDef = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ active: boolean }>;
};

const menuItems: MenuItemDef[] = [
  { key: "home",          label: "Home",          Icon: IconHome },
  { key: "profile",       label: "Profile",       Icon: IconUser },
  { key: "analytics",    label: "Analytics",     Icon: IconBarChart },
  { key: "messages",     label: "Messages",      Icon: IconMessage },
  { key: "notifications",label: "Notifications", Icon: IconBell },
  { key: "settings",     label: "Settings",      Icon: IconSettings },
];

// ─── Phone Frame ───────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[300px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
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

// ─── Drawer Preview ────────────────────────────────────────────────────────────

function DrawerPreview() {
  const [active, setActive] = useState("home");

  return (
    <PhoneFrame>
      <div className="min-h-[560px] flex flex-col bg-background">
        {/* User section */}
        <div className="px-5 pt-6 pb-5">
          <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary mb-3 ring-2 ring-primary/10">
            JD
          </div>
          <p className="text-sm font-semibold text-foreground leading-tight">John Doe</p>
          <p className="text-xs text-muted-foreground mt-0.5">john@example.com</p>
        </div>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Menu items */}
        <div className="flex-1 px-3 py-3 space-y-0.5">
          {menuItems.map(({ key, label, Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-100 cursor-pointer",
                  isActive
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                ].join(" ")}
              >
                <Icon active={isActive} />
                <span
                  className={[
                    "text-xs tracking-tight",
                    isActive ? "font-semibold text-foreground" : "font-normal text-muted-foreground",
                  ].join(" ")}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Log Out */}
        <button className="flex items-center gap-3 px-6 py-4 text-destructive hover:bg-destructive/5 transition-colors cursor-pointer">
          <IconLogOut />
          <span className="text-xs font-semibold">Log Out</span>
        </button>
      </div>
    </PhoneFrame>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function DrawerNavBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Drawer Navigation</h1>
        <p className="text-muted-foreground text-lg">
          Side drawer with user profile, icon-labeled navigation menu, and a log out action. Works with React Navigation&apos;s drawer navigator or a custom drawer implementation.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <DrawerPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add text avatar separator`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="components/drawer-nav.tsx" />
      </div>
    </div>
  );
}
