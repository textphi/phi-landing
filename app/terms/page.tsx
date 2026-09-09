import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Phi",
  description: "Terms governing access to and use of Phi.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <section>
        <h2>1. Agreement to these terms</h2>
        <p>
          These Terms &amp; Conditions govern your access to and use of
          Phi&rsquo;s website, text-messaging experience, portfolio research
          tools, monitoring, simulations, and related services (the
          &ldquo;Services&rdquo;). By accessing or using the Services, you agree to
          these Terms and our <a href="/privacy">Privacy Policy</a>. If you do not
          agree, do not use the Services.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 18 years old, capable of entering into a binding
          agreement, and the subscriber or authorized user of any phone number
          you provide. You may use the Services only where permitted by law.
        </p>
      </section>

      <section>
        <h2>3. What Phi provides</h2>
        <p>
          Phi provides tools for investment research, portfolio analysis,
          monitoring, alerts, market and company information, and paper-trading
          simulations. Certain features may be offered as a beta, may change over
          time, and may not always be available.
        </p>
      </section>

      <section>
        <h2>4. No financial advice</h2>
        <p>
          Phi is not a registered investment adviser, broker-dealer, brokerage,
          financial institution, fiduciary, tax adviser, or legal adviser. The
          Services provide information and tools for educational and research
          purposes only. Nothing provided by Phi is personalized financial,
          investment, legal, or tax advice, or a recommendation to buy, sell, or
          hold any security or financial product.
        </p>
        <p>
          You are solely responsible for your investment decisions and for
          independently evaluating information before acting on it. Investing
          involves risk, including possible loss of principal. Past performance
          does not guarantee future results. Consider consulting a qualified
          professional where appropriate.
        </p>
      </section>

      <section>
        <h2>5. Read-only brokerage connections</h2>
        <p>
          Phi uses SnapTrade to let you connect supported brokerage accounts.
          Connections used by Phi are intended to provide read-only access to
          authorized account and portfolio information. Phi cannot use these
          connections to place trades, transfer funds, or change brokerage
          account settings.
        </p>
        <p>
          By connecting an account, you authorize Phi and SnapTrade to access and
          process the available account information needed to provide the
          Services. Your use of a brokerage and SnapTrade may also be governed by
          their respective agreements and privacy policies.
        </p>
      </section>

      <section>
        <h2>6. Data and AI-generated output</h2>
        <p>
          Brokerage, market, filing, news, social, and other third-party data may
          be delayed, unavailable, incomplete, or inaccurate. AI-generated output
          can contain errors, omit important information, or produce unexpected
          results. You must verify information independently before relying on it.
        </p>
        <p>
          Paper portfolios, simulations, forecasts, and hypothetical results do
          not reflect actual execution and may not account for taxes, fees,
          liquidity, slippage, or changing market conditions.
        </p>
      </section>

      <section>
        <h2>7. Text messages</h2>
        <p>
          By providing your phone number and opting in, you consent to receive
          service-related and product messages from Phi. Message frequency may
          vary, and message and data rates may apply. Consent is not a condition
          of purchase. You may reply STOP to unsubscribe and HELP for assistance.
        </p>
      </section>

      <section>
        <h2>8. Your responsibilities</h2>
        <p>You agree to:</p>
        <ul>
          <li>provide accurate information and keep your access credentials secure;</li>
          <li>use only accounts and phone numbers you are authorized to use;</li>
          <li>review outputs and make your own financial decisions; and</li>
          <li>comply with applicable laws and third-party agreements.</li>
        </ul>
      </section>

      <section>
        <h2>9. Prohibited uses</h2>
        <p>You may not:</p>
        <ul>
          <li>use the Services for unlawful, fraudulent, abusive, or deceptive activity;</li>
          <li>interfere with, overload, probe, or attempt to gain unauthorized access to the Services;</li>
          <li>introduce malware or use automated means to scrape or extract the Services except as expressly permitted;</li>
          <li>reverse engineer or circumvent technical restrictions; or</li>
          <li>impersonate another person or misrepresent your authority.</li>
        </ul>
      </section>

      <section>
        <h2>10. Ownership and feedback</h2>
        <p>
          Phi and its licensors retain all rights in the Services, including their
          software, design, branding, and content. Subject to these Terms, we give
          you a limited, personal, non-exclusive, non-transferable, revocable
          right to use the Services. If you provide feedback, you allow us to use
          it without restriction or compensation.
        </p>
      </section>

      <section>
        <h2>11. Third-party services</h2>
        <p>
          The Services rely on third parties, including SnapTrade, brokerages,
          market-data and research providers, messaging carriers, and AI and cloud
          infrastructure providers. We do not control these third parties and are
          not responsible for their services, availability, accuracy, or conduct.
        </p>
      </section>

      <section>
        <h2>12. Changes, suspension, and termination</h2>
        <p>
          We may add, change, suspend, or discontinue features, including beta
          features. We may restrict or terminate access if you violate these Terms,
          create risk, or misuse the Services. You may stop using Phi and
          unsubscribe from messages at any time.
        </p>
      </section>

      <section>
        <h2>13. Disclaimer of warranties</h2>
        <p>
          To the fullest extent permitted by law, the Services are provided
          &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; Phi disclaims all
          warranties, express or implied, including warranties of merchantability,
          fitness for a particular purpose, title, non-infringement, accuracy, and
          uninterrupted or error-free operation.
        </p>
      </section>

      <section>
        <h2>14. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Phi and its team will not be
          liable for indirect, incidental, special, consequential, exemplary, or
          punitive damages, or for lost profits, lost data, trading losses, or
          investment losses arising from or related to the Services. Nothing in
          these Terms excludes liability that cannot legally be excluded.
        </p>
      </section>

      <section>
        <h2>15. Indemnification</h2>
        <p>
          To the extent permitted by law, you agree to indemnify and hold Phi and
          its team harmless from claims, liabilities, damages, and expenses arising
          from your misuse of the Services, violation of these Terms, or violation
          of another person&rsquo;s rights.
        </p>
      </section>

      <section>
        <h2>16. Applicable law and disputes</h2>
        <p>
          These Terms are governed by applicable law. Any dispute must be brought
          in a court with lawful jurisdiction unless the parties agree to another
          resolution process. Additional consumer rights may apply where you live.
        </p>
      </section>

      <section>
        <h2>17. Changes to these terms</h2>
        <p>
          We may update these Terms as Phi evolves or legal requirements change.
          We will post updated Terms here and revise the date above. Your continued
          use after an update means you accept the revised Terms where permitted by
          law.
        </p>
      </section>

      <section>
        <h2>18. Contact</h2>
        <p>
          If you have questions about these Terms, contact Phi through the contact
          method provided in the Services.
        </p>
      </section>
    </LegalPage>
  );
}
