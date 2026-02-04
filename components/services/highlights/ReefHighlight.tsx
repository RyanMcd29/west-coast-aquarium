import ServiceHighlightCard from "../ServiceHighlightCard";

export default function ReefHighlight() {
  return (
    <ServiceHighlightCard
      title="Reef aquarium maintenance"
      description="Reef, marine, and saltwater aquarium maintenance focused on stability."
      href="/services/reef-aquarium-maintenance-perth"
      highlights={[
        "Dosing and parameter testing",
        "Coral health and flow tuning",
      ]}
    />
  );
}
