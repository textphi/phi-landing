import type { ReactNode } from "react";

/*
 * Real brand marks, inlined locally (no remote hotlinks).
 *
 * Every logo below is the actual mark, not an approximation:
 *  - Reddit, X, NVIDIA, Tesla  -> Simple Icons paths (CC0)
 *  - Micron, SanDisk, Reuters  -> glyphs traced out of each company's own
 *                                 wordmark SVG and normalised to a 24x24 box
 *  - Yahoo Finance             -> the chart mark traced off the Yahoo Finance
 *                                 app icon, on Yahoo's purple
 *  - Microsoft                 -> the four-square mark in official brand colours
 *  - SEC, U.S. Congress        -> no company owns these, so they get a small
 *                                 circular US flag (circle-flags, MIT)
 *
 * Categories that have no owner (your rule, paper portfolio, ...) keep
 * Lucide-style strokes (ISC) on a muted badge, which also separates "real
 * source" from "your own data" at a glance.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Badge tint for brands whose official icon sits on white. */
const PAPER = "#f5f6f8";

/* The Reuters mark is 28 dots; centres/radii lifted from the official SVG. */
const REUTERS_DOTS: [number, number, number][] = [
  [19.61, 4.37, 1.62], [4.38, 19.63, 1.62], [16.13, 2.04, 1.42], [7.88, 21.96, 1.42],
  [12.02, 1.22, 1.21], [12.0, 22.78, 1.22], [7.88, 2.04, 1.01], [16.12, 21.96, 1.01],
  [4.38, 4.38, 0.81], [19.03, 19.86, 0.81], [2.06, 7.88, 1.0], [21.95, 16.13, 1.01],
  [1.23, 12.01, 1.22], [22.77, 12.01, 1.22], [2.04, 16.13, 1.42], [21.92, 7.88, 1.4],
  [16.25, 16.26, 1.14], [6.18, 10.44, 0.9], [17.78, 13.55, 0.9], [6.19, 13.56, 0.72],
  [17.81, 10.45, 0.72], [7.75, 16.24, 0.54], [16.25, 7.74, 0.54], [10.44, 17.82, 0.72],
  [13.55, 6.19, 0.72], [13.55, 17.81, 0.89], [10.44, 6.19, 0.9], [7.75, 7.73, 1.14],
];

/*
 * The US flag, drawn for small circular use (circle-flags, MIT). It bleeds to
 * the badge edge, which is what clips it into a disc.
 */
const US_FLAG = (
  <svg viewBox="0 0 512 512" data-bleed="">
    <path fill="#eee" d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z" />
    <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
    <path fill="#0052b4" d="M0 0h256v256H0Z" />
    <path fill="#eee" d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z" />
  </svg>
);

type Logo = { node: ReactNode; bg: string; color?: string; label: string };

