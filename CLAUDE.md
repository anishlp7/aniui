# CLAUDE.md — AniUI

> shadcn/ui for React Native. Beautiful. Minimal. Yours.

## CRITICAL RULES — READ FIRST

1. **NEVER install components as npm dependencies.** Components are SOURCE FILES copied into user's project via CLI. Users OWN the code.
2. **NEVER use StyleSheet.create().** ALL styling is NativeWind className only.
3. **NEVER create barrel files (index.ts re-exports).** Each component is standalone.
4. **NEVER use default exports.** Named exports everywhere.
5. **NEVER add a dependency unless 3+ components need it.** Keep node_modules minimal.
6. **NEVER wrap components in unnecessary container Views.** Every element must earn its place.
7. **NEVER use `any` type.** 100% strict TypeScript.
8. **NEVER build for web.** Mobile-only (iOS + Android). If NativeWind renders on web automatically, fine — but don't optimize or test for it.
9. **ONE file per component.** No splitting into multiple files unless absolutely necessary.
10. **Target: each component under 80 lines of code.** If it's longer, simplify it.

## Project Identity

- **Name:** AniUI
- **npm package:** `aniui` (the CLI tool only)
- **License:** MIT
- **Creator:** Anish
- **Tagline:** "Beautiful React Native components. Copy. Paste. Ship."

## Locked Dependency Versions

DO NOT deviate from these versions. They are tested together.

```json
{
  "peerDependencies": {
    "react": ">=18.2.0",
    "react-native": ">=0.76.0",
    "nativewind": ">=4.2.1",
    "tailwindcss": ">=3.4.17",
    "react-native-reanimated": ">=3.10.0",
    "react-native-safe-area-context": ">=4.10.0"
  },
  "dependencies_for_components": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  }
}
```

**Dual SDK Support:** AniUI supports two generations:
- **Expo SDK 54 (v4):** NativeWind v4 + Tailwind v3 + Reanimated v3 (Old + New Architecture)
- **Expo SDK 55 (v5):** NativeWind v5 + Tailwind v4 + Reanimated v4 (New Architecture only)

Components use `className`/`cn()`/`cva()` which work identically on both. The CLI auto-detects the SDK generation and uses the matching templates.

## Supported Platforms

- Expo SDK 54 (NativeWind v4 + Tailwind v3)
- Expo SDK 55 (NativeWind v5 + Tailwind v4)
- Bare React Native CLI 0.76+
- iOS 15+, Android API 24+
- New Architecture: supported on all SDKs
- Old Architecture: supported on SDK 54 and earlier

## Repository Structure

