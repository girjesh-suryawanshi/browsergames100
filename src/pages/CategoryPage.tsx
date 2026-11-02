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
import { CATEGORY_SEO_CONTENT } from "@/data/category-seo-content";

type SortOption = "popular" | "rating" | "newest";

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: "popular", label: "Most Played", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  { value: "rating", label: "Top Rated", icon: <Star className="w-3.5 h-3.5" /> },
  { value: "newest", label: "Newest", icon: <Clock className="w-3.5 h-3.5" /> },
];

const BASE_URL = "https://browsergames100.com";

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

