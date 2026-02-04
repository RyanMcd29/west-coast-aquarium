import type { ServicePage } from "./types";

export const aquariumCleaningPage: ServicePage = {
  slug: "aquarium-cleaning-perth",
  title: "Aquarium cleaning",
  seoTitle: "Aquarium Cleaning Perth",
  metaDescription:
    "Aquarium and fish tank cleaning in Perth with algae control, glass cleaning, filter care, and water changes to restore clarity and fish health for homes and businesses.",
  summary:
    "Professional aquarium and fish tank cleaning, algae control, and filter refreshes for clear tanks.",
  keywords: [
    "aquarium cleaning Perth",
    "fish tank cleaning Perth",
    "aquarium cleaning service",
    "algae removal aquarium",
    "aquarium algae control Perth",
  ],
  hero: {
    eyebrow: "Cleaning",
    title: "Aquarium cleaning that keeps your tank spotless.",
    description:
      "Professional aquarium and fish tank cleaning that removes algae, detritus, and buildup while protecting livestock and beneficial biofilms. Servicing Perth metro and surrounds.",
    imageSrc: "/images/reef-aquarium-black-cabinet.webp",
    imageAlt: "Clean reef aquarium in a modern cabinet",
  },
  serviceType: "Aquarium cleaning",
  whatsIncluded: [
    "Glass and acrylic cleaning",
    "Algae removal from rockwork and decor",
    "Gravel vacuum or sand bed care",
    "Aquarium filter cleaning and pump cleaning",
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
    "Clear viewing panels and improved clarity",
    "Algae pressure reduced without over-cleaning",
    "A healthier, less stressed environment after service",
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
        "Most fish tank cleaning visits take 60-120 minutes depending on tank size, access, and current condition.",
    },
    {
      question: "Can you clean without draining the tank?",
      answer:
        "Yes. We perform partial water changes and targeted cleaning rather than full drains.",
    },
  ],
};

export default aquariumCleaningPage;
