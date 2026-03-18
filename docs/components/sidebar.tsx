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
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/accordion" },
      { title: "Action Sheet", href: "/docs/action-sheet" },
      { title: "Alert", href: "/docs/alert" },
      { title: "Alert Dialog", href: "/docs/alert-dialog" },
      { title: "Avatar", href: "/docs/avatar" },
      { title: "Badge", href: "/docs/badge" },
      { title: "Banner", href: "/docs/banner" },
      { title: "Bottom Sheet", href: "/docs/bottom-sheet" },
      { title: "Button", href: "/docs/button" },
      { title: "Calendar", href: "/docs/calendar" },
      { title: "Card", href: "/docs/card" },
      { title: "Carousel", href: "/docs/carousel" },
      { title: "Checkbox", href: "/docs/checkbox" },
      { title: "Chip", href: "/docs/chip" },
      { title: "Collapsible", href: "/docs/collapsible" },
      { title: "Date Picker", href: "/docs/date-picker" },
      { title: "Dialog", href: "/docs/dialog" },
      { title: "Drawer", href: "/docs/drawer" },
      { title: "Dropdown Menu", href: "/docs/dropdown-menu" },
      { title: "Empty State", href: "/docs/empty-state" },
      { title: "FAB", href: "/docs/fab" },
      { title: "Image", href: "/docs/image" },
      { title: "Input", href: "/docs/input" },
      { title: "Input OTP", href: "/docs/input-otp" },
      { title: "Label", href: "/docs/label" },
      { title: "List", href: "/docs/list" },
      { title: "Popover", href: "/docs/popover" },
      { title: "Progress", href: "/docs/progress" },
      { title: "Radio Group", href: "/docs/radio-group" },
      { title: "Rating", href: "/docs/rating" },
      { title: "Search Bar", href: "/docs/search-bar" },
      { title: "Segmented Control", href: "/docs/segmented-control" },
      { title: "Select", href: "/docs/select" },
      { title: "Separator", href: "/docs/separator" },
      { title: "Skeleton", href: "/docs/skeleton" },
      { title: "Slider", href: "/docs/slider" },
      { title: "Spinner", href: "/docs/spinner" },
      { title: "Stepper", href: "/docs/stepper" },
      { title: "Switch", href: "/docs/switch" },
      { title: "Table", href: "/docs/table" },
      { title: "Tabs", href: "/docs/tabs" },
      { title: "Text", href: "/docs/text" },
      { title: "Textarea", href: "/docs/textarea" },
      { title: "Toast", href: "/docs/toast" },
      { title: "Toggle", href: "/docs/toggle" },
      { title: "Toggle Group", href: "/docs/toggle-group" },
      { title: "Tooltip", href: "/docs/tooltip" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background md:block scrollbar-hidden">
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
