"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Memory.module.css";

/* ---------- Data ---------- */

/*
 * Each card is one thing Phi has picked up over time. The label names the
 * kind of thing it is (a rule you set, a view you hold, a fact about your
 * life) so a loose pile of notes reads as a profile, not a database.
 */
const MEMORIES: { label: string; text: string }[] = [
  { label: "your rule", text: "Don’t let any single position get above 20%" },
  { label: "your thesis", text: "You’re bullish on AI infrastructure for the next 5 years" },
  { label: "your watchlist", text: "You keep checking AMD but haven’t bought yet" },
  { label: "your pattern", text: "You tend to sell too quickly after sharp drops" },
  { label: "your life", text: "Job interview on Thursday" },
];

/* The single answer all of that context folds into. */
const RESPONSE =
  "NVDA’s down 7% on the chip headline. usually where you sell too fast, but your AI infra thesis runs 5 years and you’re still under your 20% cap. AMD’s on sale too, the one you keep eyeing. go focus on your interview thursday, i’ll watch this.";

/* Five paths fan from evenly spaced points on the left to one point on the
 * right, so many notes visibly converge on a single response. */
const FAN_Y = [26, 78, 130, 182, 234];

/* ---------- Section ---------- */

export default function Memory() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /*
   * Like the engine, the reveal belongs to whoever scrolls to it — and it
   * replays every time. Tracking `isIntersecting` in both directions resets
   * the section as it leaves view, so scrolling back to it (from either side)
   * runs the whole convergence again from the top.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="memory" className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>It remembers everything that matters.</h2>
        <p className={styles.sub}>
          Over time, Phi builds a model of you as an investor, not just a record
          of your portfolio.
        </p>
      </div>

      <div className={styles.card} ref={ref}>
        <div className={styles.flow} data-visible={visible}>
          {/* Left: the pile of things Phi has learned */}
          <div className={styles.memories}>
            {MEMORIES.map((m, i) => (
              <div
                className={styles.memory}
                style={{ ["--i" as string]: i }}
                key={m.text}
              >
                <div className={styles.memInner}>
                  <span className={styles.memDot} aria-hidden="true" />
                  <span className={styles.memBody}>
                    <span className={styles.memLabel}>{m.label}</span>
                    <span className={styles.memText}>{m.text}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: the context flowing toward one response */}
          <div className={styles.converge} aria-hidden="true">
            <svg
              className={styles.fan}
              viewBox="0 0 120 260"
              preserveAspectRatio="none"
            >
              {FAN_Y.map((y, i) => {
                const d = `M0 ${y} C 62 ${y}, 58 130, 120 130`;
                return (
                  <g key={y}>
                    <path className={styles.fanLine} d={d} />
                    <path
                      className={styles.fanFlow}
                      d={d}
                      style={{ ["--d" as string]: i }}
                    />
                  </g>
                );
              })}
            </svg>
            <span className={styles.drop} />
          </div>

          {/* Right: the one answer it all folds into */}
          <div className={styles.answer}>
            <div className={styles.sender}>
              <span className={styles.senderMark}>
                <i className={styles.senderGlyph}>&#966;</i>
              </span>
              Phi
            </div>
            <div className={styles.bubble}>{RESPONSE}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
