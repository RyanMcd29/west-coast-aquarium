"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/perth-aquarium-services", label: "Service area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="border-b border-outline/70 bg-surface/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-4">
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
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-nav"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline/70 bg-surface text-foreground transition hover:border-outline md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-foreground transition duration-300 ${
                  isOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-foreground transition duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-foreground transition duration-300 ${
                  isOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[9999] flex h-full w-72 max-w-[80vw] flex-col gap-6 border-l border-outline/70 bg-white px-6 py-6 shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
          Menu
        </div>
        <nav className="flex flex-col gap-4 text-base font-medium text-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="transition-colors hover:text-foreground/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/bookings"
          onClick={() => setIsOpen(false)}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          Request a consult
        </Link>
      </aside>
    </header>
  );
}
