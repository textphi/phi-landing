"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (pathname !== "/") {
      router.push("/", { scroll: true });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
      return;
    }

    const start = window.scrollY;
    const duration = 450;
    const startedAt = performance.now();

    const scroll = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - eased));
      if (progress < 1) requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  };

  return (
    <footer className={styles.footer}>
      <a className={styles.toTop} href="/" aria-label="Go to Phi home" onClick={goHome}>
        <span aria-hidden="true">&#966;</span>
      </a>

      <a className={styles.wordmark} href="/" aria-label="Go to Phi home" onClick={goHome}>Phi</a>

      <div className={styles.details}>
        <p className={styles.tagline}>Giving every portfolio a superbrain</p>
        <div className={styles.legal}>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <span className={styles.copyright}>&copy; 2026 Phi</span>
      </div>
    </footer>
  );
}
