"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { gettingStartedItems, componentItems, type NavItem } from "@/lib/nav-data";

const allPages: NavItem[] = [...gettingStartedItems.filter(i => i.href !== "/create"), ...componentItems];

export function DocsPagination() {
  const pathname = usePathname();
  const currentIndex = allPages.findIndex((item) => item.href === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between border-t border-border pt-6 mt-10">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs text-muted-foreground/60">Previous</span>
          <span className="font-medium">← {prev.title}</span>
        </Link>
      ) : <div />}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs text-muted-foreground/60">Next</span>
          <span className="font-medium">{next.title} →</span>
        </Link>
      ) : <div />}
    </div>
  );
}
