import { ImageResponse } from "next/og";

export const alt = "Phi - The future of investing is in your contacts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og's default font (Geist) draws φ in the straight-stroke form, which
// reads as a capital Φ. Load a serif subset so it matches the favicon's φ.
async function loadSerifPhi() {
  const css = await (
    await fetch("https://fonts.googleapis.com/css2?family=Noto+Serif&text=%CF%86")
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error("Failed to load Noto Serif for the OG image");
  return (await fetch(url)).arrayBuffer();
}

export default async function Image() {
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
            fontFamily: "Noto Serif",
            fontSize: 240,
            lineHeight: 1,
            paddingBottom: 50,
          }}
        >
          φ
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Noto Serif", data: await loadSerifPhi(), style: "normal", weight: 400 }],
    }
  );
}
