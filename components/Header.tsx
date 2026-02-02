import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/bookings", label: "Bookings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-outline/70 bg-surface/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/bookings"
            className="rounded-full bg-primary px-4 py-2 text-white shadow-sm transition hover:bg-primary/90"
          >
            Request a consult
          </Link>
        </nav>
      </Container>
      <Container className="flex flex-wrap gap-3 pb-4 text-xs font-semibold text-foreground/80 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-outline/70 bg-surface px-3 py-1.5 transition hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/bookings"
          className="rounded-full bg-primary px-3 py-1.5 text-white shadow-sm transition hover:bg-primary/90"
        >
          Request a consult
        </Link>
      </Container>
    </header>
  );
}
