# AniUI — Expo SDK 56 Starter (NativeWind v4 stable)

A working Expo SDK 56 app wired to the AniUI components in this repo, on the **NativeWind v4 stable** (Tailwind v3, classic `tailwind.config.js`) track.

> Want the new CSS-first config? See [`../expo-56-starter`](../expo-56-starter) — same SDK 56, but NativeWind v5 preview + Tailwind v4.

## Stack

- Expo SDK 56 (React 19.2.3 / React Native 0.85.3)
- Reanimated 4.3 + react-native-worklets 0.8
- NativeWind 4 + Tailwind v3 (`tailwind.config.js`, no PostCSS)
- `jsxImportSource: "nativewind"` in `babel.config.js`
- New Architecture only

## Why this track

NativeWind v5 is still **pre-release**. If you want a production-safe SDK 56 setup today, this starter is the recommended baseline — the same library and CLI, just running against the proven Tailwind v3 / NativeWind v4 toolchain.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

File-based routing lives in the [`app/`](./app) directory.

## Learn more

- [AniUI docs](https://aniui.dev/docs/expo-56) — migration & setup guide
- [Expo SDK 56 changelog](https://expo.dev/changelog/sdk-56)
- [NativeWind v4 docs](https://www.nativewind.dev/)
