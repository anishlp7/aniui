# Third-Party Acknowledgments

AniUI components are original implementations built for React Native with NativeWind/Uniwind,
following shadcn/ui patterns. Some motion and UI-piece designs were **inspired by** patterns
popular in the React Native community (including open-source libraries such as
[Reacticx](https://github.com/rit3zh/reacticx), MIT © rit3zh).

AniUI does **not** copy source code from third-party libraries. Components are rewritten to
AniUI conventions: NativeWind `className`, named exports, lucide-react-native icons, and
minimal dependencies.

When adapting ideas from MIT-licensed projects, we maintain this file for transparency.

## MIT — Reacticx (inspiration only)

- **Project:** https://github.com/rit3zh/reacticx
- **License:** MIT © rit3zh
- **Relationship:** Design inspiration for carousel variants, loaders, UI pieces, navigation
  chrome, Skia motion effects, and layout/overlay primitives. AniUI's own fidelity review
  compared each of the components below directly against reacticx's source to make sure the
  *interaction*, not just the name, matches the original's intent — several earlier drafts had
  drifted into a different mechanism entirely (e.g. a scroll carousel instead of a gesture-driven
  one) and were rewritten to close that gap.
- **AniUI originals — Wave 1–3** (carousels, navigation chrome, UI pieces, general motion):
  `carousel-3d`, `carousel-circular`, `carousel-parallax`, `carousel-scale`, `carousel-tilt`,
  `vertical-flow-carousel`, `vertical-page-carousel`,
  `curved-bottom-tabs`, `mobile-dock`, `morphing-tabbar`, `fan-menu`,
  `flip-card`, `marquee`, `loader`, `shimmer`, `photo-stack`, `polaroid`, `profile-card`,
  `book-page`, `barcode-badge`, `coupon`, `event-ticket`, `receipt-card`, `social-button`,
  `verified-badge`, `qr-code`, `rolling-counter`.
- **AniUI originals — Wave 4** (Skia-based effects; charts also moved onto Skia for real
  entrance/morph/scrub animation instead of static SVG): `area-chart`, `bar-chart`,
  `line-chart`, `pie-chart`, `radar-chart`, `radial-chart`, `morph-fab`, `gooey-popover`,
  `gooey-search-tabs`, `squircle-view`. Note: `gooey-popover` and `gooey-search-tabs` reproduce
  reacticx's shader-driven blends visually using a non-shader Skia `Blur`+`ColorMatrix` technique
  instead — AniUI is intentionally not adopting Skia `RuntimeEffect`/SkSL shaders in this wave
  (see below).
- **AniUI originals — layout/overlay primitives and micro-interactions** (no reacticx
  equivalent existed in AniUI before; same "inspired by, rewritten independently" relationship):
  `tray`, `unfold-menu`, `action-rail`, `split-view`, `expandable-view`, `matched-geometry`,
  `arc-list`, `flexi-button`, `save-button`, `spin-button`, `stacked-chips`, `filling-stack`,
  `hamburger`, `theme-switch`, `animated-header-scrollview`, `animated-input-bar`.
- **Explicitly out of scope / not adapted from reacticx:** its Animated Text family (shimmer-wave
  text, gradient-wave text, etc.) and its Skia `RuntimeEffect`/SkSL shader effects (aurora,
  mesh-gradient, siri-ios-27, apple-intelligence, its own gooey-toggle/border-glow/loader-morph
  shaders, etc.) — AniUI's `gooey-*` components reproduce a similar *visual* using ordinary Skia
  primitives (`Blur`, `ColorMatrix`) instead of a custom shader. (AniUI previously also carried
  non-shader `border-beam`, `radiant-button`, `gooey-switch`, `morph-loader`, and `verified-shine`
  components built on this same substitution; they were removed by product decision, not because
  the technique failed.)
- **Removed:** `disclosure-group` was removed as a duplicate of the pre-existing `accordion`
  component (same grouped expand/collapse purpose, different engine) — see `accordion`'s own
  docs for the surviving version.
