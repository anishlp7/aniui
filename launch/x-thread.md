# X / Twitter thread

*Draft — not sent.*

---

**1/**

React Native component libraries have an agent problem.

Vercel shipped the UI SDK last week. shadcn's had an official MCP since July.
Meanwhile RN has: *one* unofficial MCP with zero dependents.

Today AniUI closes that gap. The first RN component library built for the
agent-native era.

**2/**

Four new MCP tools on `@aniui/mcp` v0.2.0:

→ `search_components` — natural-language search
→ `list_blocks` — pre-built screens
→ `get_block` — full source of a block
→ `get_theme_preset` — primary color HSLs

150 components, 15 blocks, one tool call away.

**3/**

llms-full.txt — the entire library in one fetch.

818 KB. Every component's source, every block, every rule.

```
https://aniui.dev/llms-full.txt
```

Seed an agent's context once and it never hallucinates an AniUI import.

**4/**

Shadcn-spec registry means zero friction:

```
npx shadcn@latest add https://aniui.dev/r/login.json
```

Works. In a fresh Expo project. Right now.

**5/**

Agent Skill file at `skills/aniui/mcp.md`.

Cursor, Claude Code, Windsurf — they auto-discover it. No config, no
prompting. The agent just knows when AniUI is the right tool.

**6/**

Sitemap bug we fixed on the way: 55 of 150 components had drifted out of the
hand-maintained list.

Rewrote it to scan the filesystem. Can't drift again.

**7/**

Try it. In Claude Code or Cursor:

```json
{
  "mcpServers": {
    "aniui": { "command": "npx", "args": ["-y", "@aniui/mcp"] }
  }
}
```

Then ask: *"Build me a login screen using AniUI."*

Watch the tool calls. Watch the diff. Zero hallucinations.

**8/**

Phase 2 coming: SDK-aware registry, HTTP MCP, `createAniAgent()` — the RN
equivalent of Vercel's `createAgent()`.

Built by agents, used by agents.

https://aniui.dev
