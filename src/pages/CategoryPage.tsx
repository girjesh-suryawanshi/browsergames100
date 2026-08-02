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

const BASE_URL = "https://CloudPlayHub.com";

const CATEGORY_SEO_CONTENT: Record<string, { body: string; faq: { q: string; a: string }[] }> = {
  "action-games": {
    body: `Action games are the most played category on CloudPlayHub, and it's easy to see why. Whether you enjoy fast-paced combat, obstacle-dodging platformers, or intense beat-em-ups, there's always something new to discover. Every title in our action collection is hand-tested to make sure it loads quickly on school browsers and Chromebooks.

Our action game library covers everything from classic arcade fighters to modern HTML5 shooters and tower defense games. You'll find well-known titles like Slope, 1v1.LOL, and Shell Shockers sitting alongside hundreds of hidden gems worth exploring. All games are free, browser-based, and ready to play in seconds.

Whether you have five minutes or five hours, action games on CloudPlayHub are designed for quick sessions and deep playthroughs alike. The controls are simple enough to pick up instantly, but the skill ceiling is high enough to keep you coming back.`,
    faq: [
      { q: "What are the best unblocked action games?", a: "Some of the most popular unblocked action games on CloudPlayHub include Slope, 1v1.LOL, Shell Shockers, and Run 3. These games work on any browser including Chromebooks, with no download required." },
      { q: "Are action games safe for school?", a: "Yes. All action games on CloudPlayHub are reviewed for age-appropriate content before being listed. We do not host games with graphic violence, adult themes, or inappropriate language." },
      { q: "Do action games work on Chromebooks?", a: "Absolutely. Our entire action game library runs on Chromebooks using standard HTML5 technology. No extensions, no downloads, and no special permissions are needed." },
    ]
  },
  "racing-games": {
    body: `Racing games on CloudPlayHub bring high-speed thrills directly to your browser. From realistic drift simulators like Drift Hunters to kart racers and bike games, our racing collection has something for every type of speed enthusiast. You don't need a steering wheel or a gaming PC — just a keyboard and a browser.

All racing games in our catalog use modern WebGL technology to deliver smooth, responsive driving physics. Many titles feature upgrade systems, multiple tracks, and leaderboards that let you compete against your personal best or compare times with other players.

Browser racing games are perfect for short play sessions. Most titles let you jump straight into a race within seconds of clicking play. No installation, no tutorial screens you can't skip — just pure racing action from the moment you hit the play button.`,
    faq: [
      { q: "What are the best unblocked racing games?", a: "Top-rated racing games on CloudPlayHub include Drift Hunters, Road Fury, Madalin Stunt Cars, and Burnout Drift. All are free and work instantly in your browser." },
      { q: "Can I play racing games on a school Chromebook?", a: "Yes, all racing games on CloudPlayHub are HTML5-based and work perfectly on Chromebooks. They load fast even on shared school Wi-Fi." },
      { q: "Do browser racing games have multiplayer?", a: "Some racing games on CloudPlayHub feature multiplayer modes or leaderboards. Check the game description for details on multiplayer availability." },
    ]
  },
  "puzzle-games": {
    body: `Puzzle games on CloudPlayHub are perfect for exercising your brain during a break or study hall. Our collection includes everything from classic match-3 games and sliding tile puzzles to physics-based challenges and logic brainteasers. Every game is school-appropriate, lightweight, and built to run on any device.

Browser puzzle games are one of the most played categories among students worldwide because they combine entertainment with genuine mental engagement. Games like 2048, Mahjong, and various physics puzzlers have been shown to improve pattern recognition, spatial reasoning, and problem-solving skills.

New puzzle games are added to our catalog regularly. Whether you prefer relaxing, low-pressure puzzles or mind-bending challenges that take hours to complete, you'll find exactly what you're looking for in this category.`,
    faq: [
      { q: "What are good unblocked puzzle games for school?", a: "Popular unblocked puzzle games on CloudPlayHub include 2048, Mahjong, Cut the Rope, and various physics puzzle games. They're all free, browser-based, and school-safe." },
      { q: "Are puzzle games educational?", a: "Many puzzle games help develop skills like logical reasoning, pattern recognition, and spatial thinking. They can be a productive way to take a mental break between study sessions." },
      { q: "Can I play puzzle games offline?", a: "CloudPlayHub games require an internet connection to load. However, once a game is loaded in your browser, many puzzle games continue to work even with intermittent connectivity." },
    ]
  },
  "shooting-games": {
    body: `Shooting games on CloudPlayHub range from classic top-down arcade shooters to first-person browser games like Shell Shockers. All titles in this category are tested for content appropriateness — we focus on competitive, skill-based gameplay rather than graphic violence.

Our shooting game library includes both single-player titles for solo practice and multiplayer games where you compete against real players online. Many of the most popular titles in this category feature ranked modes, customizable loadouts, and regular updates from their developers.

These games are ideal for players who enjoy fast reflexes and competitive skill progression. Most shooting games on CloudPlayHub load in under five seconds and run at a stable framerate even on lower-end school computers.`,
    faq: [
      { q: "What are the most popular unblocked shooting games?", a: "Shell Shockers, Krunker, and various top-down shooter games are among the most played shooting games on CloudPlayHub. They all run in-browser with no downloads required." },
      { q: "Are shooting games appropriate for school?", a: "CloudPlayHub only lists shooting games with cartoon or stylized graphics. We do not host games with realistic gore, adult content, or graphic violence. All games are rated for general audiences." },
      { q: "Do shooting games support multiplayer?", a: "Many shooting games on CloudPlayHub feature real-time online multiplayer. Shell Shockers and similar .io games let you play against other players directly from your browser." },
    ]
  },
  "multiplayer-games": {
    body: `Multiplayer games are one of the most exciting categories on CloudPlayHub because they let you compete or cooperate with real people in real time. Whether you're playing with friends in the same room or challenging strangers from around the world, our multiplayer collection delivers fast, social gaming without any setup.

All multiplayer games in our catalog use efficient browser-based networking that works well even on shared school Wi-Fi. Titles like 1v1.LOL, Shell Shockers, and various .io games have active player communities that mean you'll rarely have to wait long for a match.

From battle royale-style showdowns to cooperative puzzle adventures, multiplayer gaming is about more than winning — it's about the shared experience. CloudPlayHub's multiplayer section is updated regularly with new titles as they emerge from the HTML5 gaming community.`,
    faq: [
      { q: "What are the best unblocked multiplayer games?", a: "The most popular multiplayer games on CloudPlayHub include 1v1.LOL, Shell Shockers, Among Us, and various .io games. They all support real-time play with no downloads." },
      { q: "Can I play multiplayer games with friends at school?", a: "Yes! Many multiplayer games on CloudPlayHub allow you to create private rooms or share invite links. You and your friends can play together from different school computers simultaneously." },
      { q: "Do multiplayer games work on slow internet?", a: "Most .io-style multiplayer games are optimized for low-bandwidth connections and work well on school networks. Some larger games may perform better on faster connections." },
    ]
  },
  "sports-games": {
    body: `Sports games on CloudPlayHub bring the excitement of real-world athletics to your browser — no console or sports equipment required. Our collection includes basketball, soccer, football, golf, tennis, and many more sports, all playable for free without any download.

Browser sports games range from arcade-style fun (like basketball trick shot games) to surprisingly deep simulations (like Retro Bowl's NFL management system). Whether you're a casual fan who just wants to kick a ball around or a dedicated player aiming for the top of the leaderboard, there's a sports game here for you.

All sports games in our catalog are optimized for keyboard controls and work on Chromebooks. Most titles feature satisfying physics, responsive controls, and progression systems that reward continued play.`,
    faq: [
      { q: "What are the best unblocked sports games?", a: "Popular sports games on CloudPlayHub include Retro Bowl, Basketball Stars, Head Soccer, and various football and baseball games. All are free and work in any browser." },
      { q: "Can I play sports games on a Chromebook?", a: "Yes, all sports games on CloudPlayHub use HTML5 technology and are fully compatible with Chromebook browsers. No extensions or special permissions needed." },
      { q: "Are there soccer games available?", a: "Yes, CloudPlayHub has a dedicated soccer games section with titles including head-to-head soccer games, penalty shootouts, and team management simulations." },
    ]
  },
  "strategy-games": {
    body: `Strategy games reward careful thinking, long-term planning, and smart decision-making. CloudPlayHub's strategy collection includes tower defense games, city builders, resource management titles, and turn-based tactical games — all accessible from your browser with no download required.

Unlike fast-paced action games, strategy games give you time to think and plan. They're excellent for players who enjoy the satisfaction of executing a perfect plan or turning around a losing situation through clever play. Many titles in our strategy catalog can be paused at any time, making them ideal for play during short breaks.

From commanding armies in medieval wargames to managing the budget of a digital civilization, the variety in our strategy section means you'll always find something new to challenge your mind. Strategy games are added to CloudPlayHub regularly as new HTML5 titles become available.`,
    faq: [
      { q: "What are the best unblocked strategy games?", a: "Top-rated strategy games on CloudPlayHub include various tower defense games, city builders, and turn-based war games. All are free to play without downloading anything." },
      { q: "Are strategy games good for brain development?", a: "Strategy games help develop planning, resource management, and critical thinking skills. They're a mentally engaging way to spend free time during breaks." },
      { q: "Do strategy games save progress?", a: "Many browser strategy games use local storage to save your progress automatically. However, clearing your browser data may erase saved games, so check individual game instructions for save options." },
    ]
  },
  "adventure-games": {
    body: `Adventure games on CloudPlayHub take you on journeys through mysterious worlds, ancient ruins, and fantastical lands — all from the comfort of your browser. This category blends exploration, storytelling, and problem-solving into experiences that can last from a few minutes to several hours.

Our adventure collection includes point-and-click classics, platforming adventures, dungeon crawlers, and narrative games with multiple endings depending on your choices. Whether you want to explore at your own pace or race to finish an epic quest, adventure games offer some of the most varied gameplay experiences on the platform.

All adventure games on CloudPlayHub are curated for quality and appropriateness. We test every title to make sure the story and content are suitable for a general audience, while still delivering the engaging, immersive experiences that adventure game fans love.`,
    faq: [
      { q: "What are the best unblocked adventure games?", a: "Popular adventure games on CloudPlayHub include platform adventures, dungeon crawlers, and narrative games that work instantly in any browser without downloads." },
      { q: "Do adventure games have save features?", a: "Many browser adventure games save your progress automatically using your browser's local storage. Some games use passwords or level codes instead. Check each game's instructions for details." },
      { q: "Are adventure games suitable for all ages?", a: "Yes, all adventure games on CloudPlayHub are reviewed for general audience suitability. We do not list games with mature themes, graphic violence, or adult content." },
    ]
  },
  "arcade-games": {
    body: `Arcade games represent the purest form of browser gaming: simple rules, instant fun, and always "just one more go." CloudPlayHub's arcade collection pays tribute to the golden age of gaming while bringing modern polish and performance to classic formulas.

Our arcade library includes everything from retro-inspired pixel games to modern takes on classic genres like Breakout, Space Invaders, and Pac-Man. Many titles feature high score tables that let you compete against your personal best or challenge friends to beat your record.

Arcade games are the perfect choice when you only have a few minutes to spare. They load instantly, are easy to understand, and never overstay their welcome. Yet the best arcade games have a depth that keeps skilled players engaged for hours trying to master every nuance of their mechanics.`,
    faq: [
      { q: "What are the best unblocked arcade games?", a: "Top arcade games on CloudPlayHub include retro-style shooters, classic platformers, and modern takes on Pac-Man, Tetris, and Snake. All are free and work in any browser." },
      { q: "Are arcade games good for quick gaming sessions?", a: "Absolutely. Arcade games are designed for short, intense sessions. Most games on CloudPlayHub load in under 5 seconds, making them perfect for quick breaks." },
      { q: "Do arcade games have leaderboards?", a: "Many arcade games on CloudPlayHub feature local high score tracking. Some also have global leaderboards where you can compare your score with players worldwide." },
    ]
  },
  "io-games": {
    body: ".io games are some of the most addictive browser games ever created. Characterized by simple mechanics, real-time multiplayer, and intense competition, .io games drop you into a live arena with dozens of other players the moment you hit play. No account needed, no waiting in lobbies — just instant action.\n\nCloudPlayHub has one of the largest collections of .io games available on any browser gaming platform. From the cell-eating chaos of Agar.io to the block-placing strategy of Starve.io, our library covers every major .io title and many lesser-known gems worth discovering.\n\nWhat makes .io games so compelling is their accessibility. The rules are typically simple enough to learn in under a minute, but mastering the strategy to dominate a server takes real skill and practice. They're endlessly replayable, always different, and completely free.",
    faq: [
      { q: "What are the most popular .io games?", a: "The most played .io games on CloudPlayHub include Agar.io, Slither.io, 1v1.LOL, and Shell Shockers. All are free real-time multiplayer games that work in any browser." },
      { q: "Do .io games require registration?", a: "No. Most .io games on CloudPlayHub let you play as a guest with just a username. No email address, password, or account is needed to start playing immediately." },
      { q: "Do .io games work on school networks?", a: "Yes, .io games are designed to work on low-bandwidth connections. They're optimized for school and shared networks, making them ideal for playing during free periods on Chromebooks." },
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
        <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
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
    "name": `${catName} - Unblocked Games`,
    "description": `Play the best free ${catName.toLowerCase()} unblocked online. No download, no signup. ${category.total_games.toLocaleString()} games available on Chromebooks and school browsers.`,
    "url": `${BASE_URL}/category/${slug}`,
    "isPartOf": { "@type": "WebSite", "url": `${BASE_URL}/` },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best Unblocked ${catName}`,
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
        title={`${catName} Unblocked - Free Online ${catName} for School`}
        description={`Play the best free ${catName.toLowerCase()} unblocked online for school. ${category.total_games.toLocaleString()} games available. No download, works on Chromebooks instantly.`}
        canonical={`/category/${slug}`}
        keywords={`${catName.toLowerCase()} unblocked, unblocked ${catName.toLowerCase()}, free ${catName.toLowerCase()} online, school ${catName.toLowerCase()}, ${catName.toLowerCase()} chromebook`}
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
            {catName} — Unblocked Games
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Play the best free {catName.toLowerCase()} online — no download, no signup, 100% unblocked for school!{" "}
            <strong className="text-foreground">{category.total_games.toLocaleString()} games</strong> available. Works on Chromebooks and all browsers.
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
                About Unblocked {catName}
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

