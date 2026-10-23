import type { MetadataRoute } from "next";
import { stories, studio } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = studio.url;
  const routes = ["", "/about"].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const storyRoutes = stories.map((s) => ({
    url: `${base}/stories/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...routes, ...storyRoutes];
}
