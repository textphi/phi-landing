"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Engine.module.css";
import { BrandIcon } from "./SourceIcons";

/* ---------- Data ---------- */

/*
 * `logo` is explicit rather than inferred from the copy: a row shows the real
 * mark of whoever the item belongs to — the publisher when the source is a
 * brand (SEC, Reddit, Reuters...), the company when the source is a category
 * ("Earnings" -> Microsoft, "Market data" -> Tesla).
 */
const SOURCES: { src: string; text: string; logo: string }[] = [
  { src: "SEC", text: "MU 10-Q filed", logo: "SEC" },
  { src: "Yahoo Finance", text: "NVDA -6.2% today", logo: "Yahoo Finance" },
  { src: "Reddit", text: "r/stocks SNDK discussion spiking", logo: "Reddit" },
  { src: "X", text: "semiconductor export limits trending", logo: "X" },
  { src: "Earnings", text: "MSFT Q4 call transcript available", logo: "Microsoft" },
  { src: "Congress", text: "Pelosi new transaction disclosed", logo: "Congress" },
  { src: "News", text: "Reuters - AI chip restrictions", logo: "Reuters" },
  { src: "Market data", text: "TSLA volume 2.4x average", logo: "Tesla" },
  { src: "Your portfolio", text: "18% NVDA", logo: "Nvidia" },
  { src: "Your rule", text: "max position 15%", logo: "Your rule" },
  { src: "Paper portfolio", text: "hedge experiment #3", logo: "Paper portfolio" },
];

/** What the loader is doing, keyed to how far through the pass it is. */
const STAGES: { until: number; label: string }[] = [
  { until: 0.18, label: "reading filings" },
  { until: 0.36, label: "pulling fundamentals" },
  { until: 0.54, label: "checking transcripts" },
  { until: 0.74, label: "mapping to your holdings" },
  { until: 0.99, label: "ranking what matters" },
  { until: 1.01, label: "done" },
];

/*
 * Each message traces back to a specific row in the left column, so the chain
 * reads left to right: raw signal -> Phi -> the text you actually get.
 */
const MESSAGES: {
  text: string;
  from: { logo: string; src: string; item: string };
}[] = [
  {
    text: "microsoft's q4 call is out. azure beat, but they guided margins lower for next quarter",
    from: {
      logo: "Microsoft",
      src: "Earnings",
      item: "MSFT Q4 call transcript",
    },
  },
  {
    text: "pelosi disclosed a new semi position 20 min ago. want me to shadow it?",
    from: {
      logo: "Congress",
      src: "Congress",
      item: "Pelosi new transaction disclosed",
    },
  },
];

/* Cycle timings, in ms from the start of a pass. */
const FILL_MS = 2500;
const SEND_MS = [2900, 3800];
const CYCLE_MS = 9000;
const TICK_MS = 60;

/** Circumference of the progress ring: r = 54. */
const RING = 2 * Math.PI * 54;

/* ---------- Sub-components ---------- */

function Chip({ src, text, logo, i }: { src: string; text: string; logo: string; i: number }) {
  return (
    <div className={styles.chip} style={{ ["--i" as string]: i }} aria-hidden="true">
      <span className={styles.chipIcon}>
        <BrandIcon name={logo} />
      </span>
      <span className={styles.chipBody}>
        <span className={styles.chipSrc}>{src}</span>
        <span className={styles.chipText}>{text}</span>
      </span>
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className={styles.arrow} aria-hidden="true">
      <span className={styles.wire} data-active={active} />
      <span className={styles.arrowHead} />
    </div>
  );
}

/* ---------- Section ---------- */

