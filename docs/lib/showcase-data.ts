/**
 * Friendly display names for docs + homepage.
 * CLI slugs stay stable — only labels change for clarity.
 */
export type ShowcaseEntry = {
  slug: string;
  displayName: string;
  tagline: string;
  group: "carousels" | "motion" | "pieces" | "skia" | "navigation" | "loaders";
  hasWebPreview: boolean;
};

export const showcaseCatalog: ShowcaseEntry[] = [
  { slug: "carousel-3d", displayName: "3D Carousel", tagline: "Pan a cylindrical card stack in 3D.", group: "carousels", hasWebPreview: true },
  { slug: "carousel-parallax", displayName: "Parallax Carousel", tagline: "Scale and fade as slides scroll.", group: "carousels", hasWebPreview: true },
  { slug: "carousel-circular", displayName: "Orbit Carousel", tagline: "Rotate items around a circular ring.", group: "carousels", hasWebPreview: true },
  { slug: "carousel-scale", displayName: "Scale Carousel", tagline: "Focus scaling as slides move.", group: "carousels", hasWebPreview: true },
  { slug: "carousel-tilt", displayName: "Tilt Carousel", tagline: "Perspective tilt between slides.", group: "carousels", hasWebPreview: true },
  { slug: "shimmer", displayName: "Shimmer", tagline: "Loading placeholder with a light sweep.", group: "loaders", hasWebPreview: true },
  { slug: "loader", displayName: "Loader", tagline: "Circle, dots, and arc spinners.", group: "loaders", hasWebPreview: true },
  { slug: "morph-loader", displayName: "Morph Loader", tagline: "Skia blob morphing loader.", group: "loaders", hasWebPreview: true },
  { slug: "flip-card", displayName: "Flip Card", tagline: "Tap to flip between two faces.", group: "motion", hasWebPreview: true },
  { slug: "marquee", displayName: "Marquee", tagline: "Infinite scrolling text strip.", group: "motion", hasWebPreview: true },
  { slug: "disclosure-group", displayName: "Disclosure Group", tagline: "Expand/collapse stacked sections.", group: "motion", hasWebPreview: true },
  { slug: "rolling-counter", displayName: "Number Counter", tagline: "Odometer-style rolling digits.", group: "motion", hasWebPreview: true },
  { slug: "event-ticket", displayName: "Event Ticket", tagline: "Perforated ticket for events and passes.", group: "pieces", hasWebPreview: true },
  { slug: "receipt-card", displayName: "Receipt Card", tagline: "Tear-off receipt with line items.", group: "pieces", hasWebPreview: true },
  { slug: "coupon", displayName: "Coupon", tagline: "Promo coupon with dashed perforation.", group: "pieces", hasWebPreview: true },
  { slug: "polaroid", displayName: "Polaroid", tagline: "Tilted instant-photo frame.", group: "pieces", hasWebPreview: true },
  { slug: "profile-card", displayName: "Profile Card", tagline: "Avatar, role, and bio in one card.", group: "pieces", hasWebPreview: true },
  { slug: "photo-stack", displayName: "Photo Stack", tagline: "Layered photos with rotation.", group: "pieces", hasWebPreview: true },
  { slug: "book-page", displayName: "Book Page", tagline: "Styled page with spine and chapter.", group: "pieces", hasWebPreview: true },
  { slug: "barcode-badge", displayName: "Barcode Badge", tagline: "Order barcode with label.", group: "pieces", hasWebPreview: true },
  { slug: "social-button", displayName: "Social Button", tagline: "OAuth-style sign-in button.", group: "pieces", hasWebPreview: true },
  { slug: "verified-badge", displayName: "Verified Badge", tagline: "Compact verified pill.", group: "pieces", hasWebPreview: true },
  { slug: "qr-code", displayName: "QR Code", tagline: "Tap to reveal a real, scannable QR code.", group: "pieces", hasWebPreview: true },
  { slug: "border-beam", displayName: "Border Beam", tagline: "Animated light tracing the border.", group: "skia", hasWebPreview: true },
  { slug: "radiant-button", displayName: "Glow Button", tagline: "CTA with a pulsing radial glow.", group: "skia", hasWebPreview: true },
  { slug: "gooey-switch", displayName: "Blob Switch", tagline: "Gooey toggle with a spring thumb.", group: "skia", hasWebPreview: true },
  { slug: "verified-shine", displayName: "Verified Shine", tagline: "Verified badge with shine sweep.", group: "skia", hasWebPreview: true },
  { slug: "morphing-tabbar", displayName: "Animated Tabs", tagline: "Tab bar with a morphing pill.", group: "navigation", hasWebPreview: true },
  { slug: "curved-bottom-tabs", displayName: "Curved Tabs", tagline: "Bottom tabs with curved bar.", group: "navigation", hasWebPreview: true },
  { slug: "mobile-dock", displayName: "App Dock", tagline: "Fisheye dock that magnifies under your finger.", group: "navigation", hasWebPreview: true },
  { slug: "fan-menu", displayName: "Fan Menu", tagline: "Radial fan of action buttons.", group: "navigation", hasWebPreview: true },
];

/** Top picks for the homepage hero showcase grid */
export const homepageFeatured = showcaseCatalog.filter((e) => e.hasWebPreview).slice(0, 6);

export function getShowcaseEntry(slug: string): ShowcaseEntry | undefined {
  return showcaseCatalog.find((e) => e.slug === slug);
}

export function getDisplayName(slug: string, fallback: string): string {
  return getShowcaseEntry(slug)?.displayName ?? fallback;
}
