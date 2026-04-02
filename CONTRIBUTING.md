# Contributing to AniUI

Thanks for your interest in contributing! AniUI is a shadcn/ui-style component library for React Native — every contribution helps the community ship faster.

## Architecture

AniUI uses a two-layer architecture:

```
Layer 1 — Primitives (headless, accessible)
  Simple components  → build with RN core (Button, Input, Text, Badge, Card)
  Complex components → use @rn-primitives as base (Dialog, Popover, Select)

Layer 2 — AniUI Design Layer (NativeWind/Uniwind styling on top)
  Your design, your tokens, your feel
```

### When to use rn-primitives vs build from scratch

**Use rn-primitives for:**
- Overlay/positioning components (Popover, Dropdown Menu, Tooltip, Context Menu)
- Dialog/modal components (Dialog, Alert Dialog, Select)
- Components needing keyboard navigation (Accordion, Tabs, Radio Group)
- Components needing focus management (Dialog, Popover)

**Build from scratch for:**
- Simple layout components (Card, Badge, Separator, Grid)
- Simple interactive components (Button, Input, Switch, Chip)
- Display-only components (Text, Avatar, Spinner, Skeleton, Image)

### PortalHost requirement

Components using rn-primitives overlays require `<PortalHost />` at the app root. When adding or modifying a component that uses `@rn-primitives/portal`, note this in the docs page.

## Local Setup

```bash
git clone https://github.com/anishlp7/aniui.git
cd aniui

# CLI
cd cli && npm install && npm run build

# MCP server
cd ../mcp && npm install && npm run build

# Docs site
cd ../docs && npm install && npm run dev
```

## Adding a New Component

1. Create `components/ui/{name}.tsx` following the exact pattern in CLAUDE.md
2. Add an entry to `cli/src/registry.ts`
3. Create a test file at `components/__tests__/{name}.test.tsx`
4. Create a docs page at `docs/app/docs/{name}/page.tsx`
5. Run `cd cli && npm test` to validate CLI
6. Run `npx jest` at root to validate component tests

### Component Checklist

- [ ] Single file, named export only (no default exports)
- [ ] Under 80 lines of code
- [ ] Uses `cva` for variants (if applicable)
- [ ] `className` prop supported
- [ ] `...props` spread last
- [ ] `accessibilityRole` set on interactive elements
- [ ] Imports `cn` from `@/lib/utils`
- [ ] All styling via NativeWind `className` — no `StyleSheet.create()`
- [ ] Strict TypeScript — no `any` types
- [ ] Dark mode works correctly
- [ ] Tested on iOS Simulator and Android Emulator
- [ ] Test file created in `components/__tests__/`
- [ ] Docs page created with usage examples
- [ ] Works with both NativeWind and Uniwind

### Which Tier?

| Tier | When to use | Dependencies |
|------|-------------|--------------|
| 1 | Core RN + NativeWind + cva only | clsx, tailwind-merge, class-variance-authority |
| 2 | Needs animation | + react-native-reanimated |
| 3 | Needs rn-primitives or native packages | + @rn-primitives/*, @gorhom/bottom-sheet, etc. |

### Tier 3 Component Checklist (additional)

- [ ] `@rn-primitives/*` packages listed in registry dependencies
- [ ] PortalHost requirement documented
- [ ] Tested with `<PortalHost />` at app root in example apps

## Code Style

- TypeScript strict mode, no `any`
- NativeWind className for all styling
- Named exports everywhere
- One file per component
- Keep it minimal — every line must earn its place
- Use theme CSS variables (e.g., `text-foreground`) not hardcoded colors

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Follow the component checklist above
3. Run `cd cli && npm test` — CLI tests must pass
4. Run `npx jest` at root — component tests must pass
5. Run `cd docs && npm run build` — docs must build
6. Open a PR with a clear description of what and why

## Commit Messages

```
feat: add button component
feat(cli): add init command
fix: button active state on android
docs: add button usage examples
refactor: simplify card compound component
```

## Questions?

Open an issue at https://github.com/anishlp7/aniui/issues
