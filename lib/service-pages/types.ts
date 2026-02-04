export type ServicePage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
  serviceType: string;
  whatsIncluded: string[];
  idealFor: string[];
  process: { title: string; detail: string }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};
