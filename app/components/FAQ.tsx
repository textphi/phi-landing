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
      <>No. Phi gives you research, analysis, monitoring, and tools to help you understand your investments.</>,
      <>It doesn&rsquo;t provide personalized financial advice or make investment decisions for you.</>,
      <>You remain in full control of all decisions.</>,
    ],
  },
  {
    question: <>how is phi different from a chatbot like chatgpt?</>,
    answers: [
      <>A chatbot like ChatGPT waits for you to ask. Phi connects to your portfolio and texts you first about earnings, news, major moves, and what they mean for your investments.</>,
      <>It&rsquo;s trained to think like an equity analyst, with access to research and data a general chatbot can&rsquo;t access.</>,
      <>It also does things ChatGPT can&rsquo;t, like running paper trades to test an idea, and it remembers everything across your holdings and research.</>,
    ],
  },
  {
    question: <>how does phi understand my investments?</>,
    answers: [
      <>You connect your brokerage with read-only access.</>,
      <>Phi can then understand what you own, how your portfolio changes, and what news, filings, earnings, and market events matter to you.</>,
    ],
  },
  {
    question: <>can phi move money or place trades?</>,
    answers: [
      <>Not right now. Phi is read-only.</>,
      <>It can help you research a trade, test it in a paper portfolio, or tell you exactly what to place.</>,
      <>You stay in control of execution.</>,
    ],
  },
  {
    question: <>do i need to download an app?</>,
    answers: [
      <>No. Phi lives in your texts.</>,
      <>Connect your portfolio once, then talk to it like any other contact.</>,
    ],
  },
  {
    question: <>which platforms is phi available on?</>,
    answers: [
      <>Phi works best on iMessage, which is end-to-end encrypted.</>,
      <>It also works over SMS if you&rsquo;re not on iMessage.</>,
    ],
  },
  {
    question: <>is my data safe with phi?</>,
    answers: [
      <>Security is core to Phi. We connect to your brokerage through SnapTrade, an industry-standard provider trusted across fintech, using bank-level encryption and read-only access.</>,
      <>Phi never sees your login credentials and can&rsquo;t move money or place trades.</>,
      <>You stay fully in control of your accounts.</>,
    ],
  },
  {
    question: <>will phi spam me with messages?</>,
    answers: [
      <>No. Phi is designed to text you when something matters, not every time the market moves.</>,
      <>You can also tell it what you want to watch and how often you want updates.</>,
    ],
  },
  {
    question: <>what&rsquo;s next for phi?</>,
    answers: [
      <>The private beta is rolling out now.</>,
      <>Join the waitlist and we&rsquo;ll text you when your spot is ready.</>,
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
