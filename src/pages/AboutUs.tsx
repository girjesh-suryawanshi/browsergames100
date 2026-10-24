import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Shield, Star, Users, Gamepad2, Heart, Globe, Mail } from "lucide-react";

const VALUES = [
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "General Audience & Web-Safe Gaming",
    desc: "We focus on casual, family-friendly titles across popular genres. We do not knowingly host games with graphic gore, adult themes, or deceptive software installers.",
  },
  {
    icon: <Star className="w-5 h-5 text-gaming-yellow" />,
    title: "Playability & Web Standards",
    desc: "We evaluate games to ensure they run inside modern web browsers using standard HTML5 and WebGL canvas technology without requiring executable downloads.",
  },
  {
    icon: <Globe className="w-5 h-5 text-gaming-cyan" />,
    title: "Zero-Friction Web Access",
    desc: "Gaming should be accessible to everyone. Titles on BrowserGames100 launch directly in your browser with no account registration, subscriptions, or payment walls.",
  },
  {
    icon: <Heart className="w-5 h-5 text-gaming-pink" />,
    title: "Player Feedback Driven",
    desc: "We listen to player feedback. If a game fails to load or exhibits technical issues, players can report it directly via our contact form for review.",
  },
];

const STATS = [
  { value: "28,000+", label: "HTML5 Games" },
  { value: "14", label: "Game Genres" },
  { value: "Zero", label: "Downloads Needed" },
  { value: "100%", label: "Free Access" },
];

export default function AboutUs() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrowserGames100",
    "url": "https://browsergames100.com",
    "description": "BrowserGames100 is an independent browser gaming platform offering HTML5 games playable instantly without downloads or registration.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@browsergames100.com",
      "contactType": "customer support",
      "availableLanguage": "English"
    },
    "sameAs": []
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About BrowserGames100",
    "description": "Learn about BrowserGames100's mission to provide fast, web-standard browser gaming with zero downloads or subscriptions.",
    "url": "https://browsergames100.com/about",
    "mainEntity": orgSchema,
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
        schema={[aboutSchema, orgSchema]}
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
            BrowserGames100 was built with a clear vision: to provide instant, accessible browser gaming
            for casual players and web gamers around the world with zero friction, zero forced installs,
            and 100% free access.
          </p>
        </div>

        {/* Mission */}
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground mb-12">

          <h2 className="text-2xl font-bold text-foreground">What We Built and Why</h2>
          <p>
            BrowserGames100 was engineered from the ground up to eliminate the friction usually associated with digital gaming. No mandatory account sign-ups, no payment walls, no app store downloads, and no executable plugin installations. Every game on our platform runs natively inside the web browser using standard HTML5 and WebGL web technology.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Our Curation &amp; Quality Benchmarks</h2>
          <p>
            We curate our catalog to provide an enjoyable casual gaming experience. When selecting games from authorized distribution partners, we focus on key playability benchmarks:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-primary font-bold">Browser Load Speed:</span> Games should initialize efficiently over standard internet connections and run smoothly on everyday desktop, laptop, and Chromebook devices.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">General Audience Content:</span> We prioritize family-friendly and casual entertainment, avoiding mature or graphic themes.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Responsive Controls:</span> Games must have intuitive keyboard, mouse, or touchscreen inputs that respond cleanly.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Technical Reliability:</span> Broken embeds or inactive feeds reported by users are reviewed and retired promptly.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground">Editorial &amp; Publishing Principles</h2>
          <p>
            BrowserGames100 is maintained by an independent editorial and development team. We research, write, and verify gameplay overviews, control instructions, and genre guides to help players discover engaging games. We clearly distinguish between games embedded from third-party distribution partners and our independent editorial content.
          </p>

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