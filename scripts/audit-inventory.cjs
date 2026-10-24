const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDataDir = path.join(rootDir, 'public', 'data');
const srcDataDir = path.join(rootDir, 'src', 'data');
const docsAuditDir = path.join(rootDir, 'docs', 'adsense-seo-audit');

if (!fs.existsSync(docsAuditDir)) {
  fs.mkdirSync(docsAuditDir, { recursive: true });
}

console.log('=== PHASE 1: COMPREHENSIVE CONTENT AND PAGE INVENTORY AUDIT ===\n');

// 1. Audit Categories
const categoriesFile = path.join(publicDataDir, 'categories.json');
let categories = [];
if (fs.existsSync(categoriesFile)) {
  categories = JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
}

console.log(`Auditing ${categories.length} categories...`);
const categoryAudit = categories.map(cat => {
  const catDataFile = path.join(publicDataDir, `cat-${cat.id}.json`);
  const exists = fs.existsSync(catDataFile);
  let actualGames = 0;
  if (exists) {
    try {
      const data = JSON.parse(fs.readFileSync(catDataFile, 'utf8'));
      actualGames = Array.isArray(data) ? data.length : 0;
    } catch (e) {
      actualGames = -1;
    }
  }
  const isPhantom = !exists || actualGames === 0;
  return {
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    declaredGames: cat.total_games,
    actualGames,
    dataFileExists: exists,
    isPhantom,
    status: isPhantom ? 'PHANTOM_EMPTY_FALLBACK' : 'VALID_CATALOG'
  };
});

const phantomCategories = categoryAudit.filter(c => c.isPhantom);
console.log(`  ✓ Valid category data files: ${categoryAudit.filter(c => !c.isPhantom).length}`);
console.log(`  ⚠️ Phantom/Missing category data files: ${phantomCategories.length} (${phantomCategories.map(c => c.slug).join(', ')})`);

