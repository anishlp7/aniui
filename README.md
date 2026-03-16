<h1 align="center">
  AniUI
</h1>

<p align="center">
  <strong>Beautiful React Native components. Copy. Paste. Ship.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/aniui"><img src="https://img.shields.io/npm/v/aniui?style=flat-square&color=000" alt="npm version" /></a>
  <a href="https://github.com/anishlp7/aniui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/anishlp7/aniui?style=flat-square&color=000" alt="license" /></a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-000?style=flat-square" alt="platform" />
  <img src="https://img.shields.io/badge/Expo%20SDK-53%20%7C%2054-000?style=flat-square" alt="expo" />
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &nbsp;&bull;&nbsp;
  <a href="#components">Components</a> &nbsp;&bull;&nbsp;
  <a href="#documentation">Docs</a> &nbsp;&bull;&nbsp;
  <a href="#philosophy">Philosophy</a>
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

That's it. Components are copied to your `components/ui/` directory. Import and use them:

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

## Components

**29 components** across three tiers.

### Tier 1 — Core

Zero extra dependencies. Uses React Native core + NativeWind + CVA.

| Component | Description |
|-----------|-------------|
| [Button](docs/button) | Pressable with 5 variants and 3 sizes |
| [Text](docs/text) | Typography with h1–h4, p, lead, large, small, muted |
| [Input](docs/input) | Text input with default and ghost variants |
| [Textarea](docs/textarea) | Multi-line text input |
| [Card](docs/card) | Card with Header, Title, Description, Content, Footer |
| [Badge](docs/badge) | Status indicator with 4 variants |
| [Separator](docs/separator) | Horizontal or vertical divider |
| [Avatar](docs/avatar) | Image with fallback initials, 3 sizes |
| [Alert](docs/alert) | Alert with default, destructive, success, warning |
| [Label](docs/label) | Form field label |
| [Skeleton](docs/skeleton) | Animated loading placeholder |
| [Switch](docs/switch) | Themed toggle switch |
| [Checkbox](docs/checkbox) | Checkbox with checked/unchecked/disabled |
| [Radio Group](docs/radio-group) | Radio button group with context |
| [Progress](docs/progress) | Progress bar |
| [Spinner](docs/spinner) | Loading spinner with 3 sizes |
| [List](docs/list) | Styled list with ListItem, Title, Description |

### Tier 2 — Animated

Requires `react-native-reanimated` v3 for smooth animations.

| Component | Animation |
|-----------|-----------|
| [Accordion](docs/accordion) | Expand/collapse with height animation |
| [Tabs](docs/tabs) | Tab navigation with indicator transition |
| [Collapsible](docs/collapsible) | Animated show/hide content |
| [Toast](docs/toast) | Slide-in notification with auto-dismiss |
| [Dialog](docs/dialog) | Modal with fade + scale overlay |
| [Alert Dialog](docs/alert-dialog) | Confirmation dialog with Action/Cancel |
| [Tooltip](docs/tooltip) | Fade-in tooltip on press |
| [Popover](docs/popover) | Contextual overlay content |

### Tier 3 — Native

Requires additional native packages.

| Component | Extra Dependency |
|-----------|-----------------|
| [Bottom Sheet](docs/bottom-sheet) | `@gorhom/bottom-sheet` |
| [Action Sheet](docs/action-sheet) | `@gorhom/bottom-sheet` |
| [Select](docs/select) | `@gorhom/bottom-sheet` |
| [Date Picker](docs/date-picker) | `@react-native-community/datetimepicker` |

## Prerequisites

AniUI requires these in your project:

```bash
# Required
npm install nativewind tailwindcss@3 class-variance-authority clsx tailwind-merge

# For Tier 2 components
npm install react-native-reanimated

# For Tier 3 components (as needed)
npm install @gorhom/bottom-sheet react-native-gesture-handler
npm install @react-native-community/datetimepicker
```

**Supported platforms:**
- Expo SDK 53 & 54
- Bare React Native CLI 0.76+
- iOS 15+ / Android API 24+
- New Architecture & Old Architecture

## Documentation

Visit the [docs site](https://aniui.dev) for interactive previews, code examples, and API reference for every component.

Or run it locally:

```bash
cd docs
npm install
npm run dev
```

## Philosophy

AniUI follows a set of principles that keep it different from other React Native UI libraries:

- **You own the code.** Components are source files, not npm dependencies. Fork, modify, delete — it's yours.
- **Mobile only.** No web compromises. Every component is built and tested for iOS and Android.
- **NativeWind all the way.** No `StyleSheet.create()`. Every style is a Tailwind class. Override anything with `className`.
- **One file per component.** No splitting across multiple files. Each component is self-contained and under 80 lines.
- **Minimal dependencies.** A component doesn't add a dependency unless 3+ components need it.
- **Accessible by default.** Every interactive component has `accessibilityRole` set on day one.
- **Dark mode built in.** HSL CSS variables that switch automatically between light and dark themes.

## Theme

AniUI uses CSS custom properties for theming, just like shadcn/ui. Customize colors in `global.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## Project Structure

```
your-project/
├── components/
│   └── ui/
│       ├── button.tsx      # Copied by `aniui add button`
│       ├── card.tsx         # Copied by `aniui add card`
│       └── ...
├── lib/
│   └── utils.ts            # cn() helper — copied by `aniui init`
├── global.css              # Theme variables
└── tailwind.config.js      # AniUI theme tokens
```

## Contributing

Contributions are welcome. Please read the [CLAUDE.md](CLAUDE.md) for component guidelines, coding standards, and the quality checklist every component must pass before merging.

```bash
# Clone the repo
git clone https://github.com/anishlp7/aniui.git
cd aniui

# Install docs dependencies
cd docs && npm install

# Start the docs dev server
npm run dev
```

## License

MIT. See [LICENSE](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/anishlp7">Anish</a>
</p>
