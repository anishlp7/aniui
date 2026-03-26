# AniUI Expo 55 Starter

A minimal Expo SDK 55 project pre-configured with AniUI, NativeWind v5, Tailwind CSS v4, and demo components.

**Requirements:** New Architecture only (Expo SDK 55 dropped Old Architecture support).

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npx expo start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## Adding More Components

```bash
npx @aniui/cli add switch checkbox accordion dialog
```

Components are copied as source files into `components/ui/`. You own the code.

## Project Structure

```
├── app/
│   ├── _layout.tsx    # Root layout with expo-router
│   └── index.tsx      # Demo screen
├── components/ui/     # AniUI components
├── lib/utils.ts       # cn() utility
└── global.css         # Theme variables (Tailwind v4 CSS-first config)
```

## Key Differences from SDK 54 Starter

- **NativeWind v5** instead of v4
- **Tailwind CSS v4** instead of v3 — uses `@import "tailwindcss"` and `@theme` directive
- **No tailwind.config.js** — theme is configured in `global.css`
- **Reanimated v4** — requires New Architecture
- **React 19** and **React Native 0.83**

## Docs

Full component docs at [aniui.dev](https://aniui.dev)
