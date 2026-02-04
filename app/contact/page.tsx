import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildPageMetadata } from "@/lib/metadata";
import { contactSeo } from "@/lib/page-seo/contact";
import { siteUrl } from "@/lib/seo";

export const metadata = buildPageMetadata(contactSeo);

const contactDetails = [
  {
    label: "Email",
    value: "mario@westcoastaquariumservices.com.au",
    href: "mailto:mario@westcoastaquariumservices.com.au",
  },
  {
    label: "Phone",
    value: "0466 961 437",
    href: "tel:0466961437",
  },
  {
    label: "Service area",
    value: "Perth metro and surrounds",
  },
];
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Contact" },
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
      name: "Contact",
      item: `${siteUrl}/contact`,
    },
  ],
};

export default function ContactPage() {
  return (
    <div>
      <SeoJsonLd data={breadcrumbJsonLd} id="contact-breadcrumbs-jsonld" />
      <PageHero
        eyebrow="Contact"
        title="Let’s keep your aquarium running perfectly."
        description="Reach out for installations, maintenance visits, or equipment support. We’ll reply promptly with next steps."
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />

      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flat-panel p-6">
            <h2 className="text-2xl font-semibold">Contact details</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-2 block text-base font-semibold text-foreground transition hover:text-primary"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-base font-semibold text-foreground">
                      {detail.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flat-panel p-6">
            <h3 className="text-lg font-semibold">Operating style</h3>
            <p className="mt-3 text-sm text-muted">
              We focus on clear communication, safe handling of livestock, and
              tidy finishes. If you’re preparing for a move, new installation,
              or ongoing care, include a few details so we can guide you
              efficiently.
            </p>
            <div className="flat-panel-elevated mt-6 px-4 py-3 text-sm text-muted">
              <p className="font-semibold text-foreground">Tip</p>
              <p className="mt-1">
                Sharing your tank size, livestock type, and current equipment
                helps us prepare the right service plan.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
