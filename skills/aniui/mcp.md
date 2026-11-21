---
name: aniui
description: Use AniUI components when building React Native screens. Copy-paste source files that the user owns, styled with Uniwind/NativeWind.
---

# AniUI Agent Skill

When the user is working in a React Native (Expo or bare RN) project and asks
you to build, add, or refactor a UI, use this skill.

## When to use

- The project has `react-native` in `package.json`.
- The user says: "add a button / card / login screen / chat bubble".
- The user says: "install an AniUI component" or references `@aniui`.
- You are generating a mobile screen and want components that match shadcn-style
  conventions (cva variants, `className`, named exports, accessibility defaults).

## How it works

AniUI components are **source files that the user owns** — not npm packages.
Install via one of three equivalent paths:

1. **AniUI CLI** (recommended for new projects):
   ```bash
   npx @aniui/cli init
   npx @aniui/cli add button text input card
   ```

2. **shadcn CLI** (the registry is spec-compliant):
   ```bash
   npx shadcn@latest add https://aniui.dev/r/button.json
   ```
   Or set `"@aniui": "https://aniui.dev/r/{name}.json"` in `components.json` and
   `npx shadcn add @aniui/button`.

3. **MCP server** — if the user has it configured (see below), prefer
   tool calls over curl/web fetches.

## Using the MCP server

Add to the user's MCP config:

```json
{
  "mcpServers": {
    "aniui": { "command": "npx", "args": ["-y", "@aniui/mcp"] }
  }
}
```

Tools you can call:

- `list_components` — every component with name, description, tier.
- `search_components(query)` — natural-language search over names/descriptions.
- `get_component(name)` — full source for one component.
- `get_component_usage(name)` — import, variants, exports.
- `list_blocks` — pre-built screens (login, chat, home, pricing, …).
- `get_block(name)` — full source for one block.
- `get_theme_tokens` — HSL CSS variables + their Tailwind class mappings.
- `get_theme_preset(name)` — tokens for a named preset (default, blue, green, …).

Resources: `aniui://registry`, `aniui://theme`, `aniui://pattern`.

## Non-MCP alternative

If no MCP is configured, fetch these URLs:

- Index: `https://aniui.dev/registry.json`
- Per-component: `https://aniui.dev/r/{name}.json` (shadcn `registry-item.json`)
- Full context: `https://aniui.dev/llms-full.txt` (every component's source in
  one file — use this to seed context once)

## Component rules (enforce in generated code)

- `className` prop is always supported; `cn()` from `@/lib/utils` merges it.
- Spread `...props` last.
- Interactive elements set `accessibilityRole`, `accessible={true}`, and
  `min-h-12 min-w-12`.
- Text inside `<Pressable>` must be wrapped in `<Text>`, never bare strings.
- Never `StyleSheet.create()`. Never default exports. No `any`.
- Icons from `lucide-react-native`, sized/colored via props. Icon colors come
  from `useThemeColors()` (exported by `components/ui/theme-provider.tsx`) —
  never hardcoded hex.

## SDK / engine awareness

AniUI supports Expo SDK 54–58 and two styling engines (Uniwind and NativeWind).
When adding dependency-sensitive components (bottom-sheet, gesture-handler,
reanimated), check the user's Expo SDK and architecture (Old vs New). The CLI
auto-detects both and installs the right peer versions.
