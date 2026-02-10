import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { aboutSeo } from "@/lib/page-seo/about";
import { withBasePath } from "@/lib/paths";
import { siteUrl } from "@/lib/seo";

const heroImageSrc = "/images/living-room-reef-aquarium.webp";
const heroImageAlt = "Living room reef aquarium installation";

export const metadata = buildPageMetadata(aboutSeo);

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
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "About" },
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
      name: "About",
      item: `${siteUrl}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <div>
      <SeoJsonLd data={breadcrumbJsonLd} id="about-breadcrumbs-jsonld" />
      <PageHero
        title="Hands-on aquarium care with a calm, professional approach."
        description="West Coast Aquarium Services is led by Mario, a Perth-based aquarium technician who specialises in the safe installation, maintenance, and optimisation of marine and freshwater systems."
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">A technician you can trust</h2>
            <p className="leading-relaxed text-muted">
              Mario brings a detail-first mindset to every tank, with a focus on
              stable parameters, clean presentation, and safe equipment
              integration. Whether it’s a bespoke reef display or a compact
              freshwater system, he tailors the approach to the livestock,
              environment, and goals of the client.
            </p>
            <p className="leading-relaxed text-muted">
              The goal is simple: a thriving aquarium that looks beautiful and
              runs reliably. That means consistent maintenance, careful
              monitoring, and the right equipment tuned to your specific setup.
            </p>
          </div>
          <div className="relative h-72 overflow-hidden rounded-3xl border border-outline/70 shadow-lg shadow-primary/10 md:h-80">
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
