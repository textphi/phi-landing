"use client";

import { useEffect, useRef } from "react";
import styles from "./UseCases.module.css";

type Row = {
  side: "in" | "out";
  text?: string;
  link?: string;
  chart?: { label: string; value: number }[];
};

type Card = { header: string; convo: Row[] };

const CARDS: Card[] = [
  {
    header: "Mirror public trades",
    convo: [
      { side: "out", text: "mirror pelosi's trades with 200 bucks" },
      { side: "in", text: "done. shadowing her disclosures with $200 from here" },
      { side: "in", text: "i'll keep you posted on the orders to place" },
    ],
  },
  {
    header: "Deep research",
    convo: [
      { side: "out", text: "dig into MU vs SNDK for me" },
      {
        side: "in",
        text: "on it. checking SEC filings, earnings, memory pricing + analyst estimates",
      },
      {
        side: "in",
        text: "MU is cheaper with more HBM exposure. SNDK is more of a pure NAND bet",
      },
      {
        side: "in",
        text: "btw, you're already 22% exposed to memory. anything else you wanna dig into?",
      },
    ],
  },
  {
    header: "Proactive monitoring",
    convo: [
      {
        side: "in",
        text: "TSLA just dropped 7%. trump posted about new EV tariffs 20 min ago + it looks related",
        link: "truthsocial.com/@realDonaldTrump/...",
      },
      { side: "in", text: "you've also got $2.6k in GM with similar exposure" },
      { side: "out", text: "lmk if GM drops 5% too" },
      { side: "in", text: "got you. watching it" },
    ],
  },
  {
    header: "Run strategies",
    convo: [
      { side: "out", text: "yo phi, i wanna mess around with options" },
      { side: "out", text: "run the wheel on NVDA with $20k paper cash" },
      {
        side: "in",
        text: "done. i'll keep it running + track it against just holding NVDA",
      },
    ],
  },
  {
    header: "Rebalance in plain English",
    convo: [
      { side: "out", text: "i feel like i'm way too heavy in tech rn" },
      { side: "in", text: "yeah, you're at 43%" },
      { side: "out", text: "can we get that down to 30%?" },
      { side: "in", text: "yep. mapping out the trades now" },
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
    header: "Never loses context",
    convo: [
      { side: "out", text: "thinking about buying more TSLA" },
      { side: "in", text: "wait lol, you're about to break your own rule" },
      {
        side: "in",
        text: "in may you said you wouldn't let it get above 15% of your portfolio. you're at 14.7% rn",
      },
      { side: "out", text: "bruh i forgot" },
      { side: "in", text: "i didn't" },
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
          return (
            <div key={i} className={`${styles.bubble} ${side}${g}`}>
              {row.text}
              {row.link && <span className={styles.msgLink}>{row.link}</span>}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function UseCases() {
  const viewportRef = useRef<HTMLDivElement>(null);

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

    const SPEED = 42; // px/s
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
        if (!prefersReduced) pos += SPEED * dt;
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

      <div className={styles.marquee} ref={viewportRef}>
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
