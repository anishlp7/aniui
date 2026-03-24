<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/public/logo-dark.png" />
    <source media="(prefers-color-scheme: light)" srcset="docs/public/logo-light.png" />
    <img alt="AniUI" src="docs/public/logo-light.png" width="150" />
  </picture>
</p>

<p align="center">
  <strong>Beautiful React Native components. Copy. Paste. Ship.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@aniui/cli"><img src="https://img.shields.io/npm/v/@aniui/cli?style=flat-square&color=000" alt="npm version" /></a>
  <a href="https://github.com/anishlp7/aniui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/anishlp7/aniui?style=flat-square&color=000" alt="license" /></a>
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-000?style=flat-square" alt="platform" />
  <img src="https://img.shields.io/badge/Expo%20SDK-53%20%7C%2054-000?style=flat-square" alt="expo" />
</p>

<p align="center">
  <a href="https://www.youtube.com/shorts/KxHLlLk8YkA">Demo</a> &nbsp;&bull;&nbsp;
  <a href="#quick-start">Quick Start</a> &nbsp;&bull;&nbsp;
  <a href="#components">Components</a> &nbsp;&bull;&nbsp;
  <a href="#documentation">Docs</a> &nbsp;&bull;&nbsp;
  <a href="#philosophy">Philosophy</a> &nbsp;&bull;&nbsp;
  <a href="#contributing">Contributing</a>
</p>

---

AniUI is a [shadcn/ui](https://ui.shadcn.com)-inspired component library for **React Native**. Instead of installing a package, you copy component source files directly into your project. You own the code. Customize everything.

Built with [NativeWind](https://www.nativewind.dev) v4, [class-variance-authority](https://cva.style), and strict TypeScript. Every component is a single file, styled with Tailwind classes, and works on both iOS and Android out of the box.

**Demo:** [YouTube Short](https://www.youtube.com/shorts/KxHLlLk8YkA)

## Quick Start

```bash
# Initialize AniUI in your project
npx @aniui/cli init

# Add components
npx @aniui/cli add button
npx @aniui/cli add card input text
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

**48 components** — all listed alphabetically. Each component's docs page tells you if it needs extra dependencies.

| Component | Description |
|-----------|-------------|
| [Accordion](https://aniui.dev/docs/accordion) | Expand/collapse content sections |
| [Action Sheet](https://aniui.dev/docs/action-sheet) | Action sheet with options |
| [Alert](https://aniui.dev/docs/alert) | Alert with default, destructive, success, warning |
| [Alert Dialog](https://aniui.dev/docs/alert-dialog) | Confirmation dialog with Action/Cancel |
| [Avatar](https://aniui.dev/docs/avatar) | Image with fallback initials, 3 sizes |
| [Badge](https://aniui.dev/docs/badge) | Status indicator with 4 variants |
| [Banner](https://aniui.dev/docs/banner) | Full-width notification with variants and dismiss |
| [Bottom Sheet](https://aniui.dev/docs/bottom-sheet) | Bottom sheet overlay |
| [Button](https://aniui.dev/docs/button) | Pressable with 5 variants and 3 sizes |
| [Calendar](https://aniui.dev/docs/calendar) | Month grid with single date and range selection |
| [Card](https://aniui.dev/docs/card) | Card with Header, Title, Content, Footer |
| [Carousel](https://aniui.dev/docs/carousel) | Horizontal scrollable carousel with pagination dots |
| [Checkbox](https://aniui.dev/docs/checkbox) | Checkbox with checked/unchecked/disabled |
| [Chip](https://aniui.dev/docs/chip) | Interactive tag for filters and multi-select |
| [Collapsible](https://aniui.dev/docs/collapsible) | Animated show/hide content |
| [Date Picker](https://aniui.dev/docs/date-picker) | Calendar popup picker with range support |
| [Dialog](https://aniui.dev/docs/dialog) | Modal with fade + scale overlay |
| [Drawer](https://aniui.dev/docs/drawer) | Slide-in side navigation panel |
| [Dropdown Menu](https://aniui.dev/docs/dropdown-menu) | Context menu with fade animation |
| [Empty State](https://aniui.dev/docs/empty-state) | Placeholder for empty lists and error states |
| [FAB](https://aniui.dev/docs/fab) | Floating action button with positioning |
| [Image](https://aniui.dev/docs/image) | Image with loading, error fallback, rounded variants |
| [Input](https://aniui.dev/docs/input) | Text input with default and ghost variants |
| [Input OTP](https://aniui.dev/docs/input-otp) | OTP verification input with individual cells |
| [Label](https://aniui.dev/docs/label) | Form field label |
| [List](https://aniui.dev/docs/list) | Styled list with ListItem, Title, Description |
| [Popover](https://aniui.dev/docs/popover) | Contextual overlay content |
| [Progress](https://aniui.dev/docs/progress) | Progress bar |
| [Radio Group](https://aniui.dev/docs/radio-group) | Radio button group with context |
| [Rating](https://aniui.dev/docs/rating) | Star rating with interactive and read-only modes |
| [Search Bar](https://aniui.dev/docs/search-bar) | Search input with icon, clear, and cancel |
| [Segmented Control](https://aniui.dev/docs/segmented-control) | iOS-style segmented control |
| [Select](https://aniui.dev/docs/select) | Dropdown select |
| [Separator](https://aniui.dev/docs/separator) | Horizontal or vertical divider |
| [Skeleton](https://aniui.dev/docs/skeleton) | Animated loading placeholder |
| [Slider](https://aniui.dev/docs/slider) | Draggable slider for numeric values |
| [Spinner](https://aniui.dev/docs/spinner) | Loading spinner with 3 sizes |
| [Stepper](https://aniui.dev/docs/stepper) | Numeric increment/decrement with min/max/step |
| [Switch](https://aniui.dev/docs/switch) | Themed toggle switch |
| [Table](https://aniui.dev/docs/table) | Data table with header, body, rows, and cells |
| [Tabs](https://aniui.dev/docs/tabs) | Tab navigation with indicator transition |
| [Text](https://aniui.dev/docs/text) | Typography with h1–h4, p, lead, large, small, muted |
| [Textarea](https://aniui.dev/docs/textarea) | Multi-line text input |
| [Toast](https://aniui.dev/docs/toast) | Slide-in notification with auto-dismiss |
| [Toggle](https://aniui.dev/docs/toggle) | Two-state toggle button with variants |
| [Toggle Group](https://aniui.dev/docs/toggle-group) | Exclusive selection group |
| [Tooltip](https://aniui.dev/docs/tooltip) | Fade-in tooltip on press |

## Prerequisites

AniUI requires these in your project:

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

Contributions are welcome! Please read the [contributing guide](CONTRIBUTING.md) and [component guidelines](CLAUDE.md) before submitting a PR.

```bash
# Clone the repo
git clone https://github.com/anishlp7/aniui.git
cd aniui

# Run tests
cd cli && npm install && npm test

# Start the docs dev server
cd ../docs && npm install && npm run dev
```

## License

MIT. See [LICENSE](LICENSE).
