import "../global.css";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useColorScheme, View, LogBox } from "react-native";

LogBox.ignoreLogs(["Unable to activate keep awake"]);
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function useAppTheme() {
  return useContext(ThemeCtx);
}

export default function RootLayout() {
  const system = useColorScheme() ?? "light";
  const [theme, setTheme] = useState<Theme>(system);
  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  useEffect(() => setTheme(system), [system]);

  const bg = theme === "dark" ? "hsl(240, 10%, 3.9%)" : "hsl(0, 0%, 100%)";
  const fg = theme === "dark" ? "hsl(0, 0%, 98%)" : "hsl(240, 10%, 3.9%)";

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: bg },
              headerTintColor: fg,
              headerTitleStyle: { fontWeight: "600" },
              contentStyle: { backgroundColor: bg },
            }}
          >
            <Stack.Screen name="index" options={{ title: "AniUI", headerShown: false }} />
            <Stack.Screen name="component/[name]" options={{ title: "" }} />
          </Stack>
        </View>
        <PortalHost />
      </GestureHandlerRootView>
    </ThemeCtx.Provider>
  );
}
