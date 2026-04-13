import { CodeBlock } from "@/components/code-block-server";
import Link from "next/link";
import { ManualSetupToggle } from "./_demos";

const babelConfigV4Code = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
    plugins: ["react-native-reanimated/plugin"],
  };
};`;

const babelConfigV5Code = `// NativeWind v5: NO jsxImportSource needed
// withNativeWind in metro.config.js handles CSS processing
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};`;

const babelConfigBareCode = `module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "nativewind/babel",
  ],
  plugins: [
    ["module-resolver", { alias: { "@": "." } }],
    "react-native-reanimated/plugin",
  ],
};`;

const metroConfigCode = `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });`;

const metroConfigBareCode = `const { getDefaultConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });`;

const postcssConfigCode = `module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};`;


const tailwindConfigCode = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};`;

const globalCssV4 = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
  --radius: 0.5rem;
}`;

const globalCssV5 = `@import "tailwindcss";
@import "nativewind/theme";

/* NativeWind v5: values must be inlined (no var() inside hsl()) */
@theme {
  --color-background: hsl(0 0% 100%);
  --color-foreground: hsl(240 10% 3.9%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(240 10% 3.9%);
  --color-primary: hsl(240 5.9% 10%);
  --color-primary-foreground: hsl(0 0% 98%);
  --color-secondary: hsl(240 4.8% 95.9%);
  --color-secondary-foreground: hsl(240 5.9% 10%);
  --color-muted: hsl(240 4.8% 95.9%);
  --color-muted-foreground: hsl(240 3.8% 46.1%);
  --color-accent: hsl(240 4.8% 95.9%);
  --color-accent-foreground: hsl(240 5.9% 10%);
  --color-destructive: hsl(0 84.2% 60.2%);
  --color-destructive-foreground: hsl(0 0% 98%);
  --color-border: hsl(240 5.9% 90%);
  --color-input: hsl(240 5.9% 90%);
  --color-ring: hsl(240 5.9% 10%);
  --radius: 0.5rem;
}

.dark {
  --color-background: hsl(240 10% 3.9%);
  --color-foreground: hsl(0 0% 98%);
  --color-card: hsl(240 10% 3.9%);
  --color-card-foreground: hsl(0 0% 98%);
  --color-primary: hsl(0 0% 98%);
  --color-primary-foreground: hsl(240 5.9% 10%);
  --color-secondary: hsl(240 3.7% 15.9%);
  --color-secondary-foreground: hsl(0 0% 98%);
  --color-muted: hsl(240 3.7% 15.9%);
  --color-muted-foreground: hsl(240 5% 64.9%);
  --color-accent: hsl(240 3.7% 15.9%);
  --color-accent-foreground: hsl(0 0% 98%);
  --color-destructive: hsl(0 62.8% 30.6%);
  --color-destructive-foreground: hsl(0 0% 98%);
  --color-border: hsl(240 3.7% 15.9%);
  --color-input: hsl(240 3.7% 15.9%);
  --color-ring: hsl(240 4.9% 83.9%);
}`;

const nativewindEnvCode = `/// <reference types="nativewind/types" />`;

const tsconfigV4Code = `{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsxImportSource": "nativewind"
  }
}`;

const tsconfigV5Code = `// NativeWind v5: NO jsxImportSource needed
// className types come from nativewind-env.d.ts
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}`;

const tsconfigBareCode = `{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-native",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", "nativewind-env.d.ts"]
}`;

function SDK54Steps() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium text-foreground">NativeWind v4 + Tailwind v3 + Reanimated v3</p>
        <p className="text-sm text-muted-foreground mt-1">Supports both Old and New Architecture.</p>
      </div>

      <h3 className="text-lg font-semibold">Step 1. Create a new project</h3>
      <CodeBlock code="npx create-expo-app@latest my-app --template default@sdk-54" />

      <h3 className="text-lg font-semibold pt-2">Step 2. Install dependencies</h3>
      <CodeBlock code={`cd my-app
npm install nativewind tailwindcss@3 react-native-reanimated react-native-safe-area-context react-native-svg
npm install class-variance-authority clsx tailwind-merge`} />

      <h3 className="text-lg font-semibold pt-2">Step 3. Initialize AniUI</h3>
      <p className="text-muted-foreground">
        This auto-creates all required config files: babel.config.js, metro.config.js, tailwind.config.js,
        global.css, nativewind-env.d.ts, and updates your tsconfig.json.
      </p>
      <CodeBlock code="npx @aniui/cli init" />

      <h3 className="text-lg font-semibold pt-2">Step 4. Import global.css</h3>
      <p className="text-muted-foreground">
        Add this import at the very top of your app entry file:
      </p>
      <CodeBlock title="app/_layout.tsx (or App.tsx)" code={`import "./global.css";
// ... rest of your app`} />

      <h3 className="text-lg font-semibold pt-2">Step 5. Add components and start</h3>
      <CodeBlock code={`npx @aniui/cli add button text input card

# Start with clean cache
npx expo start -c

# Or run directly on a device/emulator
npx expo run:ios
npx expo run:android`} />

      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
        <p className="text-sm font-medium text-foreground mb-1">Do NOT enable React Compiler</p>
        <p className="text-sm text-muted-foreground">
          If your app.json has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;reactCompiler&quot;: true</code> under{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo.experiments</code>, remove it.
          The React Compiler breaks NativeWind&apos;s className transform, causing all styles to silently disappear.
        </p>
      </div>

      <details className="rounded-lg border border-border">
        <summary className="cursor-pointer p-4 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors">
          What does <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code> create?
        </summary>
        <div className="border-t border-border p-4 space-y-4">
          <CodeBlock title="babel.config.js" code={babelConfigV4Code} />
          <CodeBlock title="metro.config.js" code={metroConfigCode} />
          <CodeBlock title="tailwind.config.js" code={tailwindConfigCode} />
          <CodeBlock title="global.css" code={globalCssV4} />
          <CodeBlock title="nativewind-env.d.ts" code={nativewindEnvCode} />
          <CodeBlock title="tsconfig.json (updated)" code={tsconfigV4Code} />
        </div>
      </details>
    </div>
  );
}

