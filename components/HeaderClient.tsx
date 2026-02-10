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
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
    setIsMobileServicesOpen(false);
  };

  const closeMobileNav = () => {
    setIsOpen(false);
    setIsMobileServicesOpen(false);
  };

  const closeServicesMenu = () => {
    setIsServicesOpen(false);
  };

  return (
    <>
      <header className="relative z-[1000] border-b border-outline/70 bg-surface/80 backdrop-blur">
        <Container className="flex items-center justify-between py-3.5">
          <Logo />
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isServicesOpen}
                  aria-controls="desktop-services-menu"
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
                  id="desktop-services-menu"
                  role="menu"
                  aria-hidden={!isServicesOpen}
                  className={`absolute left-0 top-full z-[1100] mt-3 w-72 rounded-2xl border border-outline/70 bg-surface/95 p-3 text-sm text-foreground shadow-xl backdrop-blur transition ${
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
                  onClick={closeServicesMenu}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/bookings"
                onClick={closeServicesMenu}
                className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2 text-white shadow-sm transition hover:bg-primary/90"
              >
                Request a consult
              </Link>
            </nav>
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-nav"
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              onClick={handleMobileToggle}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-outline/70 bg-surface text-foreground transition hover:border-outline md:hidden"
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
      </header>

      {/* Mobile nav overlay and sidebar - outside header to escape stacking context */}
      <div
        className={`fixed inset-0 z-[99998] bg-black/75 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileNav}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed right-0 top-0 z-[99999] flex h-full w-80 max-w-[90vw] flex-col gap-5 border-l border-outline/70 bg-surface px-5 py-5 shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
          Menu
        </div>
        <nav className="flex flex-col gap-2 text-base font-medium text-foreground">
          <div>
            <button
              type="button"
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
              className="flex min-h-11 w-full items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-surface-elevated hover:text-foreground/70"
              aria-expanded={isMobileServicesOpen}
            >
              Services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isMobileServicesOpen ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`grid text-sm font-medium text-foreground/80 transition-all duration-200 ${
                isMobileServicesOpen
                  ? "mt-3 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="flex flex-col gap-2 overflow-hidden">
                <Link
                  href="/services"
                  onClick={closeMobileNav}
                  className="rounded-xl py-2 pl-3 transition-colors hover:bg-surface-elevated hover:text-foreground"
                >
                  All services
                </Link>
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileNav}
                    className="rounded-xl py-2 pl-3 transition-colors hover:bg-surface-elevated hover:text-foreground"
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
              onClick={closeMobileNav}
              className="inline-flex min-h-11 items-center rounded-xl px-2 py-2 transition-colors hover:bg-surface-elevated hover:text-foreground/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/bookings"
          onClick={closeMobileNav}
          className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          Request a consult
        </Link>
      </aside>
    </>
  );
}
