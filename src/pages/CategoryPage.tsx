import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Loader2, ArrowUpDown, TrendingUp, Star, Clock, ChevronUp } from "lucide-react";
import {
  getCategories,
  getCategoryGames,
  getCategoryIcon,
  type Category,
  type GameCompact,
} from "@/data/games";
import { useFavorites } from "@/hooks/useFavorites";
import GameCard from "@/components/GameCard";
import AdPlacement from "@/components/AdPlacement";
import SEO from "@/components/SEO";

type SortOption = "popular" | "rating" | "newest";

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: "popular", label: "Most Played", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { value: "rating", label: "Top Rated", icon: <Star className="w-3.5 h-3.5" /> },
  { value: "newest", label: "Newest", icon: <Clock className="w-3.5 h-3.5" /> },
];

const BASE_URL = "https://browsergames100.com";

const CATEGORY_SEO_CONTENT: Record<string, { body: string; faq: { q: string; a: string }[] }> = {
  "browser-games": {
    body: `Browser games are online video games that run directly inside your web browser without requiring software installations or app store downloads. At BrowserGames100, we curate over 28,000 top-rated browser games that launch in under three seconds on any modern computer, Chromebook, or smartphone.

Our catalog spans every major genre including action, racing, puzzle, strategy, multiplayer, and idle games. Players across North America, Europe, Asia, and Latin America use BrowserGames100 daily for fast, free, and secure casual gaming. Every title in our library is tested for high performance, smooth framerates, and responsive controls.

Playing browser games on BrowserGames100 is 100% free with zero registration barriers. Simply choose a title, click play, and enjoy instant gaming entertainment directly in your web tab.`,
    faq: [
      { q: "What are browser games?", a: "Browser games are video games that run directly in web browsers using HTML5, WebGL, and JavaScript technologies. They require no downloads, installations, or app store downloads." },
      { q: "Are browser games on BrowserGames100 completely free?", a: "Yes. All 28,000+ browser games on BrowserGames100 are completely free to play without any hidden fees, subscription costs, or mandatory user accounts." },
      { q: "Do browser games work on Chromebooks and school computers?", a: "Yes. All games on BrowserGames100 use standard web technologies supported natively by ChromeOS, Windows, macOS, Linux, Android, and iOS browsers." },
    ]
  },
  "action-games": {
    body: `Action games are the most played category on BrowserGames100. Whether you enjoy fast-paced combat, obstacle-dodging platformers, or intense beat-em-ups, there's always something exciting to play. Every title in our action collection is hand-tested to make sure it loads quickly on all browsers and devices.

Our action game library covers everything from classic arcade fighters to modern HTML5 shooters and tower defense titles. You'll find well-known games sitting alongside hidden indie gems worth exploring. All titles are free, browser-based, and ready to play in seconds.

Whether you have five minutes or five hours, action games on BrowserGames100 are built for immediate fun and deep skill progression alike. Controls are intuitive, responsive, and optimized for both keyboard and touchscreen setups.`,
    faq: [
      { q: "What are the best browser action games?", a: "Popular action games on BrowserGames100 include Slope, 1v1.LOL, Shell Shockers, and Run 3. These games work in any browser with zero installation." },
      { q: "Are action games safe and general-audience friendly?", a: "Yes. All action games on BrowserGames100 are reviewed for age-appropriate content. We do not host titles with graphic gore or adult themes." },
      { q: "Do action games support fullscreen mode?", a: "Yes. Simply click the fullscreen icon on the game player to expand the game to your full display height and width." },
    ]
  },
  "racing-games": {
    body: `Racing games on BrowserGames100 bring high-speed motor thrills directly to your browser. From realistic drift simulators like Drift Hunters to kart racers and stunt motorbike challenges, our racing collection caters to every speed enthusiast. You don't need a heavy gaming rig — just a browser and keyboard.

All racing titles in our catalog utilize WebGL rendering to deliver smooth 60FPS driving physics, vehicle tuning options, customizable cars, and diverse race tracks. Compete against ghost cars, AI drivers, or attempt high score time trials.

Browser racing games provide instant adrenaline. Jump straight into the driver's seat within seconds of visiting the site without waiting for GB-sized downloads.`,
    faq: [
      { q: "What are the top racing games on BrowserGames100?", a: "Top-rated racing titles include Drift Hunters, Road Fury, Madalin Stunt Cars, and Burnout Drift." },
      { q: "Can I play racing games on Chromebooks?", a: "Yes, all racing games on BrowserGames100 are HTML5-based and run smoothly on Chromebook hardware." },
      { q: "Do browser racing games support steering wheels or key controls?", a: "Most games support standard WASD or Arrow Keys, with gamepad controller support available on select WebGL titles." },
    ]
  },
  "puzzle-games": {
    body: `Puzzle games on BrowserGames100 offer brain-boosting entertainment for players of all ages. Our collection includes classic match-3 puzzles, 2048 tiles, Mahjong, physics-based contraptions, and logic brainteasers.

Playing browser puzzle games helps sharpen spatial reasoning, pattern recognition, and problem-solving skills. Whether you prefer relaxing color-sorting puzzles or complex room escape challenges, you'll find hundreds of unique titles to test your mental agility.

New puzzle games are added regularly to our catalog. Every game saves your level progress locally so you can resume your puzzle journey whenever you return.`,
    faq: [
      { q: "What are the best free online puzzle games?", a: "Popular puzzle games on BrowserGames100 include 2048, Mahjong Solitaire, Cut the Rope, and Water Sort Puzzle." },
      { q: "Do puzzle games save my progress?", a: "Yes. Most HTML5 puzzle games save level progress and high scores in your browser's local cache automatically." },
      { q: "Are puzzle games mobile-friendly?", a: "Yes. All puzzle titles feature responsive touch controls optimized for iOS and Android devices." },
    ]
  },
  "adventure-games": {
    body: `Adventure games on BrowserGames100 take you on immersive quests across magical worlds, mysterious dungeons, and futuristic sci-fi realms. This category combines exploration, story-driven choices, and puzzle solving into captivating web experiences.

Choose from side-scrolling platform adventures, point-and-click mystery games, RPG dungeon crawlers, and interactive survival games. Every adventure title is vetted for rich gameplay mechanics and smooth browser performance.`,
    faq: [
      { q: "What are the top browser adventure games?", a: "Top adventure games on BrowserGames100 include Fireboy and Watergirl, Bob the Robber, and Vex series platformers." },
      { q: "Are adventure games suitable for all ages?", a: "Yes. All adventure games on BrowserGames100 are family-friendly and rated for general audiences." },
    ]
  },
  "arcade-games": {
    body: `Arcade games capture the timeless spirit of classic gaming halls: simple controls, instant gratification, and addictive high-score chasing. BrowserGames100's arcade collection features retro pixel titles alongside modern remakes of Pac-Man, Tetris, Space Invaders, and pinball.

Arcade games are ideal when you have a few minutes for quick fun. They launch in seconds and provide endless replayability as you strive to top global and personal leaderboards.`,
    faq: [
      { q: "What are classic arcade games available online?", a: "Popular arcade titles on BrowserGames100 include retro block breakers, retro platformers, infinite runners, and brick breakers." },
      { q: "Do arcade games work with keyboards?", a: "Yes. Arcade games are designed for Arrow Keys, Spacebar, or simple mouse clicks." },
    ]
  },
  "sports-games": {
    body: `Sports games on BrowserGames100 deliver realistic and arcade athletic competition directly to your screen. Play basketball, soccer, American football, tennis, golf, baseball, and skateboarding for free.

Enjoy deep team management in titles like Retro Bowl or fast 1v1 head-to-head matches in Basketball Stars and Head Soccer. All sports games feature smooth physics and responsive controls.`,
    faq: [
      { q: "What are popular online sports games?", a: "Top sports games on BrowserGames100 include Retro Bowl, Basketball Stars, Soccer Skills, and Penalty Shooters." },
      { q: "Can I play sports games with a friend?", a: "Yes! Many sports games feature 2-player local co-op and head-to-head modes." },
    ]
  },
  "strategy-games": {
    body: `Strategy games on BrowserGames100 challenge your analytical thinking, long-term planning, and tactical decisions. Explore tower defense games, kingdom builders, turn-based strategy, and real-time resource management.

Command armies, build defenses, manage economic supply lines, and conquer enemy territory. Strategy titles allow you to play at your own pace and refine your tactics over multiple sessions.`,
    faq: [
      { q: "What are the best browser strategy games?", a: "Popular strategy titles include Kingdom Rush, Bloons Tower Defense, Clash of Armor, and Chess Online." },
      { q: "Do strategy games require high PC specs?", a: "No. All strategy games on BrowserGames100 run efficiently inside standard web browsers." },
    ]
  },
  "simulation-games": {
    body: `Simulation games on BrowserGames100 allow you to experience real-world jobs, vehicle operation, city management, and sandbox creation. Drive trucks, manage restaurants, fly airplanes, or build thriving digital cities.

Simulation games provide relaxing, open-ended gameplay where you can experiment, build, and explore without time limits or pressure.`,
    faq: [
      { q: "What kinds of simulation games are available?", a: "We offer vehicle driving simulators, cooking and restaurant management, flight simulators, and farming games." },
    ]
  },
  "idle-games": {
    body: `Idle games (also known as clicker or incremental games) feature satisfying progression loops where your automated empire grows even while you relax. Click to earn currency, purchase automated upgrades, unlock achievements, and prestige for massive multipliers.

Idle games on BrowserGames100 run seamlessly in background tabs and save progress automatically.`,
    faq: [
      { q: "What are the best idle clicker games?", a: "Top idle games on BrowserGames100 include Cookie Clicker, Clicker Heroes, Grindcraft, and Idle Mining Empire." },
    ]
  },
  "shooting-games": {
    body: `Shooting games on BrowserGames100 feature competitive action, target practice, and tactical combat. Play first-person shooters (FPS), top-down battle arenas, sniper challenges, and multiplayer egg combat in Shell Shockers.

All shooting games are tested for fair matchmaking, low latency, and general audience content compliance.`,
    faq: [
      { q: "What are popular online shooting games?", a: "Popular shooting titles include Shell Shockers, Krunker, 1v1.LOL, and Gun Mayhem." },
    ]
  },
  "kids-games": {
    body: `Kids games on BrowserGames100 feature safe, colorful, and educational entertainment designed for younger players. Enjoy simple puzzles, coloring books, dress-up games, music games, and fun cartoon adventures.

Parents and teachers trust BrowserGames100 for ad-safe, family-friendly gaming content.`,
    faq: [
      { q: "Are games on BrowserGames100 safe for children?", a: "Yes. Our kids category features strictly curated, age-appropriate games with no violent content or deceptive links." },
    ]
  },
  "2-player-games": {
    body: `2 Player games on BrowserGames100 let two players share a single keyboard or device for local head-to-head battles or cooperative teamwork. Play soccer duels, tank wars, platformer adventures, and racing challenges with friends or family.`,
    faq: [
      { q: "How do 2-player browser games work?", a: "Player 1 typically uses WASD keys while Player 2 uses Arrow Keys on the same keyboard." },
    ]
  },
  "multiplayer-games": {
    body: `Multiplayer games on BrowserGames100 connect you with players around the globe in real-time battle arenas, .io games, and cooperative servers. Jump into live matches instantly without lobby wait times.`,
    faq: [
      { q: "Do multiplayer games require accounts?", a: "No. Most multiplayer games on BrowserGames100 allow guest play with custom nicknames." },
    ]
  },
  "html5-games": {
    body: `HTML5 games represent the modern standard of web gaming, replacing legacy Flash plugins entirely. HTML5 games run natively in all modern browsers with fast load times, touch compatibility, and high security.`,
    faq: [
      { q: "Why are HTML5 games better than Flash games?", a: "HTML5 games require no extra plugins, consume less battery power, load faster, and work on mobile devices natively." },
    ]
  },
  "no-download-games": {
    body: `No download games allow you to play complete video games instantly inside your web browser. Save disk space, avoid installation security risks, and enjoy instant gaming on any connected device.`,
    faq: [
      { q: "Are no download games safe?", a: "Yes. Because games run inside a sandboxed web browser tab, they cannot modify system files or install unwanted software." },
    ]
  },
  "instant-games": {
    body: `Instant games on BrowserGames100 load in under 3 seconds with zero splash screens or lengthy loading bars. Perfect for quick breaks, Chromebooks, and fast gaming sessions anytime.`,
    faq: [
      { q: "How fast do instant games load?", a: "Most instant HTML5 games on BrowserGames100 initialize in 1 to 3 seconds over standard internet connections." },
    ]
  },
  "io-games": {
    body: `.io games offer addictive real-time multiplayer action in open arenas. Grow your character, collect resources, avoid larger opponents, and climb the leaderboard in games like Agar.io, Slither.io, and Paper.io.`,
    faq: [
      { q: "What are the top .io games on BrowserGames100?", a: "Top .io games include Agar.io, Slither.io, Diep.io, 1v1.LOL, and Shell Shockers." },
    ]
  },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryGames, setCategoryGames] = useState<GameCompact[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("popular");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const perPage = 48;

  useEffect(() => {
    setLoading(true);
    setPage(1);
    setSort("popular");
    window.scrollTo(0, 0);
    getCategories().then(async (cats) => {
      setCategories(cats.filter((c) => c.total_games > 0));
      const cat = cats.find((c) => c.slug === slug) || null;
      setCategory(cat);
      if (cat) {
        const games = await getCategoryGames(cat.id);
        setCategoryGames(games);
      }
      setLoading(false);
    });
  }, [slug]);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sort games
  const sortedGames = useMemo(() => {
    const games = [...categoryGames];
    if (sort === "popular") return games.sort((a, b) => (b.p || 0) - (a.p || 0));
    if (sort === "rating") return games.sort((a, b) => (b.r || 0) - (a.r || 0));
    if (sort === "newest") return games.sort((a, b) => (b.id || 0) - (a.id || 0));
    return games;
  }, [categoryGames, sort]);

  const visibleGames = sortedGames.slice(0, page * perPage);
  const hasMore = visibleGames.length < sortedGames.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <SEO title="Category Not Found" noindex={true} canonical="/categories" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-6">This category is not available or has been consolidated into our primary genre list.</p>
        <Link to="/categories" className="text-primary hover:underline">← Browse All Categories</Link>
      </div>
    );
  }

  const catName = category.name;
  const catIcon = getCategoryIcon(category.slug);
  const seoBg = CATEGORY_SEO_CONTENT[slug || ""];

  // Build FAQ schema if we have FAQ data for this category
  const faqSchema = seoBg ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoBg.faq.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  } : null;

  // JSON-LD schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${catName} - Free Online Browser Games`,
    "description": `Play free ${catName.toLowerCase()} online with no download required. Over ${category.total_games.toLocaleString()} games playable instantly in your browser.`,
    "url": `${BASE_URL}/category/${slug}`,
    "isPartOf": { "@type": "WebSite", "url": `${BASE_URL}/` },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Popular ${catName}`,
    "numberOfItems": Math.min(visibleGames.length, 10),
    "itemListElement": visibleGames.slice(0, 10).map((g, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/game/${g.s}`,
      "name": g.t,
    })),
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
    { name: catName, url: `/category/${slug}` },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={`Free ${catName} Online — Play in Browser`}
        description={`Play ${category.total_games.toLocaleString()} free ${catName.toLowerCase()} online directly in your web browser. Instant play on PC, Mac, Chromebook, and mobile without downloads.`}
        canonical={`/category/${slug}`}
        keywords={`${catName.toLowerCase()}, free ${catName.toLowerCase()}, play ${catName.toLowerCase()} online, html5 ${catName.toLowerCase()}, browser games`}
        schema={[collectionSchema, itemListSchema, ...(faqSchema ? [faqSchema] : [])]}
        breadcrumbs={breadcrumbs}
      />

      {/* Breadcrumb */}
      <div className="container py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link>
          <span aria-hidden>/</span>
          <span className="text-foreground" aria-current="page">{catName}</span>
        </nav>
      </div>

      <section className="container mb-8">
        {/* Category Header */}
        <div className="p-6 rounded-xl bg-card border border-border/50 mb-6">
          <div className="text-4xl mb-3" aria-hidden>{catIcon}</div>
          <h1 className="text-3xl font-black text-foreground mb-2">
            Free {catName} Online
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Play the best free {catName.toLowerCase()} directly in your browser — zero downloads, no installation required.{" "}
            <strong className="text-foreground">{category.total_games.toLocaleString()} curated titles</strong> available on PC, Mac, Chromebook, and mobile devices.
          </p>
        </div>

        <AdPlacement size="728x90" className="mb-6" slot="leaderboard-category-top" />

        {/* Sort Controls */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <ArrowUpDown className="w-4 h-4" /> Sort by:
          </span>
          <div className="flex gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setSort(opt.value); setPage(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  sort === opt.value
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <span className="ml-auto text-sm text-muted-foreground">
            {sortedGames.length.toLocaleString()} games
          </span>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={isFavorite(game.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-8 py-3 bg-primary/10 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
            >
              Load More Games ({sortedGames.length - visibleGames.length} remaining)
            </button>
          </div>
        )}

        {/* SEO Text Block */}
        {seoBg && (
          <div className="mt-12 space-y-4">
            <div className="p-6 bg-card rounded-xl border border-border/30">
              <h2 className="text-lg font-bold text-foreground mb-4">
                About {catName}
              </h2>
              {seoBg.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">{para}</p>
              ))}
            </div>

            {/* FAQ Section for AEO */}
            <div className="p-6 bg-card rounded-xl border border-border/30">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {seoBg.faq.map(({ q, a }, i) => (
                  <div key={i} className="border-b border-border/30 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Other Categories */}
      <section className="container mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Explore More Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.id !== category.id)
            .map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span aria-hidden>{getCategoryIcon(cat.slug)}</span>
                {cat.name}
              </Link>
            ))}
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow hover:opacity-90 transition-all animate-in fade-in duration-300"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

