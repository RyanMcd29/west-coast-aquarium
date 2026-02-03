import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import { businessInfo, siteUrl } from "@/lib/seo";

const heroImageSrc = "/images/reef-aquarium-white-cabinet.webp";
const heroImageAlt = "Modern reef aquarium in a living space";

const seo = {
  title: "Perth Aquarium Services for Maintenance and Cleaning",
  description:
    "Perth aquarium services across Perth metro, including northern, southern, eastern, and western suburbs. We deliver aquarium maintenance and cleaning near you.",
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
    url: `${siteUrl}/perth-aquarium-services`,
    images: [
      {
        url: heroImageSrc,
        alt: heroImageAlt,
      },
    ],
  },
};

const serviceRegions = [
  {
    title: "Perth CBD & Inner City",
    suburbs: [
      "Perth CBD",
      "West Perth",
      "East Perth",
      "Northbridge",
      "Highgate",
      "Mount Lawley",
      "Leederville",
      "Subiaco",
    ],
  },
  {
    title: "Western Suburbs",
    suburbs: [
      "Cottesloe",
      "Claremont",
      "Mosman Park",
      "Nedlands",
      "Dalkeith",
      "Floreat",
      "Scarborough",
    ],
  },
  {
    title: "Northern Suburbs",
    suburbs: [
      "Joondalup",
      "Hillarys",
      "Karrinyup",
      "Innaloo",
      "Osborne Park",
      "Balcatta",
      "Madeley",
    ],
  },
  {
    title: "Eastern Suburbs",
    suburbs: ["Bayswater", "Morley", "Maylands", "Belmont", "Redcliffe"],
  },
  {
    title: "Southern Suburbs",
    suburbs: [
      "South Perth",
      "Como",
      "Victoria Park",
      "Applecross",
      "Cannington",
      "Willetton",
      "Cockburn",
      "Fremantle",
    ],
  },
];

export default function PerthAquariumServicesPage() {
  return (
    <div>
      <MetaTag title={seo.title} description={seo.description} />
      <PageHero
        eyebrow="Service area"
        title={seo.title}
        description={seo.description}
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Where we work</h2>
            <p className="text-muted">
              {businessInfo.name} focuses on Perth metro and nearby northern,
              southern, eastern, and western suburbs. We prioritise responsive
              scheduling and clear communication. Travel is confirmed based on
              your suburb and service type.
            </p>
            <div className="grid gap-4">
              {serviceRegions.map((region) => (
                <div key={region.title} className="flat-panel p-5">
                  <h3 className="text-lg font-semibold">{region.title}</h3>
                  <p className="mt-3 text-sm text-muted">
                    {region.suburbs.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Service availability</h3>
              <p className="mt-3 text-sm text-muted">
                We book scheduled aquarium maintenance Perth WA visits, cleaning,
                relocation, and installation work. Priority support is available
                for urgent issues where possible.
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
                  Call us
                </a>
              </div>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Not sure about coverage?</h3>
              <p className="mt-3 text-sm text-muted">
                If you are searching for fish tank cleaning near me in Perth,
                share your suburb, tank size, and preferred timing, and we’ll
                confirm availability and next steps.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                Ask about travel options
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
