import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const EFFECTIVE_DATE = "July 24, 2026";
const CONTACT_EMAIL = "support@cloudplayhub.com";

export default function TermsOfService() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ];

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="Terms of Service — CloudPlayHub"
        description="Read CloudPlayHub's Terms of Service. Simple, plain-English rules for using our free browser gaming platform — what you can do, what we ask of you, and how disputes are handled."
        canonical="/terms"
        breadcrumbs={breadcrumbs}
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-2 text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {EFFECTIVE_DATE} · Last Updated: {EFFECTIVE_DATE}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">

          <p>
            Welcome to CloudPlayHub. These Terms of Service ("Terms") govern your use of the CloudPlayHub
            website located at <strong className="text-foreground">CloudPlayHub.com</strong>. Please read
            them carefully. By accessing or using CloudPlayHub, you agree to be bound by these Terms.
            If you disagree with any part of them, please do not use our platform.
          </p>
          <p>
            We've written these Terms in plain English because we believe you deserve to understand
            exactly what you're agreeing to without a law degree.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">1. What CloudPlayHub Is</h2>
            <p>
              CloudPlayHub is a free, browser-based gaming platform. We aggregate and provide access to
              HTML5 games from third-party developers and game networks. All games are playable directly
              in your web browser — no downloads, no installs, no account required.
            </p>
            <p className="mt-3">
              The individual games hosted on our platform are owned and operated by their respective
              third-party developers. CloudPlayHub acts as a discovery and access portal, not as the
              developer or publisher of these games.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">2. Who Can Use CloudPlayHub</h2>
            <p>
              CloudPlayHub is open to users of all ages. However, if you are under 13 years old,
              you should have a parent or guardian's permission to use the internet and review our{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> before using the platform.
            </p>
            <p className="mt-3">
              There is no account registration required. You do not need to provide your name, age,
              or any personal information to access and play games on CloudPlayHub.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">3. Acceptable Use — What You Can Do</h2>
            <p>You are welcome to:</p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li>Browse and play any game on CloudPlayHub for your personal, non-commercial entertainment.</li>
              <li>Share links to CloudPlayHub games with friends, classmates, or on social media.</li>
              <li>Use the platform on any device that supports a modern web browser.</li>
              <li>Save games to your favorites list using our local storage feature.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">4. Prohibited Activities — What You Cannot Do</h2>
            <p>To keep the platform safe and accessible for everyone, the following are prohibited:</p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li>
                <strong className="text-foreground">Automated scraping or crawling</strong> — using bots, spiders, or automated tools to bulk-download game data, thumbnails, or other content from our platform without prior written permission.
              </li>
              <li>
                <strong className="text-foreground">Attempting to access restricted areas</strong> — including admin panels, backend APIs, or any portion of our infrastructure that is not intended for public access.
              </li>
              <li>
                <strong className="text-foreground">Misrepresenting our platform</strong> — claiming to be CloudPlayHub, impersonating our team, or using our branding without authorization.
              </li>
              <li>
                <strong className="text-foreground">Exploiting or disrupting the service</strong> — including DDoS attacks, SQL injection, or any other attempt to compromise the integrity or availability of the platform.
              </li>
              <li>
                <strong className="text-foreground">Embedding our games on other websites without permission</strong> — our game iframe URLs are provided by third-party developers; do not hotlink or embed them externally.
              </li>
              <li>
                <strong className="text-foreground">Using the platform for any illegal purpose</strong> — including violating copyright, privacy, or consumer protection laws.
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to block access to users who violate these rules, without notice.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
            <p>
              <strong className="text-foreground">CloudPlayHub's original content</strong> — including our website design, logo, written copy, and curation — is the property of CloudPlayHub and may not be copied, reproduced, or redistributed without written permission.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Third-party game content</strong> — the individual games, characters, music, graphics, and mechanics within each game are the intellectual property of their respective developers and publishers. CloudPlayHub claims no ownership over third-party game content.
            </p>
            <p className="mt-3">
              If you believe any content on CloudPlayHub infringes your copyright, please review our{" "}
              <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link> and submit a
              formal takedown notice to{" "}
              <a href="mailto:dmca@cloudplayhub.com" className="text-primary hover:underline">
                dmca@cloudplayhub.com
              </a>.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">6. Advertising</h2>
            <p>
              CloudPlayHub is free to use and is supported by advertising revenue from Google AdSense.
              Advertisements are displayed on various pages of the platform. We do not control the
              specific ads shown (they are served by Google's automated systems), but we have configured
              our account to exclude certain ad categories inappropriate for a gaming audience.
            </p>
            <p className="mt-3">
              You can manage your advertising preferences using our cookie consent banner. Declining
              advertising cookies means you may still see ads, but they will not be personalized to
              your browsing history.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">7. Disclaimer of Warranties</h2>
            <p>
              CloudPlayHub is provided <strong className="text-foreground">"as is"</strong> and{" "}
              <strong className="text-foreground">"as available"</strong> without any warranties of any kind,
              either express or implied. We do not guarantee that:
            </p>
            <ul className="space-y-2 mt-3 ml-4 list-disc">
              <li>The platform will be available 100% of the time or free from bugs and errors.</li>
              <li>Every game in the catalog will function on every device or browser.</li>
              <li>Game content provided by third parties will be accurate, complete, or up to date.</li>
              <li>The platform is free from viruses or other harmful components (though we take reasonable steps to ensure this).</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, CloudPlayHub and its team shall not be liable for
              any indirect, incidental, special, or consequential damages arising from your use of the
              platform, including but not limited to: data loss, device issues, game progress loss,
              or time spent on the platform.
            </p>
            <p className="mt-3">
              Our total liability for any claim arising from these Terms shall not exceed the amount you
              have paid us in the past 12 months — which, since CloudPlayHub is free, is zero.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">9. Links to Third-Party Websites</h2>
            <p>
              CloudPlayHub may contain links to external websites or resources. We are not responsible
              for the content, privacy practices, or availability of these third-party sites. A link from
              CloudPlayHub does not constitute an endorsement of the linked site.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we do, we will update the effective date
              at the top of this page. If you continue to use CloudPlayHub after changes are posted,
              you accept the updated Terms. We encourage you to review these Terms periodically.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with applicable laws. Any disputes
              arising from these Terms or your use of CloudPlayHub shall first be attempted to be
              resolved through direct communication with our team at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">12. Contact</h2>
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-5 bg-card rounded-xl border border-border/50">
              <p className="font-bold text-foreground mb-1">CloudPlayHub</p>
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a></p>
            </div>
          </div>

          <p className="pt-4 text-xs text-muted-foreground/60 italic">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>
    </div>
  );
}