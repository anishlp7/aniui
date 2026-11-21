# Short posts — Reactiflux / Expo Discord / RN communities

*Drafts — not sent. Keep each one short; mods dislike launch spam.*

---

## For #mobile-help / #react-native (Reactiflux)

Heads up for anyone using Cursor or Claude Code on RN projects — AniUI just
shipped an MCP server (`@aniui/mcp`) + a shadcn-spec registry, so you can do:

```
npx shadcn@latest add https://aniui.dev/r/login.json
```

in any Expo project and get a full login screen (or any of 150 components).
Or wire the MCP into your editor for `search_components`/`get_block`/etc.

Free, MIT, built for RN specifically (iOS/Android, no web). Would love
feedback from anyone who tries it: https://aniui.dev/docs/mcp

---

## For #show-and-tell (Expo Discord)

Just shipped the agent-native layer for AniUI (shadcn-style RN component lib).

- MCP server with 8 tools
- Shadcn-spec registry at aniui.dev/r/{name}.json (so `shadcn add` works)
- llms-full.txt for context seeding
- Agent skill file that Cursor/Claude Code auto-discover

Try it with an AI assistant and tell me where it breaks: https://aniui.dev

---

## For Twitter/X RN community accounts (reply, not DM)

RN had no serious MCP/agent story until today — would love your take if you
have a minute: https://aniui.dev/docs/mcp
