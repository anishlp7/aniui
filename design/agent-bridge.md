# Design: `createAniAgent()` — the AniUI Agent Bridge

**Status:** proposal (review open)
**Target:** AniUI 1.0 / `@aniui/agent@0.1`
**Companion package:** `@aniui/agent` (new npm package)

---

## Why this exists

Vercel UI SDK's `createAgent()` lets a coding agent read and mutate real UI
state at runtime — no screenshots, no DOM parsing — and on their reported
Claude Code benchmark it cut tool calls by 69%. The thesis that went with it,
*"Built by agents, used by agents,"* is already shipping code on the web.

React Native has no equivalent. React Native Reusables, NativeWindUI, gluestack
— none of them expose their running components to an agent. The gap exists
because RN is harder:

- No DOM, no `document.querySelector`
- React DevTools protocol works but is heavy and requires separate infra
- The accessibility tree is coarse-grained and doesn't carry component state

`createAniAgent()` closes this gap with a small, opinionated bridge that
AniUI's own components can opt into out of the box.

---

## What the user sees

### 1. Install the runtime

```bash
npx @aniui/cli add agent
# adds components/agent.tsx + bumps @aniui/agent@^0.1
```

### 2. Wrap the app (dev-only)

```tsx
// app/_layout.tsx
import { AniAgentProvider } from "@/components/agent";

export default function RootLayout() {
  return (
    <AniAgentProvider enabled={__DEV__}>
      {/* ... your app ... */}
    </AniAgentProvider>
  );
}
```

Zero behavior change when `enabled={false}` (production). Zero network
listeners, zero memory cost.

### 3. Components auto-register

Every AniUI Tier 1 component with an identity (Button, Input, Switch, etc.)
accepts an optional `agentId` prop. When set *and* `AniAgentProvider` is
mounted, the component registers itself with the bridge:

```tsx
<Button agentId="signin-submit" onPress={handleSubmit}>
  Sign in
</Button>

<Input
  agentId="signin-email"
  value={email}
  onChangeText={setEmail}
  placeholder="you@example.com"
/>
```

No `agentId` → no registration → no cost. This is purely opt-in per instance.

### 4. The agent connects

A generated `.aniui-agent.json` appears at the project root in dev:

```json
{
  "url": "ws://localhost:49321/aniui-agent",
  "token": "a1b2…",
  "pid": 83421,
  "startedAt": "2026-11-21T19:04:11.812Z"
}
```

Claude Code / Cursor call the MCP tool `aniui_agent_connect()` which reads
this file and holds the WS session.

### 5. The agent drives the app

Via MCP tools (described below) the agent can:

- Enumerate registered components
- Read their current state
- Invoke their actions (press, type, toggle)
- Subscribe to state changes

---

## API surface

### Runtime (in `@aniui/agent`)

```ts
// Provider
export interface AniAgentProviderProps {
  children: React.ReactNode;
  /** Default: __DEV__. Hard off in production builds. */
  enabled?: boolean;
  /** 0 picks a free port; default. */
  port?: number;
  /** Override the discovery file's location. Default: project root. */
  discoveryFile?: string;
}

export function AniAgentProvider(props: AniAgentProviderProps): JSX.Element;

// Hook used by every registered component
export interface UseAniAgentArgs<State, Actions extends Record<string, (...a: any[]) => any>> {
  id: string;
  /** Short tag, e.g. "Button", "Input" — defaults to the component name. */
  type?: string;
  /** Called by the bridge to read current props/state. Must be side-effect-free. */
  state: () => State;
  /** Named actions the agent can fire. */
  actions?: Actions;
  /** Optional free-form metadata (variants, test labels, …). */
  meta?: Record<string, unknown>;
}

export function useAniAgent<S, A extends Record<string, (...a: any[]) => any>>(
  args: UseAniAgentArgs<S, A> | null | undefined
): void;
```

`useAniAgent(null)` is a legal no-op — components can call it unconditionally
(hook-rules-safe) and gate on the `agentId` prop.

### Wire protocol (WebSocket, JSON messages)

```ts
// Client → server
type AgentRequest =
  | { op: "list"; corr: string }
  | { op: "state"; corr: string; id: string }
  | { op: "act"; corr: string; id: string; action: string; args?: unknown[] }
  | { op: "subscribe"; corr: string; id?: string }
  | { op: "ping"; corr: string };

// Server → client
type AgentResponse =
  | { corr: string; ok: true; data: unknown }
  | { corr: string; ok: false; error: string }
  | { event: "state-change"; id: string; state: unknown };
```

Correlation IDs let the agent fire multiple requests concurrently without
tangling responses. Subscribe stream is best-effort — components may coalesce
rapid state changes.

Authentication: a per-session random token is written into
`.aniui-agent.json`; the server rejects WS connections without it. No
auth-less open port.

### MCP tools (added to `@aniui/mcp`)

| Tool | Returns |
|---|---|
| `aniui_agent_discover(cwd?)` | Reads `.aniui-agent.json`; returns url+token+pid or `null` |
| `aniui_agent_tree()` | List of `{id, type, meta}` for every registered component |
| `aniui_agent_state(id)` | Current state object for one component |
| `aniui_agent_act(id, action, args?)` | Fire a named action; returns the action's return value |
| `aniui_agent_wait_for(id, predicate, timeoutMs?)` | Server-side polling until predicate matches (`state.loading === false`) |

