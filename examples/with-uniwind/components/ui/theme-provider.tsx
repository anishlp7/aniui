import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme as useNativeColorScheme, View } from "react-native";
import { cn } from "@/lib/utils";

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
  className?: string;
}

// Try to detect and use Uniwind's setTheme if available
let uniwindSetTheme: ((theme: string) => void) | null = null;
try {
  const mod = require("uniwind");
  if (mod?.Uniwind?.setTheme) {
    uniwindSetTheme = (theme: string) => mod.Uniwind.setTheme(theme);
  }
} catch {}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  className,
}: ThemeProviderProps) {
  const systemScheme = useNativeColorScheme();
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemScheme ?? "light") : theme;

  const applyTheme = useCallback((resolved: "light" | "dark") => {
    if (uniwindSetTheme) {
      // Uniwind handles Appearance.setColorScheme internally
      uniwindSetTheme(resolved);
    } else {
      // NativeWind v4/v5: set system appearance directly
      try { Appearance.setColorScheme(resolved); } catch {}
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    const resolved = newTheme === "system" ? (systemScheme ?? "light") : newTheme;
    applyTheme(resolved);
  }, [systemScheme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const current = prev === "system" ? (systemScheme ?? "light") : prev;
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, [systemScheme, applyTheme]);

  // Apply initial theme
  useEffect(() => {
    if (defaultTheme !== "system") {
      applyTheme(defaultTheme === "dark" ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      <View className={cn(resolvedTheme === "dark" ? "dark" : "", "flex-1 bg-white dark:bg-zinc-950", className)}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}
