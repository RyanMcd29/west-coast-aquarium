import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Request a consultation for aquarium maintenance, installations, or equipment support in Perth metro.",
};

const bookingNotes = [
  "We reply within 1–2 business days with availability and next steps.",
  "Emergency callouts can be arranged where possible.",
  "Please share any recent issues or parameter concerns.",
];

export default function BookingsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Bookings"
        title="Request a consultation"
        description="Tell us about your aquarium and we’ll prepare a tailored service plan. We work with residential and commercial tanks across Perth metro and surrounds."
        imageSrc="/images/reef-aquarium-sump-maintenance.webp"
        imageAlt="Reef aquarium maintenance setup with sump access"
      />

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-outline/70 bg-surface/90 p-6">
            <BookingForm />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-outline/70 bg-surface/90 p-6">
              <h2 className="text-xl font-semibold">What to expect</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {bookingNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-outline/70 bg-surface/90 p-6">
              <h3 className="text-lg font-semibold">Service area</h3>
              <p className="mt-3 text-sm text-muted">
                Perth metro and surrounds. If you’re outside the metro area,
                include your suburb and we’ll confirm travel options.
              </p>
            </div>
            <div className="rounded-3xl border border-outline/70 bg-surface/90 p-6">
              <h3 className="text-lg font-semibold">Preferred contact</h3>
              <p className="mt-3 text-sm text-muted">
                We’ll respond by phone or email. If you have a preferred time
                window, pop it in the form and we’ll do our best.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
