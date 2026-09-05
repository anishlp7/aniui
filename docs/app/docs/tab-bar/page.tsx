import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewTabBarDemo } from "@/components/preview/tab-bar";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add tab-bar`;
const usageCode = `import { TabBar, TabBarItem } from "@/components/ui/tab-bar";
import { Home, Search, Mail, User } from "lucide-react-native";

export function MyScreen() {
  const [active, setActive] = useState("home");

  return (
    <TabBar>
      <TabBarItem
        active={active === "home"}
        icon={<Home size={20} />}
        label="Home"
        onPress={() => setActive("home")}
      />
      <TabBarItem
        active={active === "search"}
        icon={<Search size={20} />}
        label="Search"
        onPress={() => setActive("search")}
      />
      <TabBarItem
        active={active === "inbox"}
        icon={<Mail size={20} />}
        label="Inbox"
        badge={3}
        onPress={() => setActive("inbox")}
      />
      <TabBarItem
        active={active === "profile"}
        icon={<User size={20} />}
        label="Profile"
        onPress={() => setActive("profile")}
      />
    </TabBar>
  );
}`;
const sourceCode = getComponentSource("tab-bar");
export default function TabBarPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tab Bar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bottom tab bar with badge support and active states.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="tab-bar" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewTabBarDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">TabBar</Heading>
        <PropsTable props={[
          { name: "variant", type: '"default" | "card" | "transparent"', default: '"default"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TabBarItem</Heading>
        <PropsTable props={[
          { name: "active", type: "boolean", default: "false" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "label", type: "string", default: "-" },
          { name: "badge", type: "number", default: "-" },
          { name: "onPress", type: "() => void", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Bottom tab navigation with badge support.</li>
          <li>Each tab has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="tab"</code> with selected state.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/tab-bar.tsx" />
      </div>
    </div>
  );
}
