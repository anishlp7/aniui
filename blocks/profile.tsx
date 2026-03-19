import React from "react";
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
}
