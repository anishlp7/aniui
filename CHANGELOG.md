# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-05-23

### Added

- **Expo SDK 56 support.** AniUI now officially supports Expo SDK 56 (React 19.2.3 / React Native 0.85.3 / Reanimated 4.3.1) alongside SDK 54 and 55.
- **Two new starter examples**: `examples/expo-56-starter` (NativeWind v5 preview track, Tailwind v4, CSS-first config) and `examples/expo-56-nw4-starter` (NativeWind v4 stable track, Tailwind v3, classic `tailwind.config.js`).
- **NativeWind track prompt in `aniui init`.** On Expo SDK 55+ projects without an existing `nativewind` install, the CLI now asks whether to use v5 preview or v4 stable. Pass `--nw v4` or `--nw v5` to skip the prompt in scripted runs. The default under `--yes` is `v5` (matches previous behaviour).
- `aniui doctor` now warns when Expo SDK ≥56 is detected but `react-native-worklets` is missing.
- New `/docs/expo-56` migration & setup guide on the docs site.

### Changed

- **CLI bumped to `0.3.0`.**
- **SDK detection logic** in `cli/src/utils/detect-project.ts` now honours explicit `nativewind` / `tailwindcss` versions over the Expo SDK version bucket. This fixes a bug where projects with `expo@~56` + `nativewind@^4` were incorrectly routed to the v5 (CSS-first) template family.
- CLI installs `react-native-worklets@~0.8.3` and bumps `react-native-safe-area-context` to `~5.7.0` when initialising on Expo SDK 56.
- Landing page hero announces SDK 56 support.
- Compatibility matrix and README updated for SDK 56.

### Notes

- NativeWind v5 stable has not released yet; the v5 track ships on `nativewind@^5.0.0-preview.4`. We recommend the v4 stable track for production apps until v5 stabilises.
- SDK 56 is **New Architecture only**. SDK 55 already dropped Old Arch.
- `bottom-sheet` and `action-sheet` continue to use `@gorhom/bottom-sheet` on SDK 56. The new Expo UI `@expo/ui/community/bottom-sheet` primitive is intentionally not adopted in this release — a possible opt-in wrapper is tracked for a future release.

## [0.2.10] - 2026-03-26

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
