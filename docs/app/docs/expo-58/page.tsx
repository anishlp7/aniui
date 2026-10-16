import Link from "next/link";
import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";

const sdk58Versions = `# Pinned by Expo SDK 58 (expo@~58.0.0)
expo                            ~58.0.0
react                           19.3.0
react-native                    0.88.0
react-native-reanimated         4.7.1
react-native-worklets           0.13.0   # required peer of Reanimated 4
react-native-gesture-handler    ~3.3.0   # v3 — major jump from SDK 57's v2
react-native-safe-area-context  ~5.10.1
react-native-screens            ~4.30.0
react-native-svg                15.16.0
expo-hinge                      ~58.0.1  # optional: iPhone Duo / foldable support`;

const freshInstall = `# Fresh Expo SDK 58 project — iOS 27, iPhone Duo ready
npx create-expo-app@latest my-app --template default@sdk-58
cd my-app

# Run AniUI init — defaults to Uniwind, picks the SDK 58 bucket automatically
npx @aniui/cli init --yes

# Opt into fold-aware overlays (iPhone Duo / Android foldables)
npx expo install expo-hinge

# Start
npx expo start -c`;

const migrateFrom57 = `# Migration from Expo SDK 57 → 58
# 1. Bump Expo + React / React Native
#    (expo install pins the right versions for each SDK)
npx expo install expo@~58 react@19.3.0 react-native@0.88.0

# 2. Bump the animation stack: Reanimated 4.5 → 4.7.1, worklets 0.10 → 0.13
npx expo install react-native-reanimated react-native-worklets

# 3. Bump the rest of the native stack
#    Note: react-native-gesture-handler jumps from v2 to v3 on SDK 58.
npx expo install react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-svg

# 4. (Optional) Install expo-hinge for iPhone Duo fold-aware overlays
npx expo install expo-hinge

# 5. Scene-based lifecycle: npx expo prebuild regenerates SceneDelegate.swift.
#    If you had a customized AppDelegate.swift, you'll need to migrate the
#    callbacks (they're now delivered via the scene delegate instead).

# 6. Node version: SDK 58 requires Node 22.13+, 24.3+, or 26+.
#    Odd-numbered Node releases aren't supported.
nvm install 22.13 && nvm use 22.13

# 7. Components + config — no changes needed. Same engine, same templates.`;

export default function Expo58Page() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Expo SDK 58</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Expo SDK 58 targets iOS 27 and introduces the UIKit scene-based lifecycle. Apps built with SDK 58 are ready for <Link href="/docs/iphone-duo" className="text-primary hover:underline">iPhone Duo</Link> on day one, on both displays. AniUI&apos;s 150 components re-lay out automatically when the scene is resized.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">What&apos;s new in SDK 58</Heading>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 ml-2">
          <li><strong>iOS 27 + scene lifecycle.</strong> UIKit scene delegate manages window state. Apps are now resizable; <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">requireFullScreen</code> no longer opts out of resizing on iOS 27.</li>
          <li><strong>React Native 0.88</strong> (up from 0.86 in SDK 57), including Strict TypeScript API as the default.</li>
          <li><strong>Node 22.13+ required</strong> (or 24.3+, or 26+). Odd-numbered Node releases aren&apos;t supported.</li>
          <li><strong>expo-hinge</strong> for iPhone Duo + Android foldable hinge state. AniUI&apos;s <Link href="/docs/iphone-duo" className="text-primary hover:underline">useFoldFeatures()</Link> hook consumes it transparently.</li>
          <li><strong>Faster builds.</strong> Expo Modules now ships precompiled Android native libraries; clean debug builds dropped from ~80s to ~39s in Expo&apos;s test.</li>
          <li><strong>expo-glass-effect</strong> reports Liquid Glass as available when built against iOS 27.</li>
          <li><strong>Breaking changes</strong>: foreground notifications show by default; <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">File.write()</code> is now async (use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">writeSync()</code> for the old behavior); libSQL support was removed from expo-sqlite.</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-relaxed">
          See the full <Link href="https://expo.dev/changelog/sdk-58" className="text-primary hover:underline">Expo SDK 58 changelog</Link> for the complete list.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Pinned versions</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          AniUI&apos;s SDK 58 version bucket is the single source of truth for native dep versions on this SDK.
        </p>
        <CodeBlock code={sdk58Versions} language="bash" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Fresh install</Heading>
        <CodeBlock code={freshInstall} language="bash" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Migration from SDK 57</Heading>
        <CodeBlock code={migrateFrom57} language="bash" />
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          See also: <Link href="/docs/iphone-duo" className="text-primary hover:underline">iPhone Duo guide</Link> &middot; <Link href="/docs/compatibility" className="text-primary hover:underline">Compatibility matrix</Link> &middot; <Link href="/docs/expo-57" className="text-primary hover:underline">Previous: Expo SDK 57</Link>
        </p>
      </div>
    </div>
  );
}
