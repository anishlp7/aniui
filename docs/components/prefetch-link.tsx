"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Survives route changes so a link is only ever warmed once per page load.
const warmed = new Set<string>();

type PrefetchLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href" | "prefetch"
> & {
  href: string;
};

/**
 * next/link prefetches every link that scrolls into the viewport, and because
 * every docs route is statically generated that means a *full* RSC payload per
 * link. The sidebar alone holds 133 links, so one scroll can burn 133 Vercel
 * edge requests. This warms on intent instead, which keeps navigation instant
 * while only paying for routes the user actually aims at.
 */
export function PrefetchLink({
  href,
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();

  function warm() {
    if (warmed.has(href)) return;
    warmed.add(href);
    router.prefetch(href);
  }

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={(e) => {
        warm();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
      {...props}
    />
  );
}
