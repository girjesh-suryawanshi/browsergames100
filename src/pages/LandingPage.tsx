import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight, Monitor, Wifi, Shield, Zap } from "lucide-react";
import SEO from "@/components/SEO";
import { GameCompact, getInitialGames, getTrendingGames } from "@/data/games";
import GameCard from "@/components/GameCard";
import AdPlacement from "@/components/AdPlacement";
import ScraperShield from "@/components/ScraperShield";

interface LandingPageProps {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  content: string;
  collectionTitle: string;
}

const TRUST_FEATURES = [
  { icon: <Zap className="w-4 h-4" />, label: "Instant Load" },
  { icon: <Monitor className="w-4 h-4" />, label: "Any Device" },
  { icon: <Shield className="w-4 h-4" />, label: "Safe & Curated" },
  { icon: <Wifi className="w-4 h-4" />, label: "No Download" },
];

export default function LandingPage({
  title,
  description,
  keywords,
  content,
  collectionTitle,
}: LandingPageProps) {
  const [games, setGames] = useState<GameCompact[]>([]);
  const [trending, setTrending] = useState<GameCompact[]>([]);

  useEffect(() => {
    Promise.all([getInitialGames(), getTrendingGames()]).then(([initial, trend]) => {
      setGames(initial);
      setTrending(trend.slice(0, 6));
    });
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen">
      <SEO title={title} description={description} keywords={keywords} />
      <ScraperShield />

      {/* ─── PAGE HERO ─── */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-[70px]" />
        </div>
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            BrowserGames100 · Cloud Gaming Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-5 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {TRUST_FEATURES.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-semibold text-muted-foreground"
              >
                <span className="text-primary">{icon}</span>
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-glow hover:opacity-90 transition-all"
            >
              Play Trending Games
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border hover:bg-secondary/80 transition-all"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TOP AD ─── */}
      <AdPlacement size="728x90" className="my-6" slot="leaderboard-category-top" />

      <main className="container max-w-5xl py-8">

        {/* ─── EDITOR'S PICKS (trending top 6) ─── */}
        {trending.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-foreground">⭐ Top Picks Right Now</h2>
              <Link to="/trending" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
                See all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {trending.map((game) => <GameCard key={game.id} game={game} />)}
            </div>
          </section>
        )}

        {/* ─── LONG-FORM EDITORIAL CONTENT ─── */}
        <section className="mb-12 p-6 md:p-10 bg-card/50 rounded-2xl border border-border/50">
          <div
            className="prose prose-sm md:prose-base max-w-none text-foreground/90 leading-relaxed
              prose-headings:text-foreground prose-headings:font-black
              prose-h2:text-xl prose-h3:text-lg
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-bold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Platform compatibility strip */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Compatible With
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "💻", label: "Chromebook" },
                { icon: "🪟", label: "Windows" },
                { icon: "🍎", label: "macOS" },
                { icon: "🐧", label: "Linux" },
                { icon: "📱", label: "Android" },
                { icon: "🌐", label: "Chrome / Edge / Firefox" },
              ].map(({ icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-semibold text-muted-foreground">
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GAME COLLECTION GRID ─── */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-foreground">{collectionTitle}</h2>
            <Link to="/categories" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              View All Categories <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <AdPlacement size="728x90" className="mb-6" slot="leaderboard-homepage-mid" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {games.slice(0, 20).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* ─── WHY CLOUDPLAYHUB TRUST BLOCK ─── */}
        <section className="mb-12 p-6 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-black text-foreground mb-4">
            ✅ Why Choose BrowserGames100?
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Completely free — no subscriptions, no hidden fees, no sign-up required.",
              "28,000+ hand-tested games across every genre imaginable.",
              "Fully functional on restricted school and library networks.",
              "Optimized for slow WiFi — most games are under 5MB to load.",
              "Chromebook-first design: every game tested on ChromeOS hardware.",
              "Safe content: all titles reviewed for age-appropriateness.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ─── BOTTOM AD ─── */}
        <AdPlacement size="728x90" className="mt-4" slot="leaderboard-homepage-top" />
      </main>
    </div>
  );
}
