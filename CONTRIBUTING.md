# Contributing to AniUI

Thanks for your interest in contributing! AniUI is a shadcn/ui-style component library for React Native — every contribution helps the community ship faster.

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
3. Run `cd cli && npm test` to validate

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

### Which Tier?

| Tier | When to use | Dependencies |
|------|-------------|--------------|
| 1 | Core RN + NativeWind + cva only | clsx, tailwind-merge, class-variance-authority |
| 2 | Needs animation | + react-native-reanimated |
| 3 | Needs native packages | + @gorhom/bottom-sheet, @react-native-community/datetimepicker, etc. |

## Code Style

- TypeScript strict mode, no `any`
- NativeWind className for all styling
- Named exports everywhere
- One file per component
- Keep it minimal — every line must earn its place

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Follow the component checklist above
3. Run `cd cli && npm test` — all tests must pass
4. Run `cd cli && npm run build` — must compile cleanly
5. Open a PR with a clear description of what and why

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
