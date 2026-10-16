import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";

const tabData = [
  { key: "account", label: "Account", title: "Account", desc: "Manage your account settings and profile information." },
  { key: "settings", label: "Settings", title: "Settings", desc: "Configure notifications, privacy, and app preferences." },
  { key: "billing", label: "Billing", title: "Billing", desc: "View invoices and manage your subscription plan." },
];

export function TabsDemo() {
  const [tab, setTab] = useState("account");
  const dark = useColorScheme() === "dark";

  const bg = dark ? "#18181b" : "#ffffff";
  const mutedBg = dark ? "#27272a" : "#f4f4f5";
  const fg = dark ? "#fafafa" : "#18181b";
  const muted = dark ? "#a1a1aa" : "#71717a";
  const border = dark ? "#3f3f46" : "#e4e4e7";

  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", backgroundColor: mutedBg, borderRadius: 10, padding: 4 }}>
        {tabData.map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setTab(t.key)}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              borderRadius: 8,
              backgroundColor: tab === t.key ? bg : "transparent",
              ...(tab === t.key ? { shadowColor: "#000", shadowOpacity: dark ? 0.3 : 0.08, shadowRadius: 3, elevation: 2 } : {}),
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: tab === t.key ? "600" : "500", color: tab === t.key ? fg : muted }}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabData.filter((t) => t.key === tab).map((t) => (
        <View key={t.key} style={{ borderRadius: 12, borderWidth: 1, borderColor: border, backgroundColor: bg, padding: 16, gap: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: fg }}>{t.title}</Text>
          <Text style={{ fontSize: 13, color: muted, lineHeight: 18 }}>{t.desc}</Text>
        </View>
      ))}
    </View>
  );
}
