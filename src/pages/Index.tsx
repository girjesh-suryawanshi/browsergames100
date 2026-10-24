import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play, TrendingUp, Zap, Globe, Loader2, Heart, Sparkles, Clock,
  Monitor, Shield, Wifi, Trophy, ChevronRight, Star, Users, Gamepad2
} from "lucide-react";
import GameCard from "@/components/GameCard";
import AdPlacement from "@/components/AdPlacement";
import {
  getCategories,
  getTrendingGames,
  getInitialGames,
  getCategoryIcon,
  type GameCompact,
  type Category,
} from "@/data/games";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyPlayed } from "@/hooks/useRecentlyPlayed";
import SEO, { buildWebSiteSchema } from "@/components/SEO";
import ScraperShield from "@/components/ScraperShield";
import InstallBanner from "@/components/InstallBanner";

const BASE_URL = "https://browsergames100.com";

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    color: "text-gaming-cyan",
    bg: "bg-gaming-cyan/10 border-gaming-cyan/20",
    title: "Instant Play",
    desc: "Zero downloads. Zero installs. Games launch directly in your modern web browser tab.",
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    color: "text-gaming-pink",
    bg: "bg-gaming-pink/10 border-gaming-pink/20",
    title: "Cross-Platform",
    desc: "Play seamlessly on Chromebooks, Windows PCs, Macs, and mobile devices.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: "text-gaming-yellow",
    bg: "bg-gaming-yellow/10 border-gaming-yellow/20",
    title: "General Audience",
    desc: "A wide variety of casual arcade, puzzle, sports, and strategy games suited for everyday players.",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Web Standards",
    desc: "Powered by modern HTML5 and WebGL web standards without requiring any third-party plugins.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Pick a Game", desc: "Browse 28,000+ titles across Action, Puzzle, Racing, Strategy and more." },
  { step: "02", title: "Click & Play", desc: "Hit the play button and your game launches instantly in the browser." },
  { step: "03", title: "Share & Compete", desc: "Rate your favorites, share with friends, and climb the leaderboards." },
];

const PLATFORMS = [
  { name: "Chrome", icon: "🌐" },
  { name: "Firefox", icon: "🦊" },
  { name: "Edge", icon: "🔵" },
  { name: "Safari", icon: "🧭" },
  { name: "Chromebook", icon: "💻" },
];

