import React, { useState } from "react";
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
}
