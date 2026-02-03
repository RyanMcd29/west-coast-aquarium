import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/perth-aquarium-services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...servicePages.map((page) => ({
      url: `${siteUrl}/services/${page.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/bookings`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
