import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: {
    src: string;
    alt: string;
  };
};

export function buildPageMetadata(seo: PageSeo): Metadata {
  const url = `${siteUrl}${seo.path}`;
  const images = seo.image
    ? [
        {
          url: seo.image.src,
          alt: seo.image.alt,
        },
      ]
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: images?.map((image) => image.url),
    },
  };
}
