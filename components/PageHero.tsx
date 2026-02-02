import Image from "next/image";
import Container from "./Container";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function PageHero({
  title,
  description,
  eyebrow,
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="bg-surface-elevated py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-semibold leading-tight">{title}</h1>
          <p className="text-lg text-muted">{description}</p>
        </div>
        {imageSrc ? (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
