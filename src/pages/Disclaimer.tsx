import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "dmca@cloudplayhub.com";
const EFFECTIVE_DATE = "July 24, 2026";

export default function Disclaimer() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Disclaimer", url: "/disclaimer" },
  ];

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="Disclaimer — CloudPlayHub"
        description="Read CloudPlayHub's full disclaimer. Covers third-party game content, affiliate advertising disclosures, accuracy limitations, and copyright compliance information."
        canonical="/disclaimer"
        breadcrumbs={breadcrumbs}
      />
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-black mb-2 text-foreground">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {EFFECTIVE_DATE} · Last Updated: {EFFECTIVE_DATE}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">

          <p>
            The information, games, and interactive content provided on CloudPlayHub
            (<strong className="text-foreground">CloudPlayHub.com</strong>) are offered for recreational
            and entertainment purposes. Please read this Disclaimer carefully before using our platform.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">1. Third-Party Game Content</h2>
            <p>
              CloudPlayHub is a game aggregation and discovery platform. The games available on our platform
              are provided by third-party developers, publishers, and game distribution networks such as
              GameMonetize and GD.games. These games are embedded via HTML5 iframes and are hosted on
              the third parties' own servers — not on CloudPlayHub's infrastructure.
            </p>
            <p className="mt-3">
              CloudPlayHub does <strong className="text-foreground">not</strong> claim ownership, authorship,
              or creative control over any of the individual games in our catalog. All trademarks, character
              names, game titles, logos, and game mechanics remain the exclusive intellectual property of their
              respective creators and publishers.
            </p>
            <p className="mt-3">
              While we curate and review games before listing them, we cannot guarantee that all games
              function perfectly on every device, browser, or network configuration. Game quality, content,
              and availability are ultimately controlled by the upstream developer.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">2. Accuracy and Completeness</h2>
            <p>
              CloudPlayHub makes reasonable efforts to ensure that game descriptions, how-to-play
              instructions, ratings, and play counts are accurate and up to date. However, we make no
              warranty, express or implied, that any information on this website is complete, accurate,
              reliable, or current.
            </p>
            <p className="mt-3">
              Game mechanics, features, and controls may be updated by developers at any time. Our
              descriptions may not always reflect the very latest version of a game. If you notice
              inaccurate information about a specific game, you're welcome to{" "}
              <Link to="/contact" className="text-primary hover:underline">contact us</Link> and we'll
              review it promptly.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">3. Advertising Disclosure</h2>
            <p>
              CloudPlayHub is a free-to-use platform supported by display advertising. We participate in
              the <strong className="text-foreground">Google AdSense</strong> program, which means
              Google automatically serves advertisements on our pages based on your browsing history and
              interests (with your consent) or based on page content (without personalization if consent
              is withheld).
            </p>
            <p className="mt-3">
              We do not receive payment for specific game placements or for directing users to particular
              games. Our game rankings are based on real player activity and editorial review — not on
              paid promotion by developers.
            </p>
            <p className="mt-3">
              Advertisements served by Google AdSense are clearly labeled with an "Advertisement" marker.
              We do not control the specific ads displayed, though we have configured our AdSense account
              to limit certain ad categories. If you encounter an advertisement you believe is inappropriate,
              please report it to us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">4. External Links</h2>
            <p>
              Our platform may contain links to external websites, including links within game iframes
              to developer websites, social media profiles, or app stores. These links are provided for
              informational purposes only.
            </p>
            <p className="mt-3">
              CloudPlayHub has no control over the content, privacy policies, or availability of
              external websites. The inclusion of any link does not constitute an endorsement by
              CloudPlayHub of that site's content or services. We encourage you to review the privacy
              policy and terms of service of any external website you visit.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">5. No Professional Advice</h2>
            <p>
              Nothing on CloudPlayHub constitutes legal, financial, medical, or professional advice
              of any kind. Our content — including blog posts, game descriptions, and platform text —
              is intended for entertainment and informational purposes only. Always consult a qualified
              professional for advice specific to your situation.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">6. Copyright and DMCA</h2>
            <p>
              CloudPlayHub respects intellectual property rights. If you are a copyright holder and
              believe your work is being displayed on our platform without authorization, please submit
              a formal DMCA takedown notice following the process described in our{" "}
              <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link>.
            </p>
            <p className="mt-3">
              We process all valid takedown requests within 48–72 business hours. The DMCA contact email
              is:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground">7. Changes to This Disclaimer</h2>
            <p>
              We may update this Disclaimer from time to time to reflect changes in our platform or
              the law. We will update the "Last Updated" date at the top when we do so. Continued use
              of CloudPlayHub after an update constitutes acceptance of the revised Disclaimer.
            </p>
          </div>

          <p className="pt-4 text-xs text-muted-foreground/60 italic">
            Effective Date: {EFFECTIVE_DATE}
          </p>
        </div>
      </div>
    </div>
  );
}