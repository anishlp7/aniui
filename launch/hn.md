# Hacker News — Show HN

*Draft — not sent.*

---

**Title:** Show HN: AniUI – shadcn/ui for React Native, built for AI agents

**URL:** https://aniui.dev

**Body:**

Hi HN,

AniUI is a shadcn-style component library for React Native — copy-paste
source files, no runtime dependency, Uniwind or NativeWind for styling.
150 components, 15 pre-built screens, MIT.

Today I shipped the agent-native surface for it. Specifically:

- **MCP server** (`@aniui/mcp`) with `list_components`, `search_components`,
  `get_component`, `get_component_usage`, `list_blocks`, `get_block`,
  `get_theme_tokens`, `get_theme_preset`. Stdio, one command to install:
  `npx -y @aniui/mcp`.
- **Shadcn-spec registry** at `https://aniui.dev/r/{name}.json` — so
  `npx shadcn@latest add https://aniui.dev/r/button.json` works, no AniUI CLI
  required.
- **llms-full.txt** (818 KB) — every component's full source in one file for
  agent context seeding.
- **Agent Skill** at `skills/aniui/mcp.md` — auto-discovered by Cursor,
  Claude Code, Windsurf.
- **AGENTS.md** at the repo root.
- Sitemap rewritten to scan the filesystem (55 components had drifted out of
  the hand-maintained list).

The motivation: Vercel shipped the UI SDK last week with `createAgent()`,
shadcn's had an official MCP since July. In RN, nothing comparable existed —
the only option was one unofficial MCP with zero dependents. This felt like
unclaimed territory.

What I'd love feedback on:
1. Does `npx shadcn@latest add https://aniui.dev/r/login.json` actually work
   cleanly in your Expo project? That's the "zero-friction interop" bet.
2. Agent folks: are the MCP tool names and shapes right? I split
   `search_components` from `list_components` because agents seem to prefer
   search-first; happy to add more.
3. I'm about to start on an SDK-aware registry (Expo 54–58 × Uniwind/NativeWind
   × Old/New Arch, encoded so agents can't pick incompatible components). Is
   there prior art I should know about?

Repo: https://github.com/anishlp7/aniui
Docs: https://aniui.dev/docs
MCP docs: https://aniui.dev/docs/mcp
