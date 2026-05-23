# AniUI — Expo SDK 56 Starter (NativeWind v5 preview)

A working Expo SDK 56 app wired to the AniUI components in this repo, on the **NativeWind v5 preview** (Tailwind v4, CSS-first config) track.

> Looking for the stable CSS stack? See [`../expo-56-nw4-starter`](../expo-56-nw4-starter) — same SDK 56, but NativeWind v4 + Tailwind v3.

## Stack

- Expo SDK 56 (React 19.2.3 / React Native 0.85.3)
- Reanimated 4.3 + react-native-worklets 0.8
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

- v5 is **pre-release** — APIs may change before stable. For a production-safe SDK 56 setup, prefer the v4 stable starter.
- No `tailwind.config.js`. Theme tokens are declared in `global.css` via `@theme { ... }`.
- `postcss.config.js` wires up `@tailwindcss/postcss`.
- No `jsxImportSource: "nativewind"` in `babel.config.js` — the NativeWind metro plugin handles JSX.

## Learn more

- [AniUI docs](https://aniui.dev/docs/expo-56) — migration & setup guide
- [Expo SDK 56 changelog](https://expo.dev/changelog/sdk-56)
- [NativeWind v5 docs](https://www.nativewind.dev/v5)
