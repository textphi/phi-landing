"use client";

import { useEffect, useRef, useState } from "react";
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

const BROKER_POOL: Broker[] = [
  "wealthsimple",
  "schwab",
  "questrade",
  "fidelity",
  "interactive-brokers",
  "robinhood",
  "webull",
  "etrade",
];

const COUNTRY: Record<Broker, "CA" | "US"> = {
  wealthsimple: "CA",
  questrade: "CA",
  schwab: "US",
  fidelity: "US",
  "interactive-brokers": "US",
  robinhood: "US",
  webull: "US",
  etrade: "US",
};

const INITIAL_BROKERS: Broker[] = [
  "wealthsimple",
  "schwab",
  "questrade",
  "fidelity",
];

function BrokerLogo({ broker }: { broker: Broker }) {
  switch (broker) {
    case "wealthsimple":
      return <span className={`${styles.wordmark} ${styles.wealthsimple}`}>Wealthsimple</span>;
    case "schwab":
      return (
        <span className={`${styles.lockup} ${styles.schwab}`}>
          <svg viewBox="0 0 34 34" aria-hidden="true"><rect x="2" y="2" width="30" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M7 9h20M7 25h20" stroke="currentColor" strokeWidth="1" opacity=".6"/></svg>
          <span>Charles<br /><b>Schwab</b></span>
        </span>
      );
    case "questrade":
      return (
        <span className={`${styles.lockup} ${styles.questrade}`}>
          <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M4 23 16 5l14 6-8 18-7-9-6 8Z" fill="currentColor"/><path d="m16 5 6 24-7-9Z" fill="#1d1d1f" opacity=".7"/></svg>
          <span>Questrade</span>
        </span>
      );
    case "fidelity":
      return <span className={`${styles.wordmark} ${styles.fidelity}`}>Fidelity</span>;
    case "interactive-brokers":
      return (
        <span className={`${styles.lockup} ${styles.ibkr}`}>
          <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M5 27V16h5v11H5Zm9 0V9h5v18h-5Zm9 0V4h5v23h-5Z" fill="currentColor"/></svg>
          <span>Interactive<br /><b>Brokers</b></span>
        </span>
      );
    case "robinhood":
      return (
        <span className={`${styles.lockup} ${styles.robinhood}`}>
          <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M8 29c2-10 7-18 19-24-2 9-7 16-15 20l-4 4Zm6-7c3-1 7-4 10-10-4 3-8 6-10 10Z" fill="currentColor"/></svg>
          <span>Robinhood</span>
        </span>
      );
    case "webull":
      return (
        <span className={`${styles.lockup} ${styles.webull}`}>
          <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M5 10c5-6 14-7 21-2l-5 2c-5-2-10-1-13 3l-3-3Zm24 14c-5 6-14 7-21 2l5-2c5 2 10 1 13-3l3 3Z" fill="currentColor"/><path d="m10 18 7-8 7 6-7 8-7-6Z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
          <span>Webull</span>
        </span>
      );
    case "etrade":
      return <span className={`${styles.wordmark} ${styles.etrade}`}>E*TRADE</span>;
  }
}

export default function Brokerages() {
  const [brokers, setBrokers] = useState<Broker[]>(INITIAL_BROKERS);
  const [changing, setChanging] = useState<number | null>(null);
  const slotRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = window.setInterval(() => {
      const slot = slotRef.current;
      setChanging(slot);
      swapTimer = setTimeout(() => {
        setBrokers((current) => {
          const currentBroker = current[slot];
          const start = BROKER_POOL.indexOf(currentBroker);
          let replacement = currentBroker;

          for (let offset = 1; offset <= BROKER_POOL.length; offset += 1) {
            const candidate = BROKER_POOL[(start + offset) % BROKER_POOL.length];
            if (current.includes(candidate)) continue;

            const proposed = current.map((broker, index) =>
              index === slot ? candidate : broker,
            );
            const countries = new Set(proposed.map((broker) => COUNTRY[broker]));
            if (countries.has("CA") && countries.has("US")) {
              replacement = candidate;
              break;
            }
          }

          return current.map((broker, index) =>
            index === slot ? replacement : broker,
          );
        });
        slotRef.current = (slot + 1) % INITIAL_BROKERS.length;
      }, 320);
      settleTimer = setTimeout(() => setChanging(null), 700);
    }, 1900);

    return () => {
      window.clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
      if (settleTimer) clearTimeout(settleTimer);
    };
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
          {brokers.map((broker, index) => (
            <div
              className={`${styles.logoSlot} ${changing === index ? styles.changing : ""}`}
              key={index}
              aria-label={broker.replace("-", " ")}
            >
              <BrokerLogo broker={broker} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
