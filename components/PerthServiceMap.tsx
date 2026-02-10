"use client";

import { useMemo } from "react";
import { MapContainer, Polygon, TileLayer, Tooltip } from "react-leaflet";
import { latLngBounds, type LatLngExpression } from "leaflet";

export type ServiceRegion = {
  id: string;
  title: string;
  suburbs: string[];
  coordinates: LatLngExpression[];
  color: string;
  fillOpacity?: number;
  strokeOpacity?: number;
};

type PerthServiceMapProps = {
  regions: ServiceRegion[];
};

const tileUrl =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const chunkSuburbs = (suburbs: string[], size = 2) => {
  const lines: string[] = [];
  for (let index = 0; index < suburbs.length; index += size) {
    lines.push(suburbs.slice(index, index + size).join(", "));
  }
  return lines;
};

export default function PerthServiceMap({ regions }: PerthServiceMapProps) {
  const bounds = useMemo(() => {
    const points = regions
      .flatMap((region) => region.coordinates)
      .filter(
        (
          coordinate,
        ): coordinate is [number, number] =>
          Array.isArray(coordinate) &&
          coordinate.length >= 2 &&
          typeof coordinate[0] === "number" &&
          typeof coordinate[1] === "number",
      );

    if (!points.length) {
      return null;
    }

    return latLngBounds(points);
  }, [regions]);

  if (!bounds) {
    return (
      <div className="perth-service-map flex items-center justify-center text-sm text-muted">
        Service area map unavailable.
      </div>
    );
  }

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [42, 42], maxZoom: 10 }}
      className="perth-service-map"
      preferCanvas
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl
      dragging
      zoomAnimation
      minZoom={8}
      maxZoom={12}
      aria-label="Perth metro service area map"
    >
      <TileLayer attribution={tileAttribution} url={tileUrl} />
      {regions.map((region) => {
        const suburbLines = chunkSuburbs(region.suburbs, 2);
        return (
          <Polygon
            key={region.id}
            positions={region.coordinates}
            smoothFactor={1}
            pathOptions={{
              color: region.color,
              opacity: region.strokeOpacity ?? 0.9,
              weight: 1.8,
              lineCap: "round",
              lineJoin: "round",
              fillColor: region.color,
              fillOpacity: region.fillOpacity ?? 0.25,
            }}
          >
            <Tooltip
              className="perth-map-tooltip"
              direction="auto"
              sticky
              opacity={1}
            >
              <div className="perth-map-tooltip__title">{region.title}</div>
              <div className="perth-map-tooltip__list">
                {suburbLines.map((line, index) => (
                  <div key={`${region.id}-${index}`}>{line}</div>
                ))}
              </div>
            </Tooltip>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
