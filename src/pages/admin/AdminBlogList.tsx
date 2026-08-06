import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Loader2, Plus, Edit, Trash2, Eye, LogOut, Search, 
  BarChart3, FileText, Inbox, Megaphone, Globe, Gamepad2, 
  ThumbsUp, ThumbsDown, Play, CheckCircle2, Mail, ExternalLink, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Helmet } from "react-helmet-async";
import { API_BASE } from "@/lib/api";

export default function AdminBlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>({ topPlayed: [], totalPlays: 0, totalLikes: 0, totalDislikes: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const navigate = useNavigate();

  // AdSense control toggles (persisted to localStorage)
  const [adControls, setAdControls] = useState(() => {
    return {
      headerBanner: localStorage.getItem("ad_header_banner") !== "false",
      inGameBanner: localStorage.getItem("ad_ingame_banner") !== "false",
      sidebarBanner: localStorage.getItem("ad_sidebar_banner") !== "false",
      stickyFooter: localStorage.getItem("ad_sticky_footer") !== "false",
      publisherId: localStorage.getItem("ad_publisher_id") || "ca-pub-7506978867736173"
    };
  });

  // Decode email from token
  const token = localStorage.getItem("admin_token") || "";
  let adminEmail = "admin@browsergames100.com";
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (payload.email) adminEmail = payload.email;
  } catch {}

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Blog Posts
      const resPosts = await fetch(`${API_BASE}/api/blog/posts`);
      if (resPosts.ok) setPosts(await resPosts.json());

      // 2. Fetch Game Submissions
      const resSub = await fetch(`${API_BASE}/api/submissions/games`);
      if (resSub.ok) setSubmissions(await resSub.json());

      // 3. Fetch Contact Messages
      const resMsg = await fetch(`${API_BASE}/api/submissions/contact`);
      if (resMsg.ok) setContactMessages(await resMsg.json());

      // 4. Fetch Game Analytics
      const resStats = await fetch(`${API_BASE}/api/games/analytics/summary`);
      if (resStats.ok) setAnalytics(await resStats.json());
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from MySQL database?`)) return;

    try {
      const response = await fetch(`${API_BASE}/api/blog/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  const handleToggleAd = (key: keyof typeof adControls) => {
    setAdControls((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`ad_${String(key)}`, String(updated[key]));
      return updated;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                          post.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Status" ||
                          (statusFilter === "Published" && post.isPublished) ||
                          (statusFilter === "Draft" && !post.isPublished);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Command Center | BrowserGames100</title>
      </Helmet>

      <div className="container mx-auto max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border rounded-2xl p-6 mb-8 shadow-lg">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl font-bold tracking-tight">Admin Command Center</h1>
              <Badge variant="outline" className="border-primary/50 text-primary">MySQL Connected</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Logged in as <span className="font-semibold text-foreground">{adminEmail}</span></p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Link to="/admin/blog/new">
              <Button size="sm" className="gap-2 font-semibold">
                <Plus className="w-4 h-4" /> New Blog Article
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Multi-Tab Command Center */}
        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 rounded-xl grid grid-cols-2 md:grid-cols-5 gap-1">
            <TabsTrigger value="blog" className="gap-2 py-2.5">
              <FileText className="w-4 h-4" /> Blog CMS ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 py-2.5">
              <BarChart3 className="w-4 h-4" /> Analytics &amp; Stats
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2 py-2.5">
              <Inbox className="w-4 h-4" /> Inbox &amp; Games ({submissions.length + contactMessages.length})
            </TabsTrigger>
            <TabsTrigger value="ads" className="gap-2 py-2.5">
              <Megaphone className="w-4 h-4" /> Ad Controls
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2 py-2.5">
              <Globe className="w-4 h-4" /> SEO &amp; Indexing
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Blog CMS */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant={statusFilter === "All Status" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("All Status")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "Published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Published")}
                >
                  Published ({posts.filter(p => p.isPublished).length})
                </Button>
                <Button
                  variant={statusFilter === "Draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Draft")}
                >
                  Drafts ({posts.filter(p => !p.isPublished).length})
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground mb-4">No blog posts found matching your filter.</p>
                <Link to="/admin/blog/new">
                  <Button><Plus className="w-4 h-4 mr-2" /> Create First Article</Button>
                </Link>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                      <tr>
                        <th className="p-4">Title &amp; URL</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">IndexNow Ping</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4 font-medium">
                            <div className="font-semibold text-foreground">{post.title}</div>
                            <div className="text-xs text-muted-foreground font-mono">/blog/{post.slug}</div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{post.category?.name || "General"}</Badge>
                          </td>
                          <td className="p-4">
                            {post.isPublished ? (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Published</Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30">Draft</Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Synced
                            </div>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link to={`/admin/blog/edit/${post.slug}`}>
                              <Button size="icon" variant="outline" className="h-8 w-8">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              onClick={() => handleDeletePost(post.id, post.title)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: Analytics & Stats */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-semibold">Total Play Count</span>
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-extrabold">{analytics.totalPlays?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Real-time games launched across devices</p>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-semibold">Total Game Likes</span>
                  <ThumbsUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">{analytics.totalLikes?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Community positive ratings</p>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-semibold">Total Game Dislikes</span>
                  <ThumbsDown className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-3xl font-extrabold text-red-400">{analytics.totalDislikes?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Community feedback ratings</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" /> Top Played Games (MySQL Analytics)
              </h2>

              {analytics.topPlayed?.length === 0 ? (
                <p className="text-muted-foreground text-sm">No game activity recorded in database yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b border-border text-xs uppercase font-semibold text-muted-foreground">
                      <tr>
                        <th className="p-3">Game Slug</th>
                        <th className="p-3">Game ID</th>
                        <th className="p-3">Plays</th>
                        <th className="p-3">Likes</th>
                        <th className="p-3">Dislikes</th>
                        <th className="p-3 text-right">View Game</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {analytics.topPlayed.map((stat: any) => (
                        <tr key={stat.id} className="hover:bg-muted/30">
                          <td className="p-3 font-semibold text-foreground">{stat.slug}</td>
                          <td className="p-3 text-muted-foreground font-mono">{stat.gameId}</td>
                          <td className="p-3 font-bold text-primary">{stat.playCount.toLocaleString()}</td>
                          <td className="p-3 text-emerald-400">{stat.likeCount}</td>
                          <td className="p-3 text-red-400">{stat.dislikeCount}</td>
                          <td className="p-3 text-right">
                            <Link to={`/game/${stat.slug}`} target="_blank">
                              <Button size="sm" variant="ghost"><ExternalLink className="w-3.5 h-3.5" /></Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 3: Submissions & Inbox */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Submissions */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-primary" /> User Game Submissions ({submissions.length})
                </h2>

                {submissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No game suggestions submitted yet.</p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {submissions.map((sub: any) => (
                      <div key={sub.id} className="p-4 bg-muted/40 rounded-xl border border-border space-y-1 text-sm">
                        <div className="font-bold text-foreground">{sub.title}</div>
                        <a href={sub.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline block truncate font-mono">
                          {sub.url}
                        </a>
                        {sub.email && <div className="text-xs text-muted-foreground">Submitted by: {sub.email}</div>}
                        {sub.notes && <div className="text-xs text-foreground/80 mt-2 bg-background p-2 rounded">"{sub.notes}"</div>}
                        <div className="text-[10px] text-muted-foreground font-mono">{new Date(sub.createdAt).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Messages */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" /> Contact Messages ({contactMessages.length})
                </h2>

                {contactMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No contact messages received yet.</p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {contactMessages.map((msg: any) => (
                      <div key={msg.id} className="p-4 bg-muted/40 rounded-xl border border-border space-y-1 text-sm">
                        <div className="font-bold text-foreground">{msg.name} ({msg.email})</div>
                        {msg.subject && <div className="text-xs font-semibold text-primary">{msg.subject}</div>}
                        <div className="text-xs text-foreground/90 bg-background p-2.5 rounded mt-2">{msg.message}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{new Date(msg.createdAt).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 4: Ad Controls */}
          <TabsContent value="ads" className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Google AdSense Control Panel</h2>
                <p className="text-sm text-muted-foreground">Toggle ad placements across header, sidebar, in-game frame, and footer with instant persistence.</p>
              </div>

              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <div className="font-semibold">Header Top Banner Ad</div>
                    <div className="text-xs text-muted-foreground">Displays 728x90 Leaderboard ad above page navigation</div>
                  </div>
                  <Switch
                    checked={adControls.headerBanner}
                    onCheckedChange={() => handleToggleAd("headerBanner")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <div className="font-semibold">In-Game Interstitial &amp; Sidebar Ad</div>
                    <div className="text-xs text-muted-foreground">Displays 300x250 Banner ads beside game frames</div>
                  </div>
                  <Switch
                    checked={adControls.inGameBanner}
                    onCheckedChange={() => handleToggleAd("inGameBanner")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <div className="font-semibold">Sidebar Responsive Banner</div>
                    <div className="text-xs text-muted-foreground">Displays ad widgets inside blog and category sidebars</div>
                  </div>
                  <Switch
                    checked={adControls.sidebarBanner}
                    onCheckedChange={() => handleToggleAd("sidebarBanner")}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <div className="font-semibold">Sticky Footer Mobile Anchor Ad</div>
                    <div className="text-xs text-muted-foreground">Displays sticky bottom banner for mobile visitors</div>
                  </div>
                  <Switch
                    checked={adControls.stickyFooter}
                    onCheckedChange={() => handleToggleAd("stickyFooter")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: SEO & Indexing */}
          <TabsContent value="seo" className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-2xl shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-1">SEO Engine &amp; Indexing Automation</h2>
                <p className="text-sm text-muted-foreground">Manage automated IndexNow search engine submissions, sitemaps, and feeds.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-2">
                  <div className="font-semibold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> IndexNow Protocol Active
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically notifies Bing, Seznam, and Yandex whenever you publish or edit a blog article.
                  </p>
                </div>

                <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-2">
                  <div className="font-semibold text-primary flex items-center gap-2">
                    <Globe className="w-4 h-4" /> XML Sitemap &amp; RSS Feed
                  </div>
                  <div className="flex gap-4 text-xs font-mono">
                    <a href={`${API_BASE}/sitemap.xml`} target="_blank" rel="noreferrer" className="text-primary hover:underline">/sitemap.xml</a>
                    <a href={`${API_BASE}/rss.xml`} target="_blank" rel="noreferrer" className="text-primary hover:underline">/rss.xml</a>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
