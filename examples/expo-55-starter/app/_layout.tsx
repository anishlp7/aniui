import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "hsl(0, 0%, 100%)" },
            headerTintColor: "hsl(240, 10%, 3.9%)",
            headerTitleStyle: { fontWeight: "600" },
          }}
        />
      </BottomSheetModalProvider>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
