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
  }, [defaultTheme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      <View className={cn(resolvedTheme === "dark" ? "dark" : "", "flex-1 bg-background", className)}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

// ─── AUTO-GENERATED THEME COLORS (written by `aniui init` / `aniui theme`) ───
// Do not hand-edit values below — regenerated whenever the theme preset changes.
export const THEME_COLORS = {
  light: { background: "#ffffff", foreground: "#09090b", card: "#ffffff", cardForeground: "#09090b", primary: "#18181b", primaryForeground: "#fafafa", secondary: "#f4f4f5", secondaryForeground: "#18181b", muted: "#f4f4f5", mutedForeground: "#71717a", accent: "#f4f4f5", accentForeground: "#18181b", destructive: "#ef4444", destructiveForeground: "#fafafa", border: "#e4e4e7", input: "#e4e4e7", ring: "#18181b" },
  dark: { background: "#09090b", foreground: "#fafafa", card: "#09090b", cardForeground: "#fafafa", primary: "#fafafa", primaryForeground: "#18181b", secondary: "#27272a", secondaryForeground: "#fafafa", muted: "#27272a", mutedForeground: "#a1a1aa", accent: "#27272a", accentForeground: "#fafafa", destructive: "#7f1d1d", destructiveForeground: "#fafafa", border: "#27272a", input: "#27272a", ring: "#d4d4d8" },
} as const;

/**
 * The one place every component reads colors from when a native prop (a
 * toggle control's track/thumb, TextInput caret, Skia canvas fills, lucide
 * icon `color`, etc.) can't take a className token. Deliberately reads
 * useColorScheme() directly rather than useTheme().resolvedTheme — the
 * latter's context default doesn't track system appearance without a
 * <ThemeProvider> ancestor, and this needs to stay reactive even in apps
 * that never mount one.
 */
export function useThemeColors() {
  const scheme = useNativeColorScheme();
  return scheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light;
}
// ─── END AUTO-GENERATED THEME COLORS ───
