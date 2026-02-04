import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import HeroMedia from "@/components/HeroMedia";
import { withBasePath } from "@/lib/paths";

const services = [
  {
    title: "Installations & relocations",
    description:
      "From new tank builds to careful moves, we handle logistics, plumbing, and safe livestock transfers.",
    image: "/images/reef-aquarium-white-cabinet.webp",
  },
  {
    title: "Routine maintenance",
    description:
      "Scheduled cleans, water changes, and system inspections that keep parameters stable and presentation sharp.",
    image: "/images/reef-aquarium-black-cabinet.webp",
  },
  {
    title: "Equipment & filtration",
    description:
      "Sump optimisation, dosing setup, lighting calibration, and hardware installations that protect your investment.",
    image: "/images/sump-filtration-equipment.webp",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24">
        <HeroMedia
          imageSrc="/images/reef-aquarium-coral-closeup.webp"
          imageAlt="Colourful reef aquarium with coral and fish"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Perth aquarium technician
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Bespoke aquarium care with technical precision and calm,
                professional service.
              </h1>
              <p className="max-w-xl text-lg text-muted">
                West Coast Aquarium Services keeps your system clean, stable, and
                show-ready. From installations and relocations to routine
                maintenance and parameter logging, we deliver confident care for
                residential and commercial aquariums across Perth metro.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/bookings"
                className="ocean-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
              >
                Request a consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-outline/80 bg-surface/90 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                Explore services
              </Link>
            </div>
            <div className="grid gap-4 text-sm text-muted sm:grid-cols-2">
              <div className="flat-panel p-4">
                <p className="font-semibold text-foreground">Perth metro focus</p>
                <p className="mt-2">
                  Responsive service windows and clear communication from
                  assessment to handover.
                </p>
                <Link
                  href="/perth-aquarium-services"
                  className="mt-3 inline-flex text-xs font-semibold text-primary"
                >
                  View service area
                </Link>
              </div>
              <div className="flat-panel p-4">
                <p className="font-semibold text-foreground">Detail-first care</p>
                <p className="mt-2">
                  Parameter logging and preventative maintenance that keep your
                  ecosystem balanced.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative h-72 overflow-hidden md:h-80 lg:h-96">
              <Image
                src={withBasePath("/images/living-room-reef-aquarium.webp")}
                alt="Living room reef aquarium installation"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-elevated py-16">
        <Container className="space-y-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              Core services
            </p>
            <h2 className="text-3xl font-semibold">Comprehensive support</h2>
            <p className="max-w-2xl text-muted">
              Whether you need a new setup, a safe relocation, or reliable
              ongoing care, each visit is tailored to the needs of your aquarium
              and livestock.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flat-panel-elevated p-5">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={withBasePath(service.image)}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              How it works
            </p>
            <h2 className="text-3xl font-semibold">A calm, proven process</h2>
            <p className="text-muted">
              We start with a quick consult to understand your system, then
              deliver a clear scope, timing, and plan. Every visit focuses on
              system stability, clean presentation, and long-term performance.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Assess",
                  text: "Review tank size, livestock, and equipment requirements.",
                },
                {
                  step: "02",
                  title: "Service",
                  text: "Carry out safe maintenance, install upgrades, or manage moves.",
                },
                {
                  step: "03",
                  title: "Log",
                  text: "Record parameters and provide next-step guidance.",
                },
              ].map((item) => (
                <div key={item.step} className="flat-panel p-4">
                  <p className="text-xs font-semibold text-primary">{item.step}</p>
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-72 overflow-hidden">
            <Image
              src={withBasePath("/images/reef-aquarium-sump-cabinet.webp")}
              alt="Aquarium filtration cabinet with sump and equipment"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface-elevated py-16">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold">
              Ready for a better-maintained aquarium?
            </h2>
            <p className="text-muted">
              Book a consultation to discuss your system and get a tailored
              maintenance plan. We service homes, offices, and hospitality
              venues across Perth metro and surrounds.
            </p>
          </div>
          <Link
            href="/bookings"
            className="ocean-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:brightness-110"
          >
            Request a consultation
          </Link>
        </Container>
      </section>
    </div>
  );
}
