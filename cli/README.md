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

Built with [NativeWind](https://www.nativewind.dev), [class-variance-authority](https://cva.style), and strict TypeScript. Every component is a single file, styled with Tailwind classes, and works on both iOS and Android out of the box.

## Quick Start

```bash
# Initialize AniUI in your project
npx @aniui/cli init

# Add components
npx @aniui/cli add button
npx @aniui/cli add card input text
```

Components are copied to your `components/ui/` directory. Import and use them:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export function WelcomeScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to AniUI</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="muted">Beautiful components for React Native.</Text>
        <Button onPress={() => console.log("shipped!")}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
```

## CLI Commands

### `npx @aniui/cli init`

Sets up AniUI in your project:
- Auto-detects Expo SDK version (53/54 or 55) or Bare React Native
- Creates `lib/utils.ts` (the `cn()` helper)
- Copies `global.css` with theme variables
- Configures `tailwind.config.js` with AniUI tokens
- Sets up `metro.config.js`, `babel.config.js`, and `tsconfig.json`

### `npx @aniui/cli add <components...>`

Copies component source files into your project:

```bash
npx @aniui/cli add button text input card badge
```

- Resolves dependencies automatically (e.g., `date-picker` installs `calendar`)
- Lists any npm packages you need to install
- Supports TypeScript and JavaScript (`tsx: false` in config)

### `npx @aniui/cli theme <preset>`

Switch theme presets: `default`, `blue`, `green`, `orange`, `rose`.

## Components

**54 components** across 3 tiers:

**Tier 1 — Zero extra deps:** Accordion, Alert, Avatar, Badge, Banner, Button, Card, Checkbox, Chip, Empty State, FAB, Image, Input, Label, List, Progress, Radio Group, Search Bar, Separator, Spinner, Switch, Text, Textarea

**Tier 2 — Needs Reanimated:** Accordion, Alert Dialog, Calendar, Carousel, Collapsible, Date Picker, Dialog, Drawer, Dropdown Menu, Input OTP, Popover, Rating, Segmented Control, Skeleton, Slider, Stepper, Table, Tabs, Toast, Toggle, Toggle Group, Tooltip

**Tier 3 — External packages:** Action Sheet, Bottom Sheet, Select (`@gorhom/bottom-sheet`)

## Compatibility

| | Status |
|---|---|
| Expo | SDK 53, 54 & 55 |
| Bare React Native | 0.76+ |
| TypeScript | Strict |
| JavaScript | Via CLI (`tsx: false`) |
| New Architecture | Supported |
| Old Architecture | SDK 53/54 only |
| iOS | 15+ |
| Android | API 24+ |

## Prerequisites

```bash
# Required
npm install nativewind class-variance-authority clsx tailwind-merge

# SDK 53/54
npm install tailwindcss@3 react-native-reanimated

# SDK 55
npx expo install nativewind@preview react-native-css tailwindcss@4 react-native-reanimated

# For Tier 3 components (as needed)
npm install @gorhom/bottom-sheet react-native-gesture-handler
```

## Documentation

Full docs with interactive previews: **[aniui.dev](https://aniui.dev)**

## Links

- [Documentation](https://aniui.dev)
- [GitHub](https://github.com/anishlp7/aniui)
- [Report an Issue](https://github.com/anishlp7/aniui/issues)

## License

MIT
