import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getCategories, getCategoryIcon, type Category } from "@/data/games";
import SEO from "@/components/SEO";

const BASE_URL = "https://browsergames100.com";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(cats => {
      setCategories(cats.filter(c => c.total_games > 0));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
  ];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Game Genres & Categories — BrowserGames100",
    "description": "Browse all free online browser game genres on BrowserGames100, including action, racing, puzzle, sports, shooting, and arcade games.",
    "url": `${BASE_URL}/categories`,
    "isPartOf": { "@type": "WebSite", "url": `${BASE_URL}/` },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="All Game Categories — Browse Free Browser Games by Genre"
        description="Explore 14 curated browser game categories on BrowserGames100. Play action, racing, puzzle, arcade, shooting, and multiplayer games instantly with zero downloads."
        canonical="/categories"
        breadcrumbs={breadcrumbs}
        schema={collectionSchema}
      />

      {/* Breadcrumb nav */}
      <div className="container py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-foreground" aria-current="page">Categories</span>
        </nav>
      </div>

      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">All Game Categories</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our curated collection of free online browser games by genre. Every title is tested for fast loading, responsive controls, and cross-device compatibility.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group p-6 rounded-xl bg-card hover:bg-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3" aria-hidden>{getCategoryIcon(cat.slug)}</div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{cat.total_games.toLocaleString()} games</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
