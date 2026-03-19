import React, { useState } from "react";
import { View, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const ALL_RESULTS = [
  { title: "React Native Guide", description: "Getting started with mobile development", icon: "smartphone" },
  { title: "UI Design Patterns", description: "Best practices for mobile interfaces", icon: "palette" },
  { title: "Performance Tips", description: "Optimize your React Native app", icon: "zap" },
  { title: "Component Library", description: "Build reusable UI components", icon: "package" },
];

const RECENT_SEARCHES = ["React Native", "UI Components", "NativeWind"];

const TRENDING = [
  "Getting started with Expo",
  "NativeWind v4 setup",
  "React Navigation tips",
  "Reanimated gestures",
];

export function SearchScreen() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? ALL_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-5 pb-3">
        <Text variant="h3" className="mb-4">Search</Text>
        <View className="flex-row items-center bg-muted rounded-full h-11 px-4 gap-2">
          {/* Search icon */}
          <View className="shrink-0">
            <Text className="text-muted-foreground text-base">S</Text>
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search anything..."
            placeholderTextColor="hsl(var(--muted-foreground))"
            className="flex-1 text-sm text-foreground"
            accessibilityRole="search"
            accessibilityLabel="Search input"
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              accessibilityRole="button"
              accessible={true}
              accessibilityLabel="Clear search"
            >
              <Text className="text-muted-foreground text-base">X</Text>
            </Pressable>
          )}
        </View>
      </View>

      <Separator />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {query.trim() === "" ? (
          <View className="px-5 pt-5">
            {/* Recent Searches */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-muted-foreground text-sm font-medium">Recent</Text>
              </View>
              <Pressable accessibilityRole="button" accessible={true}>
                <Text className="text-primary text-xs font-medium">Clear</Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap gap-2 mb-6">
              {RECENT_SEARCHES.map((tag) => (
                <Pressable
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-muted"
                  accessibilityRole="button"
                  accessible={true}
                >
                  <Text className="text-sm text-foreground font-medium">{tag}</Text>
                </Pressable>
              ))}
            </View>

            <Separator className="mb-6" />

            {/* Trending */}
            <View className="flex-row items-center gap-2 mb-3">
              <Text className="text-muted-foreground text-sm font-medium">Trending</Text>
            </View>
            <View className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
              {TRENDING.map((item, i, arr) => (
                <View key={item}>
                  <Pressable
                    className="flex-row items-center px-4 py-3.5 gap-3"
                    accessibilityRole="button"
                    accessible={true}
                  >
                    <Text className="text-xs font-semibold text-muted-foreground w-5 text-center">
                      {i + 1}
                    </Text>
                    <Text className="flex-1 text-sm font-medium text-foreground">{item}</Text>
                    <Text className="text-muted-foreground text-base">›</Text>
                  </Pressable>
                  {i < arr.length - 1 && <Separator />}
                </View>
              ))}
            </View>
          </View>
        ) : filtered.length === 0 ? (
          <View className="items-center py-16 px-5">
            <Text className="text-4xl mb-3 text-muted-foreground">?</Text>
            <Text className="text-base font-semibold mb-1">No results found</Text>
            <Text className="text-sm text-muted-foreground text-center">
              Try searching for something else
            </Text>
          </View>
        ) : (
          <View className="px-5 pt-5">
            <Text className="text-xs text-muted-foreground mb-3">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
            </Text>
            <View className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
              {filtered.map((item, i) => (
                <View key={item.title}>
                  <Pressable
                    className="flex-row items-center px-4 py-3.5 gap-3"
                    accessibilityRole="button"
                    accessible={true}
                  >
                    <View className="h-10 w-10 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                      <Text className="text-base">{item.icon[0].toUpperCase()}</Text>
                    </View>
                    <View className="flex-1 min-w-0">
                      <Text className="text-sm font-medium text-foreground">{item.title}</Text>
                      <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                        {item.description}
                      </Text>
                    </View>
                    <Text className="text-muted-foreground shrink-0">›</Text>
                  </Pressable>
                  {i < filtered.length - 1 && <Separator />}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
