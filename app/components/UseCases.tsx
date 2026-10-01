"use client";

import { useEffect, useRef } from "react";
import styles from "./UseCases.module.css";

type Row = {
  side: "in" | "out";
  text?: string;
  link?: string;
  reaction?: "👀" | "❤️";
  chart?: { label: string; value: number }[];
};

type Card = { header: string; convo: Row[] };

const CARDS: Card[] = [
  {
    header: "Deep research",
    convo: [
      { side: "out", text: "dig into MU vs SNDK for me" },
      {
        side: "in",
        text: "On it. Checking SEC filings, earnings, memory pricing, and analyst estimates.",
      },
      {
        side: "in",
        text: "MU is cheaper with more HBM exposure. SNDK is more of a pure NAND play.",
      },
      {
        side: "in",
        text: "You're already 22% exposed to memory. Anything else you'd like to explore?",
      },
    ],
  },
  {
    header: "Mirror public trades",
    convo: [
      { side: "out", text: "mirror pelosi's trades with 200 bucks" },
      { side: "in", text: "Done. Shadowing her disclosures with $200 from here." },
      { side: "in", text: "I'll keep you updated on the orders to place." },
    ],
  },
  {
    header: "Proactive monitoring",
    convo: [
      {
        side: "in",
        text: "Trump just posted this. It could affect NVDA, and possibly GM given the tariff exposure.",
        link: "truthsocial.com/@realDonaldTrump/...",
      },
      { side: "in", text: "You have $2.6k in GM with similar exposure." },
      { side: "out", text: "lmk if either drops 5%", reaction: "👀" },
      { side: "in", text: "Understood. Monitoring both." },
    ],
  },
  {
    header: "Paper trade strategies",
    convo: [
      { side: "out", text: "yo phi, i wanna mess around with options" },
      { side: "out", text: "run the wheel on NVDA with $20k paper cash" },
      {
        side: "in",
        text: "Done. I'll keep it running and track it against simply holding NVDA.",
      },
    ],
  },
  {
    header: "Pull up an options chain",
    convo: [
      { side: "out", text: "pull up the NVDA calls for oct 16" },
      { side: "in", text: "NVDA's at $184. The $185 is $6.20 mid, 48% IV." },
      { side: "in", text: "$190 is $4.05, $200 is $1.98." },
      { side: "out", text: "whats my breakeven on the 190" },
      { side: "in", text: "$194.05. NVDA needs +5.5% by expiry." },
    ],
  },
  {
    header: "Rebalance in plain English",
    convo: [
      { side: "out", text: "i feel like i'm way too heavy in tech rn" },
      { side: "in", text: "Yes, you're at 43%." },
      { side: "out", text: "can we get that down to 30%?" },
      { side: "in", text: "Yes. Mapping out the trades now." },
    ],
  },
  {
    header: "Ask your portfolio",
    convo: [
      { side: "out", text: "show me what actually made me money this year" },
      {
        side: "in",
        chart: [
          { label: "NVDA", value: 2840 },
          { label: "MSFT", value: 1410 },
          { label: "AAPL", value: 620 },
          { label: "SNDK", value: 390 },
          { label: "Other", value: -540 },
        ],
      },
    ],
  },
  {
    header: "Remembers everything",
    convo: [
      { side: "out", text: "thinking about buying more TSLA" },
      { side: "in", text: "That would put you above your own limit." },
      {
        side: "in",
        text: "In May, you said you wouldn't let it exceed 15% of your portfolio. You're at 14.7% now.",
      },
      { side: "out", text: "bruh i forgot" },
      { side: "in", text: "That's what I'm here for.", reaction: "❤️" },
    ],
  },
];

