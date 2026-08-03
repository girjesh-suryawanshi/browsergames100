import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const EFFECTIVE_DATE = "July 24, 2026";
const LAST_UPDATED = "July 24, 2026";
const CONTACT_EMAIL = "privacy@browsergames100.com";

export default function PrivacyPolicy() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="Privacy Policy — BrowserGames100"
        description="Read BrowserGames100's full privacy policy. Learn what data we collect, how we use it, your rights under GDPR and CCPA, and how we handle children's privacy under COPPA."
        canonical="/privacy"
        breadcrumbs={breadcrumbs}
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-2 text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {EFFECTIVE_DATE} · Last Updated: {LAST_UPDATED}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">

          {/* Intro */}
          <p>
            Welcome to BrowserGames100 ("we," "us," or "our"). This Privacy Policy explains what information
            we collect when you visit <strong className="text-foreground">BrowserGames100.com</strong>, how we use it,
            who we share it with, and what choices you have. By using BrowserGames100, you agree to the practices
            described in this policy. If you do not agree, please stop using our platform.
          </p>
          <p>
            We are committed to protecting your privacy. BrowserGames100 is designed to be used without
            creating an account, which means we collect far less personal information than most
            websites of our size.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">1a. Information You Provide Directly</h3>
            <p>
              BrowserGames100 does not require you to create an account to play games. However, we may collect
              information you voluntarily provide when you:
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Submit a message through our <Link to="/contact" className="text-primary hover:underline">Contact Us</Link> form (your name, email address, and message content).</li>
              <li>Suggest a game via the "Suggest a Game" feature (game name and optional notes only).</li>
              <li>Report a bug or content issue via email.</li>
            </ul>
            <p className="mt-3">
              We use this information solely to respond to your request. We do not add you to any
              marketing list without your explicit consent.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">1b. Information Collected Automatically</h3>
            <p>
              When you visit our website, our servers and third-party services automatically collect
              certain technical information:
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li><strong className="text-foreground">IP address</strong> — used to estimate geographic region for ad targeting (not stored by us beyond server logs).</li>
              <li><strong className="text-foreground">Browser type and version</strong> — used to optimize game compatibility.</li>
              <li><strong className="text-foreground">Device type and operating system</strong> — used for responsive layout and performance tuning.</li>
              <li><strong className="text-foreground">Pages visited and time spent</strong> — used in aggregate to understand which games are popular.</li>
              <li><strong className="text-foreground">Referral URL</strong> — the page that sent you to our site, used to understand traffic sources.</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">1c. Information Stored Locally on Your Device</h3>
            <p>
              BrowserGames100 stores the following data in your browser's <strong className="text-foreground">localStorage</strong> (not on our servers):
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Your favorite games list (game IDs only, no personal data).</li>
              <li>Your recently played games (game IDs and timestamps).</li>
              <li>Your theme preference (dark or light mode).</li>
              <li>Your cookie consent choice and timestamp.</li>
            </ul>
            <p className="mt-3">
              This data never leaves your device and is never transmitted to our servers. You can
              clear it at any time by clearing your browser's site data.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">2. Cookies and Tracking Technologies</h2>
            <p>
              BrowserGames100 uses cookies and similar technologies for the following purposes:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Cookie Type</th>
                    <th className="text-left py-2 pr-4 font-semibold text-foreground">Purpose</th>
                    <th className="text-left py-2 font-semibold text-foreground">Can Opt Out?</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {[
                    ["Essential (localStorage)", "Stores your preferences and game history locally. Required for core functionality.", "No — but no data leaves your device."],
                    ["Google AdSense / DART", "Serves personalized ads based on your browsing history across the web.", "Yes — via the consent banner or Google Ad Center."],
                    ["Google Analytics (if enabled)", "Measures site traffic and game popularity in aggregate.", "Yes — via the consent banner."],
                  ].map(([type, purpose, optOut]) => (
                    <tr key={type} className="border-b border-border/40">
                      <td className="py-2 pr-4 font-medium text-foreground align-top">{type}</td>
                      <td className="py-2 pr-4 align-top">{purpose}</td>
                      <td className="py-2 align-top">{optOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              To opt out of Google's personalized advertising, visit the{" "}
              <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Ad Center
              </a>{" "}
              or use the{" "}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                NAI Opt-Out Tool
              </a>.
              You can also manage your preferences at any time using the cookie banner at the bottom of our site.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="space-y-2 ml-4 list-disc">
              <li>To operate and maintain the BrowserGames100 platform and ensure it functions correctly.</li>
              <li>To display advertisements that help keep BrowserGames100 free to use.</li>
              <li>To respond to contact form submissions and support requests.</li>
              <li>To analyze usage trends in aggregate and improve our game catalog.</li>
              <li>To detect and prevent abuse, fraud, or technical issues.</li>
              <li>To comply with legal obligations.</li>
            </ul>
            <p className="mt-3">
              We do <strong className="text-foreground">not</strong> use your information for:
            </p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Sending unsolicited marketing emails.</li>
              <li>Building personal behavioral profiles for sale to third parties.</li>
              <li>Making automated decisions that have legal or significant effects on you.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">4. Third-Party Services</h2>
            <p>
              BrowserGames100 integrates the following third-party services. Each has their own privacy policy
              that governs how they process your data:
            </p>
            <ul className="space-y-3 mt-3 ml-4 list-disc">
              <li>
                <strong className="text-foreground">Google AdSense</strong> — displays contextual and personalized advertisements.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>
              </li>
              <li>
                <strong className="text-foreground">GameMonetize / GD.games</strong> — provides HTML5 game content via iframe embeds. These platforms may set their own cookies within the iframe context. We do not control their cookie practices.
              </li>
              <li>
                <strong className="text-foreground">Google Fonts</strong> — serves web fonts. Font requests may include your IP address.{" "}
                <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Fonts Privacy FAQ</a>
              </li>
            </ul>
          </div>

          {/* Section 5 — Children */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">5. Children's Privacy (COPPA)</h2>
            <p>
              BrowserGames100 is intended for a general audience. Our service is open to users of all ages,
              including students who may be under 13 years old. We take children's privacy very seriously
              and comply with the{" "}
              <strong className="text-foreground">Children's Online Privacy Protection Act (COPPA)</strong>.
            </p>
            <p className="mt-3">
              We do <strong className="text-foreground">not</strong> knowingly collect any personally identifiable
              information from children under 13. Our platform does not require registration, does not collect
              names or email addresses during normal gameplay, and does not allow user-generated content from anonymous visitors.
            </p>
            <p className="mt-3">
              If a parent or guardian believes their child has submitted personal information to us (for example,
              via our contact form), please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>{" "}
              and we will delete that information promptly.
            </p>
            <p className="mt-3">
              We do serve advertising through Google AdSense on pages accessible to all ages. We have configured
              Google Consent Mode to default to non-personalized ads, and our cookie banner requires explicit
              acceptance before personalized ads are enabled.
            </p>
          </div>

          {/* Section 6 — GDPR */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">6. Your Rights (GDPR — EEA & UK Users)</h2>
            <p>
              If you are located in the European Economic Area (EEA) or the United Kingdom, you have the
              following rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li><strong className="text-foreground">Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate data.</li>
              <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data.</li>
              <li><strong className="text-foreground">Right to Restriction:</strong> Request that we restrict processing of your data.</li>
              <li><strong className="text-foreground">Right to Object:</strong> Object to processing based on our legitimate interests.</li>
              <li><strong className="text-foreground">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw any consent you previously gave at any time, without affecting lawfulness of prior processing.</li>
            </ul>
            <p className="mt-3">
              Our legal basis for processing personal data is: (a) your consent for advertising cookies;
              (b) our legitimate interest in maintaining the platform and preventing abuse for technical data.
              To exercise any of these rights, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          {/* Section 7 — CCPA */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">7. Your Rights (CCPA — California Users)</h2>
            <p>
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li>The right to know what personal information is collected, used, shared, or sold.</li>
              <li>The right to delete personal information we have collected from you.</li>
              <li>The right to opt out of the sale of your personal information. BrowserGames100 does <strong className="text-foreground">not sell personal information</strong>.</li>
              <li>The right to non-discrimination for exercising your CCPA rights.</li>
            </ul>
            <p className="mt-3">
              To submit a CCPA data request, email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>{" "}
              with "CCPA Request" in the subject line.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">8. Data Retention</h2>
            <p>
              We retain data only as long as necessary:
            </p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li><strong className="text-foreground">Contact form submissions:</strong> Retained for up to 12 months, then deleted.</li>
              <li><strong className="text-foreground">Server logs (IP, browser data):</strong> Retained for up to 30 days for security purposes, then automatically deleted.</li>
              <li><strong className="text-foreground">localStorage data (favorites, preferences):</strong> Stored on your device indefinitely until you clear your browser data. We have no control over this data.</li>
            </ul>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">9. Security</h2>
            <p>
              BrowserGames100 is served over HTTPS (TLS encryption) at all times. We do not store payment
              information, passwords, or sensitive personal data on our servers. While no online service
              can guarantee 100% security, we implement industry-standard security practices to protect
              the limited data we do process.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, or legal requirements. When we make significant changes, we will update the
              "Last Updated" date at the top of this page. We encourage you to review this policy
              periodically. Continued use of BrowserGames100 after an update constitutes acceptance of
              the revised policy.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please reach out:
            </p>
            <div className="mt-4 p-5 bg-card rounded-xl border border-border/50">
              <p className="font-bold text-foreground mb-1">BrowserGames100</p>
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
              <p className="mt-2 text-sm">
                We aim to respond to all privacy-related inquiries within 5 business days.
              </p>
            </div>
          </div>

          <p className="pt-4 text-xs text-muted-foreground/60 italic">
            Effective Date: {EFFECTIVE_DATE} · Last Updated: {LAST_UPDATED}
          </p>

        </div>
      </div>
    </div>
  );
}