"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import Logo from "./Logo";

type NavItem = {
  href: string;
  label: string;
};

type ServiceItem = {
  href: string;
  label: string;
};

type HeaderClientProps = {
  navItems: NavItem[];
  serviceItems: ServiceItem[];
};

export default function HeaderClient({
  navItems,
  serviceItems,
}: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const handleMobileToggle = () => {
    setIsOpen((prev) => !prev);
    setIsServicesOpen(false);
  };

  const closeMobileNav = () => {
    setIsOpen(false);
  };

  const closeServicesMenu = () => {
    setIsServicesOpen(false);
  };

  return (
    <header className="relative z-[1000] border-b border-outline/70 bg-surface/80 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                Services
                <span
                  className={`text-xs transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              <div
                role="menu"
                aria-hidden={!isServicesOpen}
                className={`absolute left-0 top-full z-[1100] mt-3 w-72 rounded-2xl border border-outline/70 bg-white p-3 text-sm text-foreground shadow-xl transition ${
                  isServicesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <Link
                  href="/services"
                  onClick={closeServicesMenu}
                  className="block rounded-xl px-3 py-2 font-semibold text-foreground transition hover:bg-surface-elevated"
                >
                  All services
                </Link>
                <div className="mt-1 space-y-1">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeServicesMenu}
                      className="block rounded-xl px-3 py-2 text-foreground/80 transition hover:bg-surface-elevated hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
            onClick={handleMobileToggle}
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
        onClick={closeMobileNav}
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
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
              Services
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm font-medium text-foreground">
              <Link
                href="/services"
                onClick={closeMobileNav}
                className="transition-colors hover:text-foreground/70"
              >
                All services
              </Link>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileNav}
                  className="transition-colors hover:text-foreground/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <nav className="flex flex-col gap-4 text-base font-medium text-foreground">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className="transition-colors hover:text-foreground/70"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link
          href="/bookings"
          onClick={closeMobileNav}
          className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          Request a consult
        </Link>
      </aside>
    </header>
  );
}
