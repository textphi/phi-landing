import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Phi",
  description:
    "Text the people building Phi. Questions, feedback, or account changes — all by message.",
};

// TODO: replace with the real numbers before launch. `sms:` opens the user's
// messaging app with an empty draft to this number.
const AADIT_NUMBER = "+10000000000";
const BALDEEP_NUMBER = "+10000000000";
const PHI_NUMBER = "+10000000000";

type Founder = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  number: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Aadit",
    role: "Co-founder",
    bio: "Building Phi. Text me about the product, your portfolio, or anything that feels broken.",
    photo: "/aadit_pfp.jpg",
    number: AADIT_NUMBER,
  },
  {
    name: "Baldeep",
    role: "Co-founder",
    bio: "Building Phi. Text me about the product, your portfolio, or anything that feels broken.",
    photo: "/baldeep_pfp.jpg",
    number: BALDEEP_NUMBER,
  },
];

function IMessageIcon() {
  return (
    <svg
      className={styles.imessageIcon}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5.5" fill="#34C759" />
      <path
        d="M12 5.6c-3.7 0-6.7 2.3-6.7 5.2 0 1.7 1 3.2 2.6 4.1-.2.8-.7 1.8-1.5 2.6 1.4-.2 2.7-.8 3.6-1.5.6.1 1.3.2 2 .2 3.7 0 6.7-2.3 6.7-5.4S15.7 5.6 12 5.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <a className={styles.brand} href="/" aria-label="Phi home">
            <span aria-hidden="true">&#966;</span>
          </a>
        </header>

        <div className={styles.inner}>
          <section className={styles.block} aria-labelledby="contact-heading">
            <p className={styles.eyebrow}>Support</p>
            <h1 id="contact-heading" className={styles.heading}>
              Text us directly.
            </h1>
            <p className={styles.lede}>
              Phi is built by two people. Questions, feedback, bugs, or account
              issues — message either of us and you&rsquo;ll get a real reply.
              Include your name so we know who we&rsquo;re talking to.
            </p>
          </section>

          <section className={styles.block} aria-labelledby="founders-heading">
            <p className={styles.eyebrow}>The team</p>
            <h2 id="founders-heading" className={styles.heading}>
              Who you&rsquo;re texting.
            </h2>

            <div className={styles.cards}>
              {FOUNDERS.map((founder) => (
                <article className={styles.card} key={founder.name}>
                  <div className={styles.person}>
                    <Image
                      className={styles.avatar}
                      src={founder.photo}
                      alt={`${founder.name}, ${founder.role} of Phi`}
                      width={46}
                      height={46}
                    />
                    <div>
                      <div className={styles.name}>{founder.name}</div>
                      <div className={styles.role}>{founder.role}</div>
                    </div>
                  </div>

                  <p className={styles.bio}>{founder.bio}</p>

                  <div className={styles.cardAction}>
                    <a
                      className={styles.textButton}
                      href={`sms:${founder.number}`}
                    >
                      <IMessageIcon />
                      Text {founder.name}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="account-heading">
            <p className={styles.eyebrow}>Your account</p>
            <h2 id="account-heading" className={styles.heading}>
              Disconnect anytime, by text.
            </h2>
            <p className={styles.lede}>
              To disconnect your brokerage or delete your data, just text Phi.
              Access is read-only, and it ends the moment you ask.
            </p>
            <div className={styles.panelAction}>
              <a
                className={`${styles.textButton} ${styles.textButtonLarge}`}
                href={`sms:${PHI_NUMBER}`}
              >
                <IMessageIcon />
                Text Phi
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
