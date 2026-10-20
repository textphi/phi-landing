import { ImageResponse } from "next/og";

export const alt = "Phi - The future of investing is in your contacts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
        }}
      >
        <div
          style={{
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "#4a4a4e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 240,
            lineHeight: 1,
            paddingBottom: 20,
          }}
        >
          φ
        </div>
      </div>
    ),
    { ...size }
  );
}
