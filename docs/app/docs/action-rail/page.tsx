import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import {
  ActionRail,
  ActionRailGroup,
  ActionRailAction,
  ActionRailIcon,
  ActionRailLabel,
  ActionRailOverflow,
  ActionRailTrigger,
} from "@/components/ui/action-rail";
import { Heart, Share2, Bookmark } from "lucide-react-native";

<ActionRail onAction={(value) => console.log(value)}>
  <ActionRailGroup>
    <ActionRailAction value="like">
      <ActionRailIcon>{({ color, size }) => <Heart color={color} size={size} />}</ActionRailIcon>
      <ActionRailLabel>Like</ActionRailLabel>
    </ActionRailAction>
  </ActionRailGroup>
  <ActionRailOverflow>
    <ActionRailAction value="share">
      <ActionRailIcon>{({ color, size }) => <Share2 color={color} size={size} />}</ActionRailIcon>
      <ActionRailLabel>Share</ActionRailLabel>
    </ActionRailAction>
    <ActionRailAction value="save">
      <ActionRailIcon>{({ color, size }) => <Bookmark color={color} size={size} />}</ActionRailIcon>
      <ActionRailLabel>Save</ActionRailLabel>
    </ActionRailAction>
  </ActionRailOverflow>
  <ActionRailTrigger />
</ActionRail>`;
const sourceCode = getComponentSource("action-rail");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Action Rail</h1>
        <p className="text-muted-foreground text-lg">Expandable icon toolbar that reveals labeled actions, with its own light/dark palette system.</p>
      </div>
      <ShowcaseDocPlayground slug="action-rail" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="action-rail" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/action-rail.tsx" />
      </div>
    </div>
  );
}
