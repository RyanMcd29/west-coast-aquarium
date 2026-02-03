import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { businessInfo, siteUrl } from "@/lib/seo";
import {
  buildServiceJsonLd,
  getServicePage,
  servicePages,
} from "@/lib/service-pages";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type MetaTagProps = {
  title: string;
  description: string;
};

const MetaTag = ({ title, description }: MetaTagProps) => (
  <div hidden>
    <p>{title}</p>
    <p>{description}</p>
  </div>
);

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `${siteUrl}/services/${page.slug}`,
      images: [
        {
          url: page.hero.imageSrc,
          alt: page.hero.imageAlt,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  const seo = {
    title: page.seoTitle,
    description: page.metaDescription,
  };

  const serviceJsonLd = buildServiceJsonLd(page);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <MetaTag title={seo.title} description={seo.description} />
      <SeoJsonLd data={serviceJsonLd} id={`service-jsonld-${page.slug}`} />
      <SeoJsonLd data={faqJsonLd} id={`service-faq-jsonld-${page.slug}`} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        imageSrc={page.hero.imageSrc}
        imageAlt={page.hero.imageAlt}
      />

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">What’s included</h2>
            <ul className="space-y-3 text-sm text-muted">
              {page.whatsIncluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Ideal for</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {page.idealFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Service area</h3>
              <p className="mt-3 text-sm text-muted">
                {businessInfo.areaServed}. We can confirm travel options for
                outer suburbs.
              </p>
              <Link
                href="/perth-aquarium-services"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                View suburbs and service coverage
              </Link>
              <div className="flat-panel-elevated mt-5 px-4 py-3 text-sm text-muted">
                <p className="font-semibold text-foreground">Response time</p>
                <p className="mt-1">We typically reply within 1–2 business days.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-elevated py-16">
        <Container className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              How it works
            </p>
            <h2 className="text-3xl font-semibold">A calm, proven process</h2>
            <p className="text-muted">
              Every visit follows a structured workflow that prioritises
              livestock safety, clean presentation, and stable parameters.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {page.process.map((step) => (
              <div key={step.title} className="flat-panel p-4">
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="mt-2 text-xs text-muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Typical outcomes</h2>
              <ul className="space-y-3 text-sm text-muted">
                {page.outcomes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">FAQs</h3>
              <div className="grid gap-4">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="flat-panel p-5">
                    <p className="text-sm font-semibold text-foreground">
                      {faq.question}
                    </p>
                    <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">
                Ready to schedule {page.title.toLowerCase()}?
              </h3>
              <p className="mt-3 text-sm text-muted">
                Tell us about your tank size, livestock, and goals. We’ll share
                next steps and a tailored service plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/bookings"
                  className="ocean-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Request a consultation
                </Link>
                <a
                  href="tel:0466961437"
                  className="inline-flex items-center justify-center rounded-full border border-outline/80 bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  Call now
                </a>
              </div>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Service coverage</h3>
              <p className="mt-3 text-sm text-muted">
                Based in Perth, supporting homes and businesses across the
                metro area. Flexible scheduling for commercial sites.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                Ask about availability
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
