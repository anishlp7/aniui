import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "hsl(0, 0%, 100%)" },
        headerTintColor: "hsl(240, 10%, 3.9%)",
        headerTitleStyle: { fontWeight: "600" },
      }}
    />
  );
}
