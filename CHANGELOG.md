# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-26

### Added

- **Dual Expo SDK support**: Expo 54 (NativeWind v4 + Tailwind v3) and Expo 55 (NativeWind v5 + Tailwind v4)
- **CLI auto-detection**: `aniui init` detects Expo SDK version and uses matching templates (v4 or v5)
- **Versioned templates**: `templates/v4/` and `templates/v5/` for each SDK generation
- **expo-55-starter**: New example app for Expo SDK 55 with NativeWind v5, Tailwind v4, Reanimated v4
- **Component render tests**: React Native Testing Library (RNTL) tests for all 54 components
- **Docs compatibility page**: Version matrix, setup guides, and migration steps at `/docs/compatibility`
- **Docs changelog page**: Release notes at `/docs/changelog`

## [0.2.9] - 2026-03-25

### Added

- **7 chart components**: Area Chart, Bar Chart, Line Chart, Pie Chart, Radar Chart, Radial Chart, Chart Tooltip
- **Charts section**: Landing page with hero + horizontal tabs + live recharts previews, 7 individual chart doc pages with 6 examples each
- **Charts CLI**: `npx @aniui/cli add area-chart` — chart components use react-native-svg (Tier 3)
- **Input icons**: `leadingIcon` and `trailingIcon` props for search, clear, and password toggle patterns
- **Expanded static tests**: 824 tests — component props, exports, chart-specific validation
- **MCP docs page**: Documentation for `@aniui/mcp` at `/docs/mcp`

## [0.1.3] - 2026-03-20

### Added

- Bare React Native CLI support in `npx @aniui/cli init` (metro.config.js + babel.config.js auto-setup)
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
