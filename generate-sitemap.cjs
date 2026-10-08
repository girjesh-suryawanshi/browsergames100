/**
 * BrowserGames100 — Sitemap Generator
 *
 * Generates a SPLIT sitemap index + sub-sitemaps to avoid the 5.7 MB
 * single-file problem. Google processes each sub-sitemap independently
 * which speeds up indexing.
 *
 * Output:
 *   public/sitemap.xml          ← Sitemap Index (references all sub-sitemaps)
 *   public/sitemap-static.xml   ← Homepage + legal + landing pages
 *   public/sitemap-categories.xml ← Category pages
 *   public/sitemap-games.xml    ← All game pages (paginated by priority)
 *
 * Run: node generate-sitemap.cjs
 */

const fs   = require('fs');
const path = require('path');

const BASE_URL  = 'https://browsergames100.com';
const publicDir = path.join(__dirname, 'public');
const dataDir   = path.join(publicDir, 'data');
const now       = new Date().toISOString();
const today     = now.split('T')[0]; // YYYY-MM-DD

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

// ─── 1. Static Pages Sitemap ─────────────────────────────────────────────────

function buildStaticSitemap() {
  const pages = [
    // Core — highest priority
    { url: '/',           freq: 'daily',   pri: '1.0' },
    { url: '/trending',   freq: 'daily',   pri: '0.9' },
    { url: '/categories', freq: 'weekly',  pri: '0.8' },
    { url: '/blog',       freq: 'weekly',  pri: '0.7' },
    // EEAT / Legal — required for AdSense
    { url: '/about',      freq: 'monthly', pri: '0.6' },
    { url: '/contact',    freq: 'monthly', pri: '0.6' },
    { url: '/privacy',    freq: 'monthly', pri: '0.5' },
    { url: '/terms',      freq: 'monthly', pri: '0.5' },
    { url: '/disclaimer', freq: 'monthly', pri: '0.4' },
    { url: '/dmca',       freq: 'monthly', pri: '0.4' },
    // SEO Landing Pages
    { url: '/play-html5-games',        freq: 'weekly', pri: '0.7' },
    { url: '/free-browser-games',      freq: 'weekly', pri: '0.7' },
    { url: '/cloud-gaming-unblocked',  freq: 'weekly', pri: '0.7' },
    { url: '/poki-alternative',        freq: 'weekly', pri: '0.7' },
    { url: '/unblocked-racing-games',  freq: 'weekly', pri: '0.7' },
  ];

  let entries = '';
  pages.forEach(({ url, freq, pri }) => {
    entries += urlEntry(`${BASE_URL}${url}`, today, freq, pri);
  });

  return wrapUrlset(entries);
}

// ─── 2. Categories Sitemap ───────────────────────────────────────────────────

function buildCategoriesSitemap() {
  const catFile = path.join(dataDir, 'categories.json');
  if (!fs.existsSync(catFile)) {
    console.warn('⚠️  categories.json not found — skipping categories sitemap');
    return null;
  }

  const categories = JSON.parse(fs.readFileSync(catFile, 'utf8'));
  let entries = '';
  categories.forEach(cat => {
    if (cat.total_games > 0) {
      entries += urlEntry(`${BASE_URL}/category/${cat.slug}`, today, 'weekly', '0.8');
    }
  });
  console.log(`  ✓ ${categories.filter(c => c.total_games > 0).length} category pages`);
  return wrapUrlset(entries);
}

// ─── 3. Games Sitemap ────────────────────────────────────────────────────────

function buildGamesSitemap() {
  const slugFile = path.join(dataDir, 'slug-map.json');
  if (!fs.existsSync(slugFile)) {
    console.warn('⚠️  slug-map.json not found — skipping games sitemap');
    return null;
  }

  const slugMap = JSON.parse(fs.readFileSync(slugFile, 'utf8'));
  const slugs   = Object.keys(slugMap);

  let entries = '';
  slugs.forEach(slug => {
    // Game pages: priority 0.7 (lower than categories — category pages are the
    // "silo" pages that pass link equity down to individual games)
    entries += urlEntry(`${BASE_URL}/game/${slug}`, today, 'monthly', '0.7');
  });

  console.log(`  ✓ ${slugs.length} game pages`);
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

  console.log(`  ✓ ${count} blog pages`);
  return wrapUrlset(entries);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function generate() {
  console.log('\n🗺  BrowserGames100 — Sitemap Generator\n');

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
    const sizeKB = Math.round(Buffer.byteLength(content, 'utf8') / 1024);
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
