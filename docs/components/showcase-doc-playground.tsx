import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { ShowcasePreview } from "@/components/preview/showcase-preview";

export function ShowcaseDocPlayground({ slug, code }: { slug: string; code: string }) {
  return (
    <PreviewToggle>
      <ComponentPlayground code={code}>
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card p-6">
          <ShowcasePreview slug={slug} />
        </div>
      </ComponentPlayground>
    </PreviewToggle>
  );
}
