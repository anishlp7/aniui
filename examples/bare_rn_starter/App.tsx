import "./global.css";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider, useTheme } from "./components/ui/theme-provider";
import { HomeScreen } from "./screens/HomeScreen";
import { ComponentScreen } from "./screens/ComponentScreen";

// Re-export for screens
export function useAppTheme() {
  const { resolvedTheme, toggleTheme } = useTheme();
  return { theme: resolvedTheme, toggle: toggleTheme };
}

function AppContent() {
  const [screen, setScreen] = useState<string | null>(null);

  if (screen) {
    return <ComponentScreen name={screen} onBack={() => setScreen(null)} />;
  }

  return <HomeScreen onNavigate={setScreen} />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
