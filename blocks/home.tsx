import React from "react";
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
}
