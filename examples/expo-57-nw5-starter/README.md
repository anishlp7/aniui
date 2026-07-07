# AniUI — Expo SDK 57 Starter (NativeWind v5 preview)

A working Expo SDK 57 app wired to the AniUI components in this repo, on the **NativeWind v5 preview** (Tailwind v4, CSS-first config) track.

> Looking for the Uniwind stack? See [`../expo-57-starter`](../expo-57-starter) — same SDK 57, but on the Uniwind track.

## Stack

- Expo SDK 57 (React 19.2 / React Native 0.86)
- Reanimated 4.5 + react-native-worklets 0.10
- NativeWind 5 preview + Tailwind v4 (`@theme` in `global.css`, no `tailwind.config.js`)
- New Architecture only

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

## NativeWind v5 preview notes

- v5 is **pre-release** — APIs may change before stable. For a production-safe setup, prefer the v4 stable track.
- No `tailwind.config.js`. Theme tokens are declared in `global.css` via `@theme { ... }`.
- `postcss.config.js` wires up `@tailwindcss/postcss`.
- No `jsxImportSource: "nativewind"` in `babel.config.js` — the NativeWind metro plugin handles JSX.

## Learn more

- [AniUI docs](https://aniui.dev/docs/expo-57) — migration & setup guide
- [Expo SDK 57 changelog](https://expo.dev/changelog/sdk-57)
- [NativeWind v5 docs](https://www.nativewind.dev/v5)