function SDK55Steps() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium text-foreground">NativeWind v5 + Tailwind v4 + Reanimated v4</p>
        <p className="text-sm text-muted-foreground mt-1">New Architecture only. No tailwind.config.js — theme config lives in global.css.</p>
      </div>

      <h3 className="text-lg font-semibold">Step 1. Create a new project</h3>
      <CodeBlock code="npx create-expo-app@latest my-app --template default@sdk-55" />

      <h3 className="text-lg font-semibold pt-2">Step 2. Install dependencies</h3>
      <p className="text-muted-foreground">
        NativeWind v5 requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-css</code> as the CSS engine
        (replaces the old react-native-css-interop).
      </p>
      <CodeBlock code={`cd my-app

# Install NativeWind v5 + CSS engine
npx expo install nativewind@preview react-native-css react-native-reanimated react-native-safe-area-context react-native-svg

# Install dev dependencies
npx expo install --dev tailwindcss@4 @tailwindcss/postcss postcss babel-preset-expo

# Install styling utilities
npm install class-variance-authority clsx tailwind-merge

# Pin lightningcss to compatible version (avoids "failed to deserialize" error)
npm pkg set overrides.lightningcss=1.30.1 && npm install`} />

      <h3 className="text-lg font-semibold pt-2">Step 3. Initialize AniUI</h3>
      <p className="text-muted-foreground">
        This auto-creates all required config files: babel.config.js, metro.config.js, postcss.config.js,
        global.css (with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> block),
        nativewind-env.d.ts, and updates your tsconfig.json.
      </p>
      <CodeBlock code="npx @aniui/cli init" />

      <h3 className="text-lg font-semibold pt-2">Step 4. Import global.css</h3>
      <p className="text-muted-foreground">
        Add this import at the very top of your app entry file:
      </p>
      <CodeBlock title="app/_layout.tsx (or App.tsx)" code={`import "./global.css";
// ... rest of your app`} />

      <h3 className="text-lg font-semibold pt-2">Step 5. Add components and start</h3>
      <CodeBlock code={`npx @aniui/cli add button text input card

# Start with clean cache
npx expo start -c

# Or run directly on a device/emulator
npx expo run:ios
npx expo run:android`} />

      <details className="rounded-lg border border-border">
        <summary className="cursor-pointer p-4 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors">
          What does <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code> create?
        </summary>
        <div className="border-t border-border p-4 space-y-4">
          <CodeBlock title="babel.config.js" code={babelConfigV5Code} />
          <CodeBlock title="metro.config.js" code={metroConfigCode} />
          <CodeBlock title="postcss.config.js" code={postcssConfigCode} />
          <CodeBlock title="global.css" code={globalCssV5} />
          <CodeBlock title="nativewind-env.d.ts" code={nativewindEnvCode} />
          <CodeBlock title="tsconfig.json (updated)" code={tsconfigV5Code} />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground mb-1">No tailwind.config.js</p>
            <p className="text-sm text-muted-foreground">
              NativeWind v5 deprecates tailwind.config.js. All styling configuration is done in global.css
              using the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> directive.
              If you have an old tailwind.config.js, delete it.
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}

