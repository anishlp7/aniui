import "../global.css";
import { createContext, useContext, useCallback, useEffect } from "react";
import { LogBox } from "react-native";
import { Uniwind, useUniwind } from "uniwind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

// The InfiniteList/DataTable demos intentionally nest a small, bounded FlatList
// (fixed height, its own scroll) inside this screen's own outer ScrollView --
// a real, working pattern for a component showcase, not an actual bug.
LogBox.ignoreLogs(["Unable to activate keep awake", "VirtualizedLists should never be nested"]);

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

  // Default to the light theme regardless of the device's system setting.
  useEffect(() => {
    Uniwind.setTheme("light");
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme: theme as Theme, toggle }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppStack />
          <PortalHost />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeCtx.Provider>
  );
}
