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
          <strong>AniUI</strong> is a collection of re-usable components for React Native,
          built with NativeWind (Tailwind CSS for React Native) and TypeScript.
          Inspired by shadcn/ui, these are <em>not</em> installed as npm dependencies —
          they are source files you copy into your project and own completely.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Why AniUI?</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">You own the code.</strong> Components are source files, not black-box packages.</li>
          <li><strong className="text-foreground">NativeWind styling.</strong> Tailwind CSS classes — no StyleSheet.create() anywhere.</li>
          <li><strong className="text-foreground">Mobile-first.</strong> Built for iOS and Android. Period.</li>
          <li><strong className="text-foreground">Accessible.</strong> Every interactive component has proper accessibility roles.</li>
          <li><strong className="text-foreground">Dark mode.</strong> CSS variable-based theming works out of the box.</li>
          <li><strong className="text-foreground">Minimal dependencies.</strong> Uses React Native core components + cva + clsx + tailwind-merge.</li>
        </ul>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Tech Stack</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>React Native 0.76+</li>
          <li>NativeWind v4 (Tailwind CSS 3.x)</li>
          <li>TypeScript (strict mode)</li>
          <li>class-variance-authority for variants</li>
          <li>Expo SDK 53/54 or bare React Native CLI</li>
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
