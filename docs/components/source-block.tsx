import { CodeBlock } from "@/components/code-block-server";
import { getComponentSource } from "@/lib/registry-source";

/** MDX-available "Source" section — reads the real component file via the
 * same registry JSON the .tsx doc pages use, instead of a hand-copied
 * fenced code block that can drift from the real source. */
export function Source({ slug, title }: { slug: string; title?: string }) {
  return <CodeBlock code={getComponentSource(slug)} title={title ?? `components/ui/${slug}.tsx`} />;
}
