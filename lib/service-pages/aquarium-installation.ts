import type { ServicePage } from "./types";

export const aquariumInstallationPage: ServicePage = {
  slug: "aquarium-installation-perth",
  title: "Aquarium installation",
  seoTitle: "Aquarium Installation Perth",
  metaDescription:
    "Aquarium installation in Perth with equipment setup, plumbing, lighting calibration, and cycling guidance so new tanks start stable and clear for homes.",
  summary: "From equipment selection to plumbing and first fill.",
  keywords: [
    "aquarium installation Perth",
    "aquarium setup service Perth",
    "custom aquarium installation",
    "aquarium equipment installation Perth",
  ],
  hero: {
    eyebrow: "Installations",
    title: "Aquarium installations built for long-term stability.",
    description:
      "We design and install aquariums for homes and businesses, with careful equipment setup and cycling guidance. Servicing Perth metro and surrounds.",
    imageSrc: "/images/living-room-reef-aquarium.webp",
    imageAlt: "Living room reef aquarium installation",
  },
  serviceType: "Aquarium installation",
  whatsIncluded: [
    "Equipment selection and layout planning",
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
};

export default aquariumInstallationPage;
