import styles from "./Hero.module.css";
import HeroVideo from "./HeroVideo";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroVideo />

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

          <a className={styles.cta} href="#">
            Text Phi
            <svg
              className={styles.arrow}
              viewBox="0 0 20 16"
              aria-hidden="true"
            >
              <path
                d="M1 8h16M11 2l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className={styles.phoneWrap}>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