The MCP server opens one WS session per project, caches it for 60s, and
multiplexes concurrent tool calls over it.

---

## Example end-to-end flow

Agent instruction: *"Open the running Expo app, sign in as test@aniui.dev, and
confirm the dashboard shows."*

1. Agent calls `aniui_agent_discover()` — gets the WS URL.
2. Agent calls `aniui_agent_tree()` — sees `signin-email`, `signin-password`,
   `signin-submit`, `dashboard-greeting` are registered.
3. Agent calls `aniui_agent_act("signin-email", "setValue", ["test@aniui.dev"])`.
4. Agent calls `aniui_agent_act("signin-password", "setValue", ["hunter2"])`.
5. Agent calls `aniui_agent_act("signin-submit", "press")`.
6. Agent calls `aniui_agent_wait_for("dashboard-greeting", "state.visible === true", 5000)`.
7. Agent calls `aniui_agent_state("dashboard-greeting")` — reads the greeting
   text, confirms "Welcome back, Test."

No screenshots. No test selectors. The agent read the running app's component
tree and drove it with the same semantic operations a human would.

---

## What's opt-in vs automatic

| Behavior | Default |
|---|---|
| `AniAgentProvider` mounted | Opt-in (user adds it) |
| Enabled in production | **Never** (hard-gated on `enabled`, which defaults to `__DEV__`) |
| Component registration | Opt-in via `agentId` prop |
| Network port open | Only when provider is enabled AND at least one component has registered |
| Auth token required | Always |

Nothing ships to production users. Nothing leaks a port without an explicit
`agentId`.

---

## What goes in Tier 1 components first

Six components make up ~80% of agent-driven scenarios. These get `agentId`
prop support in the first implementation PR:

1. `Button` — action: `press`
2. `Input` — state: `{ value, focused }`, actions: `setValue(v)`, `focus()`, `blur()`
3. `Switch` — state: `{ value }`, actions: `toggle()`, `set(v)`
4. `Checkbox` — state: `{ checked }`, actions: `toggle()`, `set(v)`
5. `Select` — state: `{ value, open }`, actions: `open()`, `close()`, `select(v)`
6. `Dialog` — state: `{ open }`, actions: `open()`, `close()`

Blocks get `agentId` on their root container only (one id per screen).

---

## Open questions (flag before build)

1. **Discovery file location.** `.aniui-agent.json` at the project root is
   convenient but visible in `git status`. Add to `.gitignore` via `aniui init`?
2. **Transport choice.** WebSocket is the obvious pick — but Expo Go sandboxes
   networking. For Expo Go specifically, fall back to Metro's built-in socket
   via a custom message type? Decide: WS-only + require dev client, or dual
   transport.
3. **Real-device discovery.** On a real phone the dev machine can't just read
   `.aniui-agent.json` from the device filesystem. Options: (a) require tunnel
   (Expo dev client already uses one); (b) ship a tiny companion Expo plugin
   that publishes the port over the Metro channel.
4. **Action return values.** Current protocol marshals via JSON. React handlers
   that return promises resolve first. Any value that isn't JSON-safe becomes
   `null` — document clearly or throw?
5. **State diffing.** `state-change` events will fire a lot (every keystroke in
   an Input). Coalesce server-side at ≤60Hz? Let the server decide and expose
   a `highFrequency: true` hint on the subscribe request?
6. **`useAniAgent` identity.** Should `id` be enforced unique? Collision policy:
   last-registration-wins, first-wins, or hard throw in dev?

---

## Why not just use Detox / Maestro / React Native Testing Library

Those tools drive apps from the outside for *testing*. They need:
- A separate test runner process
- E2E setup (simulator wiring, app launch, test IDs everywhere)
- Imperative scripts, not live agent control

`createAniAgent()` is for **live agent exploration and manipulation** of a
running dev app from within an editor. It's a different workflow: the agent
can discover what's on screen *now*, change it, and see the effect — not
replay a pre-written script.

---

## Rollout plan

- **0.1** — `@aniui/agent` package, Provider + Hook + WS server, MCP tools,
  Button / Input / Switch opt-in.
- **0.2** — Checkbox, Select, Dialog, Form opt-in; `aniui_agent_wait_for`.
- **0.3** — Real-device transport (Expo plugin).
- **0.4** — Record/replay (agent dumps a session, can replay later).
- **1.0** — Auto-instrumentation for every Tier 1 component via a shared mixin;
  `agentId` becomes optional but *default* in dev.

---

## Non-goals

- Production telemetry. This is dev-only. We will refuse to ship a runtime
  that opens a port in a production build, even behind a flag.
- Snapshot comparisons / visual diffing. Agent reads semantic state, not
  pixels.
- Replacing accessibility labels. `accessibilityLabel` and `agentId` are
  orthogonal; keep both.

---

## Feedback requested

- Does the `useAniAgent` hook shape feel right? Is `state: () => S` too awkward
  vs `state: S` recomputed per render?
- Should `agentId` be a prop on every AniUI component, or should it come from
  a shared context (e.g. `<AgentScope id="signin">` auto-prefixes children)?
- Any other MCP tool shapes you'd want? `aniui_agent_screenshot()` for cases
  where semantic read isn't enough?