export default function Index() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { recent } = useRecentlyPlayed();
  const [categories, setCategories] = useState<Category[]>([]);
  const [trending, setTrending] = useState<GameCompact[]>([]);
  const [allGames, setAllGames] = useState<GameCompact[]>([]);
  const [recentGames, setRecentGames] = useState<GameCompact[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<GameCompact[]>([]);
  const [newGames, setNewGames] = useState<GameCompact[]>([]);
  const [loading, setLoading] = useState(true);

  const todayPlayCount = recent.length;

  useEffect(() => {
    Promise.all([
      getCategories().catch(() => []),
      getTrendingGames().catch(() => []),
      getInitialGames().catch(() => [])
    ])
      .then(([cats, trend, initial]) => {
        setCategories(cats.filter((c) => c.total_games > 0));
        setTrending(trend);
        setAllGames(initial);
        const byId = [...initial].sort((a, b) => b.id - a.id);
        setNewGames(byId.slice(0, 12));
      })
      .catch((err) => {
        console.error("Error loading games catalog:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (recent.length === 0) { setRecentGames([]); return; }
    const allAvailable = [...trending, ...allGames];
    const fromCache = allAvailable.filter((g) => recent.includes(g.id));
    const seen = new Set<number>();
    const ordered = recent
      .map((id) => fromCache.find((g) => g.id === id))
      .filter((g): g is GameCompact => !!g && !seen.has(g.id) && !seen.add(g.id)!);
    setRecentGames(ordered.slice(0, 5));
  }, [recent, trending, allGames]);

  useEffect(() => {
    if (favorites.length === 0) { setFavoriteGames([]); return; }
    const allAvailable = [...trending, ...allGames];
    setFavoriteGames(allAvailable.filter((g) => favorites.includes(g.id)).slice(0, 6));
  }, [favorites, trending, allGames]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-primary/30 animate-ping" />
        </div>
        <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading games...</p>
      </div>
    );
  }

  const webSiteSchema = buildWebSiteSchema();
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrowserGames100",
    "url": `${BASE_URL}/`,
    "logo": `${BASE_URL}/logo.png`,
    "description": "BrowserGames100 is a free browser gaming platform offering HTML5 games playable instantly without downloads or registration.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@browsergames100.com",
      "contactType": "customer support"
    }
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Trending HTML5 Games",
    "description": "The most-played free browser games right now on BrowserGames100.",
    "numberOfItems": Math.min(trending.length, 10),
    "itemListElement": trending.slice(0, 10).map((g, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/game/${g.s}`,
      "name": g.t,
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="BrowserGames100 — Free Browser Games, No Download Needed"
        description="Play free HTML5 browser games instantly in your web browser — no download, no account required. Action, puzzle, racing, and arcade games on PC, mobile and Chromebook."
        schema={[webSiteSchema, itemListSchema, orgSchema]}
        keywords="html5 games, free browser games no download, unblocked games, chromebook games, play games online free, best browser games 2026"
        canonical="/"
      />
      <ScraperShield />
      <InstallBanner />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gaming-blue/5 blur-[80px]" />
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Free Browser Games · Instant Web Play
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
              Play Free Games{" "}
              <span className="relative">
                <span className="text-gradient-gaming">Instantly</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-50 rounded-full" />
              </span>
              <br />
              No Download Needed
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Explore thousands of free HTML5 browser games that launch directly in your browser.
              Fully compatible with{" "}
              <strong className="text-foreground font-semibold">Chromebooks</strong>,{" "}
              <strong className="text-foreground font-semibold">Windows</strong>,{" "}
              <strong className="text-foreground font-semibold">Mac</strong>, and mobile browsers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to={trending[0]?.s ? `/game/${trending[0].s}` : "/trending"}
                id="hero-play-now-btn"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-glow hover:opacity-90 hover:scale-105 transition-all duration-200 text-base"
              >
                <Play className="w-5 h-5 fill-current" />
                Play Now — It's Free
              </Link>
              <Link
                to="/categories"
                id="hero-browse-btn"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all duration-200 text-base border border-border"
              >
                Browse All Genres
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Value Proposition Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {[
                { val: "28K+", label: "Browser Games" },
                { val: "Instant", label: "Browser Play" },
                { val: "Zero", label: "Downloads" },
                { val: "100%", label: "Free" },
              ].map(({ val, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="font-black text-foreground">{val}</span>
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                {PLATFORMS.map((p) => (
                  <span key={p.name} title={p.name} className="text-lg leading-none" aria-label={p.name}>
                    {p.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOP AD ─── */}
      <AdPlacement size="728x90" className="my-6" slot="leaderboard-homepage-top" />

      {/* ─── FEATURE STRIP ─── */}
      <section className="container mb-14" aria-label="Why BrowserGames100">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Why BrowserGames100?</h2>
          <p className="text-muted-foreground">Built different. No compromises.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon, color, bg, title, desc }) => (
            <div
              key={title}
              className={`p-5 rounded-2xl border ${bg} hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className={`${color} mb-3`}>{icon}</div>
              <h3 className="font-bold text-foreground mb-1 text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── RECENTLY PLAYED & FAVORITES ─── */}
      {(recentGames.length > 0 || favoriteGames.length > 0) && (
        <section className="container mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            {recentGames.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Recently Played</h2>
                    {todayPlayCount > 0 && (
                      <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary">
                        {todayPlayCount} today
                      </span>
                    )}
                  </div>
                  <Link to="/favorites" className="text-xs text-primary hover:underline font-medium">View all →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {recentGames.map((game) => (
                    <GameCard key={game.id} game={game} isFavorite={isFavorite(game.id)} onToggleFavorite={toggleFavorite} size="sm" />
                  ))}
                </div>
              </div>
            )}
            {favoriteGames.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">My Favorites</h2>
                  </div>
                  <Link to="/favorites" className="text-xs text-primary hover:underline font-medium">View all →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {favoriteGames.slice(0, 3).map((game) => (
                    <GameCard key={game.id} game={game} isFavorite={true} onToggleFavorite={toggleFavorite} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── TRENDING ─── */}
      <section className="container mb-14" aria-label="Trending games">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground leading-tight">🔥 Trending Right Now</h2>
              <p className="text-xs text-muted-foreground">Most played in the last 24 hours</p>
            </div>
          </div>
          <Link to="/trending" className="text-sm text-primary hover:underline font-semibold flex items-center gap-1">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trending.slice(0, 12).map((game) => (
            <GameCard key={game.id} game={game} isFavorite={isFavorite(game.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </section>

      {/* ─── EDITOR'S PICKS ─── */}
      {trending.length >= 6 && (
        <section className="container mb-14">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6 md:p-8">
            <div className="absolute top-4 right-4 opacity-10 pointer-events-none" aria-hidden>
              <Trophy className="w-32 h-32 text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gaming-yellow/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gaming-yellow" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">⭐ Editor's Picks</h2>
                <p className="text-xs text-muted-foreground">Hand-curated by our gaming team</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {trending.slice(6, 12).map((game) => (
                <GameCard key={game.id} game={game} isFavorite={isFavorite(game.id)} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NEW THIS WEEK ─── */}
      {newGames.length > 0 && (
        <section className="container mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gaming-cyan/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gaming-cyan" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">✨ New This Week</h2>
              <p className="text-xs text-muted-foreground">Fresh titles just added to the catalog</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {newGames.map((game) => (
              <GameCard key={game.id} game={game} isFavorite={isFavorite(game.id)} onToggleFavorite={toggleFavorite} isNew />
            ))}
          </div>
        </section>
      )}

      {/* ─── CATEGORIES ─── */}
      <section className="container mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-foreground">🎯 Browse by Genre</h2>
          <Link to="/categories" className="text-sm text-primary hover:underline font-semibold flex items-center gap-1">
            All genres <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative p-4 rounded-xl bg-card hover:bg-card-hover border border-border/50 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200" aria-hidden>
                {getCategoryIcon(cat.slug)}
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.total_games.toLocaleString()} games</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── MID AD ─── */}
      <AdPlacement size="728x90" className="my-6" slot="leaderboard-homepage-mid" />

      {/* ─── HOW IT WORKS ─── */}
      <section className="container mb-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">How BrowserGames100 Works</h2>
          <p className="text-muted-foreground max-w-md mx-auto">From zero to playing in under 10 seconds. No account needed.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="relative p-6 rounded-2xl bg-card border border-border/50 text-center group hover:border-primary/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-xl font-black text-primary">{step}</span>
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PLATFORM COMPATIBILITY ─── */}
      <section className="container mb-14" aria-label="Device and Browser Compatibility">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-black text-foreground">Play on Any Modern Device</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "💻", title: "Chromebooks", desc: "Native HTML5 and WebGL support. Runs directly in ChromeOS with zero installation or developer mode required." },
            { icon: "🖥️", title: "Windows PCs", desc: "Compatible with modern Windows browsers. Full support for keyboard navigation, mouse controls, and gamepads." },
            { icon: "🍎", title: "Mac & macOS", desc: "Optimized for Safari, Chrome, and Firefox on macOS. Smooth framerates and retina canvas rendering." },
            { icon: "📱", title: "Mobile & Tablets", desc: "Responsive touchscreen controls on Android and iOS devices. Play casual games on the go in full screen." },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl" aria-hidden>{item.icon}</span>
                <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ALL GAMES ─── */}
      <section className="container mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-foreground">🎮 All Games</h2>
          <Link to="/categories" className="text-sm text-primary hover:underline font-semibold flex items-center gap-1">
            Browse categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allGames.slice(0, 48).map((game) => (
            <GameCard key={game.id} game={game} isFavorite={isFavorite(game.id)} onToggleFavorite={toggleFavorite} size="sm" />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-glow hover:opacity-90 transition-all duration-200"
          >
            Explore All 28,000+ Games →
          </Link>
        </div>
      </section>
      {/* ─── FAQ SECTION (AEO) ─── */}
      <section className="container mb-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about BrowserGames100.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is BrowserGames100?",
              a: "BrowserGames100 is a free browser gaming platform where you can play 28,000+ HTML5 games instantly without downloading anything. It works on any device with a modern browser, including Chromebooks, Windows PCs, Macs, and smartphones."
            },
            {
              q: "Do I need to create an account to play games?",
              a: "No. BrowserGames100 requires absolutely no account, registration, or email address. Simply visit the site, pick a game, and click play. Your favorite games and recently played history are saved locally on your device."
            },
            {
              q: "Are the games on BrowserGames100 free?",
              a: "Yes, all games on BrowserGames100 are 100% free to play. The platform is supported by advertising revenue through Google AdSense, which allows us to keep every game free for all users."
            },
            {
              q: "Do these games work on school Chromebooks?",
              a: "Yes. Every game in our catalog is built with HTML5 technology that works natively on Chromebooks without any extensions, plugins, or downloads. The games are also optimized for school Wi-Fi networks."
            },
            {
              q: "How often are new games added?",
              a: "New games are added to BrowserGames100 regularly. You can find the latest additions in the \u2728 New This Week section on the homepage, and trending titles in the 🔥 Trending Right Now section."
            },
            {
              q: "Is BrowserGames100 suitable for family and casual play?",
              a: "Yes. Our catalogue features casual arcade, puzzle, sports, and strategy web games suitable for general audiences. Games run directly in standard browser tabs without software downloads or account registrations. If you ever encounter an issue with a game, you can contact us directly via our Contact page."
            },
          ].map(({ q, a }, i) => (
            <details key={i} className="group p-5 rounded-xl bg-card border border-border/50 cursor-pointer hover:border-primary/30 transition-colors">
              <summary className="font-semibold text-foreground list-none flex items-center justify-between gap-4">
                {q}
                <span className="text-primary text-lg group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
