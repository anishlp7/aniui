# AniUI + Uniwind Example

This example demonstrates AniUI components running with [Uniwind](https://github.com/nicepkg/uniwind) instead of NativeWind.

## Key Differences from NativeWind

| Aspect | NativeWind | Uniwind |
|--------|-----------|---------|
| Metro wrapper | `withNativeWind` | `withUniwind` |
| Babel config | `jsxImportSource: "nativewind"` | Not needed |
| Tailwind preset | `nativewind/preset` | `uniwind/preset` |
| rem base | 14px | 16px (web standard) |

## Setup

```bash
npm install
npx expo start
```

## Using AniUI with Uniwind

```bash
npx @aniui/cli init --style uniwind
npx @aniui/cli add button card text
```

The CLI auto-detects Uniwind and generates the correct config files.
