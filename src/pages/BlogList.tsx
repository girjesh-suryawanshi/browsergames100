import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, BookOpen, Calendar, User } from "lucide-react";
import SEO from "@/components/SEO";
import { staticBlogPosts } from "@/data/static-blogs";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";


export default function BlogList() {
  const [posts, setPosts] = useState<any[]>(staticBlogPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/blog/posts`);
        if (response.ok) {
          const data = await response.json();
          const published = data.filter((p: any) => p.isPublished);
          if (published.length > 0) {
            setPosts(published);
          }
        }
      } catch (err) {
        console.warn("Using static blog posts fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BrowserGames100 Gaming Blog & Guides",
    "description": "Explore BrowserGames100's gaming blog for tips, game guides, top picks, and technical guides on free browser games.",
    "url": "https://browsergames100.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BrowserGames100",
      "url": "https://browsergames100.com"
    }
  };

  return (
    <main className="bg-background pt-24 pb-16 min-h-screen">
      <SEO
        title="Gaming Blog & Tips — Browser Gaming Guides"
        description="Explore BrowserGames100's gaming blog for tips, game guides, top picks, and the latest news on free browser games you can play anywhere."
        canonical="/blog"
        breadcrumbs={breadcrumbs}
        schema={blogSchema}
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Gaming Blog &amp; Tips</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Game guides, top picks, and tips for the best free browser games on BrowserGames100.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Articles Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're working on in-depth game guides and tips. Check back soon!
              </p>
            </div>
            {/* Placeholder topic cards for SEO value */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Topics We Cover</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: "🎮", title: "Game Guides", desc: "Step-by-step walkthroughs and tips for the most popular unblocked games." },
                  { emoji: "🏆", title: "Top Game Lists", desc: "Curated lists of the best action, puzzle, racing, and multiplayer browser games." },
                  { emoji: "🔓", title: "Unblocked Picks", desc: "Our editors' picks for the best games that work on Chromebooks and school networks." },
                  { emoji: "🧩", title: "Puzzle Strategies", desc: "How to solve the trickiest puzzles in popular browser puzzle games." },
                  { emoji: "🏎️", title: "Racing Game Tips", desc: "Drift guides, car upgrade strategies, and track tips for racing game fans." },
                  { emoji: "📱", title: "Mobile Gaming", desc: "The best HTML5 games that work just as well on your phone as on a PC." },
                ].map(({ emoji, title, desc }) => (
                  <div key={title} className="p-5 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                    <div className="text-3xl mb-3" aria-hidden>{emoji}</div>
                    <h3 className="font-bold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...posts]
              .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
              .map(post => {
                const cover = post.coverImage || post.ogImage || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80";
                return (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary transition-colors flex flex-col h-full">
                    <div className="aspect-[16/9] w-full bg-secondary overflow-hidden">
                      <img src={cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {post.category && (
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                          {post.category.name}
                        </span>
                      )}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {post.excerpt || post.seoDescription}
                      </p>
                      <div className="text-xs text-muted-foreground flex justify-between items-center pt-4 border-t border-border/50">
                        <span>{post.authorName}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
}
