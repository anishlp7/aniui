import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";

const usageCode = `import { useState } from "react";
import { Pressable, View } from "react-native";
import { MatchedGeometryProvider, MatchedGeometryView } from "@/components/ui/matched-geometry";

function Example() {
  const [expanded, setExpanded] = useState(false);

  return (
    <MatchedGeometryProvider>
      <Pressable onPress={() => setExpanded((v) => !v)}>
        {expanded ? (
          <MatchedGeometryView id="card" className="h-40 w-full rounded-2xl bg-primary" />
        ) : (
          <MatchedGeometryView id="card" className="h-16 w-16 rounded-full bg-primary" />
        )}
      </Pressable>
    </MatchedGeometryProvider>
  );
}`;
const sourceCode = getComponentSource("matched-geometry");

export default function Page() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Matched Geometry</h1>
        <p className="text-muted-foreground text-lg">SwiftUI-style shared-element layout transition primitive — morphs one tagged view into another&apos;s position and size when they swap.</p>
      </div>
      <ShowcaseDocPlayground slug="matched-geometry" code={usageCode} />
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="matched-geometry" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <p className="text-sm text-muted-foreground mb-3">
          <code className="text-xs">MatchedGeometryView</code> is a drop-in wrapper around the lower-level <code className="text-xs">useMatchedGeometry</code> hook.
          Wrap the screen (or region) in a <code className="text-xs">MatchedGeometryProvider</code>, then tag two views that mount/unmount in turn with the same <code className="text-xs">id</code> —
          swapping between them morphs the shared element&apos;s position and size instead of a hard cut. Reach for the hook directly if you need full control over the content being rendered
          during the transition.
        </p>
        <ComponentPlayground code={usageCode} />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/matched-geometry.tsx" />
      </div>
    </div>
  );
}
