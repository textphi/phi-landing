import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Phi",
  description: "How Phi collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Phi respects your privacy. This Privacy Policy explains how we collect,
          use, disclose, store, and protect information when you use Phi&rsquo;s
          website, text-messaging experience, portfolio research tools, and
          related services (the &ldquo;Services&rdquo;).
        </p>
      </section>

      <section>
        <h2>2. Information we collect</h2>
        <p>Depending on how you use Phi, we may collect:</p>
        <ul>
          <li><strong>Contact and account information:</strong> your phone number, name, email address, account identifiers, age-confirmation status, and communication preferences.</li>
          <li><strong>Messages and instructions:</strong> messages you exchange with Phi, saved preferences, watch instructions, research requests, feedback, and support communications.</li>
          <li><strong>Brokerage connection information:</strong> connected institution and account metadata made available through SnapTrade.</li>
          <li><strong>Portfolio information:</strong> account types, balances, buying power, holdings, positions, quantities, values, cost information when available, orders, transaction history, dividends, deposits, withdrawals, fees, and related account activity.</li>
          <li><strong>Research and simulation information:</strong> watchlists, research history, alerts, paper portfolios, simulated trades, portfolio rules, and generated analyses.</li>
          <li><strong>Technical and usage information:</strong> browser and device type, IP address, timestamps, diagnostics, pages or features used, and security logs.</li>
        </ul>
      </section>

      <section>
        <h2>3. Brokerage connections and SnapTrade</h2>
        <p>
          Phi uses SnapTrade to connect supported brokerage accounts. Brokerage
          authentication occurs through SnapTrade and the applicable brokerage.
          Phi does not receive or store your brokerage username or password.
        </p>
        <p>
          Connections used by Phi are intended to be read only. Phi cannot use
          them to place trades, transfer funds, or change brokerage account
          settings. SnapTrade may separately collect and process information
          under its own terms and privacy policy.
        </p>
      </section>

      <section>
        <h2>4. How portfolio data is stored</h2>
        <p>
          Phi may store brokerage-derived portfolio data in our databases,
          including tables that contain balances, holdings, positions, account
          activity, connection metadata, and historical snapshots. We use this
          stored data to maintain portfolio context, identify changes, provide
          monitoring, personalize research, and operate the Services over time.
        </p>
        <p>
          Data available from a brokerage may be delayed, incomplete, or vary by
          institution. Disconnecting an account stops future access but may not
          immediately remove information already stored by Phi. You may request
          deletion as described below.
        </p>
      </section>

      <section>
        <h2>5. How we use information</h2>
        <p>We use information to:</p>
        <ul>
          <li>provide portfolio-aware research, monitoring, alerts, simulations, and responses;</li>
          <li>understand your holdings, preferences, instructions, and portfolio changes;</li>
          <li>send service, waitlist, security, support, and product communications;</li>
          <li>operate, maintain, troubleshoot, secure, and improve the Services;</li>
          <li>detect misuse, fraud, security incidents, and technical problems; and</li>
          <li>comply with law and enforce our agreements.</li>
        </ul>
      </section>

      <section>
        <h2>6. Artificial intelligence processing</h2>
        <p>
          Phi uses artificial intelligence to analyze messages, financial data,
          market information, and research materials and to generate responses,
          summaries, monitoring results, and simulations. Relevant information
          may be processed by AI and infrastructure providers acting on our
          behalf. AI output may be inaccurate and is not financial advice.
        </p>
      </section>

      <section>
        <h2>7. How we disclose information</h2>
        <p>We may disclose information to:</p>
        <ul>
          <li>SnapTrade and connected financial institutions as needed to establish and maintain authorized connections;</li>
          <li>cloud hosting, database, security, analytics, communications, messaging, and AI service providers that help operate Phi;</li>
          <li>professional advisers, regulators, courts, law enforcement, or other parties when required by law or needed to protect rights and safety; and</li>
          <li>a successor in connection with a merger, financing, acquisition, reorganization, or sale of assets.</li>
        </ul>
        <p>
          We do not sell personal information. We do not sell or share your phone
          number or messaging consent with third parties for their marketing.
        </p>
      </section>

      <section>
        <h2>8. Data retention</h2>
        <p>
          We retain information for as long as reasonably necessary to provide
          the Services, maintain portfolio context, comply with legal obligations,
          resolve disputes, prevent abuse, and enforce agreements. Retention
          periods depend on the type of information and why it was collected.
          Where appropriate, we may aggregate or de-identify information.
        </p>
      </section>

      <section>
        <h2>9. Security</h2>
        <p>
          We use reasonable administrative, technical, and organizational
          safeguards designed to protect personal information. No method of
          transmission or storage is completely secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section>
        <h2>10. Your choices and rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or receive a copy of your personal information, or to object to
          or restrict certain processing. You may disconnect a brokerage account
          and may opt out of text messages by replying STOP. Message and data
          rates may apply.
        </p>
      </section>

      <section>
        <h2>11. Children&rsquo;s privacy</h2>
        <p>
          Phi is intended for people who are at least 18 years old. We do not
          knowingly collect personal information from children.
        </p>
      </section>

      <section>
        <h2>12. International processing</h2>
        <p>
          Phi and its service providers may process information in Canada, the
          United States, and other countries. Privacy laws in those locations may
          differ from those where you live.
        </p>
      </section>

      <section>
        <h2>13. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy as Phi evolves or legal requirements
          change. We will post the updated policy here and revise the date above.
        </p>
      </section>

      <section>
        <h2>14. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or want to make a
          privacy request, contact Phi through the contact method provided in the
          Services.
        </p>
      </section>
    </LegalPage>
  );
}
