import HeaderClient from "@/components/HeaderClient";
import { servicePages } from "@/lib/service-pages";

const navItems = [
  { href: "/perth-aquarium-services", label: "Service area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const serviceItems = servicePages.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.title,
  }));

  return <HeaderClient navItems={navItems} serviceItems={serviceItems} />;
}
