import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import HighlightedServices from "@/components/services/HighlightedServices";
import { buildPageMetadata } from "@/lib/metadata";
import { servicesSeo } from "@/lib/page-seo/services";
import { withBasePath } from "@/lib/paths";
import { businessInfo, faqJsonLd, siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

const heroImageSrc = "/images/reef-aquarium-white-cabinet.webp";
const heroImageAlt = "Modern reef aquarium installation with lighting";

export const metadata = buildPageMetadata(servicesSeo);

const serviceCards = servicePages.map((service) => ({
  title: service.title,
  detail: service.summary,
  href: `/services/${service.slug}`,
}));

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: servicePages.map((service) => ({
    "@type": "Service",
    name: service.seoTitle,
    areaServed: businessInfo.areaServed,
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      url: siteUrl,
      telephone: businessInfo.telephone,
    },
    url: `${siteUrl}/services/${service.slug}`,
  })),
};

const inclusions = [
  "Aquarium water testing and parameter logging with clear notes",
  "Algae control, glass cleaning, and presentation checks",
  "Filter, pump, and sump cleaning with care for biofilms",
  "Safe handling of livestock and coral during any service work",
  "Recommendations on stocking, feeding, and equipment tuning",
];

const idealFor = [
  "Busy professionals who want consistent aquarium servicing",
  "Hospitality venues and offices that need fish tank cleaning",
  "Reef keepers who value stable parameters and coral health",
  "New tank owners looking for a confident setup process",
];

const maintenancePlans = [
  {
    title: "Weekly maintenance",
    description:
      "Ideal for high-visibility displays, heavy stocking, and reef systems that need close monitoring.",
  },
  {
    title: "Fortnightly maintenance",
    description:
      "A balanced schedule for aquarium maintenance, water testing, and algae control.",
  },
  {
    title: "Monthly maintenance",
    description:
      "Seasonal servicing for stable systems with lighter stocking and consistent parameters.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <SeoJsonLd data={servicesJsonLd} id="services-jsonld" />
      <SeoJsonLd data={faqJsonLd} id="faq-jsonld" />
      <PageHero
        eyebrow="Services"
        title="Aquarium support that keeps your system stable and stunning."
        description="Every service is tailored to your tank, livestock, and lifestyle. From new installations to ongoing care, we deliver Perth aquarium maintenance, fish tank cleaning, reef support, and commercial display care across the metro."
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />

      <HighlightedServices showCta={false} />

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
        <Container className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              Maintenance plans
            </p>
            <h2 className="text-3xl font-semibold">
              Aquarium maintenance built around your schedule
            </h2>
            <p className="max-w-2xl text-muted">
              Weekly, fortnightly, or monthly plans help keep parameters stable,
              presentation sharp, and your aquarium running smoothly.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div key={plan.title} className="flat-panel p-5">
                <p className="text-sm font-semibold text-foreground">
                  {plan.title}
                </p>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
              </div>
            ))}
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
              and what to expect next. Whether you need weekly aquarium
              maintenance, a fortnightly clean, or a seasonal refresh, we keep
              your system thriving.
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
