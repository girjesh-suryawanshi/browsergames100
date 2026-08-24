import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Shield, Star, Users, Gamepad2, Heart, Globe, Mail } from "lucide-react";

const VALUES = [
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Family & General Audience Safe",
    desc: "Every game in our catalog is manually reviewed for age-appropriate content before it ever goes live. We apply strict content filters and do not host games with graphic violence, adult themes, or predatory monetization.",
  },
  {
    icon: <Star className="w-5 h-5 text-gaming-yellow" />,
    title: "Quality Over Quantity",
    desc: "We test every game for performance, playability, and stability across Chromebooks, Windows PCs, Macs, and mobile browsers before adding it to the catalog. If a game lags, crashes, or disappoints — it doesn't make the cut.",
  },
  {
    icon: <Globe className="w-5 h-5 text-gaming-cyan" />,
    title: "No-Barrier Instant Access",
    desc: "Gaming should never require a credit card, an account, or a heavy download. Every title on BrowserGames100 launches instantly in your browser — no registration, no payment, no plugin required.",
  },
  {
    icon: <Heart className="w-5 h-5 text-gaming-pink" />,
    title: "Community & Player Focused",
    desc: "Our trending section is powered by real player activity, not sponsored rankings. If gamers are playing it, it rises to the top — that's it.",
  },
];

const STATS = [
  { value: "28,000+", label: "Curated Games" },
  { value: "2M+", label: "Monthly Players" },
  { value: "20+", label: "Game Genres" },
  { value: "100%", label: "Free, Always" },
];

export default function AboutUs() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrowserGames100",
    "url": "https://browsergames100.com",
    "description": "BrowserGames100 is a free browser gaming platform offering 28,000+ HTML5 games playable instantly on any device without downloads or registration.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@browsergames100.com",
      "contactType": "customer support",
      "availableLanguage": "English"
    },
    "sameAs": []
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <div className="min-h-screen py-12">
      <SEO
        title="About BrowserGames100 — Free Online Browser Gaming Platform"
        description="Learn about BrowserGames100's mission to make instant gaming accessible to players worldwide. No downloads, no accounts — just great browser games."
        canonical="/about"
        schema={orgSchema}
        breadcrumbs={breadcrumbs}
      />
      <div className="container max-w-4xl">

        {/* Hero section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            Browser Gaming That Works<br />
            <span className="text-gradient-gaming">For Everyone, Everywhere</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            BrowserGames100 was built with a clear vision: to provide instant, high-quality browser gaming
            for casual players, students, and gamers around the world with zero friction, zero forced installs,
            and 100% free access.
          </p>
        </div>

        {/* Mission */}
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground mb-12">

          <h2 className="text-2xl font-bold text-foreground">What We Built and Why</h2>
          <p>
            BrowserGames100 was engineered from the ground up to eliminate all the friction usually associated with digital gaming. No mandatory account sign-ups, no payment walls, no app store downloads, and no plugin installations. Every game on our platform runs natively inside the web browser using standard HTML5 and WebGL web technology.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Our Editorial Policy &amp; Game Testing Methodology</h2>
          <p>
            We take game curation very seriously. Rather than auto-scraping unverified web content, our team manually evaluates every prospective title against strict quality benchmarks:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-primary font-bold">Performance &amp; Load Speed:</span> Games must initialize in under 5 seconds over standard internet connections and run at stable framerates on low-to-mid range PC, Mac, and Chromebook devices.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Content &amp; Safety Standards:</span> We reject games containing graphic gore, mature themes, or predatory pay-to-win mechanics aimed at minors.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Cross-Device Playability:</span> Controls must be intuitive, fully responsive, and function reliably across Chrome, Firefox, Edge, and Safari browsers.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Stability Guarantee:</span> Games that exhibit frequent memory leaks, broken audio, or blank canvas renders are removed from our active catalog.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">Meet Our Editorial Team</h2>
          <p>
            Our content and strategy guides are researched, written, and verified by experienced gaming journalists:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl bg-card border border-border/60 flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-extrabold text-primary text-lg">
                MV
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-sm">Marcus Vance</h3>
                <p className="text-[11px] text-primary font-semibold mb-1">Lead Gaming Journalist & Web Architect</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Over 8 years covering browser technology, WebGL graphics optimization, and unblocked casual games.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border/60 flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gaming-cyan/20 flex items-center justify-center shrink-0 font-extrabold text-gaming-cyan text-lg">
                AR
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-sm">Alex Rivers</h3>
                <p className="text-[11px] text-gaming-cyan font-semibold mb-1">Senior Game Analyst & Content Editor</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Specializes in sports simulators, strategy guides, and competitive arcade mechanics for web platforms.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground">Commitment to User Trust &amp; AdSense Policy Compliance</h2>
          <p>
            BrowserGames100 respects user privacy and complies with all global data protection standards, including GDPR, CCPA, and COPPA. We partner exclusively with Google AdSense and verified programmatic networks to deliver clean, non-intrusive advertising that funds free gaming without compromising user experience or data privacy.
          </p>
          <p>
            We operate a strict content moderation process. If a game in our catalog is reported
            for inappropriate content, it is immediately reviewed and removed if the concern is valid.
            Copyright holders can submit DMCA takedown requests and we process all valid notices within
            48–72 business hours. See our <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link> for details.
          </p>

          <h2 className="text-2xl font-bold text-foreground">The Technology Behind BrowserGames100</h2>
          <p>
            The platform is built on modern web technologies designed for performance. We use
            progressive image loading, lazy-loaded game assets, and a Content Delivery Network (CDN)
            to ensure fast load times regardless of where in the world you're accessing the site.
            Our service worker enables partial offline support and instant repeat visits.
          </p>
          <p>
            Games are embedded via HTML5 iframes sourced from licensed game distribution networks
            including GameMonetize and GD.games. We do not host game files on our own servers — the
            game logic, assets, and save states remain with the original developers. This architecture
            respects developer IP while giving players a single, consistent discovery portal.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map(({ value, label }) => (
            <div key={label} className="p-5 rounded-xl bg-card border border-border/50 text-center">
              <div className="text-3xl font-black text-primary mb-1">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="p-5 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                    {icon}
                  </div>
                  <h3 className="font-bold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-foreground mb-1">Get in Touch</p>
            <p className="text-sm text-muted-foreground">
              Have a question, want to report an issue, or suggest a game? We'd love to hear from you.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}