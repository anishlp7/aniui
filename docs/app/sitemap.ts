import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://aniui.dev";

function listSlugs(dir: string): string[] {
  try {
    return readdirSync(dir)
      .filter((name) => {
        if (name.startsWith("(") || name.startsWith("[") || name.startsWith(".")) return false;
        const p = join(dir, name);
        try {
          return statSync(p).isDirectory();
        } catch {
          return false;
        }
      })
      .sort();
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const appDir = join(process.cwd(), "app");

  const docSlugs = listSlugs(join(appDir, "docs"));
  const chartSlugs = listSlugs(join(appDir, "charts", "(pages)"));
  const blockSlugs = listSlugs(join(appDir, "blocks"));

  const docUrls = docSlugs.map((slug) => ({
    url: `${BASE_URL}/docs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const chartUrls = chartSlugs.map((slug) => ({
    url: `${BASE_URL}/charts/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blockUrls = blockSlugs.map((slug) => ({
    url: `${BASE_URL}/blocks/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/create`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/charts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blocks`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...docUrls,
    ...chartUrls,
    ...blockUrls,
    { url: `${BASE_URL}/registry.json`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/llms.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/llms-full.txt`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
  ];
}
