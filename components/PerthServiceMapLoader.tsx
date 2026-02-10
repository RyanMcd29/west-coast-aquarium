"use client";

import dynamic from "next/dynamic";
import type { ServiceRegion } from "./PerthServiceMap";

const PerthServiceMap = dynamic(() => import("./PerthServiceMap"), {
  ssr: false,
  loading: () => (
    <div className="perth-service-map flex items-center justify-center bg-surface-elevated text-sm text-muted">
      Loading service map...
    </div>
  ),
});

type PerthServiceMapLoaderProps = {
  regions: ServiceRegion[];
};

export default function PerthServiceMapLoader({
  regions,
}: PerthServiceMapLoaderProps) {
  return <PerthServiceMap regions={regions} />;
}
