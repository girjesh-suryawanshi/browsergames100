import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE } from "@/lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/blog");
        return;
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Admin Login | BrowserGames100</title></Helmet>
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Sign in to manage &amp; publish blog posts</p>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive text-sm font-medium p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@browsergames100.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full font-bold" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Default credentials: <code className="bg-secondary px-1 py-0.5 rounded text-foreground">admin@browsergames100.com</code> / <code className="bg-secondary px-1 py-0.5 rounded text-foreground">admin123</code>
          </p>
        </form>
      </div>
    </div>
  );
}

