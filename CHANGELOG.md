# Changelog

All notable changes to this project will be documented in this file.

## [0.1.3] - 2026-03-20

### Added

- Bare React Native CLI support in `npx aniui init` (metro.config.js + babel.config.js auto-setup)
- `examples/bare-rn-starter/` — complete bare RN starter kit with NativeWind configured
- Templates for bare RN: `metro.config.bare.js`, `babel.config.bare.js`

### Changed

- Updated `examples/expo-starter/` to Expo SDK 54

## [0.1.2] - 2026-03-19

### Added

- 18 new components: slider, toggle, toggle-group, drawer, input-otp, table, search-bar, chip, fab, empty-state, dropdown-menu, image, segmented-control, carousel, rating, stepper, banner, calendar (47 total)
- Redesigned homepage with live theme preview
- `/create` theme editor with random HSL color generation (infinite colors)
- Shared theme data system (`lib/theme-data.ts`) eliminating duplication
- Shared navigation data (`lib/nav-data.ts`) as single source of truth
- Reusable `ThemePreview` and `ThemeSelect` components
- `add-block` CLI command for screen templates

## [0.1.0] - 2026-03-16

### Added

- 29 components across 3 tiers (16 core, 9 animated, 4 native)
- CLI with `init`, `add`, `theme`, `mcp`, and `generate` commands
- MCP server for AI tool integration
- Theme system with 5 presets (default, blue, green, orange, rose)
- Dark mode support via CSS custom properties
- Full TypeScript support with strict mode
- Cursor Rules and Claude skill files for AI-assisted development
- CI workflow with type checking and component linting
