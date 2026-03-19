import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const tabs = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "cart", label: "Cart" },
  { key: "profile", label: "Profile" },
] as const;

type TabKey = typeof tabs[number]["key"];

function TabIcon({ tabKey, active }: { tabKey: TabKey; active: boolean }) {
  if (tabKey === "home") return <HomeIcon active={active} />;
  if (tabKey === "search") return <SearchIcon />;
  if (tabKey === "cart") return <CartIcon active={active} />;
  return <ProfileIcon active={active} />;
}

export function BottomTabBar({
  active,
  onTabPress,
}: {
  active: TabKey;
  onTabPress: (key: TabKey) => void;
}) {
  return (
    <View className="flex-row border-t border-border bg-background pb-6 pt-2 px-2">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            className="flex-1 items-center gap-1 py-1"
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View className={cn(isActive ? "text-primary" : "text-muted-foreground opacity-50")}>
              <TabIcon tabKey={tab.key} active={isActive} />
            </View>
            <Text
              className={cn(
                "text-[10px] leading-none",
                isActive ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {tab.label}
            </Text>
            {isActive && (
              <View className="absolute -bottom-0 h-0.5 w-5 rounded-full bg-primary" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

export function BottomTabsScreen() {
  const [active, setActive] = useState<TabKey>("home");
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text variant="h3" className="capitalize mb-1">{active}</Text>
        <Text variant="muted">Screen content goes here</Text>
      </View>
      <BottomTabBar active={active} onTabPress={setActive} />
    </View>
  );
}
