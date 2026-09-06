"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { homepageFeatured } from "@/lib/showcase-data";
import { ShowcasePreview } from "@/components/preview/showcase-preview";
import { cn } from "@/lib/utils";

export function FeaturedShowcase({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {homepageFeatured.map((item, i) => (
        <motion.div
          key={item.slug}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.06, type: "spring", stiffness: 140, damping: 20 }}
        >
          <Link
            href={`/docs/${item.slug}`}
            className="group block overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="flex min-h-[168px] items-center justify-center bg-[repeating-linear-gradient(45deg,var(--color-secondary)_0,var(--color-secondary)_1px,transparent_0,transparent_50%)] bg-[length:6px_6px] bg-secondary/15 p-6">
              <ShowcasePreview slug={item.slug} />
            </div>
            <div className="border-t border-border p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.displayName}</h3>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{item.group}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.tagline}</p>
              <p className="text-[10px] font-mono text-muted-foreground/70 mt-2">{item.slug}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
