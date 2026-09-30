import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Phi",
  description:
    "Text the people building Phi. Questions, feedback, or account changes — all by message.",
};

// `sms:` opens the user's messaging app with an empty draft to this number.
const AADIT_NUMBER = "+16479948661";
const BALDEEP_NUMBER = "+16476879784";

type Founder = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  number: string;
  // how far to zoom and nudge the photo to centre the face in the circle
  crop?: CSSProperties;
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
    photo: "/baldeep_pfp.png",
    number: BALDEEP_NUMBER,
    crop: { "--zoom": 1.9, "--shift-x": "2%", "--shift-y": "20%" } as CSSProperties,
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
          <section className={styles.block} aria-labelledby="founders-heading">
            <p className={styles.eyebrow}>The team</p>
            <h1 id="founders-heading" className={styles.heading}>
              Who you&rsquo;re texting.
            </h1>
            <p className={styles.lede}>
              Questions, feedback, bugs, anything at all. Text either of us and
              we&rsquo;ll get back to you as fast as we can.
            </p>

            <div className={styles.cards}>
              {FOUNDERS.map((founder) => (
                <article className={styles.card} key={founder.name}>
                  <div className={styles.person}>
                    <div className={styles.avatar}>
                      <Image
                        className={styles.avatarImage}
                        style={founder.crop}
                        src={founder.photo}
                        alt={`${founder.name}, ${founder.role} of Phi`}
                        width={184}
                        height={184}
                      />
                    </div>
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
              Text Phi to disconnect your brokerage, delete all of your data, or
              both. Whichever you ask for, it happens right away.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
