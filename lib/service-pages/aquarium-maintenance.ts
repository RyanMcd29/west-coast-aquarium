import type { ServicePage } from "./types";

export const aquariumMaintenancePage: ServicePage = {
  slug: "aquarium-maintenance-perth",
  title: "Aquarium maintenance",
  seoTitle: "Aquarium Maintenance Perth",
  metaDescription:
    "Perth aquarium maintenance and fish tank servicing for homes and businesses, with scheduled cleaning, water testing, and equipment checks that keep tanks stable and presentation ready.",
  summary:
    "Scheduled aquarium servicing and fish tank maintenance that keeps parameters stable and presentation sharp.",
  keywords: [
    "aquarium maintenance Perth",
    "aquarium servicing Perth",
    "fish tank maintenance Perth",
    "aquarium maintenance service",
    "scheduled aquarium maintenance Perth",
  ],
  hero: {
    eyebrow: "Maintenance",
    title: "Aquarium maintenance that keeps Perth tanks stable.",
    description:
      "Reliable aquarium and fish tank servicing for freshwater, marine, and reef systems. We clean, test, and tune your equipment to keep your aquarium clear and consistent. Servicing Perth metro and surrounds.",
    imageSrc: "/images/reef-aquarium-sump-maintenance.webp",
    imageAlt: "Aquarium sump maintenance and equipment checks",
  },
  serviceType: "Aquarium maintenance",
  whatsIncluded: [
    "Scheduled water changes, filter care, and sump cleaning",
    "Glass, overflow, and algae control",
    "Aquarium water testing with clear notes",
    "Equipment inspection, pump cleaning, and calibration",
    "Feeding and stocking guidance between visits",
  ],
  idealFor: [
    "Busy households who want consistent care",
    "Offices and hospitality venues",
    "Reef or freshwater systems needing stability",
  ],
  process: [
    {
      title: "Assess",
      detail: "Review system health, equipment performance, and recent issues.",
    },
    {
      title: "Service",
      detail: "Complete cleaning, water changes, and equipment tuning.",
    },
    {
      title: "Log",
      detail: "Record parameters and outline next-step guidance.",
    },
  ],
  outcomes: [
    "Presentation-ready glass and water clarity between visits",
    "Steady parameters you can trust",
    "Equipment that runs clean, quiet, and efficient",
  ],
  faqs: [
    {
      question: "How often should maintenance be scheduled?",
      answer:
        "Most aquariums benefit from fortnightly or monthly visits depending on stocking, filtration, and goals. We tailor the schedule to your system.",
    },
    {
      question: "Do you service freshwater and marine tanks?",
      answer:
        "Yes. We maintain freshwater, marine, and reef aquariums across Perth metro, including fish tank maintenance plans matched to your setup.",
    },
    {
      question: "Can you take over an existing setup?",
      answer:
        "Absolutely. We start with an assessment, then create a maintenance plan that keeps the system stable going forward.",
    },
  ],
};

export default aquariumMaintenancePage;
