import type { ServicePage } from "./types";

export const emergencyAquariumServicePage: ServicePage = {
  slug: "emergency-aquarium-service-perth",
  title: "Emergency aquarium service",
  seoTitle: "Emergency Aquarium Service Perth",
  metaDescription:
    "Emergency aquarium service in Perth for urgent issues like algae outbreaks, cloudy water, equipment failures and stability problems. Priority callouts where possible.",
  summary:
    "Urgent aquarium troubleshooting and stabilisation for Perth fish tanks.",
  keywords: [
    "emergency aquarium service Perth",
    "urgent fish tank cleaning Perth",
    "aquarium troubleshooting Perth",
    "aquarium parameter check Perth",
    "algae outbreak aquarium Perth",
  ],
  hero: {
    eyebrow: "Emergency",
    title: "Emergency aquarium service for urgent issues.",
    description:
      "Rapid response for algae outbreaks, cloudy water, or equipment failures with practical stabilisation steps. Servicing Perth metro and surrounds.",
    imageSrc: "/images/reef-aquarium-black-cabinet.webp",
    imageAlt: "Clean reef aquarium after urgent service",
  },
  serviceType: "Emergency aquarium service",
  whatsIncluded: [
    "Rapid assessment and stabilisation actions",
    "Targeted cleaning and algae control measures",
    "Critical parameter testing and immediate remediation",
    "Equipment triage with replacement recommendations",
    "Follow-up plan to prevent repeat issues",
  ],
  idealFor: [
    "Equipment failures and sudden instability",
    "Algae outbreaks or cloudy water",
    "Unstable parameters or livestock stress",
  ],
  process: [
    {
      title: "Stabilise",
      detail: "Assess the issue and take immediate corrective action.",
    },
    {
      title: "Resolve",
      detail: "Clean, test, and troubleshoot equipment to restore balance.",
    },
    {
      title: "Plan",
      detail: "Outline next steps and schedule a follow-up visit if needed.",
    },
  ],
  outcomes: [
    "Stability restored quickly and safely",
    "Clear diagnosis of the underlying issue",
    "A recovery plan that reduces repeat failures",
  ],
  faqs: [
    {
      question: "Do you offer same-day emergency visits?",
      answer:
        "We offer priority callouts where possible. Share your issue and suburb and we'll confirm availability.",
    },
    {
      question: "What should I prepare before an emergency visit?",
      answer:
        "Share recent issues, equipment details, and any parameter readings so we can prepare the right tools.",
    },
    {
      question: "Can you provide follow-up maintenance?",
      answer:
        "Yes. We can schedule ongoing maintenance or a short-term recovery plan after an emergency visit.",
    },
  ],
};

export default emergencyAquariumServicePage;
