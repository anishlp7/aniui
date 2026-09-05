"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrefetchLink } from "./prefetch-link";
import { sidebarSections } from "@/lib/nav-data";
import { activePillSpring, reducedMotionTransition } from "@/lib/motion";

const STORAGE_KEY = "aniui-docs-sidebar-closed-sections";

const sectionContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const sectionItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 240, damping: 24 } },
};

// Same variants with motion dropped, for prefers-reduced-motion — the sidebar
// used to guard only the active-pill transition, leaving the entrance stagger
// sliding in regardless of the setting.
const sectionItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: reducedMotionTransition },
};
const linkItemReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: reducedMotionTransition },
};

function findSectionForPath(pathname: string | null) {
  return sidebarSections.find((s) => s.items.some((i) => i.href === pathname))?.title;
}

export function Sidebar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const activeItemRef = useRef<HTMLLIElement>(null);
  // Sections the user has manually collapsed — every section defaults open,
  // same as before collapsing existed, so nothing hides on first visit.
  const [closedSections, setClosedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setClosedSections(new Set(JSON.parse(stored)));
    } catch {
      // ignore — a private window or blocked storage just means nothing persists
    }
  }, []);

  // If navigation lands on a page whose section the user had collapsed,
  // auto-reopen it — a collapsed section should never hide the active page.
  useEffect(() => {
    const activeSection = findSectionForPath(pathname);
    if (activeSection) {
      setClosedSections((prev) => {
        if (!prev.has(activeSection)) return prev;
        const next = new Set(prev);
        next.delete(activeSection);
        return next;
      });
    }
  }, [pathname]);

  // Scroll the active item into view on route change — a deep link landing
  // far down the list previously left the nav pane unscrolled to reveal it.
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname, prefersReducedMotion]);

  const toggleSection = (title: string) => {
    setClosedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore — nothing persists, section still toggles for this session
      }
      return next;
    });
  };

  return (
    <aside className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background md:block scrollbar-hidden">
      <div className="flex min-h-full flex-col">
        <motion.nav
          className="space-y-6 p-6 pb-4"
          style={{ marginBottom: "80px" }}
          variants={sectionContainer}
          initial="hidden"
          animate="show"
        >
          {sidebarSections.map((section) => {
            const isOpen = !closedSections.has(section.title);
            return (
              <motion.div key={section.title} variants={prefersReducedMotion ? sectionItemReduced : sectionItem}>
                {section.collapsible ? (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    className="mb-2 flex w-full items-center justify-between text-sm font-semibold text-foreground cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    {section.title}
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : -90 }}
                      transition={prefersReducedMotion ? reducedMotionTransition : { type: "spring", stiffness: 300, damping: 26 }}
                    >
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </motion.span>
                  </button>
                ) : (
                  <h4 className="mb-2 text-sm font-semibold text-foreground">{section.title}</h4>
                )}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      className="space-y-1 overflow-hidden"
                      variants={sectionContainer}
                      initial={section.collapsible ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={prefersReducedMotion ? reducedMotionTransition : { duration: 0.18, ease: "easeOut" }}
                    >
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <motion.li
                            key={item.href}
                            ref={isActive ? activeItemRef : undefined}
                            variants={prefersReducedMotion ? linkItemReduced : linkItem}
                            className="relative"
                          >
                            {isActive && (
                              <motion.span
                                layoutId="sidebar-active-pill"
                                className="absolute inset-0 rounded-md bg-accent"
                                transition={prefersReducedMotion ? reducedMotionTransition : activePillSpring}
                              />
                            )}
                            <PrefetchLink
                              href={item.href}
                              className={cn(
                                "relative block rounded-md px-3 py-1.5 text-sm transition-colors",
                                isActive
                                  ? "text-accent-foreground font-medium"
                                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                              )}
                            >
                              {item.title}
                            </PrefetchLink>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>
    </aside>
  );
}
