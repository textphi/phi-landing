"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./PhoneMockup.module.css";

/* Tiny inline icons so the frame stays crisp at any scale and ships no assets. */

function Cellular() {
  return (
    <svg viewBox="0 0 18 12" className={styles.statusIcon} aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="0.7" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.7" />
      <rect x="10" y="3" width="3" height="9" rx="0.7" />
      <rect x="15" y="0.5" width="3" height="11.5" rx="0.7" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg viewBox="0 0 16 12" className={styles.statusIcon} aria-hidden="true">
      <path d="M8 2.4c2.5 0 4.8 1 6.5 2.6l-1.4 1.5A7.4 7.4 0 0 0 8 4.5 7.4 7.4 0 0 0 2.9 6.5L1.5 5C3.2 3.4 5.5 2.4 8 2.4Z" />
      <path d="M8 6.1c1.5 0 2.9.6 3.9 1.6l-1.5 1.6A3.4 3.4 0 0 0 8 8.3c-.9 0-1.7.4-2.4 1L4.1 7.7A5.6 5.6 0 0 1 8 6.1Z" />
      <path d="M8 9.7c.6 0 1.2.3 1.6.7L8 12l-1.6-1.6c.4-.4 1-.7 1.6-.7Z" />
    </svg>
  );
}

function Battery() {
  return (
    <svg viewBox="0 0 28 12" className={styles.batteryIcon} aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="11"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="18" height="8" rx="1.8" fill="currentColor" />
      <path
        d="M25 4v4c1 -.3 1.5 -1 1.5 -2S26 4.3 25 4Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 12 20" className={styles.backIcon} aria-hidden="true">
      <path
        d="M10 2 2 10l8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 8 12" className={styles.nameChevron} aria-hidden="true">
      <path
        d="M1.5 1 6 6l-4.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 16" className={styles.videoIcon} aria-hidden="true">
      <rect x="0" y="1" width="16" height="14" rx="4" fill="currentColor" />
      <path d="M18 6l5-3.2v10.4L18 10V6Z" fill="currentColor" />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 20 20" className={styles.plusIcon} aria-hidden="true">
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Mic() {
  return (
    <svg viewBox="0 0 14 20" className={styles.micIcon} aria-hidden="true">
      <rect x="4" y="1" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M1.5 9a5.5 5.5 0 0 0 11 0M7 14.5V18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendArrow() {
  return (
    <svg viewBox="0 0 20 20" className={styles.sendIcon} aria-hidden="true">
      <path
        d="M10 16V5M5 10l5-5 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Conversation script ---------------- */

// Phi's first turn is two separate bubbles; so is the research turn.
const A1 =
  "trump just posted about new chip tariffs. NVDA is down 6%, people on X think more restrictions could be coming";
const A2 = "and you've got 18% of your portfolio in it";
const U1 = "am i cooked";
const B1 =
  "lol give me a sec, checking similar tariff shocks + NVDA's latest SEC filing";
const B2 =
  "nah. most of the past moves faded, and nothing i found changes the business yet. you're still up 31% on it";
const U2 = "lmk if that changes";
const C1 = "got you. i'm watching it";

type Msg = {
  id: number;
  side: "in" | "out";
  paras: string[];
  delivered?: boolean;
};

// "Delivered" only sits under the most recent sent message.
const clearDelivered = (m: Msg[]) =>
  m.map((x) => (x.delivered ? { ...x, delivered: false } : x));

const FULL: Msg[] = [
  { id: 1, side: "in", paras: [A1] },
  { id: 2, side: "in", paras: [A2] },
  { id: 3, side: "out", paras: [U1] },
  { id: 4, side: "in", paras: [B1] },
  { id: 5, side: "in", paras: [B2] },
  { id: 6, side: "out", paras: [U2], delivered: true },
  { id: 7, side: "in", paras: [C1] },
];

export default function PhoneMockup() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion: show the finished conversation, no looping.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setMessages(FULL);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    async function typeInto(text: string) {
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return;
        setDraft(text.slice(0, i));
        await sleep(35 + Math.random() * 20); // ~35–55ms per char
      }
    }

    async function run() {
      while (!cancelled) {
        setVisible(true);
        setMessages([]);
        setTyping(false);
        setDraft("");

        await sleep(450); // short initial pause
        if (cancelled) return;

        // Phi turn 1 — first bubble
        setTyping(true);
        await sleep(800);
        if (cancelled) return;
        setTyping(false);
        setMessages((m) => [...m, { id: 1, side: "in", paras: [A1] }]);
        await sleep(900);
        if (cancelled) return;

        // Phi turn 1 — second bubble
        setTyping(true);
        await sleep(500);
        if (cancelled) return;
        setTyping(false);
        setMessages((m) => [...m, { id: 2, side: "in", paras: [A2] }]);
        await sleep(1100);
        if (cancelled) return;

        // User: "am i cooked"
        await typeInto(U1);
        if (cancelled) return;
        await sleep(200);
        if (cancelled) return;
        setDraft("");
        setMessages((m) => [
          ...clearDelivered(m),
          { id: 3, side: "out", paras: [U1], delivered: true },
        ]);
        await sleep(350);
        if (cancelled) return;

        // Phi turn 2 — "give me a sec"
        setTyping(true);
        await sleep(600);
        if (cancelled) return;
        setTyping(false);
        setMessages((m) => [...m, { id: 4, side: "in", paras: [B1] }]);
        await sleep(1000);
        if (cancelled) return;

        // Deeper research — the longest beat, then the answer
        await sleep(1300);
        if (cancelled) return;
        setTyping(true);
        await sleep(950);
        if (cancelled) return;
        setTyping(false);
        setMessages((m) => [...m, { id: 5, side: "in", paras: [B2] }]);
        await sleep(1600);
        if (cancelled) return;

        // User: "lmk if that changes"
        await typeInto(U2);
        if (cancelled) return;
        await sleep(200);
        if (cancelled) return;
        setDraft("");
        setMessages((m) => [
          ...clearDelivered(m),
          { id: 6, side: "out", paras: [U2], delivered: true },
        ]);
        await sleep(350);
        if (cancelled) return;

        // Phi turn 3 — sign-off
        setTyping(true);
        await sleep(500);
        if (cancelled) return;
        setTyping(false);
        setMessages((m) => [...m, { id: 7, side: "in", paras: [C1] }]);

        // Hold the finished conversation
        await sleep(3500);
        if (cancelled) return;

        // Smooth fade-out, then loop resets at the top
        setVisible(false);
        await sleep(450);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={styles.phone}
      role="img"
      aria-label="An iMessage conversation with Phi about a stock move."
    >
      <div className={styles.screen}>
        {/* Status bar */}
        <div className={styles.statusBar}>
          <span className={styles.time}>9:41</span>
          <div className={styles.statusRight}>
            <Cellular />
            <Wifi />
            <Battery />
          </div>
        </div>

        {/* Conversation header */}
        <div className={styles.chatHeader}>
          <span className={styles.back}>
            <ChevronLeft />
          </span>
          <div className={styles.contact}>
            <div className={styles.avatar}>&#966;</div>
            <div className={styles.contactName}>
              Phi <ChevronRight />
            </div>
          </div>
          <span className={styles.videoBtn}>
            <VideoIcon />
          </span>
        </div>

        {/* Messages */}
        <div className={styles.messages} style={{ opacity: visible ? 1 : 0 }}>
          <div className={styles.timestamp}>
            <span className={styles.timestampBold}>Today</span> 9:41 AM
          </div>

          {messages.map((m, idx) => {
            // Tighten the gap when a message follows one from the same sender.
            const grouped = idx > 0 && messages[idx - 1].side === m.side;
            const g = grouped ? ` ${styles.grouped}` : "";
            return m.side === "in" ? (
              <div
                key={m.id}
                className={`${styles.bubble} ${styles.incoming}${g}`}
              >
                {m.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <Fragment key={m.id}>
                <div className={`${styles.outgoingRow}${g}`}>
                  <div className={`${styles.bubble} ${styles.outgoing}`}>
                    {m.paras[0]}
                  </div>
                </div>
                {m.delivered && (
                  <div className={styles.delivered}>Delivered</div>
                )}
              </Fragment>
            );
          })}

          {typing && (
            <div
              className={`${styles.bubble} ${styles.incoming} ${styles.typing}`}
            >
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className={styles.inputBar}>
          <span className={styles.plus}>
            <Plus />
          </span>
          <div className={styles.inputField}>
            <span className={styles.inputText}>
              {draft ? (
                <>
                  <span className={styles.draftText}>{draft}</span>
                  <span className={styles.caret} />
                </>
              ) : (
                <span className={styles.placeholder}>iMessage</span>
              )}
            </span>
            {draft ? (
              <span className={styles.send}>
                <SendArrow />
              </span>
            ) : (
              <span className={styles.mic}>
                <Mic />
              </span>
            )}
          </div>
        </div>

        <div className={styles.homeIndicator} />
      </div>
    </div>
  );
}
