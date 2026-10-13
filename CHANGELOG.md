# Changelog

All notable changes to this project will be documented in this file.

## [0.7.1] - 2026-09-15

### Added

- **TimePicker** (custom scroll-wheel columns), **DateAndTimePicker** (AniUI Calendar + time wheels), and **DateTimePicker** alias — full date/time coverage with zero extra npm dependencies, alongside the existing calendar-based DatePicker.
- Dedicated Date & Time Picker docs page at `/docs/date-and-time-picker`.

### Changed

- **CLI bumped to `0.7.1`.**
- Component count now 149 across homepage, README, llms.txt, MCP docs, and example apps.

### Fixed

- Removed stale `@react-native-community/datetimepicker` references in Claude command templates and example apps; all AniUI pickers are now custom source.
- DatePicker docs no longer claim the discontinued community dependency.

## [0.7.0] - 2026-09-08

### Added

- Two new carousels: **vertical-flow-carousel** (tap-to-focus vertical stack with tilt/scale/blur) and **vertical-page-carousel** (full-bleed vertical paging deck with scale/opacity ramp + haptic tick) — 148 components total.
- **morph-fab**, **gooey-popover**, and **gooey-search-tabs** land as a new gooey/morph family sharing a Blur+ColorMatrix metaball technique.
- `useThemeColors()` hook exported from `components/ui/theme-provider.tsx` — one source of truth for every native-prop color that can't read a className token (TextInput caret/placeholder, Switch track/thumb, Slider fill, icon color, chart canvas fills). 48 components migrated off independently hardcoded hex approximations. `aniui init`, `aniui add`, and `aniui theme` keep it in sync with the active preset.
- `cli/src/deps-versions.ts` now also tracks `@shopify/react-native-skia`, `expo-blur`, `expo-haptics`, and `react-native-qrcode-svg` per Expo SDK bucket.

### Changed

- **CLI bumped to `0.7.0`.**
- `aniui add`, `add-block`, and `doctor` now route **every** dependency install suggestion for a component through `expo install` on Expo projects (previously only `aniui init` did). Fixes an SDK-ahead-of-latest footgun on the newer Tier 4 / gooey native deps.
- Sidebar navigation reorganized by component purpose (new Buttons section, Carousels promoted to top-level, consolidated Loaders section, regrouped Overlays/Navigation/Pieces).

### Removed

- **BREAKING**: 7 components that never grew past a rough first draft: `disclosure-group`, `border-beam`, `gooey-switch`, `morph-loader`, `verified-shine`, `radiant-button`, `squircle-view`. None had shipped in a published `@aniui/cli` release (last npm was 0.5.0), so no live-user migration path is affected — local copies remain untouched; the CLI simply stops offering the name.

### Fixed

- Carousel/gesture positioning across `carousel-circular`, `curved-bottom-tabs`, `mobile-dock`, and `animated-header-scrollview` — all now measure their own `onLayout` size instead of assuming they own the full screen.
- `tray`: content view no longer unmounts the Modal on close (Android timing bug on quick re-open); Modal stays mounted with its own `visible` prop.
- `unfold-menu`: spring overshoot clamped; trigger icon no longer drifts toward the screen edge mid-morph.
- `gooey-popover`: panel visible in light mode (added a border; backdrop no longer defaults to white-on-white); content clamped to screen edges on wrap; trigger button no longer hidden behind its own canvas.
- `stacked-chips` gap bug, `event-ticket` barcode visibility, `receipt-card` missing drop-shadow.
- Synced ~60 component doc previews with their mobile example-app demos.
- `examples/bare_rn_starter/tsconfig.json` was missing the `@/*` paths mapping — fixed.

## [0.6.1] - 2026-09-05

### Added

- Rewrote all 102 example-app demos from generic variant showcases into realistic use cases (settings screens, checkout flows, a ChatGPT/Claude-style chat composer, dashboards, swipe-to-archive inbox). Full variant/size coverage kept as additional sections on Button/Input/Textarea.
- Recategorized every example app's home-screen catalog to match the docs sidebar's 8-category taxonomy.

### Changed

- **CLI bumped to `0.6.1`.**
- All 7 example apps now default to light theme on launch regardless of system setting.

### Fixed

- `Select` dropdown opened ~30px below trigger on New Architecture: `measureInWindow()` already returns window-absolute coords; the component was double-counting `insets.top`.
- `Popover`, `HoverCard`, `DropdownMenu`, `Tooltip`: content opened with ~48px of extra space because the Trigger wrapped children in a `min-h-12/min-w-12` Pressable that `@rn-primitives` measured directly. Removed the forced sizing; kept the 48dp accessible tap target via `hitSlop={14}`. Also wired real `useSafeAreaInsets()` into all four Contents.
- `Tooltip` specifically: zeroed `insets.top` because its default `side="top"` clamp + `measure()` combination still pinned near the status bar.
- Example apps' shared component-preview screen used `flex-1` via `className`, which collapsed under the styling setup — switched to a plain `style` prop.
- Docs site always painted light first and only switched to dark after a client-side effect — a visible flash on dark-mode visitors. A blocking inline script now applies the correct theme before paint.

## [0.6.0] - 2026-09-05

### Added

