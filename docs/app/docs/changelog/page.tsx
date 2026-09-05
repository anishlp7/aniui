
import { Heading } from "@/components/heading";
import Link from "next/link";

type ChangeType = "feat" | "fix" | "breaking" | "docs";

interface Change {
  type: ChangeType;
  text: string;
  link?: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  changes: Change[];
}

const typeBadge: Record<ChangeType, { label: string; className: string }> = {
  feat: { label: "feat", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  fix: { label: "fix", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  breaking: { label: "breaking", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  docs: { label: "docs", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
};

const releases: Release[] = [
  {
    version: "0.6.0",
    date: "2026-09-05",
    title: "AutoComplete, 48dp touch-target sweep + docs overhaul",
    changes: [
      { type: "feat", text: "New AutoComplete component (102 total): a free-text input with an inline filtered suggestion dropdown — distinct from Combobox (modal select-from-a-fixed-list) and SearchBar (no suggestions at all). Supports a custom filterFn, minCharsToTrigger, an async loading state, disabled options, and a clear button. The dropdown renders as a normal View below the input rather than position: \"absolute\" (no reliable viewport-relative overlay without a portal, and it's Tier 1). Grouped with Input and SearchBar via cross-links on all three doc pages.", link: "/docs/autocomplete" },
      { type: "fix", text: "48dp touch-target sweep across 9 components that fell under the CLAUDE.md-mandated min-h-12/min-w-12 minimum: PromptInput's toolbar/send buttons, Stepper, Select's search field, DropdownMenu/ContextMenu item rows, Calendar's day/month/year/nav cells, and Menubar — plus PasswordInput's and SearchBar's compact icon buttons, which keep their visual size and gain hitSlop instead. A new aniui lint:components script catches this class of regression going forward.", link: "/docs/prompt-input" },
      { type: "fix", text: "PromptInputTextarea was missing textAlignVertical=\"top\" (Android-only cursor-centering bug once the box hits maxHeight and scrolls), and the Prompt Input docs' hero preview had a + button and a model-selector button with no onClick handler at all — both now open real, working dropdowns matching the docs' own description.", link: "/docs/prompt-input" },
      { type: "feat", text: "New cli/src/deps-versions.ts: a per-Expo-SDK-bucket manifest for native/animation dependency versions, closing the gap where the registry only centralized dependency names, never versions. The compatibility page's Reanimated version-matrix row now reads from it instead of a hand-typed cell. Safe version bumps applied (react-native-svg, @gorhom/bottom-sheet) — never past what a given Expo SDK actually bundles.", link: "/docs/compatibility" },
      { type: "feat", text: "Expo SDK 57 gets its own named detection seam (ProjectInfo.sdk56Plus/sdk57Plus) instead of inline expoMajor >= 56 checks scattered across init and doctor — behavior is unchanged today, but a future SDK 58 divergence now has somewhere to attach.", link: "/docs/expo-57" },
      { type: "fix", text: "date-picker, carousel, toggle, and toggle-group were mislabeled Tier 2/3 in CLAUDE.md's human-readable table (needing reanimated or an external datetimepicker dependency) when the registry — and the actual component source — has always had them as Tier 1. Also removed a dead datetimepicker dependency check in the add command that could never fire." },
      { type: "fix", text: "Three example apps (expo-55, expo-56, expo-56-nw4-starter) shared one dangling real EAS project/owner/updates block across three otherwise-distinct app slugs — a copy-paste artifact and a public-repo privacy leak, and a plausible trigger for a reported Expo Snack \"Failed to upload file asset\" import error. Sanitized all three; expo-starter's own EAS project (the real, intentionally-published one behind the site-wide QR code) is untouched." },
      { type: "feat", text: "Wired the docs site's existing (but previously unused) Expo Snack iframe into the component preview's \"native\" tab, and added scripts/sync-examples.js so the 8 example apps' component mirrors no longer have to be kept in sync by hand.", link: "/docs/prompt-input" },
      { type: "docs", text: "Every component doc page's \"Source\" section now reads live from the real component file (via the same registry JSON build-registry.js already generates) instead of a hand-copied string nobody re-synced — the exact gap that let the Prompt Input docs describe a touch target the code had already moved past. Covers all 90 .tsx pages plus 5 MDX pages via a new <Source slug=\"...\" /> component.", link: "/docs/prompt-input" },
      { type: "docs", text: "Sidebar navigation restructured from one flat 94-item \"Components\" list into 8 collapsible, function-based categories (Foundation, Forms & Inputs, Feedback & Status, Overlays & Menus, Navigation & Structure, Data Display & Media, Chat & AI, Gestures & Actions), with state persisted per-visitor. New /docs/components category index fixes a previously orphaned route. dialog and select now get the same web/native preview toggle every other component page has.", link: "/docs/components" },
      { type: "docs", text: "Unified the docs site's two parallel code-highlighting systems onto Shiki (dual light/dark theme) across all 29 pages that still used a single-theme client-side highlighter — every blocks/* page, every charts/* page, and 7 getting-started guides. Dropped the now-unused sugar-high dependency." },
      { type: "fix", text: "Reduced-motion support added to Skeleton's pulse, TypingIndicator's bounce, Waveform's ambient bars, and StreamingText's blinking cursor — none had any awareness of the setting before. Slider's fill track now animates transform: scaleX instead of width, avoiding a native layout pass on every drag frame.", link: "/docs/skeleton" },
      { type: "docs", text: "Docs site micro-interaction polish: the copy button on every code sample gets a real Copy/Check icon crossfade instead of a text-only swap, the sidebar scrolls its active item into view on navigation and fully respects reduced motion, and the two \"active pill\" spring configs that had quietly drifted apart are now one shared constant." },
      { type: "feat", text: "CLI bumped to 0.6.0.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-07-15",
    title: "Lucide icons, AI components + 101 components",
    changes: [
      { type: "feat", text: "Five flagship components land: prompt-input (compound ChatGPT/Claude-style AI composer — auto-growing textarea on top, toolbar slots below for attach/model/mic buttons, and a send arrow with a voice fallback that becomes a stop button while streaming), streaming-text (typewriter AI response with blinking cursor), swipe-deck (Tinder-style card stack), slide-to-confirm (slide-to-pay control), and waveform (animated voice-recording bars) — 101 components total.", link: "/docs/prompt-input" },
      { type: "feat", text: "Command Menu rebuilt as a portal-based kbar-style palette (@rn-primitives/dialog + portal, no more RN Modal) with direct keyboard tracking so results stay visible above the keyboard on iOS and Android. Requires a PortalHost in the root layout — aniui add injects it automatically, and the starters mount it out of the box.", link: "/docs/command-menu" },
      { type: "feat", text: "All component icons now come from lucide-react-native — 28 components dropped unicode glyphs and hand-rolled SVG paths for crisp, consistent icons on iOS and Android, under both NativeWind and Uniwind. aniui init installs lucide-react-native automatically, and aniui add lists it per component. Icon props (icon, leadingIcon, trailingIcon) still accept any ReactNode.", link: "/docs/installation" },
      { type: "feat", text: "Three new components: avatar-group (overlapping stack with +N overflow), gradient (SVG linear gradient view), and keyboard-view (keyboard-avoiding form wrapper) — these brought the count to 96 before the AI components above took it to 101.", link: "/docs/avatar-group" },
      { type: "fix", text: "Android: Header back button, FilePicker remove button, and Pagination arrows rendered blank (SVG inside <Text> is invalid in RN) — all fixed by the icon migration restructure.", link: "/docs/header" },
      { type: "fix", text: "Charts (area/bar/line/radar/radial + tooltip) now adapt gridlines, labels, and center text to dark mode.", link: "/docs/compatibility" },
      { type: "fix", text: "Carousel and ImageGallery size slides to their own measured width (rotation/split-screen safe); Input's whole box is tappable again; Drawer plays its close animation; ToggleGroup's variant/size props actually apply; PhoneInput works uncontrolled; Combobox search is no longer covered by the keyboard; Toast ids no longer collide and timers are cleaned up; Calendar range mode no longer fires onSelect; NumberInput can be cleared while typing; Slider thumb tracks the finger.", link: "/docs/carousel" },
      { type: "docs", text: "Docs pages for the three new components; homepage and navbar Components links now start at Accordion; icon examples converted from Ionicons to lucide-react-native; inlined sources re-synced; component counts updated to 96.", link: "/docs/accordion" },
      { type: "feat", text: "CLI bumped to 0.5.0.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-07-05",
    title: "Expo SDK 57 + Uniwind is now the default",
    changes: [
      { type: "feat", text: "Uniwind is now the default styling engine. On New-Architecture-capable projects (Expo SDK 55+), aniui init defaults to Uniwind — 2–3× faster than NativeWind, Tailwind v4 CSS-first (@theme/@variant, no tailwind.config.js), Metro-plugin only (no Babel transform). Old-Architecture / Expo ≤54 / bare-RN fall back to NativeWind. An already-installed engine and --style still take precedence.", link: "/docs/uniwind" },
      { type: "feat", text: "Expo SDK 57 (React Native 0.86 / React 19.2 / Reanimated 4.5 / react-native-worklets 0.10 / gesture-handler 2.32) is now supported. Two new starters ship with the repo: examples/expo-57-starter (Uniwind) and examples/expo-57-nw5-starter (NativeWind v5); examples/with-uniwind bumped to SDK 57.", link: "/docs/compatibility" },
      { type: "feat", text: "NativeWind is soft-deprecated but still fully supported. aniui init shows a recommendation notice on fresh NativeWind inits (suppressed for already-installed NativeWind), and aniui doctor surfaces the same non-blocking note.", link: "/docs/uniwind" },
      { type: "feat", text: "Four new components: aspect-ratio, breadcrumb, menubar, and sidebar (93 components total).", link: "/docs/accordion" },
      { type: "fix", text: "react-native-worklets is now installed via 'expo install' (SDK-pinned) instead of the plain package manager on Expo 56+.", link: "/docs/cli" },
      { type: "docs", text: "Uniwind docs rewritten to match actual CLI output (withUniwindConfig/cssEntryFile, CSS-first @theme/@variant, no tailwind.config.js). Homepage, README, compatibility matrix, and llms.txt updated for SDK 57 and Uniwind-primary.", link: "/docs/uniwind" },
      { type: "feat", text: "CLI bumped to 0.4.0.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-05-23",
    title: "Expo SDK 56 Support",
    changes: [
      { type: "feat", text: "Expo SDK 56 (React 19.2.3 / React Native 0.85.3 / Reanimated 4.3.1) is now officially supported alongside SDK 54 and 55. Two new starter examples ship with the repo: examples/expo-56-starter (NativeWind v5 preview, Tailwind v4, CSS-first config) and examples/expo-56-nw4-starter (NativeWind v4 stable, Tailwind v3, classic tailwind.config.js).", link: "/docs/expo-56" },
      { type: "feat", text: "aniui init now prompts which NativeWind track to use on Expo SDK 55+ projects without an existing nativewind dependency. v5 preview is the default; v4 stable is the production-safer alternative. Pass --nw v4 or --nw v5 to skip the prompt in scripted runs. --yes preserves the previous default (v5).", link: "/docs/expo-56" },
      { type: "feat", text: "aniui init installs react-native-worklets ~0.8.3 automatically when initialising on Expo SDK 56 (Reanimated 4.3 split the worklets runtime into a separate required peer). Also bumps react-native-safe-area-context to ~5.7.0.", link: "/docs/expo-56" },
      { type: "feat", text: "aniui doctor warns when Expo SDK ≥56 is detected but react-native-worklets is missing.", link: "/docs/cli" },
      { type: "fix", text: "SDK detection in cli/src/utils/detect-project.ts now honours explicit nativewind / tailwindcss versions over the Expo SDK version bucket. Previously, a project with expo@~56 + nativewind@^4 was incorrectly routed to the v5 (CSS-first) template family because the detector checked the Expo major first. Reordering fixes the bug while keeping fresh-init behaviour unchanged.", link: "/docs/expo-56" },
      { type: "docs", text: "New /docs/expo-56 migration & setup guide with side-by-side v5-preview vs v4-stable trade-offs, fresh-install commands for each track, migration paths from SDK 54 and 55, and a footguns checklist (expo/fetch default, @expo/vector-icons deprecation, expo-router no longer transitively depending on @react-navigation).", link: "/docs/expo-56" },
      { type: "docs", text: "Compatibility matrix gains a third column for Expo SDK 56. README badges now read SDK 53 | 54 | 55 | 56. CLAUDE.md rewrites the Dual-SDK Support section as Tri-SDK Support.", link: "/docs/compatibility" },
      { type: "feat", text: "CLI bumped to 0.3.0.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.2.29",
    date: "2026-05-08",
    title: "TextInput Refs",
    changes: [
      { type: "feat", text: "Input, Textarea, PasswordInput, SearchBar, MaskedInput, PhoneInput, NumberInput: forward ref to the underlying React Native TextInput. Lets callers do inputRef.current?.focus() / blur() / clear() imperatively — useful for autofocus after a validation error, chaining inputs on submit, or programmatic dismissal.", link: "/docs/input" },
    ],
  },
  {
    version: "0.2.28",
    date: "2026-05-08",
    title: "Toast Positions & Animate Auto-Install",
    changes: [
      { type: "feat", text: "Toast: independent position and slide-direction controls. position (\"top\" | \"bottom\") chooses where the toast rests; from (\"top\" | \"bottom\" | \"left\" | \"right\") chooses which edge it slides in from. from defaults to match position so the natural pairing just works. Provider accepts defaultPosition + defaultFrom for app-wide defaults. Top resting position and from-top animation are the defaults — every existing toast() call works unchanged.", link: "/docs/toast" },
      { type: "fix", text: "Toast: corrected the slide-in direction on top-positioned toasts. The previous mapping used SlideInDown for the top position, but Reanimated's SlideInDown means \"starts below the screen and slides upward\" — so a top toast was visibly rising from the bottom. Top position now uses SlideInUp (starts above, slides down) and bottom uses SlideInDown.", link: "/docs/toast" },
      { type: "fix", text: "Toast: render through @rn-primitives/portal so toasts always anchor to the screen instead of the nearest positioned ancestor. Previously, placing ToastProvider inside a ScrollView would make toasts appear inside the scroll content (~40% from the top instead of at the top) and scroll with the page. The CLI auto-injects <PortalHost /> into the root layout. Toast is now tier-3 (gains @rn-primitives/portal as a dependency).", link: "/docs/toast" },
      { type: "fix", text: "TextInput components (Input, Textarea, PasswordInput, SearchBar, Combobox, Select, MaskedInput, PhoneInput, DataTable search, CommandMenu/CommandInput, InputGroup, InputGroupTextarea): placeholderTextColor was hardcoded to #71717a regardless of theme. In dark mode this rendered noticeably darker than the muted-foreground text. Now flips between #71717a (light) and #a1a1aa (dark). placeholderTextColor is a native RN prop — NativeWind doesn't process it, so the previous hsl(var(--muted-foreground)) attempt also did not work.", link: "/docs/input" },
      { type: "feat", text: "Animate: added exiting.slideOutLeft and exiting.slideOutRight presets to round out the four slide-in/slide-out directions used by the new toast from prop.", link: "/docs/animate" },
      { type: "fix", text: "CLI: aniui add toast / accordion / alert-dialog / collapsible / connection-banner / context-menu / drawer / dropdown-menu / hover-card / popover / swipeable-list-item / tooltip used to ship a broken install — the component file imported @/components/ui/animate but animate.tsx was never copied alongside, so the user would hit a 'Cannot find module' error on first render. The registry now lists animate as a registryDependency for all 12, so the CLI auto-installs it.", link: "/docs/cli" },
      { type: "fix", text: "CLI tests: new regression test scans every component file for @/components/ui/* imports and asserts each imported component is in its registryDependencies. Catches the entire class of bug before publish.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.2.27",
    date: "2026-05-08",
    title: "Windows Path Fix",
    changes: [
      { type: "fix", text: "CLI: import paths in installed components were using OS-native separators on Windows (e.g. import { cn } from \"..\\..\\lib\\utils\"), which TypeScript parses as unicode escape sequences and rejects with 'Bad character escape sequence'. Normalized path.relative() output to forward slashes in both add and add-block commands.", link: "/docs/cli" },
    ],
  },
  {
    version: "0.2.26",
    date: "2026-05-08",
    title: "SegmentedControl Dark-Mode Contrast",
    changes: [
      { type: "fix", text: "SegmentedControl: bumped the dark-mode active segment background from #27272a to #37373a so it visibly elevates above the muted track instead of blending in.", link: "/docs/segmented-control" },
    ],
  },
  {
    version: "0.2.25",
    date: "2026-05-07",
    title: "NativeWind v5 Crash Fix & Calmer Animations",
    changes: [
      { type: "fix", text: "NumberInput: works around a NativeWind v5 preview cssInterop bug that crashed with 'path.split is not a function' when text-center was used on a TextInput. Center alignment is now passed via the textAlign prop instead of a className.", link: "/docs/number-input" },
      { type: "fix", text: "Animation presets: zoomIn (used by AlertDialog) and fadeInDown/fadeInUp (used by Accordion and Collapsible) no longer overshoot. Dropped springify() in favor of a clean ease-out so dialogs and expanding content settle without bounce. Toast and ConnectionBanner keep their springy feel — bounce there reads as attention.", link: "/docs/animate" },
      { type: "fix", text: "SegmentedControl: bumped the dark-mode active segment background from #27272a to #37373a so it visibly elevates above the muted track instead of blending in.", link: "/docs/segmented-control" },
    ],
  },
  {
    version: "0.2.24",
    date: "2026-05-07",
    title: "iOS Dark Mode Sweep & Generic SegmentedControl",
    changes: [
      { type: "fix", text: "Switch: thumb is no longer invisible on iOS in dark mode. iOS thumbColor was previously gated to Android-only, leaving a white thumb on a near-white ON track. Thumb now derives from value across both platforms.", link: "/docs/switch" },
      { type: "breaking", text: "Switch: renamed thumbColorAndroid prop to thumbColor (now applies to both platforms).", link: "/docs/switch" },
      { type: "fix", text: "BottomSheet: sheet body and handle indicator now adapt to dark mode (was hardcoded #ffffff, making content unreadable on iOS dark).", link: "/docs/bottom-sheet" },
      { type: "fix", text: "ActionSheet: same dark-mode background fix as BottomSheet.", link: "/docs/action-sheet" },
      { type: "fix", text: "SegmentedControl: active segment background and label colors now adapt to dark mode (active was hardcoded #ffffff and disappeared into bg-muted).", link: "/docs/segmented-control" },
      { type: "fix", text: "InfiniteList: footer ActivityIndicator color now flips with the color scheme (was hardcoded dark, invisible on dark backgrounds).", link: "/docs/infinite-list" },
      { type: "fix", text: "Spinner: default color now adapts to dark mode when the color prop is not supplied.", link: "/docs/spinner" },
      { type: "fix", text: "TextInput components (Input, Textarea, PasswordInput, SearchBar, InputOTP, MaskedInput, PhoneInput, NumberInput, Combobox, Select): added keyboardAppearance, selectionColor, and cursorColor so the iOS keyboard matches the theme and the caret stays visible against dark input backgrounds." },
      { type: "feat", text: "SegmentedControl: now generic over T extends string | number — binds cleanly to enums and string unions. options accepts T[] (with optional parallel labels?: string[]) or { value, label?, disabled? }[] for unambiguous i18n pairing.", link: "/docs/segmented-control" },
      { type: "fix", text: "SegmentedControl: long i18n labels are now truncated to one line so layout stays stable across locales. onValueChange no longer fires when re-tapping the already-selected segment. className prop now merges with internal classes via cn() instead of being silently dropped.", link: "/docs/segmented-control" },
    ],
  },
  {
    version: "0.2.22",
    date: "2026-04-20",
    title: "CLI Docs Sync, A11y Fixes & ESLint",
    changes: [
      { type: "docs", text: "CLI docs page synced with actual --help output (5 missing commands added: add-block, doctor, status, diff, update)", link: "/docs/cli" },
      { type: "fix", text: "Tabs: switched TabsContent from accessibilityRole='tabpanel' (not in RN's AccessibilityRole union) to role='tabpanel' (RN 0.83+ Role union)", link: "/docs/tabs" },
      { type: "fix", text: "ThemeProvider: added missing useEffect dependencies (defaultTheme, applyTheme) to satisfy react-hooks/exhaustive-deps", link: "/docs/theme-provider" },
    ],
  },
  {
    version: "0.2.21",
    date: "2026-04-19",
    title: "CLI Bug Fix, SEO Overhaul & Premium Homepage",
    changes: [
      { type: "fix", text: "CLI: fixed Cannot find module package.json crash when running via npx (compiled path resolution bug)" },
      { type: "fix", text: "CLI: extracted shared getCliPackage() utility to resolve package.json from both source and dist paths" },
      { type: "fix", text: "SEO: OpenGraph URL fixed from relative './' to absolute 'https://aniui.dev'" },
      { type: "feat", text: "SEO: OG image and Twitter image configured for rich social sharing previews" },
      { type: "feat", text: "Sitemap: added 22 missing pages (15 blocks + 7 charts) for full search engine coverage" },
      { type: "docs", text: "82 unique SEO descriptions for component pages — 'AniUI Button — pressable with 5 variants...' format" },
      { type: "docs", text: "llms.txt: added Charts (7), Blocks (15), and Why AniUI sections for LLM discoverability" },
      { type: "feat", text: "Homepage: premium hero with dot pattern background, larger typography, GitHub star button, and 89+ badge" },
      { type: "fix", text: "Props table: added break-words to Default column to prevent overflow on narrow screens" },
    ],
  },
  {
    version: "0.2.20",
    date: "2026-04-19",
    title: "Tabs Rewrite, SEO Metadata, Anchor Links & Bug Fixes",
    changes: [
      { type: "feat", text: "Tabs: rewritten with filled/line variants, sm/md/lg sizes, vertical orientation, disabled, icons, and RTL support", link: "/docs/tabs" },
      { type: "feat", text: "SEO: added layout.tsx with title and description metadata to all 82 missing doc pages" },
      { type: "feat", text: "Anchor links: all 673 headings across 93 doc pages now have auto-generated IDs and clickable # links" },
      { type: "feat", text: "Heading component: reusable component with slugify, scroll-mt-20 offset, and hover # indicator" },
      { type: "feat", text: "Hash navigation: URLs like /docs/chip#closable now smooth-scroll to the section" },
      { type: "feat", text: "Shared constants.ts: single source of truth for component count and site metadata" },
      { type: "fix", text: "Tabs: added will-change-variable to prevent NativeWind v5 state reset warning", link: "/docs/tabs" },
      { type: "fix", text: "RefreshControl: theme-aware tintColor via useColorScheme, overridable via props", link: "/docs/refresh-control" },
      { type: "fix", text: "Stale counts fixed: MCP page (48), docs intro (81), preview-toggle (81), CLI README (81) all updated to 89" },
      { type: "fix", text: "Card layout.tsx: title corrected from lowercase to capitalized" },
      { type: "docs", text: "Tabs docs: 7 interactive preview sections (filled, line, vertical, disabled, icons, sizes, RTL)" },
      { type: "docs", text: "Tabs examples: full 7-section demos in all 4 example apps using actual Tabs component" },
      { type: "docs", text: "Docs root layout description updated to 89 components" },
    ],
  },
  {
    version: "0.2.19",
    date: "2026-04-17",
    title: "Animate Presets, Data Table, Command Menu & CLI Smart Updates",
    changes: [
      { type: "feat", text: "Animate: spring presets, layout animations, easing curves, usePressAnimation hook for Reanimated 4", link: "/docs/animate" },
      { type: "feat", text: "Data Table: sortable columns, search filtering, pagination, custom cell rendering, striped rows", link: "/docs/data-table" },
      { type: "feat", text: "Command Menu: Spotlight-style searchable palette with groups, keyboard shortcuts, disabled items", link: "/docs/command-menu" },
      { type: "feat", text: "CLI: aniui status, aniui diff, aniui update commands with component manifest tracking" },
      { type: "feat", text: "CLI: add command now writes version + hash to .aniui.json for smart update detection" },
      { type: "fix", text: "Data Table: replaced FlatList inside ScrollView with plain View rows, fixed column alignment with minWidth" },
      { type: "fix", text: "Tests: added 9 test suites (32 tests) for all new components; excluded animate from component pattern tests" },
      { type: "fix", text: "MCP registry synced from 57 to 89 entries to match CLI registry" },
      { type: "docs", text: "New doc pages with interactive previews for Animate, Data Table, and Command Menu" },
      { type: "docs", text: "Data Table docs: live previews for sorting, search, pagination, custom cell, and striped sections" },
      { type: "docs", text: "Component count updated to 89 across docs, README, llms.txt, .cursorrules, and all examples" },
      { type: "docs", text: "Full demos (6 sections each) for Data Table and Command Menu in all 4 example apps" },
    ],
  },
  {
    version: "0.2.18",
    date: "2026-04-15",
    title: "New Components, RTL Support & Input Group Rewrite",
    changes: [
      { type: "feat", text: "Field component: layout-focused form field with label, description, and error slots", link: "/docs/field" },
      { type: "feat", text: "Input Group component: rewritten with focus-aware container, CVA button variants, and textarea support", link: "/docs/input-group" },
      { type: "feat", text: "Kbd component: keyboard key display with size variants and KbdGroup separator", link: "/docs/kbd" },
      { type: "feat", text: "Hover Card component: preview content triggered by long-press, built on @rn-primitives/hover-card", link: "/docs/hover-card" },
      { type: "feat", text: "Direction Provider component: RTL/LTR context with I18nManager integration and useDirection hook", link: "/docs/direction-provider" },
      { type: "feat", text: "Combobox: multi-select with chips, groups, clear button, custom rendering, invalid/disabled/auto-highlight/popup mode", link: "/docs/combobox" },
      { type: "feat", text: "RTL guide with interactive language selector, logical properties table, and component support matrix", link: "/docs/rtl" },
      { type: "fix", text: "RTL: migrated 16 components from physical (ml-/mr-/border-l/right-) to logical (ms-/me-/border-s/end-) properties" },
      { type: "fix", text: "Added @rn-primitives/hover-card to all example package.json files" },
      { type: "docs", text: "New doc pages for Field, Input Group, Kbd, Hover Card, Direction Provider, and RTL guide" },
      { type: "docs", text: "Component count updated to 89 across all docs, README, llms.txt, and examples" },
      { type: "docs", text: "Full demos for all 5 new components added to all 4 example apps" },
    ],
  },
  {
    version: "0.2.17",
    date: "2026-04-13",
    title: "Syntax Highlighting + Bug Fixes",
    changes: [
      { type: "feat", text: "Docs: syntax highlighting for all code blocks via shiki (server-side, zero client JS)" },
      { type: "feat", text: "Docs: MDX infrastructure — pages can now be authored in MDX with auto-highlighted fenced code blocks" },
      { type: "feat", text: "Docs: all 78 doc pages converted to server components for faster loads" },
      { type: "fix", text: "Switch: hardcoded light-only colors replaced with dark mode support via useColorScheme()", link: "/docs/switch" },
      { type: "fix", text: "Switch: added trackColorOff, trackColorOn, thumbColorAndroid props for custom theming", link: "/docs/switch" },
      { type: "fix", text: "og:url meta tag now reflects the current page URL instead of always pointing to the homepage" },
      { type: "docs", text: "llms.txt updated from 48 to 82 components to match full registry" },
    ],
  },
  {
    version: "0.2.14",
    date: "2026-04-06",
    title: "Uniwind Support + Universal Theming",
    changes: [
      { type: "feat", text: "Full Uniwind styling engine support — same components work with NativeWind and Uniwind", link: "/docs/uniwind" },
      { type: "feat", text: "Uniwind dark mode via @layer theme + @variant light/dark in global.css", link: "/docs/dark-mode" },
      { type: "feat", text: "CLI init generates correct Uniwind config: metro.config.js, global.css, @import \"uniwind\"" },
      { type: "feat", text: "CLI doctor validates Uniwind-specific setup (withUniwindConfig, @variant dark, @import)" },
      { type: "feat", text: "Theme presets (default, blue, green, orange, rose) now apply to both light and dark variants" },
      { type: "feat", text: "withUniwind() HOC for third-party components like SafeAreaView" },
      { type: "feat", text: "react-native-svg added as core dependency for inline SVG icons in components" },
      { type: "feat", text: "with-uniwind example app with 77 interactive component demos and theme toggling" },
      { type: "fix", text: "file-picker.tsx: replaced inline <svg> (crashes on RN) with react-native-svg" },
      { type: "fix", text: "calendar.tsx, password-input.tsx, select.tsx: compacted SVG icons to meet 120-line limit" },
      { type: "fix", text: "Bare <Text> tags in example app now have text-foreground class for proper theming" },
      { type: "fix", text: "react-native-svg pinned to 15.15.3 across all example apps" },
      { type: "fix", text: "package-lock.json synced to fix npm ci failures in CI" },
      { type: "docs", text: "Dark mode guide updated with Uniwind section (@variant light/dark + Uniwind.setTheme())", link: "/docs/dark-mode" },
      { type: "docs", text: "Installation guide updated with react-native-svg in all install commands", link: "/docs/installation" },
    ],
  },
  {
    version: "0.2.13",
    date: "2026-03-26",
    title: "Expo 55 + NativeWind v5 Support",
    changes: [
      { type: "feat", text: "Dual SDK support: Expo 53/54 (NativeWind v4) + Expo 55 (NativeWind v5)", link: "/docs/compatibility" },
      { type: "feat", text: "CLI auto-detects SDK version during aniui init" },
      { type: "feat", text: "Versioned templates (v4/ and v5/) for each SDK generation" },
      { type: "feat", text: "expo-55-starter example app with NativeWind v5 + Tailwind v4" },
      { type: "feat", text: "React Native Testing Library render tests for all 54 components" },
      { type: "docs", text: "Compatibility guide with version matrix and migration steps", link: "/docs/compatibility" },
      { type: "docs", text: "Changelog page" },
    ],
  },
  {
    version: "0.2.12",
    date: "2026-03-25",
    title: "Charts + Input Enhancement",
    changes: [
      { type: "feat", text: "7 chart components: Area, Bar, Line, Pie, Radar, Radial, Tooltip", link: "/charts" },
      { type: "feat", text: "Charts landing page with live previews and horizontal tabs", link: "/charts" },
      { type: "feat", text: "Input: leadingIcon and trailingIcon props", link: "/docs/input" },
      { type: "feat", text: "Expanded static test suite (824 tests)" },
      { type: "feat", text: "MCP integration and documentation", link: "/docs/mcp" },
    ],
  },
  {
    version: "0.2.11",
    date: "2026-03-20",
    title: "Bare React Native Support",
    changes: [
      { type: "feat", text: "Bare React Native CLI support in aniui init" },
      { type: "feat", text: "Metro + Babel templates for bare RN projects" },
      { type: "feat", text: "bare-rn-starter example app" },
    ],
  },
  {
    version: "0.2.10",
    date: "2026-03-19",
    title: "Full Component Library",
    changes: [
      { type: "feat", text: "18 new components (47 total)" },
      { type: "feat", text: "Redesigned homepage with live theme preview" },
      { type: "feat", text: "Create page with theme editor" },
      { type: "feat", text: "Blocks: 15 pre-built screen templates", link: "/blocks" },
      { type: "feat", text: "Shared nav data and theme data system" },
    ],
  },
  {
    version: "0.2.9",
    date: "2026-03-16",
    title: "Initial Release",
    changes: [
      { type: "feat", text: "29 components across 3 tiers" },
      { type: "feat", text: "CLI with init, add, theme, mcp, and generate commands" },
      { type: "feat", text: "Theme system with 5 presets and dark mode" },
      { type: "feat", text: "MCP server for AI tool integration" },
      { type: "feat", text: "Documentation site at aniui.dev" },
    ],
  },
];

function Badge({ type }: { type: ChangeType }) {
  const badge = typeBadge[type];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}>
      {badge.label}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Changelog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All notable changes to AniUI.
        </p>
      </div>

      <div className="space-y-12">
        {releases.map((release) => (
          <div key={release.version} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                v{release.version}
              </span>
              <span className="text-sm text-muted-foreground">{release.date}</span>
            </div>
            <Heading as="h2" className="text-xl font-semibold tracking-tight text-foreground mb-4">
              {release.title}
            </Heading>
            <ul className="space-y-2.5">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Badge type={change.type} />
                  <span className="text-sm text-foreground leading-relaxed">
                    {change.link ? (
                      <Link href={change.link} className="hover:underline">
                        {change.text}
                      </Link>
                    ) : (
                      change.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
