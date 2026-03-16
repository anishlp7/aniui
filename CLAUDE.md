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
    "tailwindcss": ">=3.4.17 <4.0.0",
    "react-native-reanimated": ">=3.10.0 <4.0.0",
    "react-native-safe-area-context": ">=4.10.0"
  },
  "dependencies_for_components": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  }
}
```

**IMPORTANT:** NativeWind v4 uses Tailwind v3.x (NOT v4). Reanimated v3 (NOT v4). These are intentional for stability.

## Supported Platforms

- Expo SDK 53, 54 (primary target: 54)
- Bare React Native CLI 0.76+
- iOS 15+, Android API 24+
- New Architecture: supported
- Old Architecture: supported (until Expo SDK 55 drops it)

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
│       └── date-picker.tsx
│
├── lib/                       # Shared utils — also copied to user's project
│   └── utils.ts               # cn() helper — THE ONLY utility file
│
├── templates/                 # Copied during `aniui init`
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

Build these FIRST:

| # | Component | Base | Variants | Lines |
|---|-----------|------|----------|-------|
| 1 | button | Pressable | default, secondary, outline, ghost, destructive × sm, md, lg | ~60 |
| 2 | text | Text | h1, h2, h3, h4, p, lead, large, small, muted | ~45 |
| 3 | input | TextInput | default, ghost × sm, md, lg | ~55 |
| 4 | textarea | TextInput | Multi-line text input | ~38 |
| 5 | card | View | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter (compound) | ~65 |
| 5 | badge | View+Text | default, secondary, outline, destructive | ~35 |
| 6 | separator | View | horizontal, vertical | ~15 |
| 7 | avatar | Image+View | sm, md, lg (with fallback initials) | ~50 |
| 8 | alert | View+Text | default, destructive, success, warning | ~50 |
| 10 | label | Text | (styled label for form fields) | ~15 |
| 11 | switch | Switch | (themed wrapper around RN Switch) | ~30 |
| 12 | checkbox | Pressable | checked, unchecked, disabled | ~45 |
| 13 | radio-group | Pressable | (group context + radio items) | ~60 |
| 14 | progress | View | (percentage bar) | ~30 |
| 15 | spinner | ActivityIndicator | sm, md, lg sizes | ~39 |
| 16 | list | View | (styled list items — NOT FlatList wrapper) | ~40 |

### Tier 2: Needs react-native-reanimated v3

| # | Component | Animation | Lines |
|---|-----------|-----------|-------|
| 17 | skeleton | Animated pulse via opacity | ~42 |
| 18 | accordion | Height expand/collapse | ~68 |
| 19 | tabs | Indicator slide | ~86 |
| 20 | collapsible | Height animate | ~80 |
| 21 | toast | Slide in/out + auto dismiss | ~74 |
| 22 | dialog | Fade + scale overlay | ~77 |
| 23 | alert-dialog | Fade + zoom confirmation dialog | ~63 |
| 24 | tooltip | Fade in/out + position | ~44 |
| 25 | popover | Contextual overlay content | ~92 |

### Tier 3: Needs external packages

| # | Component | Extra Dep | Lines |
|---|-----------|-----------|-------|
| 26 | bottom-sheet | @gorhom/bottom-sheet | ~45 |
| 27 | action-sheet | @gorhom/bottom-sheet | ~50 |
| 28 | select | @gorhom/bottom-sheet | ~92 |
| 29 | date-picker | @react-native-community/datetimepicker | ~64 |

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

### `npx aniui init`

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

### `npx aniui add [names...]`

1. Validate component names against registry
2. Check if `aniui init` has been run (look for `lib/utils.ts`)
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
  "name": "aniui",
  "version": "0.1.0",
  "description": "Beautiful React Native components. Copy. Paste. Ship.",
  "license": "MIT",
  "bin": {
    "aniui": "./dist/bin/index.js"
  },
  "files": [
    "dist",
    "components",
    "lib",
    "templates"
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