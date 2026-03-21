"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarSections } from "@/lib/nav-data";
import { useTheme } from "./theme-provider";

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <aside className="fixed top-14 left-0 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background md:block scrollbar-hidden">
      <div className="flex min-h-full flex-col">
        <nav className="space-y-6 p-6 pb-4" style={{ marginBottom: "80px" }}>
          {sidebarSections.map((section) => (
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

      </div>
    </aside>
  );
}
