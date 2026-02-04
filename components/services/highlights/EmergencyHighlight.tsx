import ServiceHighlightCard from "../ServiceHighlightCard";

export default function EmergencyHighlight() {
  return (
    <ServiceHighlightCard
      title="Emergency aquarium service"
      description="Emergency aquarium service for urgent issues, algae outbreaks, or equipment failures."
      href="/services/emergency-aquarium-service-perth"
      highlights={["Rapid stabilisation and testing", "Follow-up plan to prevent repeats"]}
    />
  );
}
