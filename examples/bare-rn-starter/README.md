# AniUI Bare React Native Starter

A minimal React Native CLI project (no Expo) pre-configured with AniUI, NativeWind, and 5 demo components.

## Getting Started

```bash
# Install dependencies
npm install

# Install iOS pods
cd ios && pod install && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Key Config Files

- **metro.config.js** — Wrapped with `withNativeWind` for CSS processing
- **babel.config.js** — Includes `nativewind/babel` preset
- **tailwind.config.js** — AniUI theme tokens
- **global.css** — Light/dark theme CSS variables

## Adding More Components

```bash
npx aniui add switch checkbox accordion dialog
```

Components are copied as source files into `components/ui/`. You own the code.

## Project Structure

```
├── App.tsx              # Demo screen with ScrollView
├── index.js             # AppRegistry entry point
├── components/ui/       # AniUI components
├── lib/utils.ts         # cn() utility
├── metro.config.js      # NativeWind Metro plugin
├── babel.config.js      # NativeWind Babel preset
├── global.css           # Theme variables
└── tailwind.config.js   # Tailwind + NativeWind config
```

## Docs

Full component docs at [aniui.dev](https://aniui.dev)
