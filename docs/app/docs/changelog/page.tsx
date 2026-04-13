
import Link from "next/link";

type ChangeType = "feat" | "fix" | "breaking" | "docs";

interface Change {
  type: ChangeType;
  text: string;
  link?: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  changes: Change[];
}

const typeBadge: Record<ChangeType, { label: string; className: string }> = {
  feat: { label: "feat", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  fix: { label: "fix", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  breaking: { label: "breaking", className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  docs: { label: "docs", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
};

const releases: Release[] = [
  {
    version: "0.2.14",
    date: "2026-04-06",
    title: "Uniwind Support + Universal Theming",
    changes: [
      { type: "feat", text: "Full Uniwind styling engine support — same components work with NativeWind and Uniwind", link: "/docs/uniwind" },
      { type: "feat", text: "Uniwind dark mode via @layer theme + @variant light/dark in global.css", link: "/docs/dark-mode" },
      { type: "feat", text: "CLI init generates correct Uniwind config: metro.config.js, global.css, @import \"uniwind\"" },
      { type: "feat", text: "CLI doctor validates Uniwind-specific setup (withUniwindConfig, @variant dark, @import)" },
      { type: "feat", text: "Theme presets (default, blue, green, orange, rose) now apply to both light and dark variants" },
      { type: "feat", text: "withUniwind() HOC for third-party components like SafeAreaView" },
      { type: "feat", text: "react-native-svg added as core dependency for inline SVG icons in components" },
      { type: "feat", text: "with-uniwind example app with 77 interactive component demos and theme toggling" },
      { type: "fix", text: "file-picker.tsx: replaced inline <svg> (crashes on RN) with react-native-svg" },
      { type: "fix", text: "calendar.tsx, password-input.tsx, select.tsx: compacted SVG icons to meet 120-line limit" },
      { type: "fix", text: "Bare <Text> tags in example app now have text-foreground class for proper theming" },
      { type: "fix", text: "react-native-svg pinned to 15.15.3 across all example apps" },
      { type: "fix", text: "package-lock.json synced to fix npm ci failures in CI" },
      { type: "docs", text: "Dark mode guide updated with Uniwind section (@variant light/dark + Uniwind.setTheme())", link: "/docs/dark-mode" },
      { type: "docs", text: "Installation guide updated with react-native-svg in all install commands", link: "/docs/installation" },
    ],
  },
  {
    version: "0.2.13",
    date: "2026-03-26",
    title: "Expo 55 + NativeWind v5 Support",
    changes: [
      { type: "feat", text: "Dual SDK support: Expo 53/54 (NativeWind v4) + Expo 55 (NativeWind v5)", link: "/docs/compatibility" },
      { type: "feat", text: "CLI auto-detects SDK version during aniui init" },
      { type: "feat", text: "Versioned templates (v4/ and v5/) for each SDK generation" },
      { type: "feat", text: "expo-55-starter example app with NativeWind v5 + Tailwind v4" },
      { type: "feat", text: "React Native Testing Library render tests for all 54 components" },
      { type: "docs", text: "Compatibility guide with version matrix and migration steps", link: "/docs/compatibility" },
      { type: "docs", text: "Changelog page" },
    ],
  },
  {
    version: "0.2.12",
    date: "2026-03-25",
    title: "Charts + Input Enhancement",
    changes: [
      { type: "feat", text: "7 chart components: Area, Bar, Line, Pie, Radar, Radial, Tooltip", link: "/charts" },
      { type: "feat", text: "Charts landing page with live previews and horizontal tabs", link: "/charts" },
      { type: "feat", text: "Input: leadingIcon and trailingIcon props", link: "/docs/input" },
      { type: "feat", text: "Expanded static test suite (824 tests)" },
      { type: "feat", text: "MCP integration and documentation", link: "/docs/mcp" },
    ],
  },
  {
    version: "0.2.11",
    date: "2026-03-20",
    title: "Bare React Native Support",
    changes: [
      { type: "feat", text: "Bare React Native CLI support in aniui init" },
      { type: "feat", text: "Metro + Babel templates for bare RN projects" },
      { type: "feat", text: "bare-rn-starter example app" },
    ],
  },
  {
    version: "0.2.10",
    date: "2026-03-19",
    title: "Full Component Library",
    changes: [
      { type: "feat", text: "18 new components (47 total)" },
      { type: "feat", text: "Redesigned homepage with live theme preview" },
      { type: "feat", text: "Create page with theme editor" },
      { type: "feat", text: "Blocks: 15 pre-built screen templates", link: "/blocks" },
      { type: "feat", text: "Shared nav data and theme data system" },
    ],
  },
  {
    version: "0.2.9",
    date: "2026-03-16",
    title: "Initial Release",
    changes: [
      { type: "feat", text: "29 components across 3 tiers" },
      { type: "feat", text: "CLI with init, add, theme, mcp, and generate commands" },
      { type: "feat", text: "Theme system with 5 presets and dark mode" },
      { type: "feat", text: "MCP server for AI tool integration" },
      { type: "feat", text: "Documentation site at aniui.dev" },
    ],
  },
];

function Badge({ type }: { type: ChangeType }) {
  const badge = typeBadge[type];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}>
      {badge.label}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Changelog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          All notable changes to AniUI.
        </p>
      </div>

      <div className="space-y-12">
        {releases.map((release) => (
          <div key={release.version} className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-sm font-semibold text-primary">
                v{release.version}
              </span>
              <span className="text-sm text-muted-foreground">{release.date}</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
              {release.title}
            </h2>
            <ul className="space-y-2.5">
              {release.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Badge type={change.type} />
                  <span className="text-sm text-foreground leading-relaxed">
                    {change.link ? (
                      <Link href={change.link} className="hover:underline">
                        {change.text}
                      </Link>
                    ) : (
                      change.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
