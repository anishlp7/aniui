import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { ShowcaseDocPlayground } from "@/components/showcase-doc-playground";
const usageCode = `import { BookPage, BookPageCover, BookPageAuthor, BookPageFooter, BookPageTitle, BookPageNote, BookPagePages } from "@/components/ui/book-page";
<BookPage openAngle={35}>
  <BookPagePages />
  <BookPageCover>
    <BookPageAuthor>Anish Lawrence</BookPageAuthor>
    <BookPageFooter>
      <BookPageTitle>Chapter One</BookPageTitle>
      <BookPageNote>First Edition, 2026</BookPageNote>
    </BookPageFooter>
  </BookPageCover>
</BookPage>`;
const sourceCode = getComponentSource("book-page");
export default function Page() {
  return (
    <div className="space-y-12">
      <div><h1 className="text-3xl font-bold mb-2">Book Page</h1><p className="text-muted-foreground text-lg">Book cover with a page-edge texture and an openAngle-driven spine hinge that swings the cover open.</p></div>
      <ShowcaseDocPlayground slug="book-page" code={usageCode} />
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading><AddComponentTabs names="book-page" /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading><ComponentPlayground code={usageCode} /></div>
      <div><Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading><CodeBlock code={sourceCode} title="components/ui/book-page.tsx" /></div>
    </div>
  );
}
