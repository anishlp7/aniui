/**
 * Single source of truth for site-wide metadata.
 * Update these values here — they propagate to all pages, meta tags, and content.
 */

export const SITE = {
  name: "AniUI",
  tagline: "Beautiful React Native components. Copy. Paste. Ship.",
  url: "https://aniui.dev",
  github: "https://github.com/anishlp7/aniui",
  npm: "https://www.npmjs.com/package/@aniui/cli",
  twitter: "@anishlp7",
  author: "Anish",
} as const;

/** Total component count — derived from cli/src/registry.ts */
export const COMPONENT_COUNT = 89;

export const DESCRIPTIONS = {
  site: `shadcn/ui for React Native. ${COMPONENT_COUNT} accessible components built with NativeWind, rn-primitives, and TypeScript. Copy. Paste. Ship.`,
  docs: `Browse ${COMPONENT_COUNT} React Native components. Button, Card, Dialog, Select, Toast, Data Table, Command Menu, and more. Built with NativeWind and rn-primitives.`,
  og: `shadcn/ui for React Native. ${COMPONENT_COUNT} accessible components. Copy. Paste. Ship.`,
} as const;