- **AutoComplete** (102 components total): free-text input with inline filtered suggestion dropdown — distinct from Combobox (modal select-from-fixed-list) and SearchBar (no suggestions). Supports custom `filterFn`, `minCharsToTrigger`, async loading, disabled options, and a clear button.
- `aniui lint:components` script catches 48dp touch-target regressions.
- Wired the docs site's Expo Snack iframe into the component preview's "native" tab.
- `scripts/sync-examples.js` so the 8 example apps' component mirrors no longer need manual syncing.
- Live `<Source slug="..." />` component — every component doc page's Source section now reads from the real file via the registry JSON (fixes the exact gap that let Prompt Input docs describe a touch target the code had moved past). Covers all 90 .tsx pages + 5 MDX pages.
- Expo SDK 57 gets its own detection seam (`ProjectInfo.sdk56Plus/sdk57Plus`) in place of inline `expoMajor >= 56` checks.
- `Animate`: `exiting.slideOutLeft` and `exiting.slideOutRight` presets.

### Changed

- **CLI bumped to `0.6.0`.**
- Sidebar navigation restructured from one flat 94-item list into 8 collapsible, function-based categories (Foundation, Forms & Inputs, Feedback & Status, Overlays & Menus, Navigation & Structure, Data Display & Media, Chat & AI, Gestures & Actions), state persisted per-visitor.
- Unified docs-site code highlighting onto Shiki with dual light/dark themes across all 29 pages that still used a single-theme client highlighter; dropped `sugar-high`.
- `Slider`'s fill track now animates `transform: scaleX` instead of `width`, avoiding a native layout pass per drag frame.

### Fixed

- 48dp touch-target sweep across 9 components (PromptInput toolbar/send, Stepper, Select search, DropdownMenu/ContextMenu rows, Calendar day/month/year/nav cells, Menubar). PasswordInput/SearchBar compact icon buttons keep visual size and gain `hitSlop` instead.
- `PromptInputTextarea` was missing `textAlignVertical="top"` (Android cursor-centering bug at `maxHeight`); Prompt Input docs' hero preview had non-functional + and model-selector buttons — both now open real dropdowns.
- Reduced-motion support added to `Skeleton` pulse, `TypingIndicator` bounce, `Waveform` ambient bars, and `StreamingText` cursor.
- Sanitized a shared EAS project/owner/updates block that had been copy-pasted across three example apps (public-repo privacy leak + plausible trigger for a reported Expo Snack "Failed to upload file asset" error).
- `date-picker`, `carousel`, `toggle`, `toggle-group` were mislabeled Tier 2/3 in CLAUDE.md's human-readable table while the registry — correctly — had them Tier 1.

## [0.5.0] - 2026-07-15

### Added

- Five flagship components (101 total): **prompt-input** (compound ChatGPT/Claude-style AI composer), **streaming-text** (typewriter with blinking cursor), **swipe-deck** (Tinder-style card stack), **slide-to-confirm** (slide-to-pay control), and **waveform** (animated voice-recording bars).
- Three further components: **avatar-group** (overlapping stack with +N overflow), **gradient** (SVG linear gradient view), and **keyboard-view** (keyboard-avoiding form wrapper) — brought the count to 96 before the AI components took it to 101.
- `CommandMenu` rebuilt as a portal-based kbar-style palette (`@rn-primitives/dialog` + portal, no more RN Modal) with direct keyboard tracking. Requires a `PortalHost` in the root layout; `aniui add` injects it automatically.

### Changed

- **CLI bumped to `0.5.0`.**
- All component icons migrated to `lucide-react-native` — 28 components dropped unicode glyphs and hand-rolled SVG paths. `aniui init` installs `lucide-react-native` automatically. Icon props (`icon`, `leadingIcon`, `trailingIcon`) still accept any `ReactNode`.

### Fixed

- Android: Header back button, FilePicker remove button, and Pagination arrows rendered blank (`<Svg>` inside `<Text>` is invalid in RN) — fixed by the icon-migration restructure.
- Charts (area/bar/line/radar/radial + tooltip) now adapt gridlines, labels, and center text to dark mode.
- Carousel + ImageGallery slide-size uses measured width (rotation/split-screen safe); Input tappable area; Drawer close animation; ToggleGroup variant/size prop application; PhoneInput uncontrolled mode; Combobox search above keyboard; Toast id collisions + timer cleanup; Calendar range mode no longer fires `onSelect` prematurely; NumberInput clearable while typing; Slider thumb tracks finger.

## [0.4.0] - 2026-07-05

### Added

- **Expo SDK 57** support (React Native 0.86 / React 19.2 / Reanimated 4.5 / `react-native-worklets` 0.10 / `gesture-handler` 2.32). Two new starters: `examples/expo-57-starter` (Uniwind) and `examples/expo-57-nw5-starter` (NativeWind v5); `examples/with-uniwind` bumped to SDK 57.
- Four new components: **aspect-ratio**, **breadcrumb**, **menubar**, **sidebar** (93 components total).

### Changed

- **CLI bumped to `0.4.0`.**
- **Uniwind is now the default styling engine** on New-Architecture-capable projects (Expo SDK 55+). 2–3× faster than NativeWind; Tailwind v4 CSS-first; Metro-plugin only (no Babel transform). Old Arch / Expo ≤54 / bare-RN fall back to NativeWind. An already-installed engine and `--style` still take precedence.
- NativeWind is soft-deprecated but still fully supported. `aniui init` shows a non-blocking recommendation notice on fresh NativeWind inits; `aniui doctor` surfaces the same note.

### Fixed

- `react-native-worklets` is now installed via `expo install` (SDK-pinned) instead of the plain package manager on Expo 56+.

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
