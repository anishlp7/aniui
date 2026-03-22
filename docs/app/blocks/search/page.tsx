"use client";

import React, { useState } from "react";
import { CodeBlock } from "@/components/code-block";

const rnCode = `import React, { useState } from "react";
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
}`;

// SVG icon components
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SmartphoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

const RESULT_ICONS = [SmartphoneIcon, PaletteIcon, ZapIcon, PackageIcon];

const ALL_RESULTS = [
  { title: "React Native Guide", description: "Getting started with mobile development", iconIndex: 0 },
  { title: "UI Design Patterns", description: "Best practices for mobile interfaces", iconIndex: 1 },
  { title: "Performance Tips", description: "Optimize your React Native app", iconIndex: 2 },
  { title: "Component Library", description: "Build reusable UI components", iconIndex: 3 },
];

const RECENT_SEARCHES = ["React Native", "UI Components", "NativeWind"];

const TRENDING = [
  "Getting started with Expo",
  "NativeWind v4 setup",
  "React Navigation tips",
  "Reanimated gestures",
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[320px] rounded-[2.5rem] border-[3px] border-foreground/10 bg-background shadow-2xl overflow-hidden">
      <div className="flex justify-center pt-2.5 pb-1 bg-background">
        <div className="h-[22px] w-[90px] rounded-full bg-foreground/10" />
      </div>
      <div>{children}</div>
      <div className="flex justify-center pb-2.5 pt-1 bg-background">
        <div className="h-1 w-28 rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

function SearchPreview() {
  const [query, setQuery] = useState("");
  const [recentCleared, setRecentCleared] = useState(false);

  const filtered = query.trim()
    ? ALL_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const visibleRecent = recentCleared ? [] : RECENT_SEARCHES;

  return (
    <PhoneFrame>
      <div className="max-h-[600px] overflow-y-auto bg-background flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 shrink-0">
          <p className="text-[22px] font-bold text-foreground tracking-tight mb-4">Search</p>
          {/* Search bar */}
          <div className="flex items-center bg-muted rounded-full h-11 px-4 gap-2.5">
            <SearchIcon className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything..."
              className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none min-w-0"
              aria-label="Search input"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5 rounded-full hover:bg-foreground/10"
                aria-label="Clear search"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border shrink-0" />

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          {query.trim() === "" ? (
            <div className="px-5 pt-5 pb-2">
              {/* Recent Searches */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="text-muted-foreground" />
                  <span className="text-xs font-semibold text-foreground tracking-wide">
                    Recent Searches
                  </span>
                </div>
                {visibleRecent.length > 0 && (
                  <button
                    onClick={() => setRecentCleared(true)}
                    className="text-xs font-medium text-primary hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {visibleRecent.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {visibleRecent.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground hover:bg-accent/60 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mb-6">No recent searches</p>
              )}

              {/* Divider */}
              <div className="h-px bg-border mb-5" />

              {/* Trending */}
              <div className="flex items-center gap-1.5 mb-3">
                <TrendingUpIcon className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground tracking-wide">Trending</span>
              </div>
              <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
                {TRENDING.map((item, i, arr) => (
                  <div key={item}>
                    <button className="w-full flex items-center px-4 py-3.5 gap-3 hover:bg-accent/40 transition-colors cursor-pointer text-left">
                      <span className="text-[11px] font-semibold text-muted-foreground w-4 text-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground flex-1 leading-snug">
                        {item}
                      </span>
                      <ChevronRightIcon className="text-muted-foreground shrink-0" />
                    </button>
                    {i < arr.length - 1 && <div className="h-px bg-border" />}
                  </div>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-14 px-5">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <SearchIcon className="text-muted-foreground w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">No results found</p>
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Try searching for something else
              </p>
            </div>
          ) : (
            <div className="px-5 pt-5">
              <p className="text-[11px] text-muted-foreground mb-3 font-medium">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
              <div className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
                {filtered.map((item, i) => {
                  const Icon = RESULT_ICONS[item.iconIndex];
                  return (
                    <div key={item.title}>
                      <button className="w-full flex items-center px-4 py-3.5 gap-3 hover:bg-accent/40 transition-colors cursor-pointer text-left">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate leading-snug mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRightIcon className="text-muted-foreground shrink-0" />
                      </button>
                      {i < filtered.length - 1 && <div className="h-px bg-border" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function SearchBlockPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          A search screen with recent searches as pill tags, a trending list, and live-filtered results with icon, title, and description.
        </p>
      </div>

      <div className="flex justify-center rounded-2xl border border-border bg-[repeating-linear-gradient(45deg,hsl(var(--secondary))_0,hsl(var(--secondary))_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/30 p-10">
        <SearchPreview />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={`npx @aniui/cli add text input separator`} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={rnCode} title="screens/search.tsx" />
      </div>
    </div>
  );
}
