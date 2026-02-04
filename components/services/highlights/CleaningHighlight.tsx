import ServiceHighlightCard from "../ServiceHighlightCard";

export default function CleaningHighlight() {
  return (
    <ServiceHighlightCard
      title="Aquarium cleaning"
      description="Professional aquarium and fish tank cleaning with algae control and filter care."
      href="/services/aquarium-cleaning-perth"
      highlights={[
        "Glass, algae, and substrate cleaning",
        "Clear water and healthy biofilms",
      ]}
    />
  );
}
