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
  <img src="https://img.shields.io/badge/Expo%20SDK-53%20%7C%2054%20%7C%2055%20%7C%2056%20%7C%2057-000?style=flat-square" alt="expo" />
</p>

---

AniUI is a [shadcn/ui](https://ui.shadcn.com)-inspired component library for **React Native**. Instead of installing a package, you copy component source files directly into your project. You own the code. Customize everything.

Built with [Uniwind](https://uniwind.dev) (recommended) or [NativeWind](https://www.nativewind.dev), [rn-primitives](https://rn-primitives.vercel.app) for accessibility, [class-variance-authority](https://cva.style), and strict TypeScript. **93 components** + 15 pre-built screen blocks.

**Demo:** [Live Preview (Expo Go)](https://expo.dev/projects/4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0) | [Docs](https://aniui.dev)

## Quick Start

```bash
# npm
npx @aniui/cli init

# pnpm / yarn / bun
pnpm dlx @aniui/cli init
yarn dlx @aniui/cli init
bunx @aniui/cli init
```

On Expo SDK 55+ (New Architecture), `init` **defaults to [Uniwind](https://uniwind.dev)** — 2–3× faster than NativeWind, Tailwind v4 CSS-first, no Babel transform. NativeWind is fully supported and stays the default on Old-Arch / Expo ≤54:

```bash
npx @aniui/cli init --style uniwind      # default on Expo 55+
npx @aniui/cli init --style nativewind   # NativeWind (v4 stable / v5 preview via --nw)
```

The CLI auto-detects your project (Expo/Bare RN), installs missing dependencies (via `expo install` on Expo so versions are SDK-pinned), and configures Metro/Babel/Tailwind/global.css. Then add components:

```bash
npx @aniui/cli add button card input text
```

## CLI Commands

| Command | What it does |
|---------|--------------|
| `init` | Set up AniUI: pick engine (Uniwind/NativeWind) + theme, install deps, write config. Flags: `--style <uniwind\|nativewind>`, `--nw <v4\|v5>`, `-y/--yes`. |
| `add <components...>` | Copy component source into your project, resolving registry + npm deps. |
| `add-block <blocks...>` | Copy a pre-built full screen (login, signup, chat, pricing, …). |
| `theme` | Switch theme preset: `default`, `blue`, `green`, `orange`, `rose`. |
| `status` | Show installed components and available updates. |
| `diff <name>` | Show differences between your local component and the latest upstream. |
| `update <names...>` | Update installed components to the latest version. |
| `doctor` | Diagnose setup — deps, config files, known conflicts — and tell you what to fix. |
| `mcp` | Print MCP server configuration for AI tools. |
| `generate` | Generate a screen with AI (requires `ANTHROPIC_API_KEY`). |

Supports TypeScript and JavaScript (`tsx: false`).

## Use with the shadcn CLI or React Native Reusables

The full catalog is also published as a **shadcn-compatible registry** at `https://aniui.dev/r`, so you can install AniUI components with the **shadcn CLI** or the **React Native Reusables (RNR) CLI** — without the `aniui` CLI.

```bash
# shadcn CLI — add the namespace to components.json, then:
#   "registries": { "@aniui": "https://aniui.dev/r/{name}.json" }
npx shadcn@latest add @aniui/button

# …or by raw URL (works with shadcn AND the RNR CLI):
npx shadcn@latest add https://aniui.dev/r/button.json
npx @react-native-reusables/cli@latest add https://aniui.dev/r/card.json
```

If you already have an RNR / NativeWind / Uniwind project, components drop in with **zero extra setup** — AniUI uses the same theme tokens and `ui`/`lib` aliases. See the [shadcn / RNR registry guide](https://aniui.dev/docs/shadcn-registry).

## Components

**93 components** in `cli/src/registry.ts` (tiers 1–3; the source of truth for installs and the registry):

- **Tier 1 — light deps (cva / RN core):** inputs, display, layout, and form helpers — Button, Card, Text, Calendar, Breadcrumb, ChartTooltip, ImageGallery, ThemeProvider, and more.
- **Tier 2 — `react-native-reanimated`:** Skeleton, Drawer, Collapsible, Sidebar, Connection Banner, Typing Indicator.
- **Tier 3 — extra packages:** `@rn-primitives/*`, `@gorhom/bottom-sheet`, `react-native-svg` (charts), `react-native-gesture-handler` — e.g. Checkbox, Accordion, Command Menu, Bottom Sheet, Area/Line/Pie charts.

Plus **15 blocks** (full screens) via `add-block`.

## Compatibility

| | Status |
|---|---|
| Expo | ✅ SDK 53, 54, 55, 56 & 57 |
| Bare React Native | ✅ 0.76+ |
| Uniwind | ✅ **Recommended / default** on Expo 55+ |
| NativeWind | ✅ v4 (stable) + v5 (preview) — supported |
| npm / pnpm / yarn / bun | ✅ All supported |
| TypeScript | ✅ Strict |
| JavaScript | ✅ Via CLI (`tsx: false`) |
| New Architecture | ✅ (required for Uniwind) |
| Old Architecture | ✅ SDK 53/54 only (NativeWind) |
| iOS | ✅ 15+ |
| Android | ✅ API 24+ |

**Try on device:** Scan with [Expo Go](https://expo.dev/go)

<img src="https://qr.expo.dev/eas-update?slug=exp&projectId=4d52bb77-8a04-4713-b4b9-e2ed4c5ec1a0&groupId=92d11b98-2c25-469d-bafd-8ae5522e9487&host=u.expo.dev" alt="Scan with Expo Go" width="160" />

## Links

- [Documentation](https://aniui.dev)
- [shadcn / RNR registry guide](https://aniui.dev/docs/shadcn-registry)
- [GitHub](https://github.com/anishlp7/aniui)
- [Report an Issue](https://github.com/anishlp7/aniui/issues)

## License

MIT
