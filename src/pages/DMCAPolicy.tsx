import SEO from "@/components/SEO";
import { Mail, AlertTriangle, FileText, Clock, CheckCircle2 } from "lucide-react";

const CONTACT_EMAIL = "dmca@cloudplayhub.com";

export default function DMCAPolicy() {
  return (
    <div className="min-h-screen py-12">
      <SEO
        title="DMCA & Copyright Policy | BrowserGames100"
        description="BrowserGames100's Digital Millennium Copyright Act (DMCA) policy. Submit takedown notices for copyright-infringing content hosted on our platform."
        canonical="/dmca"
      />

      <div className="container max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gaming-yellow/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-gaming-yellow" />
          </div>
          <h1 className="text-4xl font-black text-foreground">DMCA & Copyright Policy</h1>
        </div>
        <p className="text-muted-foreground mb-10 ml-[52px]">Effective Date: July 2026</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">

          {/* Intro */}
          <p>
            BrowserGames100 operates as an aggregation and distribution portal for HTML5 browser games. We deeply respect the intellectual property rights of all creators, developers, and publishers. This page outlines our copyright compliance procedures in accordance with the{" "}
            <strong className="text-foreground">Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512</strong>, the{" "}
            <strong className="text-foreground">EU Copyright Directive (2019/790)</strong>, and related international intellectual property frameworks.
          </p>

          <p>
            We strongly encourage copyright holders to contact us directly before submitting reports to third parties such as Google. We process all valid notices swiftly and typically remove or disable access to disputed content within{" "}
            <strong className="text-foreground">48–72 business hours</strong>.
          </p>

          {/* Warning box */}
          <div className="flex items-start gap-3 p-5 rounded-xl border border-gaming-yellow/30 bg-gaming-yellow/5 not-prose">
            <AlertTriangle className="w-5 h-5 text-gaming-yellow shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> Filing a false or misleading DMCA notice is a violation of 17 U.S.C. § 512(f) and may result in civil liability, including damages and attorney's fees. Please ensure you are the rightful copyright holder or an authorised representative before submitting a notice.
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
              <span className="text-primary">1.</span> How We Operate
            </h2>
            <p>
              BrowserGames100 does not host game files on its own servers. The games displayed on this platform are loaded via <strong className="text-foreground">HTML5 iframes</strong> sourced from third-party game development networks and CDNs (e.g., GameMonetize, GD.games, etc.). In cases where the original host is the copyright infringer, we will promptly remove the embedding of that content from our platform and direct you to the appropriate upstream host for further action.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
              <span className="text-primary">2.</span> Submitting a DMCA Takedown Notice
            </h2>
            <p>
              To submit a valid copyright infringement notice, your communication must include all of the following elements as required under <strong className="text-foreground">17 U.S.C. § 512(c)(3)</strong>:
            </p>
            <ol className="space-y-3 mt-4">
              {[
                "A physical or electronic signature of the copyright owner or an authorised representative.",
                "Identification of the copyrighted work claimed to have been infringed (e.g., title, registration number, or a URL to the original work).",
                "The specific URL(s) on BrowserGames100 where the allegedly infringing material is located.",
                "Your name, mailing address, telephone number, and email address.",
                "A statement that you have a good-faith belief that use of the material is not authorised by the copyright owner, its agent, or the law.",
                "A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or are authorised to act on behalf of the copyright owner.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Section 3 — Submit */}
          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 not-prose">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              Submit Your Notice
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Send your completed DMCA takedown notice — including all required elements listed above — to our designated copyright agent:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <strong className="text-foreground">Email (preferred):</strong>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Response Time: 48–72 business hours</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-4">
              Include <strong>"DMCA Notice"</strong> in your email subject line for fastest processing.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
              <span className="text-primary">4.</span> Counter-Notification
            </h2>
            <p>
              If you believe your content was removed due to a mistake or misidentification, you may submit a written counter-notification to our copyright agent. Your counter-notice must include: your name, address, phone, email; identification of the removed material and its previous location; a statement under penalty of perjury that the material was removed by mistake or misidentification; and your consent to the jurisdiction of the Federal District Court for your address.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-3">
              <span className="text-primary">5.</span> Repeat Infringer Policy
            </h2>
            <p>
              In accordance with the DMCA and our commitment to intellectual property protection, BrowserGames100 maintains a policy of removing or disabling access to the accounts of users who are determined to be repeat infringers. Game pages that receive multiple substantiated copyright complaints will be permanently removed from our platform without appeal.
            </p>
          </div>

          {/* Checkmarks */}
          <div className="p-5 rounded-xl border border-border/50 bg-card not-prose">
            <p className="text-sm font-bold text-foreground mb-3">Our Commitments</p>
            <ul className="space-y-2">
              {[
                "We process all valid DMCA notices within 48–72 business hours.",
                "We maintain a log of all takedown requests for legal compliance.",
                "We remove content first and investigate second to protect copyright holders.",
                "We do not share reporter contact information with third parties.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
