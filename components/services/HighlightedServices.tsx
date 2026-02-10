import Container from "@/components/Container";
import Link from "next/link";
import CommercialHighlight from "./highlights/CommercialHighlight";
import CleaningHighlight from "./highlights/CleaningHighlight";
import EmergencyHighlight from "./highlights/EmergencyHighlight";
import EquipmentHighlight from "./highlights/EquipmentHighlight";
import InstallationHighlight from "./highlights/InstallationHighlight";
import MaintenanceHighlight from "./highlights/MaintenanceHighlight";
import ReefHighlight from "./highlights/ReefHighlight";
import RelocationHighlight from "./highlights/RelocationHighlight";

type HighlightedServicesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function HighlightedServices({
  eyebrow,
  title = "Aquarium services built for freshwater and marine systems",
  description = "Explore maintenance, fish tank cleaning, reef care, commercial support, and specialist services with clear reporting and reliable visits.",
  showCta = true,
  ctaHref = "/services",
  ctaLabel = "View all services",
}: HighlightedServicesProps) {
  return (
    <section className="bg-surface py-16">
      <Container className="space-y-10">
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="max-w-3xl leading-relaxed text-muted">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MaintenanceHighlight />
          <CleaningHighlight />
          <ReefHighlight />
          <CommercialHighlight />
          <InstallationHighlight />
          <RelocationHighlight />
          <EquipmentHighlight />
          <EmergencyHighlight />
        </div>
        {showCta ? (
          <div>
            <Link
              href={ctaHref}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-outline/80 bg-surface/90 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:w-auto"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
