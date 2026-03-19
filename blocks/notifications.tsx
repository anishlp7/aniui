import React from "react";
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
      className={`flex-row items-center gap-3 px-5 py-3 rounded-xl ${item.unread ? "bg-primary/5" : "bg-background"}`}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}: ${item.description}, ${item.time}`}
    >
      <View className="relative shrink-0">
        <View className={`h-10 w-10 rounded-full items-center justify-center ${item.iconBg}`}>
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
}
