# AniUI, agent-native

*Draft — not sent. Blog / launch-page copy.*

---

Last week, Vercel shipped the **UI SDK**. Fifty headless accessibility
behaviors, forty-nine open-source component modules, and one API buried at the
bottom of the README that mattered more than the other hundred:
`createAgent()`. An agent bridge. A tiny surface that lets a coding agent read
and manipulate live UI state without screenshots, without DOM parsing, without
guessing. On one benchmark, 69% fewer tool calls.

Vercel wasn't the first to see this. shadcn shipped an official MCP server in
July. `npx shadcn@latest mcp`. A skill file at `skills/shadcn/mcp.md` that
Cursor and Claude Code auto-discover. A registry format that any agent-aware
tool knows how to speak. The thesis has a name now — **"Built by agents, used
by agents"** — and the big component libraries are executing it.

**React Native has nobody here.** React Native Reusables has one unofficial MCP
with no dependents. NativeWindUI has none. gluestack has none. The slot is
open. We're taking it.

---

## What shipped today

AniUI already had an MCP server, a shadcn-spec registry, and an `llms.txt`.
Today we close the gap:

### 1. The full MCP tool surface
Four new tools on `@aniui/mcp` v0.2.0:

- `search_components(query)` — natural-language search ranked by relevance.
- `list_blocks` — every pre-built screen.
- `get_block(name)` — full source for a block.
- `get_theme_preset(name)` — primary color HSLs for a built-in preset.

Plus the originals: `list_components`, `get_component`, `get_component_usage`,
`get_theme_tokens`.

### 2. `llms-full.txt` — the entire library in one fetch
818 KB (≈150 KB gzipped). Every component's full source, every block, every
rule. Seed an agent's context once, and it never hallucinates an AniUI import
again.

```
https://aniui.dev/llms-full.txt
```

### 3. Agent Skill, auto-discovered
A `skills/aniui/mcp.md` file shipped in the repo, following the shadcn
convention. Cursor, Claude Code, Windsurf — they find it and know when to use
AniUI without being told.

### 4. Sitemap that can't drift
The old sitemap was hand-maintained and 55 components had fallen off it. The
new one scans the filesystem at build time. Every component page, every chart,
every block, every registry endpoint — all 150 components are now indexed.

### 5. AGENTS.md at the root
The canonical "how agents should work in this repo" file, next to CLAUDE.md.

---

## Try it

In Claude Code or Cursor, add to your MCP config:

```json
{
  "mcpServers": {
    "aniui": { "command": "npx", "args": ["-y", "@aniui/mcp"] }
  }
}
```

Then: *"Build me a login screen using AniUI."*

The agent calls `list_blocks`, sees `login`, calls `get_block("login")`, drops
the file into `app/(auth)/login.tsx`. Done. No guessing at props. No invented
imports. Correct the first time.

## Or without MCP

The registry is shadcn-spec compliant, so:

```bash
npx shadcn@latest add https://aniui.dev/r/login.json
```

works out of the box.

---

## What's next

Phase 2 (the moats nobody else can copy quickly in RN):

- **SDK/engine-aware registry.** Expo SDK 54+ × 2 styling engines × 4 tiers —
  encoded as structured data so agents stop picking `bottom-sheet` on Expo 54
  Old Arch.
- **HTTP/SSE MCP endpoint** at `https://aniui.dev/mcp` — no npm install.
- **`createAniAgent()`** — the RN equivalent of Vercel's agent bridge. Live
  Reanimated/Skia/gesture state exposed to a connected agent at dev time.

If you build RN apps with an AI assistant, this is for you. Try it and tell us
where it falls over.

— Anish
