"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import PhoneMockup from "./PhoneMockup";

type SubmissionState = "idle" | "submitting" | "error";

export default function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [phone, setPhone] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const submitWaitlist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accepted || !phone.trim() || submissionState === "submitting") return;

    setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          agreedToTerms: accepted,
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "We couldn’t add you right now. Please try again.");
      }

      setPhone("");
      setAccepted(false);
      setSubmissionState("idle");
      setSubmissionMessage("");
      setWaitlistOpen(false);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t add you right now. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (!waitlistOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWaitlistOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [waitlistOpen]);

  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} aria-hidden="true" />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#" aria-label="Phi">
          <span className={styles.logoMark} aria-hidden="true">
            &#966;
          </span>
        </a>
      </header>

      <div className={styles.grid}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Give your portfolio a <em className={styles.italic}>superbrain</em>.
          </h1>

          <p className={styles.subline}>
            Research. Watch. Test. In your texts.
          </p>

          <button className={styles.cta} type="button" onClick={() => setWaitlistOpen(true)}>
            Join Waitlist
          </button>
        </div>

        <div className={styles.phoneWrap}>
          <PhoneMockup />
        </div>
      </div>

      {waitlistOpen && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setWaitlistOpen(false);
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
          >
            <button
              className={styles.modalClose}
              type="button"
              aria-label="Close waitlist form"
              onClick={() => setWaitlistOpen(false)}
            >
              <span />
              <span />
            </button>

            <h2 id="waitlist-title" className={styles.modalTitle}>Join the waitlist</h2>

            <form className={styles.waitlistForm} onSubmit={submitWaitlist}>
              <label className={styles.fieldLabel} htmlFor="waitlist-phone">Phone number</label>
              <input
                className={styles.phoneInput}
                id="waitlist-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                autoFocus
                required
                value={phone}
                disabled={submissionState === "submitting"}
                aria-describedby="waitlist-status"
                onChange={(event) => {
                  setPhone(event.target.value);
                  if (submissionState === "error") setSubmissionState("idle");
                }}
              />

              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={accepted}
                  disabled={submissionState === "submitting"}
                  onChange={(event) => {
                    setAccepted(event.target.checked);
                    if (submissionState === "error") setSubmissionState("idle");
                  }}
                />
                <span>
                  I confirm I&rsquo;m 18+ and agree to the{" "}
                  <a href="/terms">Terms &amp; Conditions</a>{" "}
                  and{" "}
                  <a href="/privacy">Privacy Policy</a>.
                </span>
              </label>

              <button
                className={styles.submit}
                type="submit"
                disabled={
                  !accepted ||
                  !phone.trim() ||
                  submissionState === "submitting"
                }
              >
                {submissionState === "submitting"
                  ? "Joining…"
                  : "Join Waitlist"}
              </button>
              <p
                id="waitlist-status"
                className={`${styles.modalNote} ${
                  submissionState === "error" ? styles.modalError : ""
                }`}
                role={submissionState === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {submissionMessage || "We’ll reach out when the beta releases."}
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
