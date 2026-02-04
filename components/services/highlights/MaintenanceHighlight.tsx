import ServiceHighlightCard from "../ServiceHighlightCard";

export default function MaintenanceHighlight() {
  return (
    <ServiceHighlightCard
      title="Aquarium maintenance"
      description="Scheduled aquarium servicing and fish tank maintenance for Perth homes and businesses."
      href="/services/aquarium-maintenance-perth"
      highlights={[
        "Weekly, fortnightly, or monthly plans",
        "Water testing and equipment checks",
      ]}
    />
  );
}
