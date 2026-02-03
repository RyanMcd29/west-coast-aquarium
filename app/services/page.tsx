import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { withBasePath } from "@/lib/paths";
import { faqJsonLd, servicesJsonLd, siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const heroImageSrc = "/images/reef-aquarium-white-cabinet.webp";
const heroImageAlt = "Modern reef aquarium installation with lighting";

const seo = {
  title: "Aquarium Services Perth for Maintenance and Cleaning",
  description:
    "Aquarium services Perth for maintenance, aquarium cleaning, and fish tank service. From water changes to filter care, we support Perth homes and businesses.",
};

const MetaTag = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div hidden>
    <p>{title}</p>
    <p>{description}</p>
  </div>
);

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: `${siteUrl}/services`,
    images: [
      {
        url: heroImageSrc,
        alt: heroImageAlt,
      },
    ],
  },
};

const serviceCards = servicePages.map((service) => ({
  title: service.title,
  detail: service.summary,
  href: `/services/${service.slug}`,
}));

const inclusions = [
  "Aquarium maintenance service Perth checklist tailored to your tank",
  "Safe handling of livestock and coral during any service work",
  "Aquarium water change service Perth with stable parameter logs",
  "Aquarium filter cleaning Perth with glass and pump care for biofilms",
  "Aquarium water testing service Perth with clear notes on trends",
];

const idealFor = [
  "Busy professionals who want a consistent fish tank maintenance schedule",
  "Hospitality venues and offices that need a spotless display",
  "Reef keepers who value steady parameters and reef health",
  "New tank owners looking for a confident setup process",
];

export default function ServicesPage() {
  return (
    <div>
      <MetaTag title={seo.title} description={seo.description} />
      <SeoJsonLd data={servicesJsonLd} id="services-jsonld" />
      <SeoJsonLd data={faqJsonLd} id="faq-jsonld" />
      <PageHero
        eyebrow="Services"
        title={seo.title}
        description={seo.description}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Core service areas</h2>
            <ul className="space-y-3 text-sm text-muted">
              {serviceCards.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="transition hover:text-foreground"
                  >
                    <span className="font-semibold text-foreground">
                      {service.title}
                    </span>
                    <span className="text-muted"> — {service.detail}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">What’s included</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {inclusions.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Ideal for</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {idealFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-elevated py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative h-72 overflow-hidden">
            <Image
              src={withBasePath("/images/reef-aquarium-sump-cabinet.webp")}
              alt="Aquarium filtration cabinet and sump equipment"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold">
              Maintenance built around your schedule
            </h2>
            <p className="text-muted">
              We provide flexible service windows across Perth metro, with clear
              communication and follow-up notes so you always know what was done
              and what to expect next. Ask about aquarium maintenance packages
              Perth clients use for fortnightly cleans or seasonal refreshes.
            </p>
            <Link
              href="/bookings"
              className="ocean-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
            >
              Request a consultation
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              FAQs
            </p>
            <h2 className="text-3xl font-semibold">Common questions</h2>
          </div>
          <div className="grid gap-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name} className="flat-panel p-5">
                <p className="text-sm font-semibold text-foreground">
                  {faq.name}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
