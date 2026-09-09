import type { ReactNode } from "react";
import styles from "./FAQ.module.css";

type FAQItem = {
  question: ReactNode;
  answers: ReactNode[];
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: <>is phi a financial advisor?</>,
    answers: [
      <>no, phi gives you research, analysis, monitoring, and tools to help you understand your investments</>,
      <>it doesn&rsquo;t provide personalized financial advice or make investment decisions for you</>,
      <>you remain in full control of all decisions</>,
    ],
  },
  {
    question: <>how does phi understand my investments?</>,
    answers: [
      <>you connect your brokerage with read only access</>,
      <>phi can then understand what you own, how your portfolio changes, and what news, filings, earnings, and market events actually matter to you</>,
    ],
  },
  {
    question: <>can phi move money or place trades?</>,
    answers: [
      <>not right now, phi is read only</>,
      <>it can help you research a trade, test it in a paper portfolio, or tell you exactly what to place</>,
      <>you stay in control of execution</>,
    ],
  },
  {
    question: <>how is phi different from a chatbot like chatgpt?</>,
    answers: [
      <>a chatbot like chatgpt waits for you to ask. phi connects to your portfolio and texts you first on what moves your money, earnings, news, big moves, and what it means for you</>,
      <>it&rsquo;s trained to think like an equity analyst, with access to research and data a general chatbot can&rsquo;t touch</>,
      <>and it does things chatgpt can&rsquo;t, like spinning up paper trades to test an idea, and it remembers everything across your holdings and research</>,
    ],
  },
  {
    question: <>do i need to download an app?</>,
    answers: [
      <>no, phi lives in your texts</>,
      <>connect your portfolio once, then talk to it like any other contact</>,
    ],
  },
  {
    question: <>which platforms is phi available on?</>,
    answers: [
      <>phi works best on iMessage, which is end-to-end encrypted</>,
      <>it also works over SMS if you&rsquo;re not on iMessage</>,
    ],
  },
  {
    question: <>is my data safe with phi?</>,
    answers: [
      <>security is core to phi. we connect to your brokerage through snaptrade, an industry-standard provider trusted across fintech, using bank-level encryption and read-only access</>,
      <>phi never sees your login credentials and can&rsquo;t move money or place trades</>,
      <>you stay fully in control of your accounts</>,
    ],
  },
  {
    question: <>will phi spam me with messages?</>,
    answers: [
      <>no, phi is designed to text you when something actually matters, not every time the market moves</>,
      <>you can also tell it what you want to watch and how often you want updates</>,
    ],
  },
  {
    question: <>what&rsquo;s next for phi?</>,
    answers: [
      <>the free beta is launching soon</>,
      <>join the waitlist and we&rsquo;ll text you when your spot is ready</>,
    ],
  },
];

export default function FAQ() {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <div className={styles.divider}>
          <span />
          <h2 id="faq-heading">FAQ</h2>
          <span />
        </div>

        <div className={styles.threads}>
          {FAQ_ITEMS.map((item, index) => (
            <article className={styles.thread} key={index}>
              <div className={styles.questionGroup}>
                <div className={styles.label}>YOU</div>
                <div className={styles.question}>{item.question}</div>
              </div>

              <div className={styles.answerGroup}>
                <div className={styles.label}>PHI</div>
                <div className={styles.answerRow}>
                  <div className={styles.avatar} aria-hidden="true">
                    <span>&#966;</span>
                  </div>
                  <div className={styles.answers}>
                    {item.answers.map((answer, answerIndex) => (
                      <div className={styles.answer} key={answerIndex}>
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
