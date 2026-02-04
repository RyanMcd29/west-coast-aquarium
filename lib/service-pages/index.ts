import { businessInfo, siteUrl } from "@/lib/seo";
import aquariumCleaningPage from "./aquarium-cleaning";
import aquariumEquipmentFiltrationPage from "./aquarium-equipment-filtration";
import aquariumInstallationPage from "./aquarium-installation";
import aquariumMaintenancePage from "./aquarium-maintenance";
import aquariumRelocationPage from "./aquarium-relocation";
import commercialAquariumMaintenancePage from "./commercial-aquarium-maintenance";
import emergencyAquariumServicePage from "./emergency-aquarium-service";
import reefAquariumMaintenancePage from "./reef-aquarium-maintenance";
import type { ServicePage } from "./types";

export type { ServicePage } from "./types";

export const servicePages: ServicePage[] = [
  aquariumMaintenancePage,
  aquariumCleaningPage,
  reefAquariumMaintenancePage,
  commercialAquariumMaintenancePage,
  aquariumInstallationPage,
  aquariumRelocationPage,
  aquariumEquipmentFiltrationPage,
  emergencyAquariumServicePage,
];

export const getServicePage = (slug: string) =>
  servicePages.find((page) => page.slug === slug);

export const buildServiceJsonLd = (page: ServicePage) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: page.seoTitle,
  description: page.metaDescription,
  serviceType: page.serviceType,
  provider: {
    "@type": "LocalBusiness",
    name: businessInfo.name,
    url: siteUrl,
    telephone: businessInfo.telephone,
  },
  areaServed: businessInfo.areaServed,
  url: `${siteUrl}/services/${page.slug}`,
});
