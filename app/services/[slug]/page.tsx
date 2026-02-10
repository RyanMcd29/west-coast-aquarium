import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { siteUrl } from "@/lib/seo";
import {
  buildServiceJsonLd,
  getServicePage,
  servicePages,
} from "@/lib/service-pages";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

const iconClassName = "h-5 w-5";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5.5 10.5V20h13V10.5" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  );
}

function ReefIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v7" />
      <path d="M8 7l4 4 4-4" />
      <path d="M6 15c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0" />
      <path d="M6 19c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 6.5a4 4 0 0 0-5 5l-5.5 5.5a2.1 2.1 0 1 0 3 3L12 15.5a4 4 0 0 0 5-5l-2.2 2.2-2.3-2.3Z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 2.5 19a1.6 1.6 0 0 0 1.4 2.4h16.2a1.6 1.6 0 0 0 1.4-2.4Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3s6 6.7 6 11a6 6 0 0 1-12 0c0-4.3 6-11 6-11Z" />
    </svg>
  );
}

function MoveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v16" />
      <path d="m8 8 4-4 4 4" />
      <path d="m8 16 4 4 4-4" />
      <path d="M4 12h16" />
      <path d="m16 8 4 4-4 4" />
      <path d="m8 8-4 4 4 4" />
    </svg>
  );
}

function getIdealForIcon(label: string) {
  const text = label.toLowerCase();

  if (
    text.includes("emergency") ||
    text.includes("urgent") ||
    text.includes("failure") ||
    text.includes("instability") ||
    text.includes("stress")
  ) {
    return <AlertIcon />;
  }

  if (
    text.includes("move") ||
    text.includes("relocation") ||
    text.includes("refurb")
  ) {
    return <MoveIcon />;
  }

  if (
    text.includes("equipment") ||
    text.includes("pump") ||
    text.includes("filtration") ||
    text.includes("dosing") ||
    text.includes("automation") ||
    text.includes("upgrade")
  ) {
    return <WrenchIcon />;
  }

  if (
    text.includes("reef") ||
    text.includes("coral") ||
    text.includes("marine") ||
    text.includes("saltwater") ||
    text.includes("sps")
  ) {
    return <ReefIcon />;
  }

  if (
    text.includes("office") ||
    text.includes("commercial") ||
    text.includes("business") ||
    text.includes("hotel") ||
    text.includes("restaurant") ||
    text.includes("cafe") ||
    text.includes("reception") ||
    text.includes("retail") ||
    text.includes("medical") ||
    text.includes("wellness") ||
    text.includes("display")
  ) {
    return <BuildingIcon />;
  }

  if (text.includes("home") || text.includes("house") || text.includes("owner")) {
    return <HomeIcon />;
  }

  if (
    text.includes("algae") ||
    text.includes("cloudy") ||
    text.includes("clean") ||
    text.includes("refresh")
  ) {
    return <DropletIcon />;
  }

  return <DropletIcon />;
}

function IdealForIcon({ label }: { label: string }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-primary">
      {getIdealForIcon(label)}
    </span>
  );
}

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
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: page.title },
  ];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.title,
        item: `${siteUrl}/services/${page.slug}`,
      },
    ],
  };

  return (
    <div>
      <SeoJsonLd data={serviceJsonLd} id={`service-jsonld-${page.slug}`} />
      <SeoJsonLd data={faqJsonLd} id={`service-faq-jsonld-${page.slug}`} />
      <SeoJsonLd
        data={breadcrumbJsonLd}
        id={`service-breadcrumbs-jsonld-${page.slug}`}
      />
      <PageHero
        title={page.hero.title}
        description={page.hero.description}
        imageSrc={page.hero.imageSrc}
        imageAlt={page.hero.imageAlt}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <section className="py-14 lg:py-16">
        <Container className="space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">What’s included</h2>
              <ul className="grid auto-rows-fr gap-4 text-sm text-muted sm:grid-cols-2">
                {page.whatsIncluded.map((item) => (
                  <li
                    key={item}
                    className="flat-panel flex h-full items-center gap-3 rounded-2xl p-4"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold">Ideal for</h3>
              <div className="grid gap-4">
                {page.idealFor.map((item) => (
                  <div
                    key={item}
                    className="flat-panel flex items-center gap-4 rounded-2xl p-4"
                  >
                    <IdealForIcon label={item} />
                    <p className="text-sm font-semibold text-foreground">
                      {item}
                    </p>
                  </div>
                ))}
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
            <p className="max-w-2xl leading-relaxed text-muted">
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
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">What we strive for</h2>
              <ul className="space-y-3 text-sm text-muted">
                {page.outcomes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
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
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Tell us about your tank size, livestock, and goals. We’ll share
                next steps and a tailored service plan.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/bookings"
                  className="ocean-gradient inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110 sm:w-auto"
                >
                  Request a consultation
                </Link>
                <a
                  href="tel:0466961437"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-outline/80 bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:w-auto"
                >
                  Call now
                </a>
              </div>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Service coverage</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
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
