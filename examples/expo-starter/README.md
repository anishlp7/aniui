# AniUI Expo Starter

A minimal Expo project pre-configured with AniUI, NativeWind, and 5 demo components.

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
npx aniui add switch checkbox accordion dialog
```

Components are copied as source files into `components/ui/`. You own the code.

## Project Structure

```
├── app/
│   ├── _layout.tsx    # Root layout with expo-router
│   └── index.tsx      # Demo screen
├── components/ui/     # AniUI components
├── lib/utils.ts       # cn() utility
├── global.css         # Theme variables
└── tailwind.config.js # Tailwind + NativeWind config
```

## Docs

Full component docs at [aniui.dev](https://aniui.dev)
