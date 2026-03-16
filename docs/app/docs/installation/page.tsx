import { CodeBlock } from "@/components/code-block";
import Link from "next/link";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Installation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get AniUI set up in your React Native project in minutes.
        </p>
      </div>

      <div className="space-y-6 text-foreground leading-7">
        <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
        <p className="text-muted-foreground">
          AniUI requires NativeWind v4 to be configured in your project.
          If you haven&apos;t set it up yet:
        </p>
        <CodeBlock
          title="Install NativeWind"
          code={`npm install nativewind tailwindcss@3 react-native-reanimated react-native-safe-area-context
npx pod-install`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Quick Start</h2>

        <h3 className="text-lg font-semibold">1. Initialize AniUI</h3>
        <CodeBlock code="npx aniui init" />
        <p className="text-muted-foreground">
          This will set up your project with the utility helper, global CSS theme,
          and Tailwind config.
        </p>

        <h3 className="text-lg font-semibold pt-2">2. Add components</h3>
        <CodeBlock code="npx aniui add button text input card" />
        <p className="text-muted-foreground">
          Components are copied as source files into your <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">components/ui/</code> directory.
        </p>

        <h3 className="text-lg font-semibold pt-2">3. Import and use</h3>
        <CodeBlock
          title="app/index.tsx"
          code={`import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function App() {
  return (
    <>
      <Text variant="h1">Hello AniUI</Text>
      <Button onPress={() => console.log("pressed")}>
        Get Started
      </Button>
    </>
  );
}`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Manual Setup</h2>
        <p className="text-muted-foreground">
          If you prefer to set things up manually instead of using the CLI:
        </p>

        <h3 className="text-lg font-semibold pt-2">1. Install base dependencies</h3>
        <CodeBlock code="npm install class-variance-authority clsx tailwind-merge" />

        <h3 className="text-lg font-semibold pt-2">2. Create the utility helper</h3>
        <CodeBlock
          title="lib/utils.ts"
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />

        <h3 className="text-lg font-semibold pt-2">3. Copy components</h3>
        <p className="text-muted-foreground">
          Copy any component file from the{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">components/ui/</code>{" "}
          directory in the AniUI repo into your project.
        </p>

        <div className="flex gap-4 pt-6">
          <Link
            href="/docs/button"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Button Component →
          </Link>
        </div>
      </div>
    </div>
  );
}