```
aniui/
├── CLAUDE.md
├── LICENSE                    # MIT — copy from https://opensource.org/licenses/MIT
├── README.md
├── .gitignore
│
├── cli/                       # Published to npm as "aniui"
│   ├── package.json
│   ├── tsconfig.json
│   ├── bin/
│   │   └── index.ts           # #!/usr/bin/env node
│   └── src/
│       ├── index.ts
│       ├── commands/
│       │   ├── init.ts
│       │   ├── add.ts
│       │   └── theme.ts
│       ├── registry.ts        # Component name → file + deps mapping
│       └── utils/
│           ├── detect-project.ts
│           ├── file-ops.ts
│           └── logger.ts
│
├── components/                # Source files — copied by CLI into user's project
│   └── ui/
│       ├── button.tsx
│       ├── text.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── separator.tsx
│       ├── avatar.tsx
│       ├── alert.tsx
│       ├── switch.tsx
│       ├── checkbox.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── spinner.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── list.tsx
│       ├── skeleton.tsx
│       ├── accordion.tsx
│       ├── tabs.tsx
│       ├── dialog.tsx
│       ├── alert-dialog.tsx
│       ├── toast.tsx
│       ├── collapsible.tsx
│       ├── tooltip.tsx
│       ├── popover.tsx
│       ├── bottom-sheet.tsx
│       ├── action-sheet.tsx
│       ├── select.tsx
│       ├── date-picker.tsx
│       ├── slider.tsx
│       ├── toggle.tsx
│       ├── toggle-group.tsx
│       ├── drawer.tsx
│       ├── input-otp.tsx
│       ├── table.tsx
│       ├── search-bar.tsx
│       ├── chip.tsx
│       ├── fab.tsx
│       ├── empty-state.tsx
│       ├── dropdown-menu.tsx
│       ├── image.tsx
│       ├── segmented-control.tsx
│       ├── carousel.tsx
│       ├── rating.tsx
│       ├── stepper.tsx
│       ├── banner.tsx
│       ├── calendar.tsx
│       ├── swipeable-list-item.tsx
│       ├── form.tsx
│       ├── password-input.tsx
│       ├── theme-provider.tsx
│       ├── safe-area.tsx
│       ├── header.tsx
│       ├── tab-bar.tsx
│       ├── status-indicator.tsx
│       ├── labeled-separator.tsx
│       ├── masked-input.tsx
│       ├── phone-input.tsx
│       ├── number-input.tsx
│       ├── combobox.tsx
│       ├── progress-steps.tsx
│       ├── timeline.tsx
│       ├── chat-bubble.tsx
│       ├── stat-card.tsx
│       ├── grid.tsx
│       ├── price.tsx
│       ├── refresh-control.tsx
│       ├── infinite-list.tsx
│       ├── pagination.tsx
│       ├── file-picker.tsx
│       ├── connection-banner.tsx
│       ├── typing-indicator.tsx
│       └── image-gallery.tsx
│
├── lib/                       # Shared utils — also copied to user's project
│   └── utils.ts               # cn() helper — THE ONLY utility file
│
├── templates/                 # Copied during `npx @aniui/cli init`
│   ├── global.css
│   ├── tailwind.config.js
│   └── nativewind-env.d.ts
│
└── examples/
    └── expo-starter/          # Working demo app
        ├── package.json
        ├── app.json
        ├── app/
        ├── components/ui/
        └── global.css
```

## The ONLY Utility File

