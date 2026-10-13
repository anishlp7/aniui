import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  ThemeProvider,
  useTheme,
  useThemeColors,
  THEME_COLORS,
} from "../ui/theme-provider";

function ShowTheme() {
  const { theme, resolvedTheme } = useTheme();
  return <Text>{`theme=${theme}/resolved=${resolvedTheme}`}</Text>;
}

function ShowColor() {
  const colors = useThemeColors();
  return <Text>{`fg=${colors.foreground}`}</Text>;
}

describe("ThemeProvider", () => {
  it("renders children", () => {
    const { getByText } = render(
      <ThemeProvider>
        <Text>app</Text>
      </ThemeProvider>
    );
    expect(getByText("app")).toBeTruthy();
  });

  it("defaults theme to 'system'", () => {
    const { getByText } = render(
      <ThemeProvider>
        <ShowTheme />
      </ThemeProvider>
    );
    expect(getByText(/theme=system/)).toBeTruthy();
  });

  it("respects explicit defaultTheme='dark'", () => {
    const { getByText } = render(
      <ThemeProvider defaultTheme="dark">
        <ShowTheme />
      </ThemeProvider>
    );
    expect(getByText(/theme=dark/)).toBeTruthy();
    expect(getByText(/resolved=dark/)).toBeTruthy();
  });

  it("useThemeColors returns the light palette by default (no provider)", () => {
    const { getByText } = render(<ShowColor />);
    expect(getByText(`fg=${THEME_COLORS.light.foreground}`)).toBeTruthy();
  });

  it("THEME_COLORS exposes a complete palette for both modes", () => {
    const keys = [
      "background", "foreground", "primary", "primaryForeground",
      "secondary", "secondaryForeground", "muted", "mutedForeground",
      "accent", "accentForeground", "destructive", "destructiveForeground",
      "border", "input", "ring",
    ];
    for (const key of keys) {
      expect(THEME_COLORS.light[key as keyof typeof THEME_COLORS.light]).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(THEME_COLORS.dark[key as keyof typeof THEME_COLORS.dark]).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});
