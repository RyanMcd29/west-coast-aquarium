export const siteUrl = "https://westcoastaquariumservices.com.au";

export const businessInfo = {
  name: "West Coast Aquarium Services",
  description:
    "Aquarium maintenance, cleaning, relocations, installations, and equipment support for Perth metro homes and businesses.",
  email: "mario@westcoastaquariumservices.com.au",
  telephone: "0466 961 437",
  areaServed: "Perth metro and surrounds",
  image: `${siteUrl}/images/reef-aquarium-coral-closeup.webp`,
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: businessInfo.name,
  description: businessInfo.description,
  url: siteUrl,
  email: businessInfo.email,
  telephone: businessInfo.telephone,
  areaServed: businessInfo.areaServed,
  image: businessInfo.image,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Perth",
    addressRegion: "WA",
    addressCountry: "AU",
  },
};

export const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      name: "Aquarium maintenance and servicing",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/aquarium-maintenance-perth`,
    },
    {
      "@type": "Service",
      name: "Aquarium cleaning and algae control",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/aquarium-cleaning-perth`,
    },
    {
      "@type": "Service",
      name: "Aquarium relocations",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/aquarium-relocation-perth`,
    },
    {
      "@type": "Service",
      name: "Aquarium installations and setup",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/aquarium-installation-perth`,
    },
    {
      "@type": "Service",
      name: "Commercial aquarium maintenance",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/commercial-aquarium-maintenance-perth`,
    },
    {
      "@type": "Service",
      name: "Reef aquarium maintenance",
      areaServed: businessInfo.areaServed,
      provider: {
        "@type": "LocalBusiness",
        name: businessInfo.name,
        url: siteUrl,
        telephone: businessInfo.telephone,
      },
      url: `${siteUrl}/services/reef-aquarium-maintenance-perth`,
    },
  ],
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How often should my aquarium be serviced?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Most systems benefit from fortnightly or monthly maintenance, depending on stocking and filtration. We tailor the schedule to your tank’s needs.",
      },
    },
    {
      "@type": "Question",
      name: "Do you service both freshwater and reef tanks?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We service freshwater, marine, and reef aquariums across Perth metro, including system setups and ongoing care.",
      },
    },
    {
      "@type": "Question",
      name: "Can you move an existing aquarium safely?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Absolutely. We manage livestock handling, transport, and re-balancing to ensure a safe relocation and minimal stress.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer equipment upgrades and installs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. We install and calibrate lighting, pumps, filtration, dosing, and automation gear suited to your system.",
      },
    },
  ],
};
