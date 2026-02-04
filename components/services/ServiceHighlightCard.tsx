import Link from "next/link";

type ServiceHighlightCardProps = {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
  highlights?: string[];
};

export default function ServiceHighlightCard({
  title,
  description,
  href,
  eyebrow,
  highlights,
}: ServiceHighlightCardProps) {
  return (
    <Link
      href={href}
      className="flat-panel-elevated group flex h-full flex-col gap-3 p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
          {eyebrow}
        </p>
      ) : null}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      {highlights?.length ? (
        <ul className="mt-1 space-y-2 text-xs text-muted">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto text-xs font-semibold text-primary transition group-hover:text-primary/80">
        View details
      </span>
    </Link>
  );
}
