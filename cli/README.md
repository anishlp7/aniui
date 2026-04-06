<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/anishlp7/aniui/main/docs/public/logo-dark.png" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/anishlp7/aniui/main/docs/public/logo-light.png" />
    <img alt="AniUI" src="https://raw.githubusercontent.com/anishlp7/aniui/main/docs/public/logo-light.png" width="150" />
  </picture>
</p>

<p align="center">
  <strong>Beautiful React Native components. Copy. Paste. Ship.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@aniui/cli"><img src="https://img.shields.io/npm/v/@aniui/cli?style=flat-square&color=000" alt="npm version" /></a>
  <a href="https://github.com/anishlp7/aniui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/anishlp7/aniui?style=flat-square&color=000" alt="license" /></a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-000?style=flat-square" alt="platform" />
  <img src="https://img.shields.io/badge/Expo%20SDK-53%20%7C%2054%20%7C%2055-000?style=flat-square" alt="expo" />
</p>

---

AniUI is a [shadcn/ui](https://ui.shadcn.com)-inspired component library for **React Native**. Instead of installing a package, you copy component source files directly into your project. You own the code. Customize everything.

Built with [NativeWind](https://www.nativewind.dev) (or [Uniwind](https://github.com/nicepkg/uniwind)), [rn-primitives](https://rn-primitives.vercel.app) for accessibility, [class-variance-authority](https://cva.style), and strict TypeScript.

**Demo:** [Live Preview (Expo Go)](https://expo.dev/projects/4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0) | [Docs](https://aniui.dev)

## Quick Start

```bash
# npm
npx @aniui/cli init

# pnpm
pnpm dlx @aniui/cli init

# yarn
yarn dlx @aniui/cli init

# bun
bunx @aniui/cli init

# With Uniwind instead of NativeWind
npx @aniui/cli init --style uniwind
```

The CLI auto-detects your project (Expo/Bare RN), installs missing dependencies, and configures everything.

```bash
# Add components
npx @aniui/cli add button card input text
```

## CLI Commands

### `aniui init`

Sets up AniUI in your project:
- Asks: NativeWind or Uniwind? Theme preset? TypeScript?
- Auto-installs missing dependencies (nativewind, tailwindcss, reanimated, etc.)
- Uses `npx expo install` for Expo projects (auto-pins versions)
- Creates all config files (metro, babel, tailwind, global.css, tsconfig)

### `aniui add <components...>`

Copies component source files into your project:

```bash
npx @aniui/cli add button text input card badge dialog select tabs
```

- Resolves dependencies automatically
- Lists any npm packages you need to install
- Supports TypeScript and JavaScript (`tsx: false`)

### `aniui doctor`

Diagnoses your project setup:

```bash
npx @aniui/cli doctor
```

Checks all deps, config files, known conflicts, and tells you exactly what to fix.

### `aniui theme`

Switch theme presets: `default`, `blue`, `green`, `orange`, `rose`.

## Components

**81 components** in `cli/src/registry.ts` (tiers 1–3; source of truth for installs):

**Tier 1 — Light deps (cva / RN core):** Most inputs, display, layout, and form helpers — Button, Card, Text, Calendar, ChartTooltip, ImageGallery, ThemeProvider, and more.

**Tier 2 — Includes `react-native-reanimated`:** Skeleton, Toast, Alert Dialog, Drawer, Collapsible, Connection Banner, Typing Indicator.

**Tier 3 — Extra packages:** `@rn-primitives/*`, `@gorhom/bottom-sheet`, `react-native-svg` (charts), `react-native-gesture-handler` (swipeable) — e.g. Checkbox, Accordion, Bottom Sheet, Area Chart, Line Chart, Pie Chart.

## Compatibility

| | Status |
|---|---|
| Expo | ✅ SDK 53, 54 & 55 |
| Bare React Native | ✅ 0.76+ |
| NativeWind | ✅ v4 + v5 |
| Uniwind | ✅ `--style uniwind` |
| npm / pnpm / yarn / bun | ✅ All supported |
| TypeScript | ✅ Strict |
| JavaScript | ✅ Via CLI (`tsx: false`) |
| New Architecture | ✅ |
| Old Architecture | ✅ SDK 53/54 only |
| iOS | ✅ 15+ |
| Android | ✅ API 24+ |


**Try on device:** Scan with [Expo Go](https://expo.dev/go)

<img src="https://qr.expo.dev/eas-update?slug=exp&projectId=cf032338-2612-4ba6-9212-f2ec55f6a254&groupId=3f6e025d-ab3a-40cf-961d-b6297832c439&host=u.expo.dev" alt="Scan with Expo Go" width="160" />

## Documentation

Full docs with interactive previews: **[aniui.dev](https://aniui.dev)**

## Links

- [Documentation](https://aniui.dev)
- [GitHub](https://github.com/anishlp7/aniui)
- [Live Demo](https://expo.dev/projects/4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0)
- [Report an Issue](https://github.com/anishlp7/aniui/issues)

## License

MIT
