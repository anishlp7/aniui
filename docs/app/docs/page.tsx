import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Introduction</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Beautiful React Native components. Copy. Paste. Ship.
        </p>
      </div>

      <div className="space-y-4 text-foreground leading-7">
        <p>
          <strong>AniUI</strong> is a collection of 80+ re-usable components for React Native,
          built with <Link href="/docs/uniwind" className="text-primary hover:underline">NativeWind or Uniwind</Link> (Tailwind CSS for React Native),{" "}
          <a href="https://rn-primitives.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">rn-primitives</a> for accessibility,
          and strict TypeScript.
          Inspired by <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">shadcn/ui</a>,
          these are <em>not</em> installed as npm dependencies —
          they are source files you copy into your project and own completely.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Architecture</h2>
        <div className="rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm space-y-2">
          <p className="text-muted-foreground">┌─ <strong className="text-foreground">AniUI Design Layer</strong> (NativeWind or Uniwind styling)</p>
          <p className="text-muted-foreground">├─ <strong className="text-foreground">rn-primitives</strong> (headless behaviour + accessibility)</p>
          <p className="text-muted-foreground">└─ <strong className="text-foreground">React Native Core</strong> (View, Text, Pressable)</p>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Why AniUI?</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">You own the code.</strong> Components are source files, not black-box packages.</li>
          <li><strong className="text-foreground">NativeWind + Uniwind.</strong> Tailwind CSS classes — choose your styling engine. No StyleSheet.create() anywhere.</li>
          <li><strong className="text-foreground">rn-primitives for complex components.</strong> Dialog, Popover, Select, DropdownMenu get proper focus trapping, positioning, and ARIA semantics.</li>
          <li><strong className="text-foreground">Mobile-first.</strong> Built for iOS and Android. Period.</li>
          <li><strong className="text-foreground">Accessible.</strong> Every interactive component has proper accessibility roles, keyboard navigation, and screen reader support.</li>
          <li><strong className="text-foreground">Dark mode.</strong> CSS variable-based theming works out of the box.</li>
          <li><strong className="text-foreground">One command setup.</strong> <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli init</code> auto-installs everything. <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli doctor</code> diagnoses issues.</li>
        </ul>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Tech Stack</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              <tr><td className="p-3 font-medium text-foreground">React Native</td><td className="p-3 text-muted-foreground">0.76+</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Styling</td><td className="p-3 text-muted-foreground">NativeWind v4/v5 or Uniwind</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Primitives</td><td className="p-3 text-muted-foreground">rn-primitives (Dialog, Popover, Select, Tabs, etc.)</td></tr>
              <tr><td className="p-3 font-medium text-foreground">TypeScript</td><td className="p-3 text-muted-foreground">Strict mode, no any</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Variants</td><td className="p-3 text-muted-foreground">class-variance-authority</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Expo</td><td className="p-3 text-muted-foreground">SDK 53, 54 & 55</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Bare RN</td><td className="p-3 text-muted-foreground">0.76+ (no Expo required)</td></tr>
              <tr><td className="p-3 font-medium text-foreground">Package managers</td><td className="p-3 text-muted-foreground">npm, pnpm, yarn, bun</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Component Tiers</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Tier 1</strong> — Pure RN core + NativeWind (Button, Input, Text, Card, Badge, etc.)</li>
          <li><strong className="text-foreground">Tier 2</strong> — Needs react-native-reanimated (Skeleton, Toggle, Drawer, Carousel, etc.)</li>
          <li><strong className="text-foreground">Tier 3</strong> — Needs rn-primitives or external packages (Dialog, Popover, Select, Tabs, Bottom Sheet, etc.)</li>
          <li><strong className="text-foreground">Tier 4</strong> — Chart components (Area, Bar, Line, Pie, Radar, Radial)</li>
        </ul>

        <div className="flex gap-4 pt-4">
          <Link
            href="/docs/installation"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Installation →
          </Link>
          <Link
            href="/docs/button"
            className="inline-flex items-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </div>
  );
}
