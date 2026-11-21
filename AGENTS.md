# AGENTS.md — AniUI

This file tells AI coding agents (Claude Code, Cursor, Windsurf, Codex, v0, …)
how to work in this repo. For end-users building apps with AniUI, see
[`skills/aniui/mcp.md`](skills/aniui/mcp.md).

## The product

AniUI is **shadcn/ui for React Native**. Components are source files copied into
the user's project via the CLI — the user owns the code, there is no runtime
dependency on an AniUI npm package (only the CLI is published).

- 150 components across 4 tiers (see [CLAUDE.md](CLAUDE.md) for the full matrix)
- Shadcn-spec registry at [`docs/public/registry.json`](docs/public/registry.json) and
  [`docs/public/r/*.json`](docs/public/r/)
- MCP server in [`mcp/`](mcp/) — stdio, published as `@aniui/mcp`
- `llms.txt` and `llms-full.txt` for direct LLM context seeding

## Rules (hard — do not break)

1. **Never install components as npm dependencies.** They are source files.
2. **Never use `StyleSheet.create()`.** Everything is `className` via Uniwind or
   NativeWind — the same API; components are shared.
3. **Never create barrel files.** Each component is a single standalone file.
4. **Never use default exports.** Named exports only.
5. **Never add an npm dep unless 3+ components need it.**
6. **Never use `any`.** 100% strict TypeScript.
7. **Mobile only.** iOS + Android. Don't optimize for web.
8. **One file per component.** Target 80 lines; 180 is a soft cap.

See [`CLAUDE.md`](CLAUDE.md) for the full set.

## Agent surface

| Surface | Where | Purpose |
|---|---|---|
| MCP server (stdio) | `mcp/` (`npx -y @aniui/mcp`) | Direct tool access |
| Agent Skill | [`skills/aniui/mcp.md`](skills/aniui/mcp.md) | Auto-discovered by Cursor/Claude Code |
| Shadcn registry | `https://aniui.dev/r/{name}.json` | `npx shadcn add` compatibility |
| llms.txt | `https://aniui.dev/llms.txt` | Import map + rules |
| llms-full.txt | `https://aniui.dev/llms-full.txt` | Every component's source in one file |
| Sitemap | `https://aniui.dev/sitemap.xml` | Auto-generated from filesystem |

## Working in this repo

When editing or adding a component:

1. Read [`CLAUDE.md`](CLAUDE.md) first — the component pattern, tier rules, and
   CI gates are canonical.
2. Add an entry to `cli/src/registry.ts` with the correct tier and dependency
   list.
3. If the component needs theme colors in native props (icon color, Switch
   track, TextInput placeholder), use `useThemeColors()` from
   `components/ui/theme-provider.tsx` — never hardcode hex. Declare
   `theme-provider` in `registryDependencies`.
4. Before committing: `cd cli && npm test`, then
   `npm run registry:build`, then commit — in that order.
5. The MCP registry (`mcp/src/registry-data.ts`) is auto-generated; don't edit
   it by hand.

## CI gates (all must pass)

See `.github/workflows/ci.yml`. The key ones:

- `cd cli && npx tsc --noEmit`
- `cd cli && npm test`
- `cd docs && npm run build` (full prod build, not just tsc)
- `npm run registry:build` then `git diff --exit-code docs/public/registry.json docs/public/r`
- `grep -r "StyleSheet.create" components/ui/` → nothing
- `grep -r "export default" components/ui/` → nothing

## Attribution

Commits in this repo are solo-authored. **Do not** add a `Co-Authored-By` trailer.
