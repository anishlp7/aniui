"use client";

import React from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text variant="small" className="text-muted-foreground">Good morning</Text>
          <Text variant="h3">John Doe</Text>
        </View>
        <Avatar src="https://i.pravatar.cc/100" fallback="JD" size="md" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View className="flex-row gap-3 mb-6">
          <Card className="flex-1">
            <CardContent className="items-center py-4 gap-2">
              <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center">
                {/* bar-chart icon */}
              </View>
              <Text variant="small" className="font-medium">Analytics</Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="items-center py-4 gap-2">
              <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center">
                {/* message-circle icon */}
              </View>
              <Text variant="small" className="font-medium">Messages</Text>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardContent className="items-center py-4 gap-2">
              <View className="h-9 w-9 rounded-full bg-primary/10 items-center justify-center">
                {/* settings icon */}
              </View>
              <Text variant="small" className="font-medium">Settings</Text>
            </CardContent>
          </Card>
        </View>

        {/* Stats Card */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text variant="p" className="font-semibold">This Week</Text>
              <Badge variant="secondary">+12%</Badge>
            </View>
            <Text variant="h2">$4,280</Text>
            <Text variant="muted">Revenue across all products</Text>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Text variant="p" className="font-semibold mb-3">Recent Activity</Text>
        {[
          "Payment received — $120",
          "New subscriber — Sarah K.",
          "Order shipped — #1042",
        ].map((item, i) => (
          <Pressable key={i} className="flex-row items-center py-3 border-b border-border">
            <View className="h-8 w-8 rounded-full bg-primary/10 items-center justify-center mr-3" />
            <Text variant="small" className="flex-1">{item}</Text>
            <Text variant="small" className="text-muted-foreground">2h ago</Text>
          </Pressable>
        ))}

        <Button variant="outline" className="mt-4 mb-8">View All Activity</Button>
      </ScrollView>
    </SafeAreaView>
  );
}`;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-xl overflow-hidden">
      <div className="flex justify-center pt-2 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div className="px-5 py-4 max-h-[600px] overflow-y-auto">{children}</div>
      <div className="flex justify-center pb-2 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function BarChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function MessageCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function DollarSignIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

const quickActions = [
  { icon: <BarChartIcon />, label: "Analytics" },
  { icon: <MessageCircleIcon />, label: "Messages" },
  { icon: <SettingsIcon />, label: "Settings" },
];

const activityItems = [
  { icon: <DollarSignIcon />, text: "Payment received — $120", time: "2h ago" },
  { icon: <UserIcon />, text: "New subscriber — Sarah K.", time: "4h ago" },
  { icon: <PackageIcon />, text: "Order shipped — #1042", time: "6h ago" },
];

export default function HomeBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Home Screen</h1>
        <p className="text-muted-foreground text-lg">
          Dashboard-style home screen with greeting, quick actions, stats card, and recent activity list.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-2xl border border-border p-8">
        <PhoneFrame>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">Good morning</p>
              <p className="text-[17px] font-bold text-foreground leading-tight">John Doe</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-[11px] font-semibold text-primary">
              JD
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {quickActions.map(({ icon, label }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card shadow-sm p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {icon}
                </div>
                <span className="text-[11px] font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Stats Card */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-4 mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-foreground">This Week</span>
              <span className="text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-[28px] font-bold text-foreground leading-none mb-1">$4,280</p>
            <p className="text-xs text-muted-foreground">Revenue across all products</p>
          </div>

          {/* Recent Activity */}
          <div className="mb-1">
            <p className="text-sm font-semibold text-foreground mb-3">Recent Activity</p>
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              {activityItems.map(({ icon, text, time }, i) => (
                <div
                  key={i}
                  className={`flex items-center px-3 py-2.5 gap-3 ${i < activityItems.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {icon}
                  </div>
                  <span className="text-[11px] text-foreground flex-1 leading-snug">{text}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <button className="w-full h-9 rounded-xl border border-border bg-background text-xs font-medium text-foreground mt-3 cursor-pointer hover:bg-accent transition-colors">
            View All Activity
          </button>
        </PhoneFrame>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add text card avatar badge button`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/home.tsx" />
      </div>
    </div>
  );
}
