import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Shield, Star, Users, Gamepad2, Heart, Globe, Mail } from "lucide-react";

const VALUES = [
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Student-Safe First",
    desc: "Every game in our catalog is manually reviewed for age-appropriate content before it ever goes live. We apply strict content filters and do not host games with graphic violence, adult themes, or predatory monetization aimed at minors.",
  },
  {
    icon: <Star className="w-5 h-5 text-gaming-yellow" />,
    title: "Quality Over Quantity",
    desc: "We test every game for performance, playability, and stability across Chromebooks, Windows PCs, and mobile browsers before adding it to the catalog. If a game lags, crashes, or disappoints — it doesn't make the cut.",
  },
  {
    icon: <Globe className="w-5 h-5 text-gaming-cyan" />,
    title: "No-Barrier Access",
    desc: "Gaming should never require a credit card, an account, or a 2GB download. Every title on CloudPlayHub launches instantly in your browser — no registration, no payment, no plugin required.",
  },
  {
    icon: <Heart className="w-5 h-5 text-gaming-pink" />,
    title: "Community-Driven",
    desc: "Our trending section is powered by real player activity, not sponsored rankings. If students are playing it, it rises to the top — that's it.",
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
    "name": "CloudPlayHub",
    "url": "https://CloudPlayHub.com",
    "description": "CloudPlayHub is a free browser gaming platform offering 28,000+ HTML5 games playable instantly on any device without downloads or registration.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@cloudplayhub.com",
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
        title="About CloudPlayHub — Free Browser Gaming for Everyone"
        description="Learn about CloudPlayHub's mission to make gaming instantly accessible to students and casual players worldwide. No downloads, no accounts — just great games, free."
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
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            Gaming That Works<br />
            <span className="text-gradient-gaming">For Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            CloudPlayHub started with a simple observation: students in school libraries and computer labs
            wanted to play games during free periods, but most gaming sites either required downloads they
            couldn't install, loaded slowly on shared school networks, or were blocked by firewalls.
          </p>
        </div>

        {/* Mission */}
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground mb-12">

          <h2 className="text-2xl font-bold text-foreground">What We Built and Why</h2>
          <p>
            CloudPlayHub was built from scratch to solve one very specific problem: getting high-quality browser
            games in front of people who need them quickly, with zero friction. That means no mandatory
            account creation, no payment walls, no app store redirects, and no download prompts. Every game
            on our platform runs entirely within the browser using modern HTML5 and WebGL technology.
          </p>
          <p>
            Our platform serves students on Chromebooks, casual players on shared office computers, and
            anyone who just wants five minutes of fun without committing to a full software installation.
            We believe that access to entertainment should not depend on the device you own or the network
            you're using.
          </p>

          <h2 className="text-2xl font-bold text-foreground">How We Curate Our Game Library</h2>
          <p>
            We do not simply scrape every available HTML5 game and dump them onto the platform.
            Our editorial process involves manually testing every game for:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2"><span className="text-primary font-bold">Performance:</span> Games must load in under 5 seconds on a mid-range Chromebook connected to a shared school Wi-Fi network.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Content Standards:</span> We reject games with graphic violence, adult content, or manipulative mechanics (such as pay-to-win loot boxes designed for children).</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Playability:</span> Controls must be responsive, the game must be completable, and core mechanics must work reliably across Chrome, Firefox, and Edge.</li>
            <li className="flex gap-2"><span className="text-primary font-bold">Stability:</span> Games that crash frequently, display blank screens, or have broken audio are removed from the catalog.</li>
          </ul>
          <p>
            This process means our catalog grows more slowly than competitors, but every game in it
            actually works — and works well. We would rather have 28,000 great games than 100,000
            broken ones.
          </p>

          <h2 className="text-2xl font-bold text-foreground">Our Commitment to Privacy and Safety</h2>
          <p>
            CloudPlayHub does not require user registration, which means we collect far less personal
            data than most websites. We do not sell user data to third parties. We use Google AdSense
            to display advertisements that help keep the platform free, and we comply with GDPR, CCPA,
            and COPPA requirements. Our cookie consent banner gives every visitor clear control over
            their advertising preferences.
          </p>
          <p>
            We operate a strict content moderation process. If a game in our catalog is reported
            for inappropriate content, it is immediately reviewed and removed if the concern is valid.
            Copyright holders can submit DMCA takedown requests and we process all valid notices within
            48–72 business hours. See our <Link to="/dmca" className="text-primary hover:underline">DMCA Policy</Link> for details.
          </p>

          <h2 className="text-2xl font-bold text-foreground">The Technology Behind CloudPlayHub</h2>
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