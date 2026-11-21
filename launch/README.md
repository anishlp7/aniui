# Launch Assets — "AniUI, agent-native"

Drafts for the Phase 1 agent-surface launch. Nothing in this folder has been
sent anywhere — these are review-only until Anish ships them.

## Narrative

The one line: **"The first React Native component library built for the
agent-native era."**

Why now:
- Vercel shipped the UI SDK on Nov 12, 2026 — `createAgent()` lets agents read
  live component state without screenshots. "Built by agents, used by agents"
  has gone from thesis to shipping code.
- shadcn/ui has had an official MCP + agent skill since July 2026.
- **No RN component library has shipped the full stack.** React Native Reusables
  has an unofficial, 9-month-old MCP with zero dependents. NativeWindUI has
  none. gluestack has none.
- AniUI already has the MCP server, the shadcn-spec registry, and 150
  components. Phase 1 closes the last gap and plants the flag.

## Files

- `narrative.md` — the longer-form story (blog post / launch page copy).
- `x-thread.md` — 8-tweet thread for X/Twitter.
- `hn.md` — Hacker News Show HN post.
- `linkedin.md` — LinkedIn post for a professional/B2B audience.
- `slack-rn-community.md` — short post for React Native Discord / Reactiflux /
  Expo Discord etc.
- `press-kit.md` — one-paragraph pitch + stats + links.

## Checklist before any post goes out

- [ ] `npm run build:llms-full` + commit so `/llms-full.txt` is live
- [ ] Verify `https://aniui.dev/sitemap.xml` includes all 150 components
- [ ] Verify `https://aniui.dev/registry.json` resolves
- [ ] Verify `npx shadcn@latest add https://aniui.dev/r/button.json` works in a
      fresh Expo project
- [ ] Verify `@aniui/mcp` v0.2.0 is published to npm
- [ ] Record a <60s screen-cap: Claude Code calling `list_blocks` → `get_block login` →
      pasting the login screen into a fresh Expo app
- [ ] Submit sitemap in Google Search Console (`https://aniui.dev/sitemap.xml`)
- [ ] Submit to Bing Webmaster Tools too
