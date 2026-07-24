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

const BASE_URL = "https://CloudPlayHub.com";

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    color: "text-gaming-cyan",
    bg: "bg-gaming-cyan/10 border-gaming-cyan/20",
    title: "Instant Play",
    desc: "Zero downloads. Zero installs. Games launch in under 3 seconds directly from your browser.",
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    color: "text-gaming-pink",
    bg: "bg-gaming-pink/10 border-gaming-pink/20",
    title: "Works Everywhere",
    desc: "Chromebooks, Windows, Mac, Linux. If it has a browser, it runs our games perfectly.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: "text-gaming-yellow",
    bg: "bg-gaming-yellow/10 border-gaming-yellow/20",
    title: "Safe & Curated",
    desc: "Every title is hand-tested for performance, safety, and age-appropriateness before going live.",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Network-Friendly",
    desc: "Lightweight assets optimized for slow school WiFi. No buffering, no lag, just pure gaming.",
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
    Promise.all([getCategories(), getTrendingGames(), getInitialGames()]).then(
      ([cats, trend, initial]) => {
        setCategories(cats.filter((c) => c.total_games > 0));
        setTrending(trend);
        setAllGames(initial);
        const byId = [...initial].sort((a, b) => b.id - a.id);
        setNewGames(byId.slice(0, 12));
        setLoading(false);
      }
    );
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
  const gameSeriesSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGameSeries",
    "name": "CloudPlayHub - Free Cloud Gaming Platform",
    "url": `${BASE_URL}/`,
    "description": "Play 28,000+ free HTML5 games instantly in your browser. No download required. CloudPlayHub is the premier cloud gaming destination for Chromebooks and all modern browsers.",
    "genre": ["Action", "Puzzle", "Racing", "Arcade", "Strategy", "Multiplayer"],
    "publisher": { "@type": "Organization", "name": "CloudPlayHub", "url": `${BASE_URL}/` },
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Trending HTML5 Games",
    "description": "The most-played free browser games right now on CloudPlayHub.",
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
        title="CloudPlayHub — Free HTML5 Games, Instant Browser Play"
        description="Play 28,000+ premium HTML5 games free. No download, no install. Works on Chromebooks, Windows & Mac. Discover trending cloud games at CloudPlayHub."
        schema={[webSiteSchema, gameSeriesSchema, itemListSchema]}
        keywords="html5 games, cloud gaming browser, free browser games no download, chromebook games, play games online free, best browser games 2025"
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
              Cloud Gaming Platform · 28,000+ HTML5 Games
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-foreground mb-6">
              Your{" "}
              <span className="relative">
                <span className="text-gradient-gaming">Cloud Gaming</span>
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-50 rounded-full" />
              </span>
              <br />
              HQ is Here
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Premium HTML5 games that launch in seconds — no downloads, no installs. Works perfectly on{" "}
              <strong className="text-foreground font-semibold">Chromebooks</strong>,{" "}
              <strong className="text-foreground font-semibold">Windows</strong>, and{" "}
              <strong className="text-foreground font-semibold">Mac</strong>.
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
                Browse All Games
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {[
                { val: "28K+", label: "Games" },
                { val: "4.9", label: "Rating", icon: <Star className="w-3.5 h-3.5 text-gaming-yellow fill-gaming-yellow" /> },
                { val: "2M+", label: "Players" },
                { val: "100%", label: "Free" },
              ].map(({ val, label, icon }) => (
                <div key={label} className="flex items-center gap-1.5">
                  {icon}
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
      <section className="container mb-14" aria-label="Why CloudPlayHub">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Why CloudPlayHub?</h2>
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
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">How CloudPlayHub Works</h2>
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

      {/* ─── GLOBAL HUB ─── */}
      <section className="container mb-14">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-black text-foreground">Played Globally</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { flag: "🇺🇸", country: "United States", users: "840K+", desc: "America's top-rated free browser gaming platform, trusted by students and teachers alike." },
            { flag: "🇬🇧", country: "United Kingdom", users: "210K+", desc: "No. 1 unblocked gaming destination for UK students. Instant play on any school network." },
            { flag: "🇨🇦", country: "Canada", users: "190K+", desc: "Trending across Canadian schools and universities. Fully Chromebook-compatible." },
            { flag: "🇦🇺", country: "Australia", users: "160K+", desc: "Fast-loading, ad-safe, and 100% free — the go-to portal for Australian gamers." },
          ].map((item) => (
            <div key={item.country} className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl" aria-hidden>{item.flag}</span>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{item.country}</h3>
                  <div className="flex items-center gap-1 text-xs text-primary font-bold">
                    <Users className="w-3 h-3" />
                    {item.users} players
                  </div>
                </div>
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
    </div>
  );
}