```typescript
// lib/utils.ts — This is the ONLY utility. Do NOT add more.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Component Pattern — EVERY Component Follows This EXACTLY

```tsx
// components/ui/[name].tsx
import { [BaseComponent] } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Step 1: Define variants with cva
const [name]Variants = cva(
  "base-styles-applied-to-all-variants",
  {
    variants: {
      variant: {
        default: "...",
        secondary: "...",
        outline: "...",
        ghost: "...",
        destructive: "...",
      },
      size: {
        sm: "...",
        md: "...",
        lg: "...",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Step 2: Define typed props
export interface [Name]Props
  extends React.ComponentPropsWithoutRef<typeof [BaseComponent]>,
    VariantProps<typeof [name]Variants> {
  className?: string;
}

// Step 3: Named export only
export function [Name]({ variant, size, className, ...props }: [Name]Props) {
  return (
    <[BaseComponent]
      className={cn([name]Variants({ variant, size }), className)}
      accessibilityRole="[appropriate-role]"
      {...props}
    />
  );
}
```

### Rules Enforced in Every Component:

- `className` prop ALWAYS supported (user can override any style)
- `...props` spread LAST (allows full customization)
- `accessibilityRole` set on every interactive component
- Named export matching PascalCase of filename
- Props interface is ALWAYS exported
- Use React Native base components: View, Text, Pressable, TextInput, ScrollView, FlatList, Switch, Image
- For Pressable components: add `accessible={true}` and minimum touch target `min-h-12 min-w-12` (48dp)
- For text content inside Pressable: always wrap in `<Text>` (never bare strings in RN)

## Component Tiers — What Gets Built When

### Tier 1: Zero extra dependencies (use RN core + NativeWind + cva only)

| # | Component | Base | Variants / Notes |
|---|-----------|------|------------------|
| 1 | button | Pressable | default, secondary, outline, ghost, destructive × sm, md, lg |
| 2 | text | Text | h1, h2, h3, h4, p, lead, large, small, muted |
| 3 | input | TextInput | default, ghost × sm, md, lg |
| 4 | textarea | TextInput | Multi-line text input |
| 5 | card | View | Compound: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| 6 | badge | View+Text | default, secondary, outline, destructive |
| 7 | separator | View | horizontal, vertical |
| 8 | avatar | Image+View | sm, md, lg (with fallback initials) |
| 9 | alert | View+Text | default, destructive, success, warning |
| 10 | label | Text | Styled label for form fields |
| 11 | switch | Switch | Themed wrapper around RN Switch |
| 12 | checkbox | Pressable | checked, unchecked, disabled |
| 13 | radio-group | Pressable | Group context + radio items |
| 14 | progress | View | Percentage bar |
| 15 | spinner | ActivityIndicator | sm, md, lg |
| 16 | list | View | Styled list items (NOT FlatList wrapper) |
| 17 | chip | Pressable | Selectable tag/chip |
| 18 | image | Image | Styled image with fallback |
| 19 | empty-state | View | Placeholder for empty lists/screens |
| 20 | fab | Pressable | Floating action button |
| 21 | search-bar | TextInput | Search input with icon |
| 22 | banner | View | Informational banner |
| 23 | form | View+Context | Form, FormField, FormItem, FormMessage + validation |
| 24 | password-input | TextInput | Show/hide toggle + strength indicator |
| 25 | theme-provider | Context | ThemeProvider, useTheme hook (light/dark/system) |
| 26 | safe-area | SafeAreaView | Styled safe area wrapper with variants |
| 27 | header | View | Compound: Header, HeaderLeft, HeaderTitle, HeaderRight, HeaderBackButton |
| 28 | tab-bar | View+Pressable | Bottom tab bar with badge support |
| 29 | status-indicator | View | online/offline/away/busy dot with pulse |
| 30 | labeled-separator | View+Text | Separator with centered text label |
| 31 | masked-input | TextInput | Auto-format masks (credit card, phone, date) |
| 32 | phone-input | TextInput | Phone with country code picker |
| 33 | number-input | TextInput+Pressable | +/- buttons with min/max/step |
| 34 | combobox | Modal+FlatList | Searchable select with type-to-filter |
| 35 | progress-steps | View+Context | Multi-step wizard progress indicator |
| 36 | timeline | View | Vertical event timeline with dot variants |
| 37 | chat-bubble | View+Text | Sent/received message bubbles with status |
| 38 | stat-card | View | KPI card with value, trend, and change % |
| 39 | grid | FlatList | Column-based grid layout |
| 40 | price | Text | Formatted currency display with Intl |
| 41 | refresh-control | RefreshControl | Themed pull-to-refresh |
| 42 | infinite-list | FlatList | Auto-load more on scroll |
| 43 | pagination | View+Pressable | Numbered page navigation |
| 44 | file-picker | Pressable | Upload UI with dashed border and preview |
| 45 | image-gallery | FlatList+Modal | Horizontal carousel with fullscreen viewer |

### Tier 2: Needs react-native-reanimated v3

| # | Component | Animation |
|---|-----------|-----------|
| 46 | skeleton | Animated pulse via opacity |
| 47 | toggle | Pressable toggle button |
| 48 | toggle-group | Multi-toggle group |
| 49 | drawer | Slide-in drawer overlay |
| 50 | input-otp | OTP code input |
| 51 | table | Data table with rows/cells |
| 52 | segmented-control | Animated segment indicator |
| 53 | carousel | Swipeable carousel |
| 54 | rating | Star/icon rating |
| 55 | connection-banner | Slide-in online/offline banner |
| 56 | typing-indicator | Animated typing dots for chat |

### Tier 3: Needs rn-primitives or external packages

| # | Component | Extra Dep |
|---|-----------|-----------|
| 57 | dialog | @rn-primitives/dialog + @rn-primitives/portal |
| 58 | alert-dialog | @rn-primitives/alert-dialog + @rn-primitives/portal |
| 59 | popover | @rn-primitives/popover + @rn-primitives/portal |
| 60 | tooltip | @rn-primitives/tooltip + @rn-primitives/portal |
| 61 | dropdown-menu | @rn-primitives/dropdown-menu + @rn-primitives/portal |
| 62 | context-menu | @rn-primitives/context-menu + @rn-primitives/portal |
| 63 | select | @rn-primitives/select + @rn-primitives/portal |
| 64 | accordion | @rn-primitives/accordion |
| 65 | tabs | @rn-primitives/tabs |
| 66 | collapsible | @rn-primitives/collapsible |
| 67 | slider | @rn-primitives/slider |
| 68 | checkbox | @rn-primitives/checkbox |
| 69 | radio-group | @rn-primitives/radio-group |
| 70 | progress | @rn-primitives/progress |
| 71 | toast | @rn-primitives/toast |
| 72 | bottom-sheet | @gorhom/bottom-sheet |
| 73 | action-sheet | @gorhom/bottom-sheet |
| 74 | date-picker | @react-native-community/datetimepicker |
| 75 | swipeable-list-item | react-native-gesture-handler |

### Tier 4: Chart components (needs react-native-svg)

| # | Component | Description |
|---|-----------|-------------|
| 76 | area-chart | SVG area chart with fill |
| 77 | bar-chart | SVG bar chart with grouping |
| 78 | line-chart | SVG line chart with series |
| 79 | pie-chart | SVG pie/donut chart |
| 80 | radar-chart | SVG radar/spider chart |
| 81 | radial-chart | SVG radial progress rings |
| 82 | chart-tooltip | Tooltip overlay for chart data |

## Theme System

### global.css (copied to user's project during init)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
```

### tailwind.config.js (copied to user's project during init)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
```

## CLI Spec

### `npx @aniui/cli init`

1. Check if running inside an Expo or bare RN project (look for `app.json` with `expo` key, or `react-native` in package.json)
2. Check if `nativewind` is in dependencies (if not, print install command and exit)
3. Prompt: component directory path (default: `components/ui`)
4. Prompt: utility path (default: `lib/utils.ts`)
5. Prompt: theme preset (default, blue, green, orange, rose)
6. Copy `lib/utils.ts` to chosen util path
7. Copy `global.css` to project root
8. Merge AniUI theme tokens into existing `tailwind.config.js` (or create new one)
9. Copy `nativewind-env.d.ts` to project root
10. Print success message with next steps

### `npx @aniui/cli add [names...]`

1. Validate component names against registry
2. Check if `@aniui/cli init` has been run (look for `lib/utils.ts`)
3. For each component:
   a. Read source file from bundled components
   b. Copy to user's components directory
   c. Check if component has extra dependencies (from registry)
4. Print: which files were created
5. Print: any npm packages that need to be installed
6. Print: import example

### CLI package.json

```json
{
  "name": "@aniui/cli",
  "version": "0.2.13",
  "description": "Beautiful React Native components. Copy. Paste. Ship.",
  "license": "MIT",
  "bin": {
    "aniui": "./dist/bin/index.js"
  },
  "files": [
    "dist",
    "components",
    "lib",
    "templates",
    "blocks"
  ],
  "dependencies": {
    "commander": "^12.0.0",
    "prompts": "^2.4.2",
    "chalk": "^4.1.2",
    "fs-extra": "^11.2.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/fs-extra": "^11.0.0",
    "@types/prompts": "^2.4.0"
  }
}
```

## Component Registry

The source of truth for the component registry is `cli/src/registry.ts`. It maps each component name to its file, description, npm dependencies, registry dependencies, and tier.

**Key rules for registry entries:**
- Tier 1 components: dependencies should only include `clsx`, `tailwind-merge`, and optionally `class-variance-authority`
- Tier 2 components: MUST include `react-native-reanimated` in dependencies
- Tier 3 components: MUST include their external package (e.g. `@gorhom/bottom-sheet`)
- `registryDependencies` lists other AniUI components that are auto-installed alongside

```typescript
export type ComponentEntry = {
  name: string;
  file: string;
  description: string;
  dependencies: string[];        // npm packages user needs
  registryDependencies: string[]; // other AniUI components needed
  tier: 1 | 2 | 3;
};
```

## Competitor Mistakes to AVOID

1. **React Native Reusables** built their CLI on top of shadcn's CLI → it breaks when shadcn changes. BUILD YOUR OWN CLI from scratch.
2. **Gluestack** tries to serve web + mobile → creates rendering bugs and CSS confusion. MOBILE ONLY.
3. **Gluestack** has Grid broken on Expo SDK 52+ and svg version conflicts. PIN EXACT VERSIONS and test before every release.
4. **NativeBase** bloated over time with too many features. KEEP IT MINIMAL — say no to feature creep.
5. **Tamagui** requires a compiler setup. ZERO BUILD CONFIG for users — just copy files and import.
6. **All competitors** lack good live demos. RECORD iOS + Android GIFs for every component.
7. **All competitors** have weak accessibility. EVERY component gets accessibilityRole on day one.

## Quality Checklist — Before Merging ANY Component

- [ ] Under 80 lines of code
- [ ] Single file, named export only
- [ ] Uses cva for variants (if component has variants)
- [ ] className prop supported
- [ ] ...props spread last
- [ ] accessibilityRole set on interactive elements
- [ ] Tested on Expo SDK 54 (iOS Simulator)
- [ ] Tested on Expo SDK 54 (Android Emulator)
- [ ] Dark mode works correctly
- [ ] TypeScript strict — no errors, no any
- [ ] No unnecessary wrapper Views
- [ ] Import path uses @/lib/utils for cn()

## Build Order — Follow This EXACTLY

**Weekend 1:**
1. Set up repo, CLAUDE.md, LICENSE, .gitignore
2. Create `lib/utils.ts`
3. Create `templates/global.css` + `templates/tailwind.config.js`
4. Build `button.tsx`
5. Build `text.tsx`
6. Build `input.tsx`
7. Build `card.tsx`
8. Build `badge.tsx`
9. Set up `examples/expo-starter/` and test all 5 components
10. Write README.md with code examples
11. Push to GitHub

**Weekend 2:**
12-15. Build separator, avatar, alert, label
16. Build skeleton, switch, checkbox
17. Build progress, radio-group, list
18. Update example app with all components
19. Record iOS + Android GIFs for README

**Weekend 3:**
20. Build CLI: `init` command
21. Build CLI: `add` command
22. Build CLI: `theme` command
23. Test CLI on fresh Expo project
24. Publish to npm as `aniui`

**Weekend 4:**
25-27. Build accordion, tabs, collapsible (Tier 2)
28-29. Build dialog, toast (Tier 2)
30. Launch on GitHub, Hacker News, r/reactnative, Twitter

## CLI Pre-Publish Checklist

**NEVER publish @aniui/cli to npm without completing ALL of these steps:**

1. **Build:** `cd cli && npm run build` — must succeed with zero errors
2. **Version check:** `node dist/bin/index.js --version` — must print the correct version
3. **Test add:** Run `aniui add tabs button card` in a clean test directory with a `.aniui.json` — verify files are copied and manifest is written
4. **Test status:** Run `aniui status` — verify installed/not-installed table renders correctly
5. **Test diff:** Run `aniui diff <name>` on an installed component — verify diff output
6. **Test init:** Run `aniui init` in a fresh Expo project — verify config files are generated
7. **Compiled path check:** Verify `require("../../package.json")` is NOT used anywhere — all files must use `getCliPackage()` from `utils/pkg.ts`

**Why:** The CLI compiles `src/` → `dist/src/`, which shifts `__dirname` one level deeper. Static `require("../../package.json")` resolves to `dist/package.json` (doesn't exist) instead of `cli/package.json`. This broke v0.2.20 for all npx users. Always test from the compiled `dist/` path, not the source.

## Git Conventions

```
feat: add button component
feat(cli): add init command
fix: button active state on android
fix(cli): handle missing tailwind config
docs: add button usage examples
refactor: simplify card compound component
chore: update expo sdk to 54
```

Tag releases: `v0.1.0` (first 5 components), `v0.2.0` (15 components), `v0.3.0` (CLI), `v1.0.0` (25 components + stable CLI)