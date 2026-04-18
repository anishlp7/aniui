"use client";

import React from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface HeadingProps {
  as?: "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

export function Heading({ as: Tag = "h2", className, children }: HeadingProps) {
  const text = typeof children === "string" ? children : "";
  const id = slugify(text);

  return (
    <Tag id={id} className={`group scroll-mt-20 ${className ?? ""}`}>
      <a href={`#${id}`} className="no-underline text-inherit hover:text-inherit">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity">#</span>
      </a>
    </Tag>
  );
}
