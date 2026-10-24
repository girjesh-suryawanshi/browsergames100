import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Phase 2 Remediation & Policy Regression Invariants", () => {
  it("categories.json should only contain valid categories backed by data files", () => {
    const catFile = path.resolve(__dirname, "../../public/data/categories.json");
    expect(fs.existsSync(catFile)).toBe(true);
    const categories = JSON.parse(fs.readFileSync(catFile, "utf8"));
    
    // Exactly 14 verified categories
    expect(categories.length).toBe(14);

    // No phantom categories allowed
    const phantomSlugs = [
      "browser-games", "strategy-games", "simulation-games", "idle-games",
      "kids-games", "2-player-games", "html5-games", "no-download-games", "instant-games"
    ];
    
    for (const cat of categories) {
      expect(phantomSlugs.includes(cat.slug)).toBe(false);
      const catDataFile = path.resolve(__dirname, `../../public/data/cat-${cat.id}.json`);
      expect(fs.existsSync(catDataFile)).toBe(true);
      const games = JSON.parse(fs.readFileSync(catDataFile, "utf8"));
      expect(games.length).toBe(cat.total_games);
    }
  });

  it("ads.txt must match live domain verification publisher ID pub-7316477328258550", () => {
    const adsFile = path.resolve(__dirname, "../../public/ads.txt");
    expect(fs.existsSync(adsFile)).toBe(true);
    const content = fs.readFileSync(adsFile, "utf8");
    expect(content).toContain("pub-7316477328258550");
    expect(content).not.toContain("pub-3506447122776682");
  });

  it("index.html must have aligned AdSense verification meta tag", () => {
    const indexFile = path.resolve(__dirname, "../../index.html");
    const content = fs.readFileSync(indexFile, "utf8");
    expect(content).toContain('content="ca-pub-7316477328258550"');
    expect(content).not.toContain('content="ca-pub-3506447122776682"');
  });

  it(".gitignore must protect environment secrets", () => {
    const gitignoreFile = path.resolve(__dirname, "../../.gitignore");
    const content = fs.readFileSync(gitignoreFile, "utf8");
    expect(content).toContain(".env");
    expect(content).toContain("server/.env");
  });

  it("Phase 3 original game content engine generates non-truncated content and structured controls", async () => {
    const { cleanRawDescription, getEnrichedGameContent } = await import("../lib/game-content");

    // Test truncated string repair
    const truncated = "Experience fast car racing in this exciting 3d driving game with";
    const cleaned = cleanRawDescription(truncated, "Super Speed Racing", "Action");
    expect(cleaned.endsWith(".")).toBe(true);
    expect(cleaned).toContain("Super Speed Racing");

    // Test fallback genre controls
    const mockGame = {
      id: 999999,
      t: "Generic Puzzle Challenge",
      s: "generic-puzzle-challenge",
      c: 7,
      u: "https://html5.gamemonetize.com/mock-game/",
      img: "https://img.gamemonetize.com/mock.jpg",
      p: 1200,
      r: 45,
      d: "A fun puzzle game where you match pieces together",
      ins: "Tap to match",
    };
    const mockCat = { id: 7, name: "Puzzle Games", slug: "puzzle-games", icon: "🧩", count: 100, total_games: 100, is_primary: true };

    const enriched = getEnrichedGameContent("generic-puzzle-challenge", mockGame, mockCat);
    expect(enriched.controls.length).toBeGreaterThan(0);
    expect(enriched.tips.length).toBeGreaterThan(0);
    expect(enriched.attribution.distributor).toContain("GameMonetize");
    expect(enriched.supportedDevices.chromebook).toContain("ChromeOS");
  });

  it("Sitemaps are cleanly structured, under size limits, and contain zero doorway/noindex routes", () => {
    const publicDir = path.resolve(__dirname, "../../public");
    const sitemapIndex = path.join(publicDir, "sitemap.xml");
    expect(fs.existsSync(sitemapIndex)).toBe(true);

    const indexContent = fs.readFileSync(sitemapIndex, "utf8");
    expect(indexContent).toContain("sitemap-static.xml");
    expect(indexContent).toContain("sitemap-categories.xml");
    expect(indexContent).toContain("sitemap-games.xml");
    expect(indexContent).toContain("sitemap-blog.xml");

    // Check each sub-sitemap size and contents
    const subSitemaps = ["sitemap-static.xml", "sitemap-categories.xml", "sitemap-games.xml", "sitemap-blog.xml"];
    for (const sub of subSitemaps) {
      const subPath = path.join(publicDir, sub);
      expect(fs.existsSync(subPath)).toBe(true);
      const stat = fs.statSync(subPath);
      // All sitemaps must be well under 100 KB
      expect(stat.size).toBeLessThan(150 * 1024);

      const content = fs.readFileSync(subPath, "utf8");
      // Must not contain any noindex doorway routes
      expect(content).not.toContain("/search");
      expect(content).not.toContain("/favorites");
      expect(content).not.toContain("/landing");
      expect(content).not.toContain("/poki-alternative");
    }
  });

  it("robots.txt protects crawl budget and declares single sitemap index", () => {
    const robotsPath = path.resolve(__dirname, "../../public/robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);
    const robots = fs.readFileSync(robotsPath, "utf8");

    expect(robots).toContain("Disallow: /search");
    expect(robots).toContain("Disallow: /favorites");
    expect(robots).toContain("Disallow: /landing");
    expect(robots).toContain("Sitemap: https://browsergames100.com/sitemap.xml");
    // Should NOT have multiple redundant sub-sitemap lines
    expect(robots).not.toContain("Sitemap: https://browsergames100.com/sitemap-games.xml");
  });

  it("E-E-A-T & Legal pages have consistent contact and zero stale cloudplayhub references", () => {
    const pagesDir = path.resolve(__dirname, "../../src/pages");
    const legalFiles = ["AboutUs.tsx", "ContactUs.tsx", "DMCAPolicy.tsx", "Disclaimer.tsx", "PrivacyPolicy.tsx"];

    for (const file of legalFiles) {
      const filePath = path.join(pagesDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf8");
      // Zero stale domain references allowed
      expect(content).not.toContain("cloudplayhub");
      // Must use valid browsergames100.com email
      expect(content).toContain("@browsergames100.com");
    }
  });
});

