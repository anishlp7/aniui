import Link from "next/link";
import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";

export const metadata = {
  title: "Expo SDK 56 · AniUI",
  description:
    "Set up AniUI on Expo SDK 56 (React 19.2.3, React Native 0.85.3). Two NativeWind tracks supported: v5 preview (Tailwind v4) and v4 stable (Tailwind v3).",
  alternates: { canonical: "/docs/expo-56" },
};

const sdk56Versions = `# Pinned by Expo SDK 56 (expo@56.0.3, released 2026-05-21)
expo                            ~56.0.3
react                           19.2.3
react-native                    0.85.3
react-native-reanimated         ~4.3.1
react-native-worklets           ~0.8.3   # new required peer
react-native-safe-area-context  ~5.7.0
react-native-gesture-handler    ~2.31.1
react-native-screens            4.25.2
react-native-svg                15.15.4`;

const freshInstallV5 = `# Fresh Expo SDK 56 project, NativeWind v5 preview track
npx create-expo-app@latest my-app --template default@sdk-56
cd my-app

# Run AniUI init — pick "v5 preview" at the NativeWind track prompt
npx @aniui/cli init

# (or skip the prompt)
npx @aniui/cli init --nw v5 --yes

# Start
npx expo start -c`;

const freshInstallV4 = `# Fresh Expo SDK 56 project, NativeWind v4 stable track
npx create-expo-app@latest my-app --template default@sdk-56
cd my-app

# Run AniUI init — pick "v4 stable" at the NativeWind track prompt
npx @aniui/cli init

# (or skip the prompt)
npx @aniui/cli init --nw v4 --yes

# Start
npx expo start -c`;

const migrateFrom55 = `# Migration from Expo SDK 55 → 56
# 1. Bump Expo + companion native modules
npx expo install expo@~56 react@19.2.3 react-native@0.85.3

# 2. Install the new required worklets peer
npx expo install react-native-worklets react-native-reanimated@~4.3.1

# 3. Bump safe-area-context
npx expo install react-native-safe-area-context@~5.7.0

# 4. Re-run aniui init to refresh templates (no template changes if staying on v5)
npx @aniui/cli init

# 5. Components — no changes needed.`;

const migrateFrom54 = `# Migration from Expo SDK 54 → 56
# 1. Bump Expo to SDK 56
npx expo install expo@~56

# 2. Switch to New Architecture if not already
#    Set "newArchEnabled": true in app.json (SDK 55 dropped Old Arch)

# 3. Bump Reanimated 3 → 4 and install the new worklets peer
npx expo install react-native-reanimated@~4.3.1 react-native-worklets

# 4. Decide: keep NativeWind v4 (stable, Tailwind v3) or flip to v5 preview (Tailwind v4)
#    Stay on v4 — your tailwind.config.js + global.css keep working.
#    Flip to v5  — re-run aniui init and pick "v5 preview" at the prompt.

npx @aniui/cli init`;

const v5GlobalCss = `/* SDK 56 + NativeWind v5 preview */
@import "tailwindcss";
@import "nativewind/theme";

@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  --color-primary: hsl(240 5.9% 10%);
  /* ... */
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: hsl(240 10% 3.9%);
    /* ... */
  }
}`;

const v4GlobalCss = `/* SDK 56 + NativeWind v4 stable */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  /* ... */
}`;

