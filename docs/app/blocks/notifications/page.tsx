"use client";

import React from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Notification = {
  id: string;
  iconType: "message-circle" | "trophy" | "package" | "user-plus" | "credit-card";
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

const todayNotifications: Notification[] = [
  {
    id: "1",
    iconType: "message-circle",
    iconBg: "bg-primary/10",
    title: "New Message",
    description: "Sarah sent you a message",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    iconType: "trophy",
    iconBg: "bg-primary/10",
    title: "Achievement Unlocked",
    description: "You've completed 10 tasks!",
    time: "2h ago",
    unread: true,
  },
  {
    id: "3",
    iconType: "package",
    iconBg: "bg-accent",
    title: "Order Update",
    description: "Your order #1042 has shipped",
    time: "5h ago",
    unread: false,
  },
];

const yesterdayNotifications: Notification[] = [
  {
    id: "4",
    iconType: "user-plus",
    iconBg: "bg-accent",
    title: "New Follower",
    description: "Alex started following you",
    time: "1d ago",
    unread: false,
  },
  {
    id: "5",
    iconType: "credit-card",
    iconBg: "bg-accent",
    title: "Payment Received",
    description: "Payment of $120 received",
    time: "1d ago",
    unread: false,
  },
];

function NotificationItem({ item }: { item: Notification }) {
  return (
    <Pressable
      className={\`flex-row items-center gap-3 px-5 py-3 rounded-xl \${item.unread ? "bg-primary/5" : "bg-background"}\`}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={\`\${item.title}: \${item.description}, \${item.time}\`}
    >
      <View className="relative shrink-0">
        <View className={\`h-10 w-10 rounded-full items-center justify-center \${item.iconBg}\`}>
          {/* Icon rendered via accessibilityLabel; swap with your SVG icon component */}
          <Text variant="small" className="text-foreground font-medium">
            {item.iconType === "message-circle" ? "M" :
             item.iconType === "trophy" ? "T" :
             item.iconType === "package" ? "P" :
             item.iconType === "user-plus" ? "U" : "C"}
          </Text>
        </View>
        {item.unread && (
          <View className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border border-background" />
        )}
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-0.5">
          <Text variant="small" className="font-semibold text-foreground">{item.title}</Text>
          <Text variant="small" className="text-muted-foreground">{item.time}</Text>
        </View>
        <Text variant="small" className="text-muted-foreground">{item.description}</Text>
      </View>
    </Pressable>
  );
}

export function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-border">
        <Text variant="h3" className="font-bold">Notifications</Text>
        <Pressable accessible={true} accessibilityRole="button">
          <Text variant="small" className="text-primary font-medium">Mark all read</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-5 pb-2">
          <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest">Today</Text>
        </View>
        {todayNotifications.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}

        <View className="px-5 pt-5 pb-2">
          <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-widest">Yesterday</Text>
        </View>
        {yesterdayNotifications.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}`;

// SVG icon components

function MessageCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

type NotificationData = {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};

const todayItems: NotificationData[] = [
  {
    id: "1",
    icon: <MessageCircleIcon />,
    iconBg: "bg-primary/10 text-primary",
    title: "New Message",
    description: "Sarah sent you a message",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    icon: <TrophyIcon />,
    iconBg: "bg-primary/10 text-primary",
    title: "Achievement Unlocked",
    description: "You've completed 10 tasks!",
    time: "2h ago",
    unread: true,
  },
  {
    id: "3",
    icon: <PackageIcon />,
    iconBg: "bg-accent text-accent-foreground",
    title: "Order Update",
    description: "Your order #1042 has shipped",
    time: "5h ago",
    unread: false,
  },
];

const yesterdayItems: NotificationData[] = [
  {
    id: "4",
    icon: <UserPlusIcon />,
    iconBg: "bg-accent text-accent-foreground",
    title: "New Follower",
    description: "Alex started following you",
    time: "1d ago",
    unread: false,
  },
  {
    id: "5",
    icon: <CreditCardIcon />,
    iconBg: "bg-accent text-accent-foreground",
    title: "Payment Received",
    description: "Payment of $120 received",
    time: "1d ago",
    unread: false,
  },
];

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

function PreviewNotificationItem({ item }: { item: NotificationData }) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-colors cursor-pointer hover:bg-muted/50 ${
        item.unread ? "bg-primary/5" : "bg-background"
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center ${item.iconBg}`}
        >
          {item.icon}
        </div>
        {item.unread && (
          <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-xs font-semibold text-foreground truncate">{item.title}</span>
          <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">{item.time}</span>
        </div>
        <p className="text-[11px] text-muted-foreground truncate leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="px-5 pt-5 pb-2">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function Preview() {
  return (
    <div className="max-h-[580px] overflow-y-auto bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <span className="text-xl font-bold text-foreground">Notifications</span>
        <button className="text-sm text-primary font-medium hover:opacity-70 transition-opacity cursor-pointer">
          Mark all read
        </button>
      </div>

      {/* Today */}
      <SectionHeader label="Today" />
      <div className="px-2">
        {todayItems.map((item) => (
          <PreviewNotificationItem key={item.id} item={item} />
        ))}
      </div>

      {/* Yesterday */}
      <SectionHeader label="Yesterday" />
      <div className="px-2">
        {yesterdayItems.map((item) => (
          <PreviewNotificationItem key={item.id} item={item} />
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}

export default function NotificationsBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground text-lg">
          A grouped notifications list with unread indicators, section headers for Today and Yesterday, and a mark-all-read action.
        </p>
      </div>

      <div className="flex justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/20 rounded-lg border border-border p-8">
        <PhoneFrame>
          <Preview />
        </PhoneFrame>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx aniui add text separator badge`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/notifications.tsx" />
      </div>
    </div>
  );
}
