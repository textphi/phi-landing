import type { ReactNode } from "react";

/*
 * Local, inlined source icons (no remote hotlinks).
 * - X and Reddit marks use the standard Simple Icons paths (CC0).
 * - Category icons (landmark, mic, pie, shield, flask, candles) are
 *   Lucide-style strokes (ISC).
 * - Yahoo and Reuters are compact, brand-recognizable marks.
 * Muted / mostly-monochrome so the panel stays premium; a little brand
 * colour only where it aids instant recognition.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, { node: ReactNode; color: string }> = {
  SEC: {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <polygon points="12 2 20 7 4 7" />
        <line x1="4" y1="10" x2="4" y2="17" />
        <line x1="9" y1="10" x2="9" y2="17" />
        <line x1="15" y1="10" x2="15" y2="17" />
        <line x1="20" y1="10" x2="20" y2="17" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </svg>
    ),
  },
  "Yahoo Finance": {
    color: "#8f74ff",
    node: (
      <svg width="21" height="21" viewBox="0 0 24 24">
        <text
          x="11"
          y="17.5"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="16"
          fill="currentColor"
        >
          y!
        </text>
      </svg>
    ),
  },
  Reddit: {
    color: "#ff5b33",
    node: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
  },
  X: {
    color: "#cfd0d3",
    node: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  Earnings: {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  Congress: {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <line x1="12" y1="2" x2="12" y2="3.4" />
        <path d="M7 9a5 5 0 0 1 10 0" />
        <line x1="5.5" y1="9" x2="18.5" y2="9" />
        <line x1="8" y1="9" x2="8" y2="17" />
        <line x1="12" y1="9" x2="12" y2="17" />
        <line x1="16" y1="9" x2="16" y2="17" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    ),
  },
  News: {
    color: "#f5872e",
    node: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        {[
          [19, 12],
          [16.95, 7.05],
          [12, 5],
          [7.05, 7.05],
          [5, 12],
          [7.05, 16.95],
          [12, 19],
          [16.95, 16.95],
          [12, 12],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" />
        ))}
      </svg>
    ),
  },
  "Market data": {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <line x1="6" y1="4" x2="6" y2="20" />
        <rect x="4.4" y="8" width="3.2" height="7" rx="0.6" />
        <line x1="12" y1="6" x2="12" y2="18" />
        <rect x="10.4" y="9" width="3.2" height="6" rx="0.6" />
        <line x1="18" y1="3" x2="18" y2="17" />
        <rect x="16.4" y="6" width="3.2" height="7" rx="0.6" />
      </svg>
    ),
  },
  "Your portfolio": {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  "Your rule": {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  "Paper portfolio": {
    color: "#9a9ca3",
    node: (
      <svg width="20" height="20" viewBox="0 0 24 24" {...stroke}>
        <path d="M10 2v7.31L4.7 17.6A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.8-3.4L14 9.3V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
};

export function SourceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const ic = ICONS[name] ?? ICONS.SEC;
  return (
    <span className={className} style={{ color: ic.color }} aria-hidden="true">
      {ic.node}
    </span>
  );
}