export default function Expo56Page() {
  return (
    <div className="space-y-10">
      {/* SDK 57 callout */}
      <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
        <p className="text-sm text-foreground">
          <strong>On SDK 57?</strong> See the{" "}
          <Link href="/docs/expo-57" className="text-primary hover:underline">
            Expo SDK 57 guide
          </Link>{" "}
          — the newest supported SDK (React 19.2.3 / RN 0.86 / Reanimated 4.5, Uniwind by default).
        </p>
      </div>

      {/* Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            New
          </span>
          <span className="text-xs font-medium text-foreground">Stable release · 2026-05-21</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Expo SDK 56</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AniUI 0.3.0 officially supports Expo SDK 56 (React 19.2.3 / React Native 0.85.3 /
          Reanimated 4.3). On SDK 55+ projects, you can run AniUI on either the
          NativeWind v5 preview track or the NativeWind v4 stable track — whichever fits your
          risk tolerance.
        </p>
      </div>

      {/* TL;DR */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <p className="text-sm font-medium text-foreground">TL;DR</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>
            <span className="text-foreground">Production today?</span> Use the{" "}
            <strong>NativeWind v4 stable</strong> track. NativeWind v5 is still
            pre-release.
          </li>
          <li>
            <span className="text-foreground">Want the new CSS-first config?</span> Use the{" "}
            <strong>NativeWind v5 preview</strong> track.
          </li>
          <li>
            <span className="text-foreground">SDK 56 is New Architecture only.</span> Old Arch
            was dropped back in SDK 55.
          </li>
        </ul>
      </div>

      {/* What's new */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          What&apos;s new in SDK 56
        </Heading>
        <CodeBlock code={sdk56Versions} title="Pinned versions" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          The main breaking change for AniUI users is the new{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">
            react-native-worklets
          </code>{" "}
          peer dependency. Reanimated 4.3 split the worklets runtime into its own
          package — projects that don&apos;t install it will fail to bundle.{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
          installs it automatically on SDK 56, and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui doctor</code>{" "}
          warns if it&apos;s missing.
        </p>
      </div>

      {/* Choose your track */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Choose your NativeWind track
        </Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">v5 preview</span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                pre-release
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Tailwind v4 with CSS-first <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> config</li>
              <li>• No <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code></li>
              <li>• Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">postcss.config.js</code> + <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@tailwindcss/postcss</code></li>
              <li>• No <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code> in babel</li>
              <li>• APIs may still change before v5 stable</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Reference starter:{" "}
              <a
                href="https://github.com/anishlp7/aniui/tree/main/examples/expo-56-starter"
                className="text-primary hover:underline"
              >
                examples/expo-56-starter
              </a>
            </p>
          </div>
          <div className="rounded-lg border border-border p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">v4 stable</span>
              <span className="rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
                recommended
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Tailwind v3 with classic <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code></li>
              <li>• <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@tailwind base/components/utilities</code> in global.css</li>
              <li>• <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code> in babel + tsconfig</li>
              <li>• Proven toolchain — safest for production</li>
              <li>• Flip to v5 later when it stabilises</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Reference starter:{" "}
              <a
                href="https://github.com/anishlp7/aniui/tree/main/examples/expo-56-nw4-starter"
                className="text-primary hover:underline"
              >
                examples/expo-56-nw4-starter
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Fresh install */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Fresh install
        </Heading>
        <p className="text-sm text-muted-foreground">
          On Expo SDK 55+ projects without an existing{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind</code>{" "}
          dependency,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
          asks which NativeWind track to use. Pass{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v4</code> or{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v5</code> to
          skip the prompt in scripted runs.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">v5 preview</p>
            <CodeBlock code={freshInstallV5} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">v4 stable</p>
            <CodeBlock code={freshInstallV4} />
          </div>
        </div>
      </div>

      {/* CSS format */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          CSS format by track
        </Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">v5 preview (Tailwind v4)</p>
            <CodeBlock code={v5GlobalCss} title="global.css" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">v4 stable (Tailwind v3)</p>
            <CodeBlock code={v4GlobalCss} title="global.css" />
          </div>
        </div>
      </div>

      {/* Migration from 55 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Migrating from SDK 55
        </Heading>
        <CodeBlock code={migrateFrom55} title="Migration steps" />
        <p className="text-sm text-muted-foreground">
          If you were already on the v5 preview track, your{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">global.css</code>,
          metro config, and babel config don&apos;t change — only the underlying React /
          React Native / Reanimated versions and the new worklets peer.
        </p>
      </div>

      {/* Migration from 54 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Migrating from SDK 54
        </Heading>
        <CodeBlock code={migrateFrom54} title="Migration steps" />
        <p className="text-sm text-muted-foreground">
          The biggest jump is the architecture switch. SDK 55 already removed Old
          Architecture support, and SDK 56 continues that. You also move from Reanimated 3 to
          Reanimated 4, which is why the new worklets peer appears.
        </p>
      </div>

      {/* Footguns */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Known footguns
        </Heading>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-worklets</code>:
            </span>
            Required as a separate peer by Reanimated 4.3+.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui doctor</code>{" "}
            will flag this if it&apos;s missing.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo/fetch</code> default:
            </span>
            SDK 56 makes <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo/fetch</code>{" "}
            the default <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">globalThis.fetch</code>.
            Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">EXPO_PUBLIC_USE_RN_FETCH=1</code>{" "}
            to opt out if a dependency relies on the RN fetch behaviour.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@expo/vector-icons</code>:
            </span>
            Deprecated in SDK 56. Use{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@react-native-vector-icons/*</code>{" "}
            instead (Expo ships a codemod).
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo-router</code>:
            </span>
            No longer transitively depends on <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@react-navigation/*</code>.
            If you import navigation packages directly, install them explicitly.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">React Compiler:</span>
            Still incompatible with NativeWind&apos;s className transform. Do NOT enable{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">
              experiments.reactCompiler
            </code>{" "}
            in app.json. AniUI&apos;s init turns it off automatically.
          </li>
        </ul>
      </div>

      {/* Coming soon */}
      <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-5">
        <Heading as="h3" className="text-lg font-semibold tracking-tight text-foreground">
          Coming soon — Expo UI BottomSheet
        </Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          SDK 56 ships a new{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@expo/ui/community/bottom-sheet</code>{" "}
          primitive that backs onto native SwiftUI / Jetpack Compose sheets.
          AniUI may adopt it as an <em>opt-in</em> component in a future release. It&apos;s
          intentionally not the default today because: (1) it&apos;s SDK 56 + Expo only — bare
          RN and SDK ≤55 users couldn&apos;t use it; (2) the drop-in API silently no-ops
          things like <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">BottomSheetBackdrop</code>{" "}
          and custom handles that AniUI&apos;s current sheet relies on. For now,{" "}
          <Link href="/docs/bottom-sheet" className="text-primary hover:underline">
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">bottom-sheet</code>
          </Link>{" "}
          and{" "}
          <Link href="/docs/action-sheet" className="text-primary hover:underline">
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">action-sheet</code>
          </Link>{" "}
          continue to use{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@gorhom/bottom-sheet</code>,
          which works across all supported SDKs.
        </p>
      </div>

      {/* Related */}
      <div className="space-y-3 border-t border-border pt-6">
        <Heading as="h3" className="text-lg font-semibold tracking-tight text-foreground">
          Related
        </Heading>
        <ul className="space-y-1.5 text-sm">
          <li>
            <Link href="/docs/compatibility" className="text-primary hover:underline">
              Compatibility matrix (all SDKs)
            </Link>
          </li>
          <li>
            <Link href="/docs/installation" className="text-primary hover:underline">
              Installation guide
            </Link>
          </li>
          <li>
            <Link href="/docs/cli" className="text-primary hover:underline">
              CLI reference (including <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw</code> flag)
            </Link>
          </li>
          <li>
            <Link href="/docs/changelog" className="text-primary hover:underline">
              Changelog 0.3.0
            </Link>
          </li>
          <li>
            <a
              href="https://expo.dev/changelog/sdk-56"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Expo SDK 56 changelog
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
