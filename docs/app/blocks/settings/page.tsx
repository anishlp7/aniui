"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 pt-6 pb-3">
        <Text variant="h3" className="font-bold">Settings</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* User Card */}
        <Pressable
          className="flex-row items-center mx-4 mb-6 p-4 rounded-2xl border border-border bg-card"
          accessibilityRole="button"
          accessible={true}
        >
          <Avatar fallback="JD" size="md" />
          <View className="flex-1 ml-3">
            <Text variant="p" className="font-semibold">John Doe</Text>
            <Text variant="small" className="text-muted-foreground">john@example.com</Text>
          </View>
          <View className="w-5 h-5 items-center justify-center">
            <Text className="text-muted-foreground text-base leading-none">›</Text>
          </View>
        </Pressable>

        {/* Notifications Section */}
        <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest px-6 mb-2">
          Notifications
        </Text>
        <View className="mx-4 rounded-2xl border border-border bg-card overflow-hidden mb-6">
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-1">
              <Text variant="p" className="font-medium">Push Notifications</Text>
              <Text variant="small" className="text-muted-foreground mt-0.5">Alerts and reminders</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              accessibilityRole="switch"
            />
          </View>
          <Separator />
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-1">
              <Text variant="p" className="font-medium">Email Notifications</Text>
              <Text variant="small" className="text-muted-foreground mt-0.5">Weekly digest and updates</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* Appearance Section */}
        <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest px-6 mb-2">
          Appearance
        </Text>
        <View className="mx-4 rounded-2xl border border-border bg-card overflow-hidden mb-6">
          <View className="flex-row items-center justify-between px-4 py-4">
            <View className="flex-1">
              <Text variant="p" className="font-medium">Dark Mode</Text>
              <Text variant="small" className="text-muted-foreground mt-0.5">Switch to dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              accessibilityRole="switch"
            />
          </View>
        </View>

        {/* General Section */}
        <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest px-6 mb-2">
          General
        </Text>
        <View className="mx-4 rounded-2xl border border-border bg-card overflow-hidden mb-6">
          {[
            { label: "Language", value: "English" },
            { label: "Privacy Policy", value: null },
            { label: "Terms of Service", value: null },
          ].map((item, i, arr) => (
            <View key={item.label}>
              <Pressable
                className="flex-row items-center justify-between px-4 py-4"
                accessibilityRole="button"
                accessible={true}
              >
                <Text variant="p" className="font-medium flex-1">{item.label}</Text>
                <View className="flex-row items-center gap-1.5">
                  {item.value && (
                    <Text variant="small" className="text-muted-foreground">{item.value}</Text>
                  )}
                  <Text className="text-muted-foreground text-base leading-none">›</Text>
                </View>
              </Pressable>
              {i < arr.length - 1 && <Separator />}
            </View>
          ))}
        </View>

        {/* Danger Zone */}
        <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest px-6 mb-2">
          Danger Zone
        </Text>
        <View className="mx-4 rounded-2xl border border-destructive/30 bg-card overflow-hidden mb-8">
          <Pressable
            className="flex-row items-center justify-between px-4 py-4"
            accessibilityRole="button"
            accessible={true}
          >
            <Text className="text-sm font-medium text-destructive flex-1">Delete Account</Text>
            <Text className="text-destructive text-base leading-none">›</Text>
          </Pressable>
        </View>

        {/* App Version */}
        <Text variant="small" className="text-muted-foreground text-center">
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}`;

// SVG Icons
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        checked ? "bg-primary" : "bg-input"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[22px] w-[22px] rounded-full bg-background shadow-md ring-0 transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mb-2">
      {children}
    </p>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.8rem] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden ring-1 ring-foreground/5">
      {/* Notch */}
      <div className="flex justify-center pt-3 pb-1 bg-background">
        <div className="h-[22px] w-[88px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center pb-3 pt-2 bg-background">
        <div className="h-[5px] w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function SettingsPreview() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <PhoneFrame>
      <div className="max-h-[600px] overflow-y-auto bg-background">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <p className="text-[22px] font-bold tracking-tight text-foreground">Settings</p>
        </div>

        <div className="px-4 space-y-5 pb-2">
          {/* User Card */}
          <div className="p-3.5 rounded-2xl border border-border bg-card flex items-center cursor-pointer hover:bg-accent/40 transition-colors group">
            <div className="h-11 w-11 rounded-full bg-primary/15 flex items-center justify-center text-[13px] font-bold text-primary shrink-0 ring-2 ring-primary/10">
              JD
            </div>
            <div className="flex-1 ml-3 min-w-0">
              <p className="text-[14px] font-semibold text-foreground leading-snug">John Doe</p>
              <p className="text-[12px] text-muted-foreground truncate leading-snug mt-0.5">john@example.com</p>
            </div>
            <span className="text-muted-foreground/60 group-hover:text-muted-foreground transition-colors ml-2">
              <ChevronRight />
            </span>
          </div>

          {/* Notifications Section */}
          <div>
            <SectionLabel>Notifications</SectionLabel>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-foreground leading-snug">Push Notifications</p>
                  <p className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">Alerts and reminders</p>
                </div>
                <Toggle checked={pushNotifications} onChange={() => setPushNotifications((v) => !v)} />
              </div>
              <div className="h-px bg-border/60 mx-4" />
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-foreground leading-snug">Email Notifications</p>
                  <p className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">Weekly digest and updates</p>
                </div>
                <Toggle checked={emailNotifications} onChange={() => setEmailNotifications((v) => !v)} />
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <SectionLabel>Appearance</SectionLabel>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-foreground leading-snug">Dark Mode</p>
                  <p className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">Switch to dark theme</p>
                </div>
                <Toggle checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
              </div>
            </div>
          </div>

          {/* General Section */}
          <div>
            <SectionLabel>General</SectionLabel>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {[
                { label: "Language", value: "English" },
                { label: "Privacy Policy", value: null },
                { label: "Terms of Service", value: null },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <button className="w-full flex items-center justify-between px-4 py-3.5 text-left cursor-pointer hover:bg-accent/40 transition-colors group">
                    <span className="text-[13.5px] font-medium text-foreground">{item.label}</span>
                    <span className="flex items-center gap-1.5">
                      {item.value && (
                        <span className="text-[11.5px] text-muted-foreground">{item.value}</span>
                      )}
                      <span className="text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                        <ChevronRight />
                      </span>
                    </span>
                  </button>
                  {i < arr.length - 1 && <div className="h-px bg-border/60 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <SectionLabel>Danger Zone</SectionLabel>
            <div className="rounded-2xl border border-destructive/25 bg-card overflow-hidden">
              <button className="w-full flex items-center justify-between px-4 py-3.5 text-left cursor-pointer hover:bg-destructive/5 transition-colors group">
                <span className="flex items-center gap-2.5 text-destructive">
                  <TrashIcon />
                  <span className="text-[13.5px] font-medium">Delete Account</span>
                </span>
                <span className="text-destructive/50 group-hover:text-destructive transition-colors">
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>

          {/* Version */}
          <p className="text-[11px] text-muted-foreground text-center pb-1">Version 1.0.0</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function SettingsBlockPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
          A polished settings screen featuring a user profile card, interactive toggle switches for notifications and appearance, navigation rows, and a danger zone.
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center items-center min-h-[580px] rounded-2xl border border-border bg-[repeating-linear-gradient(45deg,hsl(var(--secondary))_0,hsl(var(--secondary))_1px,transparent_0,transparent_50%)] bg-[length:7px_7px] p-10">
        <SettingsPreview />
      </div>

      {/* Installation */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <CodeBlock code={`npx aniui add text switch avatar separator`} />
      </div>

      {/* Source */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Source</h2>
        <CodeBlock code={rnCode} title="screens/settings.tsx" />
      </div>
    </div>
  );
}
