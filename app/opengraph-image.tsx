import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(120deg, #07121a 0%, #0b3852 45%, #02aef0 100%)",
          color: "#f7fbff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
          West Coast Aquarium Services
        </div>
        <div
          style={{
            fontSize: 32,
            maxWidth: "720px",
            lineHeight: 1.4,
          }}
        >
          Perth aquarium installations, maintenance, and technical support.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
