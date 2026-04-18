import { Heading } from "@/components/heading";

import { CodeBlock } from "@/components/code-block-server";

const installSdk54 = `# Expo SDK 53/54 — NativeWind v4 + Tailwind v3

# 1. Create project
npx create-expo-app@latest my-app --template default@sdk-54
cd my-app

# 2. Install NativeWind + dependencies
npm install nativewind tailwindcss@3 react-native-reanimated react-native-safe-area-context
npm install class-variance-authority clsx tailwind-merge

# 3. Create config files: babel.config.js, metro.config.js, tailwind.config.js, global.css
# See Installation page for exact contents

# 4. Run AniUI init (auto-detects SDK 53/54 → uses v4 templates)
npx @aniui/cli init

# 5. Import global.css at the top of app/_layout.tsx (or App.tsx)
# import "./global.css";

# 6. Clear cache and start
npx expo start -c`;

const installSdk55 = `# Expo SDK 55 — NativeWind v5 + Tailwind v4

# 1. Create project
npx create-expo-app@latest my-app --template default@sdk-55
cd my-app

# 2. Install NativeWind v5 + dependencies
npx expo install nativewind@preview react-native-css react-native-reanimated react-native-safe-area-context
npx expo install --dev tailwindcss@4
npm install class-variance-authority clsx tailwind-merge

# 3. Create config files: babel.config.js, metro.config.js, global.css
# Note: NO tailwind.config.js or postcss.config.js — NativeWind v5 handles CSS via metro
# See Installation page for exact contents

# 4. Run AniUI init (auto-detects SDK 55 → uses v5 templates)
npx @aniui/cli init

# 5. Import global.css at the top of app/_layout.tsx (or App.tsx)
# import "./global.css";

# 6. Clear cache and start
npx expo start -c`;

const migrationSteps = `# 1. Update Expo SDK
npx expo install expo@~55

# 2. Install NativeWind v5 + Tailwind v4 dependencies
npx expo install nativewind@preview react-native-css react-native-reanimated react-native-safe-area-context
npx expo install --dev tailwindcss@4

# 3. Re-run aniui init to get v5 templates
npx @aniui/cli init
# This creates: global.css (with @theme block), metro.config.js, babel.config.js

# 4. Remove tailwind.config.js (no longer needed — config is in global.css)

# 5. Components — NO changes needed!
# className, cn(), cva() work identically on both versions.`;

const globalCssV4 = `/* Tailwind v3 / NativeWind v4 */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  /* ... theme tokens */
}`;

const globalCssV5 = `/* Tailwind v4 / NativeWind v5 */
@import "tailwindcss";
@import "nativewind/theme";

@theme {
  --color-background: hsl(var(--background));
  /* ... color mappings */
}

:root {
  --background: 0 0% 100%;
  /* ... theme tokens */
}`;

