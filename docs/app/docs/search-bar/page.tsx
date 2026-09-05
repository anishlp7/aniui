import { getComponentSource } from "@/lib/registry-source";
import Link from "next/link";
import { Heading } from "@/components/heading";
import { PreviewSearchBar } from "@/components/preview/search-bar";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SearchBarDemo, CancelDemo } from "./_demos";

const installCode = `npx @aniui/cli add search-bar`;
const usageCode = `import { SearchBar } from "@/components/ui/search-bar";

function MyScreen() {
  const [query, setQuery] = useState("");
  return (
    <SearchBar
      value={query}
      onChangeText={setQuery}
      onClear={() => setQuery("")}
    />
  );
}`;
const sizesCode = `<SearchBar size="sm" placeholder="Small search..." />
<SearchBar size="md" placeholder="Medium search..." />
<SearchBar size="lg" placeholder="Large search..." />`;
const cancelCode = `const [query, setQuery] = useState("");
const [focused, setFocused] = useState(false);
<SearchBar
  value={query}
  onChangeText={setQuery}
  onClear={() => setQuery("")}
  onFocus={() => setFocused(true)}
  showCancel={focused}
  onCancel={() => { setQuery(""); setFocused(false); }}
/>`;
const iconCode = `import { Search } from "lucide-react-native";

<SearchBar
  icon={<Search size={18} color="#71717a" style={{ marginRight: 8 }} />}
  value={query}
  onChangeText={setQuery}
  onClear={() => setQuery("")}
/>`;
const sourceCode = getComponentSource("search-bar");
export default function SearchBarPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">SearchBar</h1>
        <p className="text-muted-foreground text-lg">A search input with icon, clear button, and optional cancel action.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <SearchBarDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="search-bar" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <CodeBlock code={usageCode} title="search-screen.tsx" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <p className="text-sm text-muted-foreground mb-4">Three sizes to fit different layouts.</p>
        <ComponentPlayground code={sizesCode}>
          <div className="space-y-3 w-full">
            <PreviewSearchBar size="sm" placeholder="Small search..." />
            <PreviewSearchBar size="md" placeholder="Medium search..." />
            <PreviewSearchBar size="lg" placeholder="Large search..." />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">With Cancel Button</Heading>
        <p className="text-sm text-muted-foreground mb-4">Show a cancel button when the search bar is focused (iOS pattern).</p>
        <ComponentPlayground code={cancelCode}>
          <CancelDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Custom Icon</Heading>
        <p className="text-sm text-muted-foreground mb-4">Pass any React element via the <code>icon</code> prop. The icon size adjusts automatically based on the <code>size</code> variant (sm: 14, md: 16, lg: 20).</p>
        <CodeBlock code={iconCode} title="custom-icon.tsx" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "value", type: "string" },
          { name: "onChangeText", type: "(text: string) => void" },
          { name: "icon", type: "React.ReactNode", default: "search icon" },
          { name: "onClear", type: "() => void" },
          { name: "showCancel", type: "boolean", default: "false" },
          { name: "onCancel", type: "() => void" },
          { name: "placeholder", type: "string", default: "\"Search...\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole</code> and search icon.</li>
          <li>Clear button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for screen readers.</li>
        </ul>
      </div>
      <p className="text-sm text-muted-foreground">
        See also: <Link href="/docs/input" className="text-primary hover:underline">Input</Link>{" "}
        &middot; <Link href="/docs/autocomplete" className="text-primary hover:underline">AutoComplete</Link>
      </p>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/search-bar.tsx" />
      </div>
    </div>
  );
}
