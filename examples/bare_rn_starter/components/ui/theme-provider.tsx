import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";
import { cn } from "@/lib/utils";
import { View } from "react-native";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  className?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  className,
}: ThemeProviderProps) {
  const systemScheme = useNativeColorScheme();
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemScheme ?? "light") : theme;

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      if (prev === "system") return systemScheme === "dark" ? "light" : "dark";
      return prev === "dark" ? "light" : "dark";
    });
  }, [systemScheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      <View className={cn(resolvedTheme === "dark" ? "dark" : "", "flex-1 bg-background", className)}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