export default function Engine() {
  const [elapsed, setElapsed] = useState(0);
  const [still, setStill] = useState(false);
  const [running, setRunning] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* The pass belongs to whoever scrolls to it, so it waits to be seen. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const card = cardRef.current;
    if (!card) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setRunning(entry.isIntersecting);
        /* Restart from zero so it is always seen from the top. */
        if (entry.isIntersecting) setElapsed(0);
      },
      { threshold: 0.25 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setElapsed((ms) => (ms + TICK_MS >= CYCLE_MS ? 0 : ms + TICK_MS)),
      TICK_MS
    );
    return () => clearInterval(id);
  }, [running]);

  const progress = still ? 1 : Math.min(1, elapsed / FILL_MS);
  const percent = Math.round(progress * 100);
  const sent = (i: number) => still || elapsed >= SEND_MS[i];

  /* The last beat belongs to the messages, not to the loader. */
  const status =
    progress < 1
      ? (STAGES.find((s) => progress < s.until) ?? STAGES[0]).label
      : sent(MESSAGES.length - 1)
        ? "sent to your phone"
        : "texting you";

  return (
    <section id="engine" className={styles.section}>
      <div className={styles.head}>
        <h2 className={styles.heading}>Research that runs 24/7</h2>
        <p className={styles.sub}>
          Filings, earnings, markets, news, social, and more. Phi keeps digging
          even when you&rsquo;re not.
        </p>
      </div>

      <div className={styles.card} ref={cardRef}>
        <div className={styles.flow}>
          {/* Left: raw signals coming in */}
          <div className={styles.sourcesBox}>
            <div className={styles.sources}>
              <div className={styles.sourcesTrack}>
                {SOURCES.map((s, i) => (
                  <Chip key={`a${i}`} src={s.src} text={s.text} logo={s.logo} i={i} />
                ))}
                {SOURCES.map((s, i) => (
                  <Chip key={`b${i}`} src={s.src} text={s.text} logo={s.logo} i={i} />
                ))}
              </div>
            </div>
          </div>

          <Arrow active={progress < 1} />

          {/* Middle: Phi, working through a known amount of work */}
          <div className={styles.engineWrap}>
            <div className={styles.ring}>
              <svg
                className={styles.ringSvg}
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle className={styles.ringTrack} cx="60" cy="60" r="54" />
                <circle
                  className={styles.ringFill}
                  cx="60"
                  cy="60"
                  r="54"
                  style={{
                    strokeDasharray: RING,
                    strokeDashoffset: RING * (1 - progress),
                  }}
                />
              </svg>
              <div className={styles.ringCore}>
                <span className={styles.phiMark}>&#966;</span>
                <span className={styles.percent}>{percent}%</span>
              </div>
            </div>
            <div className={styles.statusLine} aria-live="polite">
              <span key={status} className={styles.statusText}>
                {status}
              </span>
            </div>
          </div>

          <Arrow active={progress >= 1} />

          {/* Right: what actually lands on your phone */}
          <div className={styles.outbox}>
            {/*
             * The bubbles hold their space from the start (they only scale in),
             * so the typing indicator can sit over the first slot without
             * shifting anything when the message lands.
             *
             * The sender label is taken out of flow so the two message groups
             * sit symmetrically about the thread's centre. That puts the gap
             * between them exactly on the incoming arrow, which can then stay
             * level with the arrow on the other side.
             */}
            <div className={styles.thread}>
              <div className={styles.sender}>
                <span className={styles.senderMark}>
                  <i className={styles.senderGlyph}>&#966;</i>
                </span>
                Phi
              </div>

              <div
                className={styles.typing}
                data-in={!sent(0)}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </div>

              {MESSAGES.map((m, i) => (
                <div className={styles.message} key={m.text}>
                  <div className={styles.bubble} data-in={sent(i)}>
                    {sent(i) && (
                      <>
                        <span className={styles.ripple} aria-hidden="true" />
                        <span
                          className={`${styles.ripple} ${styles.ripple2}`}
                          aria-hidden="true"
                        />
                      </>
                    )}
                    {m.text}
                  </div>
                  <div className={styles.trace} data-in={sent(i)}>
                    <span className={styles.traceIcon}>
                      <BrandIcon name={m.from.logo} />
                    </span>
                    <span className={styles.traceSrc}>{m.from.src}</span>
                    <span className={styles.traceItem}>{m.from.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
