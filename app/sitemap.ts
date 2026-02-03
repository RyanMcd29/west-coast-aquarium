import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
    "monthly";
  const serviceEntries = servicePages.map<MetadataRoute.Sitemap[number]>(
    (page) => ({
      url: `${siteUrl}/services/${page.slug}`,
      lastModified,
      changeFrequency,
      priority: 0.7,
    })
  );

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency,
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified,
      changeFrequency,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/perth-aquarium-services`,
      lastModified,
      changeFrequency,
      priority: 0.8,
    },
    ...serviceEntries,
    {
      url: `${siteUrl}/bookings`,
      lastModified,
      changeFrequency,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency,
      priority: 0.7,
    },
  ];
}