function BareRNSteps() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium text-foreground">NativeWind v4 + Tailwind v3 + Reanimated v3</p>
        <p className="text-sm text-muted-foreground mt-1">React Native 0.76+ without Expo. Supports both Old and New Architecture.</p>
      </div>

      <h3 className="text-lg font-semibold">Step 1. Create a new project</h3>
      <CodeBlock code={`npx @react-native-community/cli init MyApp
cd MyApp`} />

      <h3 className="text-lg font-semibold pt-2">Step 2. Install dependencies</h3>
      <p className="text-muted-foreground">
        NativeWind requires these core packages. Install them with your preferred package manager.
      </p>
      <CodeBlock code={`# Core styling
npm install nativewind tailwindcss@3 react-native-reanimated react-native-worklets react-native-safe-area-context
npm install class-variance-authority clsx tailwind-merge

# Gesture handler + bottom sheet (required for Select, BottomSheet, ActionSheet)
npm install react-native-gesture-handler @gorhom/bottom-sheet

# Path alias support (so @/ imports work)
npm install --save-dev babel-plugin-module-resolver

# iOS only — install native pods
cd ios && pod install && cd ..`} />

      <h3 className="text-lg font-semibold pt-2">Step 3. Initialize AniUI</h3>
      <p className="text-muted-foreground">
        The CLI auto-detects bare React Native projects. It creates babel.config.js, metro.config.js,
        tailwind.config.js, global.css, nativewind-env.d.ts, and lib/utils.ts.
      </p>
      <CodeBlock code="npx @aniui/cli init" />

      <h3 className="text-lg font-semibold pt-2">Step 4. Import global.css</h3>
      <p className="text-muted-foreground">
        Add this import at the very top of your app entry file (usually App.tsx or index.js):
      </p>
      <CodeBlock title="App.tsx" code={`import "./global.css";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          {/* your app content */}
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}`} />

      <h3 className="text-lg font-semibold pt-2">Step 5. Add components and start</h3>
      <CodeBlock code={`npx @aniui/cli add button text input card

# Start Metro bundler
npm start -- --reset-cache

# Run on device/simulator
npm run ios
npm run android`} />

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm font-medium text-foreground mb-1">Path aliases</p>
        <p className="text-sm text-muted-foreground">
          AniUI components import from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@/lib/utils</code>.
          The CLI rewrites these to relative paths automatically. If you want to use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@/</code> aliases,
          add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel-plugin-module-resolver</code> to your babel config.
        </p>
      </div>

      <details className="rounded-lg border border-border">
        <summary className="cursor-pointer p-4 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors">
          What does <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui init</code> create?
        </summary>
        <div className="border-t border-border p-4 space-y-4">
          <CodeBlock title="babel.config.js" code={babelConfigBareCode} />
          <CodeBlock title="metro.config.js" code={metroConfigBareCode} />
          <CodeBlock title="tailwind.config.js" code={tailwindConfigCode} />
          <CodeBlock title="global.css" code={globalCssV4} />
          <CodeBlock title="nativewind-env.d.ts" code={nativewindEnvCode} />
          <CodeBlock title="tsconfig.json (reference)" code={tsconfigBareCode} />
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground mb-1">Key differences from Expo</p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2">
              <li>&bull; Metro config uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@react-native/metro-config</code> instead of <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo/metro-config</code></li>
              <li>&bull; Babel uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">module:@react-native/babel-preset</code> + <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/babel</code></li>
              <li>&bull; No <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code> — use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/babel</code> preset instead</li>
              <li>&bull; <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-worklets</code> must be installed separately (Reanimated v4 peer dep)</li>
              <li>&bull; <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel-plugin-module-resolver</code> is needed for <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@/</code> path aliases</li>
              <li>&bull; Wrap your root with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">BottomSheetModalProvider</code> for Select and bottom sheet components</li>
              <li>&bull; You must run <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pod install</code> after adding native dependencies</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}