// 2. Audit Blog Posts
console.log('\nAuditing Blog Posts...');
const staticBlogsFile = path.join(srcDataDir, 'static-blogs.ts');
let blogPosts = [];
if (fs.existsSync(staticBlogsFile)) {
  const blogContent = fs.readFileSync(staticBlogsFile, 'utf8');
  // extract post blocks
  const blocks = blogContent.split(/\{\s*id:\s*["']/);
  blocks.slice(1).forEach(block => {
    const idMatch = block.match(/^([^"']+)/);
    const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
    const slugMatch = block.match(/slug:\s*["']([^"']+)["']/);
    const authorMatch = block.match(/authorName:\s*["']([^"']+)["']/);
    const dateMatch = block.match(/publishedAt:\s*["']([^"']+)["']/);
    const contentMatch = block.match(/content:\s*`([\s\S]*?)`/);
    
    if (slugMatch && titleMatch) {
      const text = contentMatch ? contentMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      blogPosts.push({
        id: idMatch ? idMatch[1] : 'unknown',
        title: titleMatch[1],
        slug: slugMatch[1],
        author: authorMatch ? authorMatch[1] : 'Unknown',
        date: dateMatch ? dateMatch[1] : 'Unknown',
        wordCount
      });
    }
  });
}
console.log(`  ✓ Blog Posts parsed: ${blogPosts.length}`);
const avgBlogWords = blogPosts.length ? Math.round(blogPosts.reduce((acc, p) => acc + p.wordCount, 0) / blogPosts.length) : 0;
console.log(`  ✓ Average blog word count: ${avgBlogWords} words`);

// 3. Audit Landing Pages
console.log('\nAuditing Programmatic Landing Pages...');
const seoContentFile = path.join(srcDataDir, 'seo-content.ts');
let landingPages = [];
if (fs.existsSync(seoContentFile)) {
  const seoContent = fs.readFileSync(seoContentFile, 'utf8');
  const slugRegex = /['"]([^'"]+)['"]:\s*\{\s*slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = slugRegex.exec(seoContent)) !== null) {
    landingPages.push(match[1]);
  }
}
console.log(`  ⚠️ Programmatic Doorway Landing Pages: ${landingPages.length} (${landingPages.join(', ')})`);

// 4. Audit Game Catalogue Details
console.log('\nAuditing Game Records in Chunked Details JSON...');
const slugMapFile = path.join(publicDataDir, 'slug-map.json');
let totalSlugs = 0;
if (fs.existsSync(slugMapFile)) {
  const slugMap = JSON.parse(fs.readFileSync(slugMapFile, 'utf8'));
  totalSlugs = Object.keys(slugMap).length;
}
console.log(`  ✓ Total Slugs in Slug Map: ${totalSlugs}`);

let totalSampled = 0;
let truncatedDescCount = 0;
let shortDescCount = 0;
let genericInstructionCount = 0;
let providerStats = {};
let sampleGames = [];

for (let i = 0; i < 57; i++) {
  const chunkFile = path.join(publicDataDir, `details-${i}.json`);
  if (!fs.existsSync(chunkFile)) continue;
  try {
    const chunk = JSON.parse(fs.readFileSync(chunkFile, 'utf8'));
    for (const id in chunk) {
      totalSampled++;
      const g = chunk[id];
      const desc = g.d || '';
      const ins = g.ins || '';
      const u = g.u || '';

      if (desc.length < 100) shortDescCount++;
      // check if ends abruptly in letters like " en" or " in" without punctuation
      if (desc.endsWith(' en') || desc.endsWith(' in') || desc.endsWith(' th') || (desc.length > 0 && !/[.!?"]$/.test(desc.trim()))) {
        truncatedDescCount++;
      }
      if (ins.toLowerCase().includes('mouse click to play') || ins.toLowerCase().includes('click to play') || ins.length < 15) {
        genericInstructionCount++;
      }
      try {
        const host = new URL(u).hostname;
        providerStats[host] = (providerStats[host] || 0) + 1;
      } catch (e) {
        providerStats['invalid'] = (providerStats['invalid'] || 0) + 1;
      }

      if (sampleGames.length < 10) {
        sampleGames.push({
          title: g.t,
          slug: g.s,
          descLen: desc.length,
          ins: ins,
          provider: u
        });
      }
    }
  } catch (err) {
    console.error(`Error reading details-${i}.json:`, err.message);
  }
}

console.log(`  ✓ Total Game Records Scanned: ${totalSampled}`);
console.log(`  ⚠️ Short Descriptions (< 100 chars): ${shortDescCount} (${Math.round((shortDescCount / totalSampled) * 100)}%)`);
console.log(`  ⚠️ Truncated / Incomplete Descriptions: ${truncatedDescCount} (${Math.round((truncatedDescCount / totalSampled) * 100)}%)`);
console.log(`  ⚠️ Generic / Low-value Instructions: ${genericInstructionCount} (${Math.round((genericInstructionCount / totalSampled) * 100)}%)`);
console.log(`  ✓ Provider Distribution:`, providerStats);

// 5. Generate 01-page-inventory.csv
console.log('\nGenerating docs/adsense-seo-audit/01-page-inventory.csv...');
const csvHeader = [
  'URL Pattern',
  'Template Type',
  'Total Pages',
  'Indexability Status',
  'Canonical Pattern',
  'User Value Rating',
  'Content Originality',
  'Primary Search Intent',
  'Key Issues Identified',
  'Recommended Remediation Action'
].join(',');

const csvRows = [
  csvHeader,
  `"https://browsergames100.com/","Homepage (Index.tsx)","1","Indexable","https://browsergames100.com/","Medium","Low-Medium (Aggregator)","Find and discover free online browser games","Fabricated stats (2M+ players 4.9 rating); unverified hand-tested claims; leftover support@cloudplayhub.com; ScraperShield right-click block","Sanitize claims to 100% verified facts; remove right-click block; fix organization schema"`,
  `"https://browsergames100.com/categories","Categories Index (CategoriesPage.tsx)","1","Indexable","https://browsergames100.com/categories","Medium","Medium","Browse all game genres and categories","Displays 8 empty/phantom categories claiming 28450 games","Prune phantom categories; link only to valid genre hubs"`,
  `"https://browsergames100.com/category/[valid-slug]","Valid Category Pages (CategoryPage.tsx)","15","Indexable","https://browsergames100.com/category/[slug]","High","Medium","Browse games in a specific genre (action puzzle racing)","Missing breadcrumb schema; generic meta description templates","Add enriched category descriptions, sorting, and valid breadcrumbs"`,
  `"https://browsergames100.com/category/[phantom-slug]","Phantom Category Pages (CategoryPage.tsx)","8","Indexable (Accidental)","https://browsergames100.com/category/[slug]","Low (Doorway)","Zero (Duplicates Initial 48 Games)","Keyword stuffing (html5-games no-download-games browser-games etc.)","No data JSON file; duplicates initial 48 games; falsely claims 28450 games","De-index (noindex follow) or retire cleanly with 301 redirects to valid categories"`,
  `"https://browsergames100.com/trending","Trending Page (TrendingPage.tsx)","1","Indexable","https://browsergames100.com/trending","Medium","Low","Find popular games","Hardcoded static array of 12 games","Make dynamic or truthfully label as curated top picks"`,
  `"https://browsergames100.com/search","Search Page (SearchPage.tsx)","Dynamic","Noindex Required","https://browsergames100.com/search","High (Utility)","N/A","Search catalog by keyword","Search parameter URLs risk duplicate crawl paths if linked","Add noindex follow meta tag to prevent search index bloat"`,
  `"https://browsergames100.com/favorites","Favorites Page (FavoritesPage.tsx)","1","Noindex Required","https://browsergames100.com/favorites","High (Player Utility)","N/A","View saved favorites from localStorage","Client-only localStorage; empty for search crawlers","Add noindex follow meta tag"`,
  `"https://browsergames100.com/play-html5-games","Doorway Landing Page (LandingPage.tsx)","1","Indexable (Harmful)","https://browsergames100.com/play-html5-games","Low","Low","Programmatic keyword targeting","Doorway page duplicating initial games with 3 ad units","Set noindex follow or 301 redirect to /category/action-games"`,
  `"https://browsergames100.com/free-browser-games","Doorway Landing Page (LandingPage.tsx)","1","Indexable (Harmful)","https://browsergames100.com/free-browser-games","Low","Low","Programmatic keyword targeting","Doorway page duplicating homepage purpose with 3 ad units","301 redirect to homepage"`,
  `"https://browsergames100.com/cloud-gaming-unblocked","Doorway Landing Page (LandingPage.tsx)","1","Indexable (Harmful)","https://browsergames100.com/cloud-gaming-unblocked","Low","Low","Programmatic keyword targeting","Deceptive title ('Cloud Gaming' for HTML5 canvas embeds); school unblocked keyword stuffing","Retire or 301 redirect to homepage"`,
  `"https://browsergames100.com/poki-alternative","Doorway Landing Page (LandingPage.tsx)","1","Indexable (Harmful)","https://browsergames100.com/poki-alternative","Low","Low","Competitor parasite keyword targeting","Unsubstantiated claims ('we hand-test every game while Poki auto-imports')","Set noindex follow or 301 redirect to homepage"`,
  `"https://browsergames100.com/unblocked-racing-games","Doorway Landing Page (LandingPage.tsx)","1","Indexable (Harmful)","https://browsergames100.com/unblocked-racing-games","Low","Low","Programmatic keyword targeting","Cannibalizes /category/racing-games with duplicate generic grid","301 redirect to /category/racing-games"`,
  `"https://browsergames100.com/about","About Us (AboutUs.tsx)","1","Indexable","https://browsergames100.com/about","Medium","Medium","Learn about the website, publisher, and mission","Unsubstantiated stats (2M+ monthly players); fake hand-testing claims; lacks real operator transparency","Update with factual publisher information, real curation workflow, and verified contacts"`,
  `"https://browsergames100.com/contact","Contact Us (ContactUs.tsx)","1","Indexable","https://browsergames100.com/contact","High","Original","Submit feedback, suggest games, report bugs, DMCA","Fails silently if backend Express server unreachable; lacks direct email link","Add direct mailto link and fallback display on network error"`,
  `"https://browsergames100.com/privacy","Privacy Policy (PrivacyPolicy.tsx)","1","Indexable","https://browsergames100.com/privacy","High","Legal","Review privacy disclosures and cookie policies","Needs verification against active trackers (Google Consent Mode v2 AdSense GameMonetize embeds)","Ensure complete cookie disclosure for AdSense and game embeds"`,
  `"https://browsergames100.com/terms","Terms of Service (TermsOfService.tsx)","1","Indexable","https://browsergames100.com/terms","High","Legal","Review terms of use","Standard boilerplate","Review third-party game embed attribution and intellectual property clauses"`,
  `"https://browsergames100.com/disclaimer","Disclaimer (Disclaimer.tsx)","1","Indexable","https://browsergames100.com/disclaimer","Medium","Legal","Third party trademark and game disclaimers","Standard","Ensure explicit attribution to game developers"`,
  `"https://browsergames100.com/dmca","DMCA Policy (DMCAPolicy.tsx)","1","Indexable","https://browsergames100.com/dmca","High","Legal","Copyright infringement notification procedure","Standard","Verify designated copyright email and response procedure"`,
  `"https://browsergames100.com/blog","Blog Index (BlogList.tsx)","1","Indexable","https://browsergames100.com/blog","Medium-High","Original Editorial","Find browser gaming guides and news","Displays 49 static posts; needs verified author profiles","Ensure transparent author attribution and editorial review dates"`,
  `"https://browsergames100.com/blog/[slug]","Single Blog Posts (BlogPost.tsx)","49","Indexable","https://browsergames100.com/blog/[slug]","Medium-High","Original Editorial","Learn gaming tips, controls, and recommendations","Unsplash stock imagery; AI-persona author names without verified credentials; fixed future dates (Sept 2026)","Audit facts in top guides; link to playable games in catalog; clarify editorial team"`,
  `"https://browsergames100.com/game/[slug]","Game Detail Pages (GamePage.tsx)","28154","Mass Indexed (Low Value)","https://browsergames100.com/game/[slug]","Low (Raw Feed)","Low (Raw Distributor Text)","Play specific game, learn controls, find rules","Pure CSR serves identical empty <div id='root'> to bots; 1-2 sentence truncated descriptions; generic 'Mouse click to play'; fake AggregateRating schema; fake canned FAQ schema; 5.2MB sitemap-games.xml submitted","Do NOT mass-index 28k uncurated pages; prune sitemap to verified high-value titles; enrich priority games with real controls/tips; eliminate fake schemas; provide crawler meta headers"`,
  `"https://browsergames100.com/admin/*","Admin CMS Routes","4","Disallowed","N/A","N/A (Internal)","N/A","Internal CMS management","Database passwords and secrets exposed in server/.env","Remove secrets from repo; ensure robots.txt Disallow remains active"`
];

fs.writeFileSync(path.join(docsAuditDir, '01-page-inventory.csv'), csvRows.join('\n'), 'utf8');
console.log('  ✓ Wrote docs/adsense-seo-audit/01-page-inventory.csv');

console.log('\n=== INVENTORY AUDIT COMPLETE ===');
