import type { ServicePage } from "./types";

export const reefAquariumMaintenancePage: ServicePage = {
  slug: "reef-aquarium-maintenance-perth",
  title: "Reef aquarium maintenance",
  seoTitle: "Reef Aquarium Maintenance Perth",
  metaDescription:
    "Reef aquarium maintenance in Perth with advanced testing, dosing calibration, and coral health checks to keep marine and saltwater systems stable.",
  summary:
    "Advanced testing and dosing support for reef, marine, and saltwater aquariums.",
  keywords: [
    "reef aquarium maintenance Perth",
    "saltwater aquarium maintenance Perth",
    "marine aquarium maintenance Perth",
  ],
  hero: {
    eyebrow: "Reef",
    title: "Reef aquarium maintenance focused on stability.",
    description:
      "Reef systems demand stable parameters in marine and saltwater aquariums. We test, tune, and log dosing to keep coral and fish thriving. Servicing Perth metro and surrounds.",
    imageSrc: "/images/reef-aquarium-sump-cabinet.webp",
    imageAlt: "Reef aquarium filtration cabinet with sump equipment",
  },
  serviceType: "Reef aquarium maintenance",
  whatsIncluded: [
    "Alkalinity, calcium, and magnesium testing",
    "Dosing and automation calibration",
    "Nutrient management and algae control",
    "Coral health checks and flow tuning",
    "RO/DI and salinity management",
  ],
  idealFor: [
    "Mixed reef and SPS systems",
    "High-value coral displays",
    "Reef keepers seeking stability",
  ],
  process: [
    {
      title: "Test",
      detail: "Measure critical reef parameters and system performance.",
    },
    {
      title: "Tune",
      detail: "Adjust dosing, flow, and filtration for stability.",
    },
    {
      title: "Monitor",
      detail: "Log results and plan follow-up adjustments.",
    },
  ],
  outcomes: [
    "Stable alkalinity, calcium, and nutrient balance",
    "Coral health, colour, and growth supported",
    "Confidence in dosing and system stability",
  ],
  faqs: [
    {
      question: "Do you test alkalinity and calcium each visit?",
      answer:
        "Yes. Reef visits include testing key parameters to keep your marine aquarium stable.",
    },
    {
      question: "Can you set up dosing automation?",
      answer:
        "Absolutely. We can install and calibrate dosing systems to match your reef's demand.",
    },
    {
      question: "How do you manage algae control?",
      answer:
        "We balance nutrients, optimise flow, and use safe cleaning methods to keep algae in check.",
    },
  ],
};

export default reefAquariumMaintenancePage;