const LOGOS: Record<string, Logo> = {
  /* ---------- Real brands ---------- */

  SEC: {
    label: "U.S. Securities and Exchange Commission",
    bg: "transparent",
    node: US_FLAG,
  },

  "Yahoo Finance": {
    label: "Yahoo Finance",
    bg: "linear-gradient(180deg, #6001d2, #3d0085)",
    node: (
      <svg viewBox="0 0 24 24">
        <path
          fill="#ffffff"
          d="M.5 18.31 8.34 11.8l5.39 4.37L23.5 8.13v12.01H.5Z"
        />
        <path
          fill="none"
          stroke="#9df10a"
          strokeWidth="1.57"
          d="M.5 15.05 8.34 8.54l5.39 4.38L23.5 4.88"
        />
      </svg>
    ),
  },

  Reddit: {
    label: "Reddit",
    bg: PAPER,
    color: "#ff4500",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" />
      </svg>
    ),
  },

  X: {
    label: "X",
    bg: "#000000",
    color: "#ffffff",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
      </svg>
    ),
  },

  Reuters: {
    label: "Reuters",
    bg: PAPER,
    color: "#d64000",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        {REUTERS_DOTS.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </svg>
    ),
  },

  Micron: {
    label: "Micron",
    bg: PAPER,
    color: "#0b0b0c",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 15.94h3.69c1.107 0 1.616-.44 1.616-1.69v-2.62c0-3.899 1.827-5.938 5.324-5.938 1.83 0 3.21.65 4.04 1.898.86-1.248 2.18-1.898 4.01-1.898 3.49 0 5.32 2.039 5.32 5.938v6.68h-2.6v-6.68c0-2.406-.97-3.566-2.72-3.566-1.76 0-2.73 1.16-2.73 3.566v6.68h-2.6v-6.68c0-2.406-.96-3.566-2.72-3.566-1.757 0-2.724 1.16-2.724 3.566v2.62c0 2.92-1.405 4.06-4.216 4.06H0v-2.37Z" />
      </svg>
    ),
  },

  SanDisk: {
    label: "SanDisk",
    bg: "#e10600",
    color: "#ffffff",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.809 2.4C2.616 2.4 0 4.967 0 8.16c0 2.06.457 4.39 3.673 5.64L24 21.6v-3.84c0-1.65-1.57-2.1-1.57-2.1L6.599 10.08c-.599-.216-.982-.601-.982-1.417A1.475 1.475 0 0 1 7.104 7.2H17.7c.72 0 1.48.585 1.48 1.368v1.345h4.8V2.4H5.809M0 16.8v4.8h4.751v-4.8H0Z" />
      </svg>
    ),
  },

  Nvidia: {
    label: "NVIDIA",
    bg: PAPER,
    color: "#76b900",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
      </svg>
    ),
  },

  Microsoft: {
    label: "Microsoft",
    bg: PAPER,
    node: (
      <svg viewBox="0 0 24 24">
        <rect x="1.5" y="1.5" width="9.5" height="9.5" fill="#f25022" />
        <rect x="13" y="1.5" width="9.5" height="9.5" fill="#7fba00" />
        <rect x="1.5" y="13" width="9.5" height="9.5" fill="#00a4ef" />
        <rect x="13" y="13" width="9.5" height="9.5" fill="#ffb900" />
      </svg>
    ),
  },

  Tesla: {
    label: "Tesla",
    bg: "#e31937",
    color: "#ffffff",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z" />
      </svg>
    ),
  },

  Congress: {
    label: "United States Congress",
    bg: "transparent",
    node: US_FLAG,
  },

  /* ---------- Categories that belong to you, not to a brand ---------- */

  Earnings: {
    label: "Earnings call",
    bg: "#536d91",
    color: "#e8ebf0",
    node: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },

  "Market data": {
    label: "Market data",
    bg: "#40516a",
    color: "#e8ebf0",
    node: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <line x1="7" y1="3" x2="7" y2="7" />
        <rect x="4.5" y="7" width="5" height="9" rx="1" />
        <line x1="7" y1="16" x2="7" y2="21" />
        <line x1="17" y1="3" x2="17" y2="9" />
        <rect x="14.5" y="9" width="5" height="7" rx="1" />
        <line x1="17" y1="16" x2="17" y2="21" />
      </svg>
    ),
  },

  "Your portfolio": {
    label: "Your portfolio",
    bg: "#4c7777",
    color: "#e8ebf0",
    node: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },

  "Your rule": {
    label: "Your rule",
    bg: "#5e697d",
    color: "#e8ebf0",
    node: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },

  "Paper portfolio": {
    label: "Paper portfolio",
    bg: "#647087",
    color: "#e8ebf0",
    node: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M10 2v7.31L4.7 17.6A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.8-3.4L14 9.3V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
};

export type LogoName = keyof typeof LOGOS;

export function BrandIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const logo = LOGOS[name] ?? LOGOS.SEC;
  return (
    <span
      className={className}
      role="img"
      aria-label={logo.label}
      style={{ color: logo.color, background: logo.bg }}
    >
      {logo.node}
    </span>
  );
}
