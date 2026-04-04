import { CodeBlock } from "@/components/code-block";

export default function DarkModePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dark Mode</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Set up dark mode in your React Native app with NativeWind or Uniwind.
        </p>
      </div>

      <div className="space-y-6 text-foreground leading-7">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground">
          AniUI uses CSS custom properties with a <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">.dark</code> class.
          NativeWind automatically applies the dark class based on the device&apos;s color scheme.
          All AniUI components respond to dark mode without any extra configuration.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Expo Setup</h2>

        <h3 className="text-lg font-semibold pt-2">1. Configure app.json</h3>
        <p className="text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">userInterfaceStyle</code> to <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">&quot;automatic&quot;</code> to
          follow the system setting:
        </p>
        <CodeBlock
          title="app.json"
          code={`{
  "expo": {
    "userInterfaceStyle": "automatic"
  }
}`}
        />

        <h3 className="text-lg font-semibold pt-2">2. Import global CSS</h3>
        <p className="text-muted-foreground">
          Make sure your root layout imports the global stylesheet:
        </p>
        <CodeBlock
          title="app/_layout.tsx"
          code={`import "../global.css";

export default function RootLayout() {
  // ...
}`}
        />

        <p className="text-muted-foreground">
          That&apos;s it. NativeWind detects the system color scheme and applies the <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">.dark</code> class
          automatically. All CSS variables switch between their light and dark values.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Manual Toggle</h2>
        <p className="text-muted-foreground">
          To let users switch themes manually, use NativeWind&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">useColorScheme</code> hook:
        </p>
        <CodeBlock
          title="components/theme-toggle.tsx"
          code={`import { Pressable, Text } from "react-native";
import { useColorScheme } from "nativewind";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="rounded-md bg-secondary px-4 py-2"
    >
      <Text className="text-secondary-foreground">
        {colorScheme === "dark" ? "Light Mode" : "Dark Mode"}
      </Text>
    </Pressable>
  );
}`}
        />

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Uniwind</h2>
        <p className="text-muted-foreground">
          Uniwind uses <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Uniwind.setTheme()</code> for
          programmatic theme switching. Dark mode values are defined in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code> using
          a <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">@media (prefers-color-scheme: dark)</code> block.
        </p>

        <h3 className="text-lg font-semibold pt-2">1. global.css setup</h3>
        <p className="text-muted-foreground">
          Make sure your CSS has both <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">@import &quot;uniwind&quot;</code> and
          the dark mode media query:
        </p>
        <CodeBlock
          title="global.css"
          code={`@import "tailwindcss";
@import "uniwind";

@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  --color-primary: hsl(240 5.9% 10%);
  /* ... light values */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: hsl(240 10% 3.9%);
    --color-foreground: hsl(0 0% 98%);
    --color-primary: hsl(0 0% 98%);
    /* ... dark values */
  }
}`}
        />

        <h3 className="text-lg font-semibold pt-2">2. Toggle theme</h3>
        <CodeBlock
          title="components/theme-toggle.tsx"
          code={`import { Pressable, Text } from "react-native";
import { Uniwind, useUniwind } from "uniwind";

export function ThemeToggle() {
  const { theme } = useUniwind();

  return (
    <Pressable
      onPress={() => {
        const next = Uniwind.currentTheme === "light" ? "dark" : "light";
        Uniwind.setTheme(next);
      }}
      className="rounded-md bg-secondary px-4 py-2"
    >
      <Text className="text-secondary-foreground">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Text>
    </Pressable>
  );
}`}
        />
        <p className="text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Uniwind.setTheme()</code> automatically
          calls <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Appearance.setColorScheme()</code> internally, so native
          components (Alert, Modal, etc.) also adapt. Use <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Uniwind.setTheme(&quot;system&quot;)</code> to
          re-enable automatic system theme following.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Bare React Native</h2>
        <p className="text-muted-foreground">
          For non-Expo projects, NativeWind uses React Native&apos;s built-in <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">Appearance</code> API.
          No extra setup is needed — just ensure your NativeWind config is correct
          and <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">global.css</code> is loaded.
        </p>

        <h2 className="text-2xl font-semibold tracking-tight pt-4">Using Dark Mode in Components</h2>
        <p className="text-muted-foreground">
          AniUI components use semantic color tokens that automatically adapt. If you need
          conditional styling, use NativeWind&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono">dark:</code> prefix:
        </p>
        <CodeBlock
          code={`<View className="bg-white dark:bg-gray-900">
  <Text className="text-black dark:text-white">
    Adapts to color scheme
  </Text>
</View>

{/* But prefer semantic tokens — they adapt automatically: */}
<View className="bg-background">
  <Text className="text-foreground">
    Always correct
  </Text>
</View>`}
        />
      </div>
    </div>
  );
}
