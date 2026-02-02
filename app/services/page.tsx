import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqJsonLd, servicesJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aquarium Services",
  description:
    "Aquarium installations, relocations, maintenance, parameter logging, and equipment setup for Perth metro homes and businesses.",
};

const services = [
  {
    title: "Tank installations & relocations",
    detail:
      "Design, delivery, and setup for new aquariums plus safe relocation of existing systems, including livestock handling and re-balancing.",
  },
  {
    title: "Routine maintenance & cleaning",
    detail:
      "Scheduled cleans, algae management, water changes, and equipment checks to keep your system stable and presentation-ready.",
  },
  {
    title: "Parameter logging",
    detail:
      "Consistent testing and logging of critical parameters with guidance on any adjustments needed between visits.",
  },
  {
    title: "Equipment installation",
    detail:
      "Lighting, pumps, filtration, dosing, and automation upgrades installed and calibrated to suit your tank.",
  },
];

const inclusions = [
  "System assessment and maintenance checklist tailored to your tank",
  "Safe handling of livestock and coral during any service work",
  "Cleaning of glass, pumps, and filters with care for biofilms",
  "Water testing with clear notes on stability and trends",
  "Recommendations on stocking, feeding, and equipment tuning",
];

const idealFor = [
  "Busy professionals who want a consistent care schedule",
  "Hospitality venues and offices that need a spotless display",
  "Reef keepers who value steady parameters and reef health",
  "New tank owners looking for a confident setup process",
];

export default function ServicesPage() {
  return (
    <div>
      <SeoJsonLd data={servicesJsonLd} id="services-jsonld" />
      <SeoJsonLd data={faqJsonLd} id="faq-jsonld" />
      <PageHero
        eyebrow="Services"
        title="Aquarium support that keeps your system stable and stunning."
        description="Every service is tailored to your tank, livestock, and lifestyle. From new installations to ongoing care, we bring calm, professional expertise to aquariums across Perth metro."
        imageSrc="/images/reef-aquarium-white-cabinet.webp"
        imageAlt="Modern reef aquarium installation with lighting"
      />

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Core service areas</h2>
            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flat-panel p-5"
                >
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted">{service.detail}</p>
                </div>
              ))}
            </div>
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
              src="/images/reef-aquarium-sump-cabinet.webp"
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
              and what to expect next. Whether you need a fortnightly clean or a
              seasonal refresh, we keep your system thriving.
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
    </div>
  );
}
