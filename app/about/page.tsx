import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { withBasePath } from "@/lib/paths";
import { siteUrl } from "@/lib/seo";

const heroImageSrc = "/images/living-room-reef-aquarium.webp";
const heroImageAlt = "Living room reef aquarium installation";

const seo = {
  title: "About Our Perth Aquarium Maintenance Company",
  description:
    "Meet Mario at our Perth aquarium maintenance company, providing aquarium cleaning, fish tank maintenance, and friendly service for homes and businesses.",
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
    url: `${siteUrl}/about`,
    images: [
      {
        url: heroImageSrc,
        alt: heroImageAlt,
      },
    ],
  },
};

const values = [
  {
    title: "Precision & care",
    detail:
      "Every service is handled with patience and respect for the ecosystem, from livestock safety to equipment calibration.",
  },
  {
    title: "Consistency",
    detail:
      "Routine maintenance and parameter logging help prevent issues before they affect your tank’s health.",
  },
  {
    title: "Clear communication",
    detail:
      "You’ll always know what was done, what the system needs next, and how to keep things stable between visits.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <MetaTag title={seo.title} description={seo.description} />
      <PageHero
        eyebrow="About"
        title={seo.title}
        description={seo.description}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">A technician you can trust</h2>
            <p className="text-muted">
              Mario brings a detail-first mindset to aquarium maintenance Perth
              clients rely on, with careful fish tank cleaning and safe
              equipment integration. Whether it’s a bespoke reef display or a
              compact freshwater system, he tailors the approach to the
              livestock, environment, and goals of the client.
            </p>
            <p className="text-muted">
              The goal is simple: a thriving aquarium that looks beautiful and
              runs reliably, backed by aquarium service Perth owners can count
              on. That means consistent maintenance, careful monitoring, and the
              right equipment tuned to your specific setup.
            </p>
          </div>
          <div className="relative h-72 overflow-hidden">
            <Image
              src={withBasePath("/images/reef-aquarium-black-cabinet.webp")}
              alt="Reef aquarium with clean cabinetry and lighting"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface-elevated py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="flat-panel p-6"
            >
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm text-muted">{value.detail}</p>
            </div>
          ))}
        </Container>
      </section>
    </div>
  );
}