export default function CompatibilityPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Compatibility</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          AniUI supports Expo SDK 53, 54, 55, Bare React Native 0.76+, NativeWind, and Uniwind. The CLI auto-detects your setup.
        </p>
      </div>

      {/* Version Matrix */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Version Matrix</Heading>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground"></th>
                <th className="text-left p-3 font-medium text-foreground">Expo SDK 53/54</th>
                <th className="text-left p-3 font-medium text-foreground">Expo SDK 55</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-medium text-muted-foreground">NativeWind</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v4</code></td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v5</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">Tailwind CSS</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v3</code></td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v4</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">Reanimated</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v3</code></td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">v4</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">React</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">18.x</code></td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">19.x</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">React Native</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">0.79</code></td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">0.83</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">Uniwind</td>
                <td className="p-3">✅ Supported</td>
                <td className="p-3">✅ Supported</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">rn-primitives</td>
                <td className="p-3">✅ v1.3+</td>
                <td className="p-3">✅ v1.3+</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">Bare React Native</td>
                <td className="p-3">✅ 0.76+</td>
                <td className="p-3">✅ 0.83+</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">Architecture</td>
                <td className="p-3">Old + New</td>
                <td className="p-3">New only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* How it Works */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">How it Works</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          AniUI components are source files that use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code>,{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cn()</code>, and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cva()</code> for styling.
          These APIs work identically on both NativeWind v4 and v5 — the components themselves do not need to change.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          What differs between versions is the <strong>project configuration</strong>: the global.css format,
          Tailwind config style, and template files. The AniUI CLI auto-detects your SDK version and uses the
          matching templates during <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code>.
        </p>
      </div>

      {/* Setup for SDK 54 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Setup for Expo SDK 53/54</Heading>
        <CodeBlock code={installSdk54} />
        <p className="text-sm text-muted-foreground">
          Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">templates/v4/</code> — Tailwind v3 with{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@tailwind</code> directives and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code>.
        </p>
      </div>

      {/* Setup for SDK 55 */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Setup for Expo SDK 55</Heading>
        <CodeBlock code={installSdk55} />
        <p className="text-sm text-muted-foreground">
          Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">templates/v5/</code> — Tailwind v4 with{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@import &quot;tailwindcss&quot;</code> and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> directive. No separate tailwind.config.js needed.
        </p>
      </div>

      {/* CSS Differences */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">CSS Format Differences</Heading>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">SDK 53/54 (Tailwind v3)</p>
            <CodeBlock code={globalCssV4} title="global.css" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">SDK 55 (Tailwind v4)</p>
            <CodeBlock code={globalCssV5} title="global.css" />
          </div>
        </div>
      </div>

      {/* Migration */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Migrating from SDK 53/54 to 55</Heading>
        <CodeBlock code={migrationSteps} title="Migration steps" />
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground mb-1">Components don&apos;t change</p>
          <p className="text-sm text-muted-foreground">
            Your AniUI components in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components/ui/</code>{" "}
            work on both SDK versions without modification. Only project config files (global.css, metro.config.js) need updating.
          </p>
        </div>
      </div>

      {/* Required Config Files */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Required Config Files</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The CLI creates all of these automatically. If styling isn&apos;t working, verify each file exists and is correct.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-foreground">File</th>
                <th className="text-left p-3 font-medium text-foreground">Purpose</th>
                <th className="text-left p-3 font-medium text-foreground">Critical Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel.config.js</code></td>
                <td className="p-3 text-muted-foreground">Enables NativeWind JSX transform</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SDK 53/54: jsxImportSource: &quot;nativewind&quot;</code><br/><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SDK 55: &quot;nativewind/babel&quot; plugin</code></td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">metro.config.js</code></td>
                <td className="p-3 text-muted-foreground">Processes CSS with NativeWind</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withNativeWind</code> or <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withUniwind</code></td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tsconfig.json</code></td>
                <td className="p-3 text-muted-foreground">TypeScript className support</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SDK 53/54: &quot;nativewind&quot;</code><br/><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SDK 55: &quot;react-native-css&quot;</code></td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">global.css</code></td>
                <td className="p-3 text-muted-foreground">Theme tokens + Tailwind directives</td>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--radius: 0.5rem</code> in :root and .dark</td>
              </tr>
              <tr>
                <td className="p-3"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tailwind.config.js</code></td>
                <td className="p-3 text-muted-foreground">Theme colors + NativeWind preset</td>
                <td className="p-3 text-muted-foreground">SDK 53/54 only (v5 uses CSS-first config)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Known Differences */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Known Differences</Heading>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">Architecture:</span>
            Expo SDK 55 dropped Old Architecture support. All apps must use New Architecture.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">Reanimated:</span>
            v4 requires New Architecture. If you use animated components (Tier 2), ensure New Architecture is enabled.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">React 19:</span>
            SDK 55 uses React 19 which changes some lifecycle behaviors. AniUI components are compatible with both React 18 and 19.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">Uniwind:</span>
            Uniwind uses 16px rem base (vs NativeWind&apos;s 14px). Components may appear ~14% larger.
            Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withUniwind</code> in metro.config.js instead of <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withNativeWind</code>.
            See <a href="/docs/uniwind" className="text-primary hover:underline">Uniwind guide</a>.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">rn-primitives:</span>
            Overlay components (Dialog, Popover, Select, etc.) require <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at your app root.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground font-medium shrink-0">React Compiler:</span>
            Do NOT enable <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;reactCompiler&quot;: true</code> in app.json.
            It breaks NativeWind&apos;s className transform, causing all styles to silently disappear.
          </li>
        </ul>
      </div>
    </div>
  );
}
