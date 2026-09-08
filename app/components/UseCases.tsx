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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Three copies of the set: keep the scroll position inside the middle copy
    // so the user can drag/scroll either direction and it wraps seamlessly.
    const seg = () => el.scrollWidth / 3;
    el.scrollLeft = seg();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // no auto-scroll; manual swipe still works

    let raf = 0;
    let last = performance.now();
    const BASE = 42; // px/s
    const HOVER = 12; // px/s when hovered (slower, never stops)

    const loop = (now: number) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      el.scrollLeft += (hoverRef.current ? HOVER : BASE) * dt;
      const s = seg();
      if (el.scrollLeft >= 2 * s) el.scrollLeft -= s;
      else if (el.scrollLeft < s) el.scrollLeft += s;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
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
        ref={marqueeRef}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <div className={styles.track}>
          {CARDS.map((card, i) => (
            <UseCard key={`a-${i}`} card={card} />
          ))}
          {/* Two duplicate sets for a seamless, bi-directional loop */}
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
