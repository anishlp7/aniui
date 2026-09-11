import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { ShowcasePreview } from "@/components/preview/showcase-preview";

export function ShowcaseDocPlayground({ slug, code }: { slug: string; code: string }) {
  return (
    <PreviewToggle>
      <ComponentPlayground code={code}>
        <ShowcasePreview slug={slug} />
      </ComponentPlayground>
    </PreviewToggle>
  );
}
