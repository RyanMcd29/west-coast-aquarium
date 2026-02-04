import Image from "next/image";
import Container from "./Container";
import { withBasePath } from "@/lib/paths";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  breadcrumbs?: React.ReactNode;
};

export default function PageHero({
  title,
  description,
  eyebrow,
  imageSrc,
  imageAlt = "",
  breadcrumbs,
}: PageHeroProps) {
  const resolvedImageSrc = imageSrc ? withBasePath(imageSrc) : undefined;

  return (
    <section className="bg-surface-elevated py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          {breadcrumbs ? <div>{breadcrumbs}</div> : null}
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-semibold leading-tight">{title}</h1>
          <p className="text-lg text-muted">{description}</p>
        </div>
        {resolvedImageSrc ? (
          <div className="relative h-64 overflow-hidden">
            <Image
              src={resolvedImageSrc}
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
