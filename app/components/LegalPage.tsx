import type { ReactNode } from "react";
import styles from "../legal.module.css";
import Footer from "./Footer";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <a className={styles.brand} href="/" aria-label="Phi home">
            <span aria-hidden="true">&#966;</span>
          </a>
        </header>

        <article className={styles.article}>
          <h1>{title}</h1>
          <p className={styles.updated}>Last updated September 8, 2026</p>
          <div className={styles.content}>{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
