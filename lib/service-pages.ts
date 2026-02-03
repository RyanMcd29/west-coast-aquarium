import { businessInfo, siteUrl } from "@/lib/seo";

export type ServicePage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
  serviceType: string;
  whatsIncluded: string[];
  idealFor: string[];
  process: { title: string; detail: string }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "aquarium-maintenance-perth",
    title: "Aquarium maintenance",
    seoTitle: "Aquarium Maintenance Perth",
    metaDescription:
      "Aquarium maintenance Perth for regular care, fish tank maintenance, water changes, and filter cleaning. Flexible schedules for Perth homes and businesses.",
    summary:
      "Aquarium maintenance Perth with stable parameters and presentation-ready tanks.",
    keywords: [
      "aquarium maintenance Perth",
      "aquarium servicing Perth",
      "fish tank maintenance Perth",
      "aquarium maintenance service",
    ],
    hero: {
      eyebrow: "Maintenance",
      title: "Aquarium Maintenance Perth",
      description:
        "Aquarium maintenance Perth for regular care, fish tank maintenance, water changes, and filter cleaning. Flexible schedules for Perth homes and businesses.",
      imageSrc: "/images/reef-aquarium-sump-maintenance.webp",
      imageAlt: "Aquarium sump maintenance and equipment checks",
    },
    serviceType: "Aquarium maintenance",
    whatsIncluded: [
      "Aquarium water change service Perth and filter care",
      "Aquarium filter cleaning Perth, plus glass, overflow, and algae control",
      "Aquarium water testing service Perth with clear notes",
      "Aquarium health check Perth with equipment inspection and calibration",
      "Feeding and stocking guidance between visits",
    ],
    idealFor: [
      "Freshwater aquarium maintenance Perth and tropical fish tank maintenance",
      "Offices and hospitality venues needing reliable care",
      "Reef or marine systems needing stability",
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
      "Clearer water and cleaner viewing panels",
      "Stable parameters with fewer surprises",
      "Longer equipment life from routine care",
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
          "Yes. We maintain freshwater, marine, and reef aquariums across Perth metro with service plans matched to your setup.",
      },
      {
        question: "Can you take over an existing setup?",
        answer:
          "Absolutely. We start with an assessment, then create a maintenance plan that keeps the system stable going forward.",
      },
    ],
  },
  {
    slug: "aquarium-cleaning-perth",
    title: "Aquarium cleaning",
    seoTitle: "Aquarium Cleaning Perth",
    metaDescription:
      "Aquarium cleaning Perth for one-off or seasonal refreshes, with fish tank cleaning, algae removal, gravel vacuuming, and safe water changes for Perth homes.",
    summary:
      "Aquarium cleaning Perth for clear glass, algae control, and filter refreshes.",
    keywords: [
      "aquarium cleaning Perth",
      "fish tank cleaning Perth",
      "aquarium cleaning service",
      "algae removal aquarium",
    ],
    hero: {
      eyebrow: "Cleaning",
      title: "Aquarium Cleaning Perth",
      description:
        "Aquarium cleaning Perth for one-off or seasonal refreshes, with fish tank cleaning, algae removal, gravel vacuuming, and safe water changes for Perth homes.",
      imageSrc: "/images/reef-aquarium-black-cabinet.webp",
      imageAlt: "Clean reef aquarium in a modern cabinet",
    },
    serviceType: "Aquarium cleaning",
    whatsIncluded: [
      "Fish tank cleaning Perth for glass and acrylic",
      "Aquarium algae removal Perth from rockwork and decor",
      "Aquarium gravel vacuum Perth or sand bed care",
      "Filter media rinse and pump cleaning",
      "Water change and clarity checks",
    ],
    idealFor: [
      "Cloudy water or algae buildup",
      "Busy owners needing a refresh",
      "Commercial displays that must look pristine",
    ],
    process: [
      {
        title: "Protect",
        detail: "Safeguard livestock and check equipment before cleaning.",
      },
      {
        title: "Clean",
        detail: "Remove buildup, clean filters, and refresh water safely.",
      },
      {
        title: "Stabilise",
        detail: "Confirm flow, clarity, and key parameters before we leave.",
      },
    ],
    outcomes: [
      "Better visibility and cleaner glass",
      "Reduced algae pressure",
      "More consistent filtration performance",
    ],
    faqs: [
      {
        question: "Is cleaning safe for livestock?",
        answer:
          "Yes. We use fish-safe methods and take care to protect beneficial bacteria while we clean.",
      },
      {
        question: "How long does a professional clean take?",
        answer:
          "Most visits take 60–120 minutes depending on tank size, access, and current condition.",
      },
      {
        question: "Can you clean without draining the tank?",
        answer:
          "Yes. We perform partial water changes and targeted cleaning rather than full drains.",
      },
    ],
  },
  {
    slug: "aquarium-relocation-perth",
    title: "Aquarium relocation",
    seoTitle: "Aquarium Relocation Perth",
    metaDescription:
      "Aquarium relocation Perth with safe livestock transport, equipment packing, and fish tank moving service to set up your system smoothly at the new site.",
    summary:
      "Aquarium relocation Perth with safe fish tank moving service and re-installation.",
    keywords: [
      "aquarium relocation Perth",
      "aquarium move Perth",
      "fish tank relocation Perth",
      "aquarium transport Perth",
    ],
    hero: {
      eyebrow: "Relocations",
      title: "Aquarium Relocation Perth",
      description:
        "Aquarium relocation Perth with safe livestock transport, equipment packing, and fish tank moving service to set up your system smoothly at the new site.",
      imageSrc: "/images/reef-aquarium-white-cabinet.webp",
      imageAlt: "Modern reef aquarium ready for relocation",
    },
    serviceType: "Aquarium relocation",
    whatsIncluded: [
      "Pre-move assessment and fish tank moving service planning",
      "Livestock handling and transport prep",
      "Equipment teardown and secure packing",
      "Re-installation, leak checks, and testing",
      "Post-move stabilisation guidance",
    ],
    idealFor: [
      "Home moves across Perth",
      "Office refurbishments",
      "Upgrading cabinetry or tank location",
    ],
    process: [
      {
        title: "Plan",
        detail: "Create a move schedule and identify equipment and livestock needs.",
      },
      {
        title: "Move",
        detail: "Safely pack, transport, and reinstall the aquarium system.",
      },
      {
        title: "Rebalance",
        detail: "Stabilise parameters and confirm flow, filtration, and lighting.",
      },
    ],
    outcomes: [
      "Minimal livestock stress during transport",
      "Safe equipment handling and setup",
      "Faster post-move stability",
    ],
    faqs: [
      {
        question: "How do you keep fish safe during a move?",
        answer:
          "We use temperature-safe containers, oxygenation methods, and careful timing to minimise stress.",
      },
      {
        question: "Can you move large reef systems?",
        answer:
          "Yes. We plan moves based on tank size, equipment complexity, and livestock requirements.",
      },
      {
        question: "Do you re-balance water after setup?",
        answer:
          "We check key parameters after installation and provide guidance for stabilising the system.",
      },
    ],
  },
  {
    slug: "aquarium-installation-perth",
    title: "Aquarium installation",
    seoTitle: "Aquarium Installation Perth",
    metaDescription:
      "Aquarium installation Perth with full aquarium setup service, plumbing, lighting calibration, and cycling guidance so new tanks start stable and clear.",
    summary:
      "Aquarium installation Perth with a full aquarium setup service.",
    keywords: [
      "aquarium installation Perth",
      "aquarium setup service Perth",
      "custom aquarium installation",
    ],
    hero: {
      eyebrow: "Installations",
      title: "Aquarium Installation Perth",
      description:
        "Aquarium installation Perth with full aquarium setup service, plumbing, lighting calibration, and cycling guidance so new tanks start stable and clear.",
      imageSrc: "/images/living-room-reef-aquarium.webp",
      imageAlt: "Living room reef aquarium installation",
    },
    serviceType: "Aquarium installation",
    whatsIncluded: [
      "Aquarium setup service Perth with equipment selection and layout planning",
      "Plumbing and filtration setup",
      "Lighting and automation calibration",
      "Initial fill, conditioning, and testing",
      "Cycling guidance and stocking plan",
    ],
    idealFor: [
      "New aquarium owners",
      "Upgrading to larger systems",
      "Commercial display installs",
    ],
    process: [
      {
        title: "Design",
        detail: "Define goals, livestock plans, and the right equipment fit.",
      },
      {
        title: "Install",
        detail: "Set up plumbing, filtration, lighting, and automation.",
      },
      {
        title: "Launch",
        detail: "Condition the system and guide you through the cycle.",
      },
    ],
    outcomes: [
      "Optimised equipment layout",
      "Stable, efficient filtration",
      "Clear guidance for a healthy start",
    ],
    faqs: [
      {
        question: "Do you supply equipment?",
        answer:
          "We can supply or install owner-supplied equipment and recommend the right fit for your goals.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most installations take a few hours, with timing based on tank size and plumbing complexity.",
      },
      {
        question: "Can you provide ongoing maintenance?",
        answer:
          "Yes. We offer ongoing maintenance plans after the system is installed and cycled.",
      },
    ],
  },
  {
    slug: "commercial-aquarium-maintenance-perth",
    title: "Commercial aquarium maintenance",
    seoTitle: "Commercial Aquarium Maintenance Perth",
    metaDescription:
      "Commercial aquarium maintenance Perth for offices, reception areas, restaurants, and medical centres, with presentation-first cleaning and scheduled service.",
    summary:
      "Commercial aquarium maintenance Perth for offices and display aquariums.",
    keywords: [
      "commercial aquarium maintenance Perth",
      "office aquarium maintenance Perth",
      "hospitality aquarium maintenance Perth",
      "business aquarium maintenance",
    ],
    hero: {
      eyebrow: "Commercial",
      title: "Commercial Aquarium Maintenance Perth",
      description:
        "Commercial aquarium maintenance Perth for offices, reception areas, restaurants, and medical centres, with presentation-first cleaning and scheduled service.",
      imageSrc: "/images/reef-aquarium-coral-closeup.webp",
      imageAlt: "Vibrant coral reef aquarium display",
    },
    serviceType: "Commercial aquarium maintenance",
    whatsIncluded: [
      "Scheduled visits to maintain presentation",
      "After-hours service options",
      "Parameter reports for staff",
      "Emergency response planning",
      "Multi-site coordination",
    ],
    idealFor: [
      "Office aquarium maintenance Perth for receptions and boardrooms",
      "Restaurant aquarium maintenance Perth, cafes, and hospitality venues",
      "Medical centre aquarium maintenance Perth and aged care sites",
      "School and display aquarium maintenance Perth for public spaces",
    ],
    process: [
      {
        title: "Align",
        detail: "Set service windows and presentation standards for your team.",
      },
      {
        title: "Maintain",
        detail: "Deliver cleaning, testing, and equipment checks on schedule.",
      },
      {
        title: "Report",
        detail: "Provide clear notes and proactive recommendations.",
      },
    ],
    outcomes: [
      "Consistently clean, professional display",
      "Reduced downtime and fewer emergencies",
      "Clear communication for staff and managers",
    ],
    faqs: [
      {
        question: "Can you service outside business hours?",
        answer:
          "Yes. We can arrange early, late, or weekend visits where needed.",
      },
      {
        question: "Do you provide service reports?",
        answer:
          "Yes. We document key parameters and any recommendations after each visit.",
      },
      {
        question: "Can you maintain multiple sites?",
        answer:
          "Yes. We support multi-site scheduling across Perth metro.",
      },
    ],
  },
  {
    slug: "reef-aquarium-maintenance-perth",
    title: "Reef aquarium maintenance",
    seoTitle: "Reef Aquarium Maintenance Perth",
    metaDescription:
      "Reef aquarium maintenance Perth with marine testing, dosing calibration, and reef tank maintenance to keep saltwater systems stable and coral healthy.",
    summary:
      "Reef tank maintenance Perth with stable saltwater parameters.",
    keywords: [
      "reef aquarium maintenance Perth",
      "saltwater aquarium maintenance Perth",
      "marine aquarium cleaning Perth",
    ],
    hero: {
      eyebrow: "Reef",
      title: "Reef Aquarium Maintenance Perth",
      description:
        "Reef aquarium maintenance Perth with marine testing, dosing calibration, and reef tank maintenance to keep saltwater systems stable and coral healthy.",
      imageSrc: "/images/reef-aquarium-sump-cabinet.webp",
      imageAlt: "Reef aquarium filtration cabinet with sump equipment",
    },
    serviceType: "Reef aquarium maintenance",
    whatsIncluded: [
      "Saltwater aquarium maintenance Perth with alkalinity, calcium, and magnesium testing",
      "Dosing and automation calibration",
      "Nutrient management and algae control",
      "Marine aquarium maintenance Perth with coral health checks and flow tuning",
      "RO/DI and salinity management",
    ],
    idealFor: [
      "Reef tank maintenance Perth for mixed reef and SPS systems",
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
      "More stable alkalinity and nutrients",
      "Healthier coral growth and colour",
      "Confidence in your system’s balance",
    ],
    faqs: [
      {
        question: "Do you test alkalinity and calcium each visit?",
        answer:
          "Yes. Reef visits include testing key parameters to keep your system stable.",
      },
      {
        question: "Can you set up dosing automation?",
        answer:
          "Absolutely. We can install and calibrate dosing systems to match your reef’s demand.",
      },
      {
        question: "How do you manage algae control?",
        answer:
          "We balance nutrients, optimise flow, and use safe cleaning methods to keep algae in check.",
      },
    ],
  },
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
