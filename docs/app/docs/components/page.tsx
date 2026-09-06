import { Heading } from "@/components/heading";
import { PrefetchLink } from "@/components/prefetch-link";
import { componentCategories, chartItems, type NavSection } from "@/lib/nav-data";

function CategoryBlock({ category }: { category: NavSection }) {
  if (category.groups) {
    return (
      <div className="space-y-4">
        {category.groups.map((group) => (
          <div key={group.title} className="space-y-2">
            <Heading as="h3" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</Heading>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <PrefetchLink key={item.href} href={item.href} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                  {item.title}
                </PrefetchLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {(category.items ?? []).map((item) => (
        <PrefetchLink key={item.href} href={item.href} className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
          {item.title}
        </PrefetchLink>
      ))}
    </div>
  );
}

export default function ComponentsIndexPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Components</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          133 AniUI components with nested categories — carousels, loaders, UI pieces, Skia effects, and more. Pick a category below, or use the sidebar.
        </p>
      </div>
      {[...componentCategories, { title: "Charts", items: chartItems }].map((category) => (
        <div key={category.title} className="space-y-3">
          <Heading as="h2" className="text-xl font-semibold text-foreground">{category.title}</Heading>
          <CategoryBlock category={category} />
        </div>
      ))}
    </div>
  );
}
