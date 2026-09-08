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
      <>no. phi gives you research, analysis, monitoring, and tools to help you understand your investments.</>,
      <>it doesn&rsquo;t provide personalized financial advice or make investment decisions for you.</>,
    ],
  },
  {
    question: <>how does phi understand my investments?</>,
    answers: [
      <>you connect your brokerage with read only access.</>,
      <>phi can then understand what you own, how your portfolio changes, and what news, filings, earnings, and market events actually matter to you.</>,
    ],
  },
  {
    question: <>can phi move money or place trades?</>,
    answers: [
      <>not right now. phi is read only.</>,
      <>it can help you research a trade, test it in a paper portfolio, or tell you exactly what to place.</>,
      <>you stay in control of execution.</>,
    ],
  },
  {
    question: <>how is phi different from a chatbot?</>,
    answers: [
      <>chatbots wait for you to ask. phi already knows your portfolio and continuously watches what matters.</>,
      <>it can proactively text you when something changes, instead of waiting for a prompt.</>,
      <>it also has deep investment research integrations and long term financial memory across your portfolio, research, and paper trades.</>,
    ],
  },
  {
    question: <>do i need to download an app?</>,
    answers: [
      <>no. phi lives in your texts.</>,
      <>connect your portfolio once, then talk to it like any other contact.</>,
    ],
  },
  {
    question: <>is my data safe with phi?</>,
    answers: [
      <>phi uses snaptrade to connect to your brokerage securely.</>,
      <>your brokerage credentials aren&rsquo;t shared with phi, and access is read only.</>,
      <>phi can&rsquo;t move money or place trades.</>,
    ],
  },
  {
    question: <>will phi spam me with messages?</>,
    answers: [
      <>no. phi is designed to text you when something actually matters, not every time the market moves.</>,
      <>you can also tell it what you want to watch and how often you want updates.</>,
    ],
  },
  {
    question: <>what&rsquo;s next for phi?</>,
    answers: [
      <>the beta is launching for free soon.</>,
      <>join the waitlist and we&rsquo;ll send you a text when it&rsquo;s ready to try.</>,
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
