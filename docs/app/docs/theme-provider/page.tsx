import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewThemeProviderDemo } from "@/components/preview/theme-provider";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add theme-provider`;
const usageCode = `import { ThemeProvider } from "@/components/ui/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Your app content */}
    </ThemeProvider>
  );
}`;
const hookCode = `import { useTheme } from "@/components/ui/theme-provider";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <Button onPress={toggleTheme}>
      {resolvedTheme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </Button>
  );
}`;
const sourceCode = getComponentSource("theme-provider");
export default function ThemeProviderPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Theme Provider</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Theme context provider with light, dark, and system mode support.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="theme-provider" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewThemeProviderDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/_layout.tsx" />
      </div>
      {/* useTheme Hook */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">useTheme Hook</Heading>
        <p className="text-sm text-muted-foreground">
          Access the current theme, resolved theme, and theme controls from any child component.
        </p>
        <CodeBlock code={hookCode} title="Using useTheme" />
        <PropsTable props={[
          { name: "theme", type: '"light" | "dark" | "system"', default: "-" },
          { name: "resolvedTheme", type: '"light" | "dark"', default: "-" },
          { name: "setTheme", type: "(theme: Theme) => void", default: "-" },
          { name: "toggleTheme", type: "() => void", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "-" },
          { name: "defaultTheme", type: '"light" | "dark" | "system"', default: '"system"' },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ThemeProvider</code> context for light/dark/system mode.</li>
          <li>Respects the user's system-level accessibility preferences for color scheme.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/theme-provider.tsx" />
      </div>
    </div>
  );
}