function QuickStartSteps() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-5">
        <p className="text-sm font-semibold text-primary mb-2">One command setup</p>
        <p className="text-sm text-muted-foreground">
          The CLI auto-detects your project type (Expo/Bare RN), SDK version, and package manager.
          It installs missing dependencies, creates config files, and sets up theming — all in one step.
        </p>
      </div>

      <h3 className="text-lg font-semibold">Step 1. Create a React Native project (if you don&apos;t have one)</h3>
      <CodeBlock code={`# Expo (recommended)
npx create-expo-app@latest my-app
cd my-app

# Or Bare React Native
npx @react-native-community/cli init MyApp
cd MyApp`} />

      <h3 className="text-lg font-semibold pt-2">Step 2. Run AniUI init</h3>
      <p className="text-muted-foreground">
        The CLI will ask you to choose NativeWind or Uniwind, a theme preset, and where to put components.
        It then <strong>automatically installs</strong> all required dependencies.
      </p>
      <CodeBlock code={`npx @aniui/cli init

# Or with a specific styling engine:
npx @aniui/cli init --style uniwind`} />

      <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">The CLI will:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>1. Detect your project type, SDK version, and package manager</li>
          <li>2. Ask: NativeWind or Uniwind? Theme preset? TypeScript?</li>
          <li>3. Install missing packages (nativewind/uniwind, tailwindcss, reanimated, cva, clsx, etc.)</li>
          <li>4. Create metro.config.js, babel.config.js, tailwind.config.js, global.css</li>
          <li>5. Update tsconfig.json with correct jsxImportSource</li>
          <li>6. Disable React Compiler if enabled (breaks NativeWind)</li>
          <li>7. Create lib/utils.ts and components/ui/ directory</li>
        </ul>
      </div>

      <h3 className="text-lg font-semibold pt-2">Step 3. Import global.css</h3>
      <p className="text-muted-foreground">
        Add this import at the very top of your app entry file:
      </p>
      <CodeBlock title="app/_layout.tsx (or App.tsx)" code={`import "./global.css";
// ... rest of your app`} />

      <h3 className="text-lg font-semibold pt-2">Step 4. Add components and start</h3>
      <CodeBlock code={`npx @aniui/cli add button text input card

# Start with clean cache
npx expo start -c`} />

      <p className="text-muted-foreground text-sm">
        That&apos;s it. Components are copied to your <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components/ui/</code> directory.
        You own the source code — customize freely.
      </p>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm font-medium text-foreground mb-1">Overlay components (Dialog, Popover, Select, etc.)</p>
        <p className="text-sm text-muted-foreground">
          Components using <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives</code> need{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"<PortalHost />"}</code> in your root layout.
          Add it as the last child inside your root wrapper:
        </p>
        <div className="mt-2">
          <CodeBlock code={`import { PortalHost } from "@rn-primitives/portal";

// In your root layout:
<GestureHandlerRootView style={{ flex: 1 }}>
  <Stack />
  <PortalHost />
</GestureHandlerRootView>`} />
        </div>
      </div>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Installation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get AniUI set up in your React Native project in under 2 minutes.
        </p>
      </div>

      {/* Recommended: Quick Start */}
      <div className="space-y-6 text-foreground leading-7">
        <QuickStartSteps />

        {/* Manual Setup (expandable) */}
        <div className="border-t border-border my-8" />

        <ManualSetupToggle
          sdk54Steps={<SDK54Steps />}
          sdk55Steps={<SDK55Steps />}
          bareSteps={<BareRNSteps />}
        />

        {/* ==================== TROUBLESHOOTING ==================== */}
        <div className="border-t border-border my-8" />
        <h2 className="text-2xl font-semibold tracking-tight">Troubleshooting</h2>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-primary mb-1">Run the diagnostic first</p>
            <p className="text-sm text-muted-foreground">
              Before debugging manually, run{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx @aniui/cli doctor</code>{" "}
              — it checks every dependency, config file, and known conflict, and tells you exactly what to fix.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">Styles not appearing / components render unstyled</p>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2">
              <li>1. <strong>Expo SDK 53/54:</strong> Check <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel.config.js</code> has{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code> in babel-preset-expo options</li>
              <li>1. <strong>Expo SDK 55:</strong> babel.config.js must NOT have{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource</code> or{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/babel</code> — withNativeWind in metro handles everything</li>
              <li>1. <strong>Bare RN:</strong> Check <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel.config.js</code> has{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind/babel</code> in presets</li>
              <li>2. Check <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">metro.config.js</code> wraps config with{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withNativeWind</code></li>
              <li>3. Check <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">global.css</code> is imported at the top of your app entry file</li>
              <li>4. Clear Metro cache: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx expo start -c</code> or{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npm start -- --reset-cache</code></li>
            </ul>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">SDK 55: &quot;Unable to resolve nativewind/jsx-dev-runtime&quot;</p>
            <p className="text-sm text-muted-foreground mt-1">
              Remove <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">jsxImportSource: &quot;nativewind&quot;</code> from
              both <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel.config.js</code> and{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tsconfig.json</code>.
              NativeWind v5 does not use jsxImportSource — it handles className via metro import rewriting.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">SDK 55: &quot;Invalid call: process.env.EXPO_ROUTER_APP_ROOT&quot;</p>
            <p className="text-sm text-muted-foreground mt-1">
              Install <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">babel-preset-expo</code> as a devDependency
              in your project: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npx expo install --dev babel-preset-expo</code>.
              In monorepos, the wrong version may be hoisted from another package.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">SDK 55: lightningcss &quot;failed to deserialize&quot; error</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{'"overrides": { "lightningcss": "1.30.1" }'}</code> to
              package.json and run <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npm install</code>.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">SDK 55: Theme colors not working (hsl(var(...)) returns transparent)</p>
            <p className="text-sm text-muted-foreground mt-1">
              NativeWind v5&apos;s CSS compiler cannot resolve <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">hsl(var(--color))</code> at
              build time. Use direct values in the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@theme</code> block
              instead: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--color-primary: hsl(240 5.9% 10%)</code>
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground mb-1">SDK 55: className on SafeAreaView doesn&apos;t work</p>
            <p className="text-sm text-muted-foreground mt-1">
              NativeWind v5 only wraps core <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native</code> components.
              Third-party components like <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SafeAreaView</code> from{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-safe-area-context</code> need{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">style</code> instead of{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> for layout props like flex.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">Bare RN: &quot;Unable to resolve nativewind/metro&quot;</p>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind</code> is installed as a dependency (not just devDependency).
              Run <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">npm install nativewind</code> and restart Metro with{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">--reset-cache</code>.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">Bare RN: Reanimated crash on app launch</p>
            <p className="text-sm text-muted-foreground mt-1">
              Ensure <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated/plugin</code> is the{" "}
              <strong>last</strong> plugin in your babel.config.js plugins array. Then run{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">cd ios && pod install</code> and rebuild.
            </p>
          </div>

          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
            <p className="text-sm font-medium text-foreground mb-1">React Compiler breaks NativeWind</p>
            <p className="text-sm text-muted-foreground mt-1">
              Remove <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;reactCompiler&quot;: true</code> from{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">app.json</code> &rarr;{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo.experiments</code>.
              It interferes with NativeWind&apos;s className JSX transformation.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm font-medium text-foreground mb-1">Property &apos;className&apos; does not exist</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">nativewind-env.d.ts</code> in your project root with:{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">{"/// <reference types=\"nativewind/types\" />"}</code>
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Link
            href="/docs/compatibility"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            SDK Compatibility &rarr;
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse Components &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
