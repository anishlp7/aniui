<h1 align="center">
  AniUI
</h1>

<p align="center">
  <strong>Beautiful React Native components. Copy. Paste. Ship.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@aniui/cli"><img src="https://img.shields.io/npm/v/@aniui/cli?style=flat-square&color=000" alt="npm version" /></a>
  <a href="https://github.com/anishlp7/aniui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/anishlp7/aniui?style=flat-square&color=000" alt="license" /></a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-000?style=flat-square" alt="platform" />
  <img src="https://img.shields.io/badge/Expo%20SDK-53%20%7C%2054-000?style=flat-square" alt="expo" />
</p>

---

AniUI is a [shadcn/ui](https://ui.shadcn.com)-inspired component library for **React Native**. Instead of installing a package, you copy component source files directly into your project. You own the code. Customize everything.

Built with [NativeWind](https://www.nativewind.dev) v4, [class-variance-authority](https://cva.style), and strict TypeScript. Every component is a single file, styled with Tailwind classes, and works on both iOS and Android out of the box.

## Quick Start

```bash
# Initialize AniUI in your project
npx aniui init

# Add components
npx aniui add button
npx aniui add card input text
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

### `npx aniui init`

Sets up AniUI in your project:
- Creates `lib/utils.ts` (the `cn()` helper)
- Copies `global.css` with theme variables
- Configures `tailwind.config.js` with AniUI tokens

### `npx aniui add <components...>`

Copies component source files into your project:

```bash
npx aniui add button text input card badge
```

- Resolves dependencies automatically (e.g., `date-picker` installs `calendar`)
- Lists any npm packages you need to install

### `npx aniui theme <preset>`

Switch theme presets: `default`, `blue`, `green`, `orange`, `rose`.

## Components

**37 components** across three tiers.

### Tier 1 — Core (no extra deps)

Button, Text, Input, Textarea, Card, Badge, Separator, Avatar, Alert, Label, Switch, Checkbox, Radio Group, Progress, Spinner, List, Slider, Toggle, Toggle Group, Input OTP, Table, Calendar, Date Picker

### Tier 2 — Animated (needs react-native-reanimated)

Skeleton, Accordion, Tabs, Collapsible, Toast, Dialog, Alert Dialog, Tooltip, Popover, Drawer

### Tier 3 — Native (needs extra packages)

Bottom Sheet, Action Sheet, Select — powered by `@gorhom/bottom-sheet`

## Prerequisites

```bash
# Required
npm install nativewind tailwindcss@3 class-variance-authority clsx tailwind-merge

# For Tier 2 components
npm install react-native-reanimated

# For Tier 3 components (as needed)
npm install @gorhom/bottom-sheet react-native-gesture-handler
```

**Supported platforms:**
- Expo SDK 53 & 54
- Bare React Native CLI 0.76+
- iOS 15+ / Android API 24+
- New Architecture & Old Architecture

## Documentation

Full docs with interactive previews: **[aniui.dev](https://aniui.dev)**

## Links

- [Documentation](https://aniui.dev)
- [GitHub](https://github.com/anishlp7/aniui)
- [Report an Issue](https://github.com/anishlp7/aniui/issues)

## License

MIT
