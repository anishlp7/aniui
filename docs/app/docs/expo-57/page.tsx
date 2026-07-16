import Link from "next/link";
import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";

const sdk57Versions = `# Pinned by Expo SDK 57 (expo@~57.0.0)
expo                            ~57.0.0
react                           19.2.3
react-native                    0.86.0
react-native-reanimated         ~4.5.0
react-native-worklets           ~0.10.0  # required peer of Reanimated 4
react-native-gesture-handler    ~2.32.0
react-native-safe-area-context  ~5.7.0
react-native-screens            ~4.23.0
react-native-svg                15.15.x`;

const freshInstallUniwind = `# Fresh Expo SDK 57 project — Uniwind (default engine)
npx create-expo-app@latest my-app --template default@sdk-57
cd my-app

# Run AniUI init — Uniwind is pre-selected on SDK 55+
npx @aniui/cli init

# (or skip all prompts — --yes also picks Uniwind on SDK 57)
npx @aniui/cli init --yes

# Start
npx expo start -c`;

const freshInstallNativeWind = `# Fresh Expo SDK 57 project — NativeWind track
npx create-expo-app@latest my-app --template default@sdk-57
cd my-app

# Force NativeWind, then pick a track at the prompt
npx @aniui/cli init --style nativewind

# Or pin the track up front (no prompt)
npx @aniui/cli init --style nativewind --nw v5   # v5 preview (Tailwind v4)
npx @aniui/cli init --style nativewind --nw v4   # v4 stable  (Tailwind v3)

# Start
npx expo start -c`;

const migrateFrom56 = `# Migration from Expo SDK 56 → 57
# 1. Bump Expo + React / React Native (expo install pins the right versions)
npx expo install expo@~57 react@19.2.3 react-native@0.86.0

# 2. Bump the animation stack: Reanimated 4.3 → ~4.5, worklets 0.8 → ~0.10
npx expo install react-native-reanimated react-native-worklets

# 3. Bump gesture-handler (2.31 → ~2.32) and safe-area-context (~5.7)
npx expo install react-native-gesture-handler react-native-safe-area-context

# 4. Components + config — no changes needed. Same engine, same templates.`;

const migrateFrom55 = `# Migration from Expo SDK 55 → 57
# 1. Bump Expo to SDK 57
npx expo install expo@~57

# 2. Install the worklets peer (required since SDK 56 / Reanimated 4.3+)
npx expo install react-native-reanimated react-native-worklets

# 3. Bump the rest of the native stack
npx expo install react-native-gesture-handler react-native-safe-area-context react-native-svg

# 4. Re-run aniui init to refresh templates
#    (Uniwind is now the default engine — pass --style nativewind to stay)
npx @aniui/cli init`;

const uniwindGlobalCss = `/* SDK 57 + Uniwind (default) */
@import "tailwindcss";
@import "uniwind";

@theme {
  --radius: 0.5rem;
}

@layer theme {
  :root {
    @variant light {
      --color-background: hsl(0 0% 100%);
      --color-foreground: hsl(240 10% 3.9%);
      /* ... */
    }

    @variant dark {
      --color-background: hsl(240 10% 3.9%);
      /* ... */
    }
  }
}`;

const nw5GlobalCss = `/* SDK 57 + NativeWind v5 preview */
@import "tailwindcss";
@import "nativewind/theme";

@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  /* ... */
  --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: hsl(240 10% 3.9%);
    /* ... */
  }
}`;

