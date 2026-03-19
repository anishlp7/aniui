import React, { useState } from "react";
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
}
