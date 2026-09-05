"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { PrefetchLink } from "./prefetch-link";
import { sidebarSections } from "@/lib/nav-data";
import { activePillSpring, reducedMotionTransition } from "@/lib/motion";

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

export function Sidebar() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const activeItemRef = useRef<HTMLLIElement>(null);

  // Scroll the active item into view on route change — a deep link landing
  // far down the list previously left the nav pane unscrolled to reveal it.
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname, prefersReducedMotion]);

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
          {sidebarSections.map((section) => (
            <motion.div key={section.title} variants={prefersReducedMotion ? sectionItemReduced : sectionItem}>
              <h4 className="mb-2 text-sm font-semibold text-foreground">
                {section.title}
              </h4>
              <motion.ul className="space-y-1" variants={sectionContainer}>
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
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </aside>
  );
}
