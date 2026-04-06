import "../global.css";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";

LogBox.ignoreLogs(["Unable to activate keep awake"]);

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
      <ThemeProvider>
        <AppStack />
      </ThemeProvider>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