function Chart({ rows, grouped }: { rows: NonNullable<Row["chart"]>; grouped: boolean }) {
  const max = Math.max(...rows.map((r) => Math.abs(r.value)));
  const posSum = rows.reduce((a, r) => (r.value > 0 ? a + r.value : a), 0);
  return (
    <div className={`${styles.chart}${grouped ? ` ${styles.grouped}` : ""}`}>
      {rows.map((r) => {
        const pos = r.value >= 0;
        const w = Math.max(7, (Math.abs(r.value) / max) * 100);
        const pct = Math.round((r.value / posSum) * 100);
        const color = pos ? "#30d158" : "#ff453a";
        return (
          <div className={styles.chartRow} key={r.label}>
            <span className={styles.chartLabel}>{r.label}</span>
            <span className={styles.chartTrack}>
              <span
                className={styles.chartFill}
                style={{ width: `${w}%`, background: color }}
              />
            </span>
            <span className={styles.chartValue} style={{ color }}>
              {(pos ? "+" : "-") +
                "$" +
                Math.abs(r.value).toLocaleString("en-US") +
                ` (${pct}%)`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function UseCard({ card, hidden }: { card: Card; hidden?: boolean }) {
  return (
    <article className={styles.card} aria-hidden={hidden || undefined}>
      <div className={styles.cardHeader}>{card.header}</div>
      <div className={styles.convo}>
        {card.convo.map((row, i) => {
          const grouped = i > 0 && card.convo[i - 1].side === row.side;
          if (row.chart) {
            return <Chart key={i} rows={row.chart} grouped={grouped} />;
          }
          const side = row.side === "in" ? styles.incoming : styles.outgoing;
          const g = grouped ? ` ${styles.grouped}` : "";
          const reactionClass = row.reaction ? ` ${styles.reacted}` : "";
          return (
            <div key={i} className={`${styles.bubble} ${side}${g}${reactionClass}`}>
              {row.text}
              {row.link && <span className={styles.msgLink}>{row.link}</span>}
              {row.reaction && (
                <span
                  className={styles.reaction}
                  role="img"
                  aria-label={row.reaction === "👀" ? "Phi reacted with eyes" : "You reacted with a heart"}
                >
                  {row.reaction}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function UseCases() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Three identical sets are rendered. We keep the scroll position inside the
    // middle set so a drag in either direction always has a full set of runway
    // before we wrap — and because the sets are identical, the wrap is invisible.
    const setWidth = () => el.scrollWidth / 3;

    // Position is tracked in JS, not read back from the DOM each frame: iOS
    // Safari truncates element.scrollLeft to an integer, so sub-pixel
    // per-frame increments (~0.7px) would round to zero and never advance.
    let pos = setWidth();
    el.scrollLeft = pos;
    let lastWritten = el.scrollLeft;

    const BASE_SPEED = 42; // px/s
    const HOVER_SPEED = 22; // px/s while hovered
    const HOLD_AFTER_INPUT = 1500; // ms to leave native scroll/momentum alone
    let idleUntil = 0;
    const holdOff = () => {
      idleUntil = performance.now() + HOLD_AFTER_INPUT;
    };
    el.addEventListener("pointerdown", holdOff);
    el.addEventListener("wheel", holdOff, { passive: true });
    el.addEventListener("touchmove", holdOff, { passive: true });

    let raf = 0;
    let last = performance.now();
    let speed = BASE_SPEED;

    const frame = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const seg = setWidth();

      if (now <= idleUntil) {
        // Hands off: let native scrolling (and iOS momentum) run untouched.
        // Only nudge by a whole set if we're about to run out of track.
        pos = el.scrollLeft;
        if (pos < seg * 0.5) {
          pos += seg;
          el.scrollLeft = pos;
        } else if (pos > seg * 2.5) {
          pos -= seg;
          el.scrollLeft = pos;
        }
        lastWritten = el.scrollLeft;
      } else {
        // Auto-advance. Adopt the user's position if they moved it since our
        // last write, then step forward and keep pos within the middle set.
        if (Math.abs(el.scrollLeft - lastWritten) > 1.5) pos = el.scrollLeft;
        if (!prefersReduced) {
          const targetSpeed = hoverRef.current ? HOVER_SPEED : BASE_SPEED;
          speed += (targetSpeed - speed) * Math.min(1, dt * 5);
          pos += speed * dt;
        }
        if (pos >= seg * 2) pos -= seg;
        else if (pos < seg) pos += seg;
        el.scrollLeft = pos;
        lastWritten = el.scrollLeft;
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", holdOff);
      el.removeEventListener("wheel", holdOff);
      el.removeEventListener("touchmove", holdOff);
    };
  }, []);

  return (
    <section id="use-cases" className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>
          Whatever you want to understand, track, or test.
        </h2>
        <p className={styles.sub}>Just text Phi.</p>
      </div>

      <div
        className={styles.marquee}
        ref={viewportRef}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        {/* Three identical sets: auto-advances, drags either way, wraps seamlessly. */}
        <div className={styles.track}>
          {CARDS.map((card, i) => (
            <UseCard key={`a-${i}`} card={card} />
          ))}
          {CARDS.map((card, i) => (
            <UseCard key={`b-${i}`} card={card} hidden />
          ))}
          {CARDS.map((card, i) => (
            <UseCard key={`c-${i}`} card={card} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
