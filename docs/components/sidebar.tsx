"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "CLI", href: "/docs/cli" },
      { title: "Theming", href: "/docs/theming" },
      { title: "Dark Mode", href: "/docs/dark-mode" },
    ],
  },
  {
    title: "Components (Tier 1 - Core)",
    items: [
      { title: "Button", href: "/docs/button" },
      { title: "Text", href: "/docs/text" },
      { title: "Input", href: "/docs/input" },
      { title: "Card", href: "/docs/card" },
      { title: "Badge", href: "/docs/badge" },
      { title: "Separator", href: "/docs/separator" },
      { title: "Avatar", href: "/docs/avatar" },
      { title: "Alert", href: "/docs/alert" },
      { title: "Label", href: "/docs/label" },
      { title: "Skeleton", href: "/docs/skeleton" },
      { title: "Switch", href: "/docs/switch" },
      { title: "Checkbox", href: "/docs/checkbox" },
      { title: "Radio Group", href: "/docs/radio-group" },
      { title: "Progress", href: "/docs/progress" },
      { title: "Spinner", href: "/docs/spinner" },
      { title: "Textarea", href: "/docs/textarea" },
      { title: "List", href: "/docs/list" },
    ],
  },
  {
    title: "Components (Tier 2 - Animated)",
    items: [
      { title: "Accordion", href: "/docs/accordion" },
      { title: "Tabs", href: "/docs/tabs" },
      { title: "Collapsible", href: "/docs/collapsible" },
      { title: "Toast", href: "/docs/toast" },
      { title: "Dialog", href: "/docs/dialog" },
      { title: "Alert Dialog", href: "/docs/alert-dialog" },
      { title: "Tooltip", href: "/docs/tooltip" },
      { title: "Popover", href: "/docs/popover" },
    ],
  },
  {
    title: "Components (Tier 3 - Native)",
    items: [
      { title: "Bottom Sheet", href: "/docs/bottom-sheet" },
      { title: "Action Sheet", href: "/docs/action-sheet" },
      { title: "Select", href: "/docs/select" },
      { title: "Date Picker", href: "/docs/date-picker" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background md:block">
      <nav className="space-y-6 p-6">
        {sidebarItems.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              {section.title}
            </h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
