"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { label: "My Posts", count: "24" },
  { label: "Saved Items", count: "5" },
  { label: "Privacy" },
  { label: "Help & Support" },
];

export function ProfileScreen({ onLogOut }: { onLogOut?: () => void }) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pt-8 pb-6">
          <Avatar
            fallback="JD"
            size="lg"
            className="mb-4"
          />
          <Text variant="h3" className="mb-1">John Doe</Text>
          <Text variant="muted">john@example.com</Text>
          <Badge variant="secondary" className="mt-2">Pro Member</Badge>
          <Button variant="outline" size="sm" className="mt-4 rounded-xl w-36">
            Edit Profile
          </Button>
        </View>

        <Separator />

        {/* Stats */}
        <View className="flex-row bg-card rounded-2xl mx-4 my-4 shadow-sm">
          {[
            { label: "Posts", value: "24" },
            { label: "Followers", value: "1.2k" },
            { label: "Following", value: "380" },
          ].map(({ label, value }, i, arr) => (
            <View key={label} className="flex-1 items-center py-4">
              {i > 0 && (
                <View className="absolute left-0 top-3 bottom-3 w-px bg-border" />
              )}
              <Text variant="h3">{value}</Text>
              <Text variant="muted">{label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View className="px-4 mt-2">
          {menuItems.map(({ label, count }) => (
            <Pressable
              key={label}
              accessible={true}
              accessibilityRole="button"
              className="flex-row items-center py-3.5 px-4 mb-2 bg-card rounded-2xl shadow-sm"
            >
              <View className="h-9 w-9 rounded-xl bg-accent items-center justify-center mr-3" />
              <Text variant="p" className="flex-1 font-medium">{label}</Text>
              {count && (
                <Badge variant="secondary" className="mr-2">{count}</Badge>
              )}
            </Pressable>
          ))}
        </View>

        {/* Log Out */}
        <View className="px-4 mt-4 mb-10">
          <Button variant="destructive" onPress={onLogOut} className="rounded-xl">
            Log Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}`;

// SVG Icons
function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="flex justify-center pt-3 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center pb-3 pt-2 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function ProfilePreview() {
  const [loggedOut, setLoggedOut] = useState(false);

  const menuItems = [
    { icon: <FileTextIcon />, label: "My Posts", count: "24" },
    { icon: <BookmarkIcon />, label: "Saved Items", count: "5" },
    { icon: <ShieldIcon />, label: "Privacy", count: null },
    { icon: <HelpCircleIcon />, label: "Help & Support", count: null },
  ];

  const stats = [
    { label: "Posts", value: "24" },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: "380" },
  ];

  if (loggedOut) {
    return (
      <div className="flex flex-col items-center justify-center h-[560px] px-6 text-center">
        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
          <LogOutIcon />
        </div>
        <p className="text-sm font-semibold text-foreground mb-1">You&apos;ve been logged out</p>
        <p className="text-xs text-muted-foreground mb-5">See you next time, John!</p>
        <button
          onClick={() => setLoggedOut(false)}
          className="text-xs text-primary font-medium underline underline-offset-2 cursor-pointer"
        >
          Log back in
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[560px] overflow-y-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center px-5 pt-6 pb-5">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground mb-3 shadow-sm">
          JD
        </div>
        <p className="text-base font-bold text-foreground mb-0.5">John Doe</p>
        <p className="text-xs text-muted-foreground mb-2">john@example.com</p>
        {/* Badge */}
        <span className="text-[11px] font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
          Pro Member
        </span>
        {/* Edit Profile button */}
        <button className="mt-3 h-8 w-32 rounded-xl border border-border bg-background text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer">
          Edit Profile
        </button>
      </div>

      {/* Stats Card */}
      <div className="mx-4 mb-4 bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="flex divide-x divide-border">
          {stats.map(({ label, value }) => (
            <div key={label} className="flex-1 flex flex-col items-center py-4">
              <span className="text-base font-bold text-foreground">{value}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {menuItems.map(({ icon, label, count }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 shadow-sm border border-border cursor-pointer hover:bg-accent transition-colors"
          >
            {/* Icon container */}
            <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center text-foreground flex-shrink-0">
              {icon}
            </div>
            <span className="flex-1 text-[13px] font-medium text-foreground">{label}</span>
            {count && (
              <span className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                {count}
              </span>
            )}
            <span className="text-muted-foreground">
              <ChevronRightIcon />
            </span>
          </div>
        ))}
      </div>

      {/* Log Out */}
      <div className="px-4 mt-5 mb-6">
        <button
          onClick={() => setLoggedOut(true)}
          className="w-full h-10 rounded-xl flex items-center justify-center gap-2 text-destructive text-[13px] font-semibold border border-border bg-card hover:bg-destructive/5 transition-colors cursor-pointer"
        >
          <LogOutIcon />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default function ProfileBlockPage() {
  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
        <p className="text-muted-foreground text-lg">
          User profile screen with avatar, stats, menu items, and log out action.
        </p>
      </div>

      {/* Preview */}
      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-2xl border border-border p-10">
        <PhoneFrame>
          <ProfilePreview />
        </PhoneFrame>
      </div>

      {/* Installation */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text avatar button separator badge`} />
      </div>

      {/* Source */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/profile.tsx" />
      </div>
    </div>
  );
}
