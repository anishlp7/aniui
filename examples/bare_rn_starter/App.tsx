import "./global.css";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PortalHost } from "@rn-primitives/portal";
import { HomeScreen } from "./screens/HomeScreen";
import { FormsScreen } from "./screens/FormsScreen";
import { DataDisplayScreen } from "./screens/DataDisplayScreen";
import { FeedbackScreen } from "./screens/FeedbackScreen";
import { NavigationScreen } from "./screens/NavigationScreen";
import { OverlaysScreen } from "./screens/OverlaysScreen";
import { ChartsScreen } from "./screens/ChartsScreen";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });
export function useAppTheme() { return useContext(ThemeCtx); }

export default function App() {
  const system = useColorScheme() ?? "light";
  const [theme, setTheme] = useState<Theme>(system);
  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
  useEffect(() => setTheme(system), [system]);

  const [screen, setScreen] = useState("home");
  const goBack = () => setScreen("home");

  const renderScreen = () => {
    switch (screen) {
      case "Forms": return <FormsScreen onBack={goBack} />;
      case "DataDisplay": return <DataDisplayScreen onBack={goBack} />;
      case "Feedback": return <FeedbackScreen onBack={goBack} />;
      case "Navigation": return <NavigationScreen onBack={goBack} />;
      case "Overlays": return <OverlaysScreen onBack={goBack} />;
      case "Charts": return <ChartsScreen onBack={goBack} />;
      default: return <HomeScreen onNavigate={setScreen} />;
    }
  };

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
            {renderScreen()}
          </View>
        </SafeAreaProvider>
        <PortalHost />
      </GestureHandlerRootView>
    </ThemeCtx.Provider>
  );
}
