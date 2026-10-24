/**
 * BrowserGames100 — Policy-Compliant Sitemap Generator
 *
 * Generates a clean, lean sitemap index + sub-sitemaps.
 * Avoids mass-submitting 28,000 raw thin URLs by prioritizing:
 *   1. Core site pages & legal/E-E-A-T foundations (no doorway / noindex routes)
 *   2. The 14 verified categories
 *   3. Editorial Tier 1 verified games + top played category games (~400 high-intent games)
 *   4. Verified blog guides
 *
 * Output:
 *   public/sitemap.xml            ← Sitemap Index (references all sub-sitemaps)
 *   public/sitemap-static.xml     ← Homepage, categories hub, blog hub, legal/about
 *   public/sitemap-categories.xml ← 14 verified category hubs
 *   public/sitemap-games.xml      ← Curated, verified and top-played games
 *   public/sitemap-blog.xml       ← Blog articles
 *
 * Run: node generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://browsergames100.com';
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(publicDir, 'data');
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ─── Helpers ─────────────────────────────────────────────────────────────────

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n') + '\n';
}

function wrapUrlset(entries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
  ].join('\n');
}

function wrapIndex(sitemapEntries) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    '</sitemapindex>',
  ].join('\n');
}

function sitemapIndexEntry(loc, lastmod) {
  return [
    '  <sitemap>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    '  </sitemap>',
  ].join('\n') + '\n';
}

// ─── 1. Static Pages Sitemap (No Noindex / Doorway Routes) ───────────────────

function buildStaticSitemap() {
  const pages = [
    // Core Navigation & Content Hubs
    { url: '/',           freq: 'daily',   pri: '1.0' },
    { url: '/categories', freq: 'weekly',  pri: '0.9' },
    { url: '/blog',       freq: 'weekly',  pri: '0.8' },
    // Trust, E-E-A-T & Legal Foundations
    { url: '/about',      freq: 'monthly', pri: '0.7' },
    { url: '/contact',    freq: 'monthly', pri: '0.7' },
    { url: '/privacy',    freq: 'monthly', pri: '0.5' },
    { url: '/terms',      freq: 'monthly', pri: '0.5' },
    { url: '/dmca',       freq: 'monthly', pri: '0.5' },
  ];

  let entries = '';
  pages.forEach(({ url, freq, pri }) => {
    entries += urlEntry(`${BASE_URL}${url}`, today, freq, pri);
  });

  console.log(`  ✓ ${pages.length} core static/E-E-A-T pages`);
  return wrapUrlset(entries);
}

// ─── 2. Categories Sitemap (Verified 14 Categories) ──────────────────────────

function buildCategoriesSitemap() {
  const catFile = path.join(dataDir, 'categories.json');
  if (!fs.existsSync(catFile)) {
    console.warn('⚠️  categories.json not found — skipping categories sitemap');
    return null;
  }

  const categories = JSON.parse(fs.readFileSync(catFile, 'utf8'));
  let entries = '';
  let count = 0;

  categories.forEach(cat => {
    if (cat.total_games > 0) {
      entries += urlEntry(`${BASE_URL}/category/${cat.slug}`, today, 'weekly', '0.8');
      count++;
    }
  });

  console.log(`  ✓ ${count} verified category pages`);
  return wrapUrlset(entries);
}

// ─── 3. Curated Games Sitemap (Tier 1 Verified + Top Played) ─────────────────

function buildGamesSitemap() {
  const curatedSlugs = new Set();

  // A. Extract all manually verified game slugs from game-descriptions.ts
  const descFile = path.join(__dirname, 'src', 'data', 'game-descriptions.ts');
  if (fs.existsSync(descFile)) {
    const content = fs.readFileSync(descFile, 'utf8');
    const slugMatches = content.matchAll(/(?:^|\n)\s*(?:["']([^"']+)["']|([a-zA-Z0-9_-]+))\s*:\s*\{/g);
    for (const m of slugMatches) {
      const slug = m[1] || m[2];
      if (slug && slug !== 'gameDescriptions') {
        curatedSlugs.add(slug);
      }
    }
  }

  // B. Extract top 25 most-played games from each of the 14 confirmed category files
  const catFile = path.join(dataDir, 'categories.json');
  if (fs.existsSync(catFile)) {
    const categories = JSON.parse(fs.readFileSync(catFile, 'utf8'));
    for (const cat of categories) {
      const catDataPath = path.join(dataDir, `cat-${cat.id}.json`);
      if (fs.existsSync(catDataPath)) {
        try {
          const games = JSON.parse(fs.readFileSync(catDataPath, 'utf8'));
          games.sort((a, b) => (b.p || 0) - (a.p || 0));
          for (const g of games.slice(0, 25)) {
            if (g.s) curatedSlugs.add(g.s);
          }
        } catch (e) {
          // Ignore malformed category data
        }
      }
    }
  }

  let entries = '';
  curatedSlugs.forEach(slug => {
    entries += urlEntry(`${BASE_URL}/game/${slug}`, today, 'weekly', '0.7');
  });

  console.log(`  ✓ ${curatedSlugs.size} curated and verified game pages`);
  return wrapUrlset(entries);
}

// ─── 4. Blog Sitemap ─────────────────────────────────────────────────────────

function buildBlogSitemap() {
  const blogsFile = path.join(__dirname, 'src', 'data', 'static-blogs.ts');
  if (!fs.existsSync(blogsFile)) {
    console.warn('⚠️  static-blogs.ts not found — skipping blog sitemap');
    return null;
  }

  const content = fs.readFileSync(blogsFile, 'utf8');
  const postRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"/g;

  let match;
  let entries = '';
  let count = 0;

  while ((match = postRegex.exec(content)) !== null) {
    const slug = match[2];
    const publishedAt = match[3];
    const lastmod = publishedAt ? publishedAt.split('T')[0] : today;

    entries += urlEntry(`${BASE_URL}/blog/${slug}`, lastmod, 'weekly', '0.8');
    count++;
  }

  console.log(`  ✓ ${count} blog article pages`);
  return wrapUrlset(entries);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function generate() {
  console.log('\n🗺  BrowserGames100 — Policy-Compliant Sitemap Generator\n');

  const files = {
    'sitemap-static.xml':     buildStaticSitemap(),
    'sitemap-categories.xml': buildCategoriesSitemap(),
    'sitemap-games.xml':      buildGamesSitemap(),
    'sitemap-blog.xml':       buildBlogSitemap(),
  };

  // Write sub-sitemaps
  const written = [];
  for (const [filename, content] of Object.entries(files)) {
    if (!content) continue;
    const outPath = path.join(publicDir, filename);
    fs.writeFileSync(outPath, content, 'utf8');
    const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
    console.log(`  📄 ${filename} — ${sizeKB} KB`);
    written.push(filename);
  }

  // Write sitemap index
  let indexEntries = '';
  written.forEach(filename => {
    indexEntries += sitemapIndexEntry(`${BASE_URL}/${filename}`, today);
  });

  const indexXml = wrapIndex(indexEntries);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), indexXml, 'utf8');
  console.log(`\n  ✅ sitemap.xml (index) written — references ${written.length} sub-sitemaps`);
  console.log('  📌 Submit https://browsergames100.com/sitemap.xml to Google Search Console\n');
}

try {
  generate();
} catch (err) {
  console.error('❌ Error generating sitemap:', err);
  process.exit(1);
}
