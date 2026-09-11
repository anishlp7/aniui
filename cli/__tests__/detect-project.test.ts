import { describe, it, expect } from "vitest";
import { getInstallCommand, getNativeInstallCommand, getDlxCommand } from "../src/utils/detect-project";

describe("getNativeInstallCommand", () => {
  it("routes through expo install for Expo projects, across every package manager", () => {
    expect(getNativeInstallCommand("npm", true, ["@shopify/react-native-skia"])).toBe(
      "npx expo install @shopify/react-native-skia"
    );
    expect(getNativeInstallCommand("yarn", true, ["expo-blur", "expo-haptics"])).toBe(
      "yarn dlx expo install expo-blur expo-haptics"
    );
    expect(getNativeInstallCommand("pnpm", true, ["react-native-qrcode-svg"])).toBe(
      "pnpm dlx expo install react-native-qrcode-svg"
    );
    expect(getNativeInstallCommand("bun", true, ["react-native-reanimated"])).toBe(
      "bunx expo install react-native-reanimated"
    );
  });

  it("falls back to a plain package-manager install for non-Expo (bare RN) projects", () => {
    expect(getNativeInstallCommand("npm", false, ["@shopify/react-native-skia"])).toBe(
      getInstallCommand("npm", ["@shopify/react-native-skia"])
    );
    expect(getNativeInstallCommand("yarn", false, ["expo-blur"])).toBe("yarn add expo-blur");
    expect(getNativeInstallCommand("pnpm", false, ["expo-haptics"])).toBe("pnpm add expo-haptics");
    expect(getNativeInstallCommand("bun", false, ["react-native-qrcode-svg"])).toBe("bun add react-native-qrcode-svg");
  });

  it("expo install command is itself the dlx-wrapped form for the given package manager", () => {
    // getNativeInstallCommand's Expo branch must stay in sync with getDlxCommand's
    // own per-package-manager syntax — this pins that relationship so the two
    // can't silently drift apart.
    for (const pm of ["npm", "yarn", "pnpm", "bun"] as const) {
      expect(getNativeInstallCommand(pm, true, ["@shopify/react-native-skia"])).toBe(
        getDlxCommand(pm, "expo install @shopify/react-native-skia")
      );
    }
  });
});
