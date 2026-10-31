import type { MetadataRoute } from "next";
import { site } from "@/data/profile";
import { buildDate } from "@/lib/build-info";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
