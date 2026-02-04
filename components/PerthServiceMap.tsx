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
    const points = regions.flatMap((region) => region.coordinates);
    return latLngBounds(points as [number, number][]);
  }, [regions]);

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [50, 50], maxZoom: 10 }}
      className="perth-service-map"
      scrollWheelZoom={false}
      zoomControl={false}
      minZoom={8}
      maxZoom={12}
    >
      <TileLayer attribution={tileAttribution} url={tileUrl} />
      {regions.map((region) => {
        const suburbLines = chunkSuburbs(region.suburbs, 2);
        return (
          <Polygon
            key={region.id}
            positions={region.coordinates}
            pathOptions={{
              color: region.color,
              opacity: region.strokeOpacity ?? 0.75,
              weight: 1.5,
              fillColor: region.color,
              fillOpacity: region.fillOpacity ?? 0.32,
            }}
          >
            <Tooltip
              className="perth-map-tooltip"
              direction="top"
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
