import "../global.css";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";

// The InfiniteList/DataTable demos intentionally nest a small, bounded FlatList
// (fixed height, its own scroll) inside this screen's own outer ScrollView --
// a real, working pattern for a component showcase, not an actual bug.
LogBox.ignoreLogs(["Unable to activate keep awake", "VirtualizedLists should never be nested"]);

// Re-export for demo pages
export function useAppTheme() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return { theme: resolvedTheme, toggle: toggleTheme };
}

function AppStack() {
  const { resolvedTheme } = useTheme();
  const bg = resolvedTheme === "dark" ? "#09090b" : "#ffffff";
  const fg = resolvedTheme === "dark" ? "#fafafa" : "#09090b";

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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider defaultTheme="light">
          <AppStack />
        </ThemeProvider>
        <PortalHost />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
