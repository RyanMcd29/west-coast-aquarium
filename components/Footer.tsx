import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/perth-aquarium-services", label: "Service area" },
  { href: "/bookings", label: "Bookings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-outline/70 bg-surface">
      <Container className="flex flex-col gap-10 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-muted">
              Bespoke aquarium care and technical support for Perth metro homes
              and businesses. We keep your system healthy, stable, and
              presentation-ready.
            </p>
          </div>
          <div className="grid gap-6 text-sm md:grid-cols-2">
            <div className="space-y-3">
              <p className="font-semibold text-foreground">Quick links</p>
              <ul className="space-y-2 text-muted">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-semibold text-foreground">Contact</p>
              <ul className="space-y-2 text-muted">
                <li>
                  <a
                    className="transition hover:text-foreground"
                    href="mailto:mario@westcoastaquariumservices.com.au"
                  >
                    mario@westcoastaquariumservices.com.au
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-foreground"
                    href="tel:0466961437"
                  >
                    0466 961 437
                  </a>
                </li>
                <li>Perth metro and surrounds</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} West Coast Aquarium Services.</p>
          <p>ABN available on request.</p>
        </div>
      </Container>
    </footer>
  );
}
