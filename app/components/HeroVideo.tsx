"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const DESKTOP_SRC = "/hero_video.mp4";
const MOBILE_SRC = "/hero_video_mobile.mp4";
const POSTER = "/hero-poster.jpg";

/*
 * Background hero video.
 *
 * The <video> always renders with its poster and preload="none", so the poster
 * is the LCP and nothing heavy loads on first paint. Once mounted on the client
 * we decide whether to attach a source at all:
 *   - reduced-motion / Save-Data / 2G  -> no source, the poster stays (this is
 *     the intended still-image experience, not a failure state)
 *   - narrow viewport                  -> the ~720p, ~2 MB mobile encode
 *   - everything else                  -> the full-resolution encode
 * We then call play() explicitly with a catch, because iOS Low Power Mode and
 * some data-saver modes block autoplay even when muted+playsInline — in that
 * case the poster simply remains visible.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  // null until the client decides. null == poster only, no download.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const matches = (q: string) => window.matchMedia(q).matches;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const frugal =
      conn?.saveData === true ||
      (conn?.effectiveType ? /(^|-)2g$/.test(conn.effectiveType) : false);

    if (matches("(prefers-reduced-motion: reduce)") || frugal) return;

    setSrc(matches("(max-width: 767px)") ? MOBILE_SRC : DESKTOP_SRC);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    video.src = src;
    video.load();

    let cancelled = false;
    const play = () => {
      if (cancelled) return;
      const attempt = video.play();
      if (attempt) attempt.catch(() => { /* autoplay blocked — poster stays */ });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={styles.video}
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
