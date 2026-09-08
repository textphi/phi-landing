"use client";

import { useEffect, useState } from "react";
import styles from "./Engine.module.css";
import { SourceIcon } from "./SourceIcons";

/* ---------- Data ---------- */

const SOURCES: { src: string; text: string }[] = [
  { src: "SEC", text: "MU 10-Q filed" },
  { src: "Yahoo Finance", text: "NVDA −6.2% today" },
  { src: "Reddit", text: "r/stocks SNDK discussion spiking" },
  { src: "X", text: "semiconductor export limits trending" },
  { src: "Earnings", text: "MSFT Q4 call transcript available" },
  { src: "Congress", text: "Pelosi new transaction disclosed" },
  { src: "News", text: "Reuters — AI chip restrictions" },
  { src: "Market data", text: "TSLA volume 2.4x average" },
  { src: "Your portfolio", text: "18% NVDA" },
  { src: "Your rule", text: "max position 15%" },
  { src: "Paper portfolio", text: "hedge experiment #3" },
];

const STATES = [
  "reading filing",
  "pulling fundamentals",
  "checking transcript",
  "comparing sentiment",
  "mapping to your holdings",
  "tracking disclosure",
  "testing scenario",
  "ranking what matters",
];

const OUTPUTS: {
  tag: string;
  label: string;
  value: string;
  status: string;
  live: boolean;
}[] = [
  {
    tag: "Understand",
    label: "Question",
    value: "why did MU drop?",
    status: "Research complete",
    live: false,
  },
  {
    tag: "Watch",
    label: "Instruction",
    value: "watch Pelosi's disclosures",
    status: "Tracking",
    live: true,
  },
  {
    tag: "Test",
    label: "Instruction",
    value: "what if I hedge semis with puts?",
    status: "Simulation running",
    live: true,
  },
  {
    tag: "Remember",
    label: "Instruction",
    value: "don't let TSLA exceed 15%",
    status: "Saved",
    live: false,
  },
];

/* ---------- Sub-components ---------- */

function Chip({ src, text, i }: { src: string; text: string; i: number }) {
  return (
    <div className={styles.chip} style={{ ["--i" as string]: i }} aria-hidden="true">
      <SourceIcon name={src} className={styles.chipIcon} />
      <span className={styles.chipBody}>
        <span className={styles.chipSrc}>{src}</span>
        <span className={styles.chipText}>{text}</span>
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className={styles.arrow} aria-hidden="true">
      <span className={styles.wire} />
      <span className={styles.head} />
    </div>
  );
}

export default function Engine() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % STATES.length), 2100);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="engine" className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>Research that keeps running</h2>
        <p className={styles.sub}>
          Filings, earnings, markets, news, social, and more. Phi keeps digging
          even when you&rsquo;re not.
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.flow}>
          {/* Left: sources grouped in one box */}
          <div className={styles.sourcesBox}>
            <div className={styles.sources}>
              <div className={styles.sourcesTrack}>
                {SOURCES.map((s, i) => (
                  <Chip key={`a${i}`} src={s.src} text={s.text} i={i} />
                ))}
                {SOURCES.map((s, i) => (
                  <Chip key={`b${i}`} src={s.src} text={s.text} i={i} />
                ))}
              </div>
            </div>
          </div>

          <Arrow />

          {/* Center: Phi engine */}
          <div className={styles.engineWrap}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.engine}>
              <div className={styles.scan} aria-hidden="true" />
              <div className={styles.phiMark}>&#966;</div>
              <div className={styles.statusLine} aria-live="polite">
                <span key={idx} className={styles.statusText}>
                  {STATES[idx]}
                </span>
                <span className={styles.dots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className={styles.bars} aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span key={i} style={{ ["--b" as string]: i }} />
                ))}
              </div>
            </div>
          </div>

          <Arrow />

          {/* Right: outputs grouped in one box */}
          <div className={styles.outputsBox}>
            {OUTPUTS.map((o) => (
              <div className={styles.output} key={o.tag}>
                <div className={styles.outTag}>{o.tag}</div>
                <div className={styles.outValue}>
                  <span className={styles.outLabel}>{o.label}:</span> {o.value}
                </div>
                <div className={styles.outStatus}>
                  <span
                    className={`${styles.statusDot} ${
                      o.live ? styles.dotLive : styles.dotDone
                    }`}
                  />
                  {o.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
