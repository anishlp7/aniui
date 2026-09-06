import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { MorphFab, MorphFabTrigger, MorphFabItem, MorphFabItemIcon, MorphFabItemLabel } from "@/components/ui/morph-fab";
import { Camera, Image, Mic } from "lucide-react-native";

<MorphFab direction="up">
  <MorphFabTrigger />
  <MorphFabItem value="camera" onSelect={(value) => console.log(value)}>
    <MorphFabItemIcon><Camera size={20} color="#fafafa" /></MorphFabItemIcon>
    <MorphFabItemLabel>Camera</MorphFabItemLabel>
  </MorphFabItem>
  <MorphFabItem value="photo" onSelect={(value) => console.log(value)}>
    <MorphFabItemIcon><Image size={20} color="#fafafa" /></MorphFabItemIcon>
    <MorphFabItemLabel>Photo</MorphFabItemLabel>
  </MorphFabItem>
  <MorphFabItem value="audio" onSelect={(value) => console.log(value)}>
    <MorphFabItemIcon><Mic size={20} color="#fafafa" /></MorphFabItemIcon>
    <MorphFabItemLabel>Audio</MorphFabItemLabel>
  </MorphFabItem>
</MorphFab>`;
const sourceCode = getComponentSource("morph-fab");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Morph Fab</h1>
        <p className="text-muted-foreground text-lg">Skia gooey radial/directional FAB menu with staggered blob-merge spring animation.</p>
      </div>
      <ShowcaseDocPlayground slug="morph-fab" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="morph-fab" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/morph-fab.tsx" />
      </div>
    </div>
  );
}
