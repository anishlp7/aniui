/**
 * Shared component taxonomy — docs navigation + CLI metadata.
 * Groups parent/child relationships (e.g. Carousels → Carousel 3D).
 */

export type TaxonomyItem = { slug: string; title: string; status?: "stable" | "beta" | "planned" };
export type TaxonomyGroup = { title: string; items: TaxonomyItem[] };
export type TaxonomySection = { title: string; groups: TaxonomyGroup[] };

/** Motion & effects inspired by community patterns — AniUI originals, not ports. */
export const motionTaxonomy: TaxonomySection = {
  title: "Motion & Effects",
  groups: [
    {
      title: "Carousels",
      items: [
        { slug: "carousel", title: "Carousel", status: "stable" },
        { slug: "carousel-3d", title: "Carousel 3D", status: "stable" },
        { slug: "carousel-parallax", title: "Carousel Parallax", status: "stable" },
        { slug: "carousel-circular", title: "Carousel Circular", status: "stable" },
        { slug: "carousel-scale", title: "Carousel Scale", status: "stable" },
        { slug: "carousel-tilt", title: "Carousel Tilt", status: "stable" },
        { slug: "vertical-flow-carousel", title: "Vertical Flow Carousel", status: "stable" },
        { slug: "vertical-page-carousel", title: "Vertical Page Carousel", status: "stable" },
      ],
    },
    {
      title: "Loaders",
      items: [
        { slug: "skeleton", title: "Skeleton", status: "stable" },
        { slug: "spinner", title: "Spinner", status: "stable" },
        { slug: "shimmer", title: "Shimmer", status: "stable" },
        { slug: "loader", title: "Loader", status: "stable" },
      ],
    },
    {
      title: "Micro-interactions",
      items: [
        { slug: "flip-card", title: "Flip Card", status: "stable" },
        { slug: "marquee", title: "Marquee", status: "stable" },
        { slug: "expandable-view", title: "Expandable View", status: "planned" },
      ],
    },
    {
      title: "Navigation Chrome",
      items: [
        { slug: "curved-bottom-tabs", title: "Curved Bottom Tabs", status: "stable" },
        { slug: "morphing-tabbar", title: "Morphing Tab Bar", status: "stable" },
        { slug: "mobile-dock", title: "Mobile Dock", status: "stable" },
        { slug: "fan-menu", title: "Fan Menu", status: "stable" },
      ],
    },
  ],
};

export const piecesTaxonomy: TaxonomySection = {
  title: "UI Pieces",
  groups: [
    {
      title: "Cards & Tickets",
      items: [
        { slug: "event-ticket", title: "Event Ticket", status: "stable" },
        { slug: "receipt-card", title: "Receipt Card", status: "stable" },
        { slug: "coupon", title: "Coupon", status: "stable" },
        { slug: "polaroid", title: "Polaroid", status: "stable" },
        { slug: "profile-card", title: "Profile Card", status: "stable" },
        { slug: "photo-stack", title: "Photo Stack", status: "stable" },
        { slug: "book-page", title: "Book Page", status: "stable" },
      ],
    },
    {
      title: "Identity & Social",
      items: [
        { slug: "barcode-badge", title: "Barcode Badge", status: "stable" },
        { slug: "social-button", title: "Social Button", status: "stable" },
        { slug: "verified-badge", title: "Verified Badge", status: "stable" },
        { slug: "qr-code", title: "QR Code", status: "stable" },
        { slug: "rolling-counter", title: "Rolling Counter", status: "stable" },
      ],
    },
  ],
};

export function taxonomyToNavItems(section: TaxonomySection, hrefPrefix = "/docs") {
  return section.groups.flatMap((g) =>
    g.items
      .filter((i) => i.status !== "planned")
      .map((i) => ({ title: i.title, href: `${hrefPrefix}/${i.slug}`, group: g.title }))
  );
}

export function countPlannedComponents() {
  const all = [...motionTaxonomy.groups, ...piecesTaxonomy.groups].flatMap((g) => g.items);
  return {
    stable: all.filter((i) => i.status === "stable").length,
    planned: all.filter((i) => i.status === "planned").length,
    total: all.length,
  };
}
