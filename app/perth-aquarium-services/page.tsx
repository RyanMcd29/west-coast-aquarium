import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import PerthServiceMap from "@/components/PerthServiceMapLoader";
import SeoJsonLd from "@/components/SeoJsonLd";
import type { ServiceRegion } from "@/components/PerthServiceMap";
import { buildPageMetadata } from "@/lib/metadata";
import { serviceAreaSeo } from "@/lib/page-seo/service-area";
import { businessInfo, siteUrl } from "@/lib/seo";

const heroImageSrc = "/images/reef-aquarium-white-cabinet.webp";
const heroImageAlt = "Modern reef aquarium in a living space";

export const metadata = buildPageMetadata(serviceAreaSeo);

// Display list for the sidebar cards (original regions)
const displayRegions = [
  {
    id: "inner",
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
    id: "west",
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
    id: "north",
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
    id: "east",
    title: "Eastern Suburbs",
    suburbs: ["Bayswater", "Morley", "Maylands", "Belmont", "Redcliffe"],
  },
  {
    id: "south",
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

// Detailed map polygon for the entire Perth metro service area
const mapRegions: ServiceRegion[] = [
  {
    id: "perth-metro",
    title: "Perth Metro Service Area",
    suburbs: [
      "Two Rocks to Mandurah",
      "Coast to Darling Scarp",
      "All Perth metro suburbs",
    ],
    coordinates: [
      // === WEST COAST - North to South ===
      // Two Rocks
      [-31.495, 115.585],
      [-31.520, 115.600],
      [-31.545, 115.620],
      // Yanchep
      [-31.570, 115.635],
      [-31.595, 115.655],
      [-31.620, 115.670],
      // Alkimos/Clarkson
      [-31.650, 115.690],
      [-31.680, 115.705],
      [-31.710, 115.720],
      // Mindarie/Quinns Rocks
      [-31.735, 115.730],
      [-31.760, 115.738],
      // Hillarys/Sorrento
      [-31.785, 115.742],
      [-31.810, 115.746],
      [-31.835, 115.750],
      // Trigg/Scarborough
      [-31.860, 115.752],
      [-31.885, 115.754],
      // City Beach
      [-31.910, 115.755],
      [-31.935, 115.756],
      // Cottesloe/Swanbourne
      [-31.960, 115.755],
      [-31.985, 115.753],
      // Fremantle
      [-32.010, 115.750],
      [-32.035, 115.748],
      [-32.060, 115.745],
      // South Fremantle/Coogee
      [-32.095, 115.755],
      [-32.130, 115.762],
      // Cockburn/Henderson
      [-32.165, 115.768],
      [-32.200, 115.770],
      // Kwinana
      [-32.235, 115.762],
      [-32.270, 115.750],
      // Rockingham - Point Peron
      [-32.300, 115.738],
      [-32.325, 115.722],
      [-32.345, 115.698],
      [-32.360, 115.680],
      // Shoalwater Bay
      [-32.390, 115.690],
      [-32.420, 115.698],
      // Safety Bay/Warnbro
      [-32.450, 115.710],
      [-32.480, 115.725],
      // Port Kennedy
      [-32.505, 115.738],
      [-32.530, 115.748],
      // Secret Harbour
      [-32.555, 115.755],
      [-32.580, 115.758],
      // Singleton
      [-32.605, 115.756],
      [-32.628, 115.750],
      // Madora Bay/Mandurah
      [-32.650, 115.738],
      [-32.670, 115.722],
      // Halls Head
      [-32.692, 115.705],
      [-32.715, 115.688],
      // Dawesville
      [-32.740, 115.668],
      [-32.762, 115.652],
      // Southern tip
      [-32.780, 115.645],
      [-32.790, 115.655],
      // === SOUTH BOUNDARY - West to East ===
      [-32.790, 115.705],
      [-32.785, 115.755],
      [-32.775, 115.805],
      [-32.760, 115.855],
      // Pinjarra
      [-32.700, 115.900],
      [-32.665, 115.945],
      [-32.625, 115.980],
      // Serpentine/Mundijong
      [-32.580, 116.010],
      [-32.530, 116.035],
      [-32.480, 116.055],
      // Byford
      [-32.425, 116.075],
      [-32.370, 116.092],
      // Armadale foothills
      [-32.310, 116.108],
      [-32.250, 116.122],
      // === EAST BOUNDARY - Darling Scarp - South to North ===
      // Roleystone
      [-32.190, 116.138],
      [-32.130, 116.152],
      [-32.070, 116.165],
      // Kalamunda
      [-32.010, 116.175],
      [-31.950, 116.180],
      [-31.890, 116.178],
      // Mundaring
      [-31.830, 116.170],
      [-31.775, 116.158],
      // Parkerville
      [-31.720, 116.142],
      [-31.670, 116.120],
      // Gidgegannup
      [-31.620, 116.095],
      [-31.575, 116.065],
      // Upper Swan
      [-31.535, 116.030],
      [-31.500, 115.992],
      // Bullsbrook
      [-31.470, 115.950],
      [-31.450, 115.905],
      // === NORTH BOUNDARY - East to West ===
      [-31.440, 115.855],
      [-31.440, 115.805],
      [-31.450, 115.755],
      // Gingin edge
      [-31.465, 115.708],
      [-31.480, 115.662],
      // Back to Two Rocks
      [-31.490, 115.620],
      [-31.495, 115.585],
    ],
    color: "#0891b2",
    fillOpacity: 0.28,
  },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Service area" },
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
      name: "Service area",
      item: `${siteUrl}/perth-aquarium-services`,
    },
  ],
};

export default function PerthAquariumServicesPage() {
  return (
    <div>
      <SeoJsonLd
        data={breadcrumbJsonLd}
        id="service-area-breadcrumbs-jsonld"
      />
      <PageHero
        eyebrow="Service area"
        title="Perth aquarium services across the metro area"
        description="We provide aquarium maintenance, fish tank cleaning, relocation, and installation across Perth metro and surrounds. If you’re outside these suburbs, let us know your location and we’ll confirm travel options."
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Where we work</h2>
            <p className="text-muted">
              Perth metro aquarium servicing with a local aquarium technician
              who confirms travel options by suburb, tank size, and service
              type.
            </p>
            <p className="text-muted">
              {businessInfo.name} focuses on {businessInfo.areaServed}. We
              prioritise responsive scheduling and clear communication. Travel
              is confirmed based on your suburb and service type.
            </p>
            <div className="grid gap-4">
              {displayRegions.map((region) => (
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
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">Perth service map</h3>
                <span className="text-xs text-muted">
                  Full metro coverage shown
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-outline/70 bg-surface">
                <PerthServiceMap regions={mapRegions} />
              </div>
            </div>
            <div className="flat-panel p-6">
              <h3 className="text-lg font-semibold">Service availability</h3>
              <p className="mt-3 text-sm text-muted">
                We book scheduled maintenance, cleaning, relocation, and
                installation visits. Priority support is available for urgent
                issues where possible.
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
                Share your suburb, tank size, and preferred timing, and we’ll
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
