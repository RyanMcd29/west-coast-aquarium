import type { CSSProperties } from "react";
import Link from "next/link";

type ArcItem = {
  href: string;
  label: string;
  description: string;
};

type ArcNavProps = {
  items: ArcItem[];
};

const arcPath = "M0,0 C70,10 110,130 90,260";

export default function ArcNav({ items }: ArcNavProps) {
  const count = Math.max(items.length, 1);

  return (
    <div className="relative">
      <div className="hidden md:block">
        <div className="relative h-[280px] w-[260px]">
          {items.map((item, index) => {
            const distance = (index / (count - 1 || 1)) * 100;
            const fallbackX = Math.round(14 + (index / (count - 1 || 1)) * 70);
            const fallbackY = Math.round((index / (count - 1 || 1)) * 220);

            const style = {
              offsetPath: `path("${arcPath}")`,
              offsetDistance: `${distance}%`,
              ["--arc-x" as string]: `${fallbackX}px`,
              ["--arc-y" as string]: `${fallbackY}px`,
            } as CSSProperties;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="arc-item flat-panel absolute left-0 top-0 w-56 px-5 py-4 text-left transition hover:-translate-y-1"
                style={style}
              >
                <span className="block text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flat-panel px-4 py-3 text-left"
          >
            <span className="block text-sm font-semibold text-foreground">
              {item.label}
            </span>
            <span className="mt-1 block text-xs text-muted">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
