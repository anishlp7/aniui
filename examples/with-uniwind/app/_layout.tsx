import "../global.css";
import React, { createContext, useContext, useCallback } from "react";
import { Appearance, useColorScheme, LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

LogBox.ignoreLogs(["Unable to activate keep awake"]);

type Theme = "light" | "dark";

export type ThemeColors = { bg: string; fg: string; muted: string; mutedFg: string; border: string; primary: string; primaryFg: string; card: string; accent: string; secondary: string };

const lightColors: ThemeColors = { bg: "#ffffff", fg: "#09090b", muted: "#f4f4f5", mutedFg: "#71717a", border: "#e4e4e7", primary: "#3b82f6", primaryFg: "#fafafa", card: "#ffffff", accent: "#f4f4f5", secondary: "#f4f4f5" };
const darkColors: ThemeColors = { bg: "#09090b", fg: "#fafafa", muted: "#27272a", mutedFg: "#a1a1aa", border: "#27272a", primary: "#60a5fa", primaryFg: "#09090b", card: "#09090b", accent: "#27272a", secondary: "#27272a" };

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void; colors: ThemeColors }>({ theme: "light", toggle: () => {}, colors: lightColors });

export function useAppTheme() {
  return useContext(ThemeCtx);
}

export default function RootLayout() {
  const systemScheme = useColorScheme();
  const theme: Theme = systemScheme === "dark" ? "dark" : "light";
  const colors = theme === "dark" ? darkColors : lightColors;

  const toggle = useCallback(() => {
    Appearance.setColorScheme(systemScheme === "dark" ? "light" : "dark");
  }, [systemScheme]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, colors }}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerTintColor: colors.fg,
            headerTitleStyle: { fontWeight: "600" },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="index" options={{ title: "AniUI", headerShown: false }} />
          <Stack.Screen name="component/[name]" options={{ title: "" }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeCtx.Provider>
  );
}
