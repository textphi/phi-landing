"use client";

import { CSSProperties, useEffect, useState } from "react";
import styles from "./Brokerages.module.css";

type Broker =
  | "wealthsimple"
  | "schwab"
  | "questrade"
  | "fidelity"
  | "interactive-brokers"
  | "robinhood"
  | "webull"
  | "etrade";

// aspect = width / height of each logo's (cropped) artwork; scale optically
// balances logos whose lockups sit taller/shorter than the wordmark average.
const LOGOS: Record<Broker, { file: string; label: string; aspect: number; scale: number }> = {
  wealthsimple: { file: "wealthsimple", label: "Wealthsimple", aspect: 6.07, scale: 1 },
  schwab: { file: "schwab", label: "Charles Schwab", aspect: 5.95, scale: 0.92 },
  questrade: { file: "questrade", label: "Questrade", aspect: 2.15, scale: 1.72 },
  fidelity: { file: "fidelity", label: "Fidelity", aspect: 4.96, scale: 1.35 },
  "interactive-brokers": { file: "ibkr", label: "Interactive Brokers", aspect: 6.58, scale: 1.04 },
  robinhood: { file: "robinhood", label: "Robinhood", aspect: 5.1, scale: 1.04 },
  webull: { file: "webull", label: "Webull", aspect: 4.64, scale: 1.1 },
  etrade: { file: "etrade", label: "E*TRADE", aspect: 7.33, scale: 0.9 },
};

// Two modes of four brokerages; a Canadian brokerage anchors each set so the
// row always reflects "Canada and the United States".
const GROUP_A: Broker[] = ["wealthsimple", "schwab", "robinhood", "fidelity"];
const GROUP_B: Broker[] = ["questrade", "interactive-brokers", "webull", "etrade"];

const SLOTS = GROUP_A.length;
const STEP_MS = 70; // stagger between adjacent slots — small = rapid cascade
const HOLD_MS = 2200; // how long each set of four rests before flipping

function Logo({ broker }: { broker: Broker }) {
  const { file, label, aspect, scale } = LOGOS[broker];
  const style = {
    "--aspect": aspect,
    "--scale": scale,
    WebkitMaskImage: `url(/brokerages/${file}.svg)`,
    maskImage: `url(/brokerages/${file}.svg)`,
  } as CSSProperties;
  return <span className={styles.logo} style={style} role="img" aria-label={label} />;
}

export default function Brokerages() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setFlipped((f) => !f), HOLD_MS);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className={styles.section} aria-labelledby="brokerages-heading">
      <div className={styles.inner}>
        <h2 id="brokerages-heading" className={styles.heading}>
          Secure portfolio connections powered by SnapTrade
        </h2>
        <p className={styles.subheading}>
          Read-only access across leading brokerages in Canada and the United States
        </p>

        <div className={styles.logos} aria-label="Supported brokerages">
          {Array.from({ length: SLOTS }).map((_, index) => {
            const a = LOGOS[GROUP_A[index]];
            const b = LOGOS[GROUP_B[index]];
            // size each card to the larger of its two faces so neither clips
            const widthFactor = Math.max(a.scale * a.aspect, b.scale * b.aspect);
            const heightFactor = Math.max(a.scale, b.scale);
            return (
              <div className={styles.slot} key={index}>
                <div
                  className={`${styles.flipper} ${flipped ? styles.flipped : ""}`}
                  style={
                    {
                      // stagger the cascade so the flip sweeps right -> left
                      transitionDelay: `${index * STEP_MS}ms`,
                      "--wf": widthFactor,
                      "--hf": heightFactor,
                    } as CSSProperties
                  }
                >
                  <span className={`${styles.face} ${styles.front}`}>
                    <Logo broker={GROUP_A[index]} />
                  </span>
                  <span className={`${styles.face} ${styles.back}`}>
                    <Logo broker={GROUP_B[index]} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
