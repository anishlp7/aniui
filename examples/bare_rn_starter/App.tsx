import "./global.css";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { HomeScreen } from "./screens/HomeScreen";
import { FormsScreen } from "./screens/FormsScreen";
import { DataDisplayScreen } from "./screens/DataDisplayScreen";
import { FeedbackScreen } from "./screens/FeedbackScreen";
import { NavigationScreen } from "./screens/NavigationScreen";
import { OverlaysScreen } from "./screens/OverlaysScreen";
import { ChartsScreen } from "./screens/ChartsScreen";

export default function App() {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          {renderScreen()}
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
