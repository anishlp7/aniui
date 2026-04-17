import type { MetadataRoute } from "next";

const BASE_URL = "https://aniui.dev";

const componentPages = [
  "accordion", "action-sheet", "alert", "alert-dialog", "animate", "avatar", "badge",
  "banner", "bottom-sheet", "button", "calendar", "card", "carousel",
  "chat-bubble", "checkbox", "chip", "collapsible", "combobox", "command-menu",
  "connection-banner", "context-menu", "data-table", "date-picker", "dialog", "direction-provider", "drawer",
  "dropdown-menu", "empty-state", "fab", "field", "file-picker", "form", "grid",
  "header", "hover-card", "image", "image-gallery", "infinite-list", "input", "input-group", "input-otp",
  "kbd", "label", "labeled-separator", "list", "masked-input", "number-input",
  "pagination", "password-input", "phone-input", "popover", "price",
  "progress", "progress-steps", "radio-group", "rating", "refresh-control",
  "safe-area", "search-bar", "segmented-control", "select", "separator",
  "skeleton", "slider", "spinner", "stat-card", "status-indicator",
  "stepper", "swipeable-list-item", "switch", "tab-bar", "table", "tabs",
  "text", "textarea", "theme-provider", "timeline", "toast", "toggle",
  "toggle-group", "tooltip", "typing-indicator",
];

const guidePages = [
  "installation", "components", "theming", "dark-mode", "rtl", "compatibility",
  "cli", "mcp", "javascript", "android", "changelog", "uniwind",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/create`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...guidePages.map((slug) => ({
      url: `${BASE_URL}/docs/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...componentPages.map((slug) => ({
      url: `${BASE_URL}/docs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
