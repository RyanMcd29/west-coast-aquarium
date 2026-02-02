import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

type LogoProps = {
  size?: "sm" | "md";
};

const sizes = {
  sm: { width: 140, height: 41 },
  md: { width: 200, height: 58 },
};

export default function Logo({ size = "md" }: LogoProps) {
  const dimensions = sizes[size];
  const isPriority = size === "md";

  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src={withBasePath("/images/wcas%20logo.svg")}
        alt="West Coast Aquarium Services logo"
        width={dimensions.width}
        height={dimensions.height}
        priority={isPriority}
      />
      <span className="sr-only">West Coast Aquarium Services</span>
    </Link>
  );
}
