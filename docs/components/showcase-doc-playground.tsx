import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { ShowcasePreview } from "@/components/preview/showcase-preview";

interface ShowcaseDocPlaygroundProps {
  slug: string;
  code: string;
  /**
   * "phone" (default) frames the preview in a phone-shell mockup — a good fit
   * for compact components. Wide/horizontal components (carousels, etc.) look
   * cramped in a ~320px phone frame, so pass "inline" for a plain, full-width
   * card instead.
   */
  variant?: "phone" | "inline";
}

export function ShowcaseDocPlayground({ slug, code, variant = "phone" }: ShowcaseDocPlaygroundProps) {
  return (
    <PreviewToggle>
      <ComponentPlayground code={code} variant={variant}>
        {variant === "inline" ? (
          <ShowcasePreview slug={slug} />
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-card p-6">
            <ShowcasePreview slug={slug} />
          </div>
        )}
      </ComponentPlayground>
    </PreviewToggle>
  );
}
