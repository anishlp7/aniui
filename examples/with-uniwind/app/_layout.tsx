import "../global.css";
import { createContext, useContext, useCallback } from "react";
import { LogBox } from "react-native";
import { Uniwind, useUniwind } from "uniwind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

LogBox.ignoreLogs(["Unable to activate keep awake"]);

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function useAppTheme() {
  return useContext(ThemeCtx);
}

function AppStack() {
  const { theme } = useUniwind();
  const isDark = theme === "dark";
  const bg = isDark ? "#09090b" : "#ffffff";
  const fg = isDark ? "#fafafa" : "#09090b";

  return (
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
  );
}

export default function RootLayout() {
  const { theme } = useUniwind();

  const toggle = useCallback(() => {
    const next = Uniwind.currentTheme === "light" ? "dark" : "light";
    Uniwind.setTheme(next);
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme: theme as Theme, toggle }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppStack />
      </GestureHandlerRootView>
    </ThemeCtx.Provider>
  );
}
