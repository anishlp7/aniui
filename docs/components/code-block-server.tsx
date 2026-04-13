import { highlight } from "@/lib/highlight";
import { CopyButton } from "@/components/copy-button";
import type { BundledLanguage } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: BundledLanguage;
  title?: string;
}

export async function CodeBlock({ code, language = "tsx", title }: CodeBlockProps) {
  const html = await highlight(code, language);

  return (
    <div className="relative rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="border-b border-border bg-secondary/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <CopyButton code={code} />
      <div
        className="shiki-wrapper overflow-x-auto bg-secondary/30 p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
