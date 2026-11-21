# LinkedIn post

*Draft — not sent.*

---

React Native had a gap in the agent-native shift. Today we close it.

Two weeks ago Vercel released the UI SDK — their "built by agents, used by
agents" bet. shadcn/ui has had an official MCP server since July. Every major
React component library is racing to make itself first-class for AI coding
tools.

React Native had one unofficial MCP server for the ecosystem, with zero
dependents.

AniUI v0.2 (the MCP) closes that gap:

🔹 Full MCP tool surface — 8 tools covering components, blocks, theme presets,
   and natural-language search
🔹 Shadcn-spec registry at aniui.dev/r/{name}.json — so Cursor's
   `shadcn add` command works out of the box on React Native
🔹 llms-full.txt — the entire 150-component library in one 818 KB file for
   agent context seeding
🔹 Agent Skill file auto-discovered by Cursor, Claude Code, Windsurf

If you build React Native with an AI assistant, try it:

```json
{
  "mcpServers": {
    "aniui": { "command": "npx", "args": ["-y", "@aniui/mcp"] }
  }
}
```

Then ask the agent to build you a login screen. Watch it call `list_blocks`,
pull the full source for the one you want, and drop it in. No hallucinated
props, no wrong imports, no second-guessing.

Open source, MIT. aniui.dev

#reactnative #ai #opensource #developer #mobile