export default function Expo57Page() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
            New
          </span>
          <span className="text-xs font-medium text-foreground">Newest supported SDK</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Expo SDK 57</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AniUI officially supports Expo SDK 57 (React 19.2.3 / React Native 0.86 /
          Reanimated 4.5). <Link href="/docs/uniwind" className="text-primary hover:underline">Uniwind</Link>{" "}
          is the default styling engine, and NativeWind stays fully supported on both the
          v5 preview and v4 stable tracks.
        </p>
      </div>

      {/* TL;DR */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <p className="text-sm font-medium text-foreground">TL;DR</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>
            <span className="text-foreground">Starting fresh?</span> Just run{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli init</code> —{" "}
            <strong>Uniwind</strong> is the recommended default on SDK 55+.
          </li>
          <li>
            <span className="text-foreground">Prefer NativeWind?</span> Pass{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--style nativewind</code>{" "}
            and pick a track with{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v4</code> or{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v5</code>.
          </li>
          <li>
            <span className="text-foreground">SDK 57 is New Architecture only.</span> Old Arch
            support ended with SDK 54.
          </li>
        </ul>
      </div>

      {/* What's new */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          What ships in SDK 57
        </Heading>
        <CodeBlock code={sdk57Versions} title="Pinned versions" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Compared to SDK 56, the whole native stack moves forward: React Native 0.85.3 → 0.86,
          Reanimated ~4.3 → ~4.5,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">
            react-native-worklets
          </code>{" "}
          ~0.8 → ~0.10, and gesture-handler ~2.31 → ~2.32.{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
          installs the native packages (including{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-worklets</code>)
          via{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo install</code>,
          so they land at the versions Expo pins for SDK 57 — don&apos;t install them with raw{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npm install</code>.
        </p>
      </div>

      {/* Choose your engine */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Choose your styling engine
        </Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">Uniwind</span>
              <span className="rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-700 dark:text-green-400">
                default
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Tailwind v4 CSS-first config (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> + <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@variant</code>)</li>
              <li>• Metro-plugin only — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withUniwindConfig(config, {"{ cssEntryFile }"})</code></li>
              <li>• No Babel transform, no <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code>, no <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind-env.d.ts</code></li>
              <li>• Dark mode without a ThemeProvider</li>
              <li>• Requires New Architecture (SDK 57 is New-Arch only anyway)</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Reference starter:{" "}
              <a
                href="https://github.com/anishlp7/aniui/tree/main/examples/expo-57-starter"
                className="text-primary hover:underline"
              >
                examples/expo-57-starter
              </a>
            </p>
          </div>
          <div className="rounded-lg border border-border p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">NativeWind</span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
                supported
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Two tracks, same as SDK 56:</li>
              <li>• <strong className="text-foreground">v5 preview</strong> — Tailwind v4, CSS-first, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">postcss.config.js</code>, no <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code></li>
              <li>• <strong className="text-foreground">v4 stable</strong> — Tailwind v3, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code></li>
              <li>• Pick with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v4</code> / <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw v5</code> or at the prompt</li>
              <li>• Soft-deprecated in AniUI but fully supported</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Reference starter:{" "}
              <a
                href="https://github.com/anishlp7/aniui/tree/main/examples/expo-57-nw5-starter"
                className="text-primary hover:underline"
              >
                examples/expo-57-nw5-starter
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
          On SDK 57,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
          defaults to Uniwind and auto-installs everything that&apos;s missing: the engine,
          Tailwind, Reanimated, worklets, plus the base deps (safe-area-context, svg,
          lucide-react-native, cva, clsx, tailwind-merge). An already-installed engine always
          wins the auto-detection;{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--style</code>{" "}
          is authoritative over both.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Uniwind (default)</p>
            <CodeBlock code={freshInstallUniwind} />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">NativeWind</p>
            <CodeBlock code={freshInstallNativeWind} />
          </div>
        </div>
      </div>

      {/* CSS format */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          CSS format by engine
        </Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Uniwind</p>
            <CodeBlock code={uniwindGlobalCss} title="global.css" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">NativeWind v5 preview</p>
            <CodeBlock code={nw5GlobalCss} title="global.css" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          The NativeWind v4 stable track keeps the classic Tailwind v3 format (
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@tailwind base/components/utilities</code>{" "}
          + <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code>) —
          see the <Link href="/docs/expo-56" className="text-primary hover:underline">Expo SDK 56 guide</Link>{" "}
          for the side-by-side.
        </p>
      </div>

      {/* Migration from 56 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Migrating from SDK 56
        </Heading>
        <CodeBlock code={migrateFrom56} title="Migration steps" />
        <p className="text-sm text-muted-foreground">
          This is a version-bump-only migration. Your engine choice, templates,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">global.css</code>,
          metro config, and components all carry over unchanged — only React Native (0.86),
          Reanimated (~4.5), worklets (~0.10), and gesture-handler (~2.32) move.
        </p>
      </div>

      {/* Migration from 55 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Migrating from SDK 55
        </Heading>
        <CodeBlock code={migrateFrom55} title="Migration steps" />
        <p className="text-sm text-muted-foreground">
          Coming from SDK 55 you pick up the{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-worklets</code>{" "}
          peer that Reanimated 4.3+ introduced in SDK 56, plus the SDK 57 version bumps above.
          Components need no changes —{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code>,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cn()</code>, and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cva()</code>{" "}
          are identical across engines and SDKs.
        </p>
      </div>

      {/* Starters */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          SDK 57 starters
        </Heading>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a
              href="https://github.com/anishlp7/aniui/tree/main/examples/expo-57-starter"
              className="text-primary hover:underline"
            >
              examples/expo-57-starter
            </a>{" "}
            — Uniwind 1.6 + Tailwind 4.2, the default setup{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
            produces on SDK 57.
          </li>
          <li>
            <a
              href="https://github.com/anishlp7/aniui/tree/main/examples/expo-57-nw5-starter"
              className="text-primary hover:underline"
            >
              examples/expo-57-nw5-starter
            </a>{" "}
            — NativeWind 5.0.0-preview + react-native-css + Tailwind v4 (
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--style nativewind --nw v5</code>).
          </li>
          <li>
            <a
              href="https://github.com/anishlp7/aniui/tree/main/examples/with-uniwind"
              className="text-primary hover:underline"
            >
              examples/with-uniwind
            </a>{" "}
            — the Uniwind showcase app, also on Expo SDK 57.
          </li>
        </ul>
      </div>

      {/* Footguns */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">
          Known footguns
        </Heading>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">New Architecture only:</span>
            SDK 57 does not support Old Architecture. If you&apos;re still on Old Arch, stay on
            SDK 54 (NativeWind v4) until you can switch.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-worklets</code>:
            </span>
            Still a required separate peer of Reanimated 4 — SDK 57 wants ~0.10 (SDK 56 used
            ~0.8). Missing or mismatched versions fail at bundle time.{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
            installs it automatically and{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui doctor</code>{" "}
            flags it if it&apos;s missing.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo install</code>:
            </span>
            Native packages (reanimated, worklets, gesture-handler, safe-area-context, svg) must
            match the SDK 57 pins. The CLI routes them through{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo install</code>{" "}
            for exactly this reason — do the same when bumping manually.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">React Compiler:</span>
            Still incompatible with NativeWind&apos;s className transform —{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
            disables{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">experiments.reactCompiler</code>{" "}
            in app.json on the NativeWind tracks. Uniwind styles via its metro plugin, so it&apos;s
            unaffected.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">lightningcss</code> (NativeWind v5):
            </span>
            The NativeWind v5 starter pins{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">lightningcss@1.30.1</code>{" "}
            via package.json{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">overrides</code>.
            If Tailwind v4 CSS processing errors on the v5 track, add the same override.
          </li>
          <li className="flex items-start gap-2">
            <span className="shrink-0 font-medium text-foreground">
              No <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code> on Uniwind / NativeWind v5:
            </span>
            Only the NativeWind v4 stable track uses{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code>{" "}
            in babel + tsconfig. Leaving it behind after switching engines breaks styling —{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>{" "}
            removes it when it configures the v5 track.
          </li>
        </ul>
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
            <Link href="/docs/uniwind" className="text-primary hover:underline">
              Uniwind guide
            </Link>
          </li>
          <li>
            <Link href="/docs/expo-56" className="text-primary hover:underline">
              Expo SDK 56 guide
            </Link>
          </li>
          <li>
            <Link href="/docs/installation" className="text-primary hover:underline">
              Installation guide
            </Link>
          </li>
          <li>
            <Link href="/docs/cli" className="text-primary hover:underline">
              CLI reference (including{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--style</code> and{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--nw</code> flags)
            </Link>
          </li>
          <li>
            <a
              href="https://expo.dev/changelog/sdk-57"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Expo SDK 57 changelog
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
