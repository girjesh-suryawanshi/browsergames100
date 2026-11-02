import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://browsergames100.com';
const DIST_DIR = path.resolve('dist');

// Read all XML sitemaps
function parseSitemapUrls(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const locMatches = [...content.matchAll(/<loc>([\s\S]*?)<\/loc>/g)];
  return locMatches.map(m => m[1].trim()).filter(u => !u.endsWith('.xml'));
}

const sitemapStatic = parseSitemapUrls('dist/sitemap-static.xml');
const sitemapCategories = parseSitemapUrls('dist/sitemap-categories.xml');
const sitemapBlog = parseSitemapUrls('dist/sitemap-blog.xml');
const sitemapGames = parseSitemapUrls('dist/sitemap-games.xml');

const allSitemapUrls = new Set([
  ...sitemapStatic,
  ...sitemapCategories,
  ...sitemapBlog,
  ...sitemapGames
]);

console.log(`📡 Loaded ${allSitemapUrls.size} URLs from XML Sitemaps.`);

// Discovered URLs set & queue for crawling
const discoveredUrls = new Set();
const internalLinkGraph = new Map(); // url -> Set of outbound internal URLs
const inboundLinkCount = new Map(); // url -> count of pages pointing to it

function normalizeUrl(rawUrl, currentUrl = BASE_URL) {
  if (!rawUrl) return null;
  let url = rawUrl.trim();
  if (url.startsWith('#') || url.startsWith('javascript:') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return null;
  }
  // Remove anchor
  url = url.split('#')[0];
  if (!url) return null;

  try {
    const resolved = new URL(url, currentUrl);
    if (resolved.origin !== new URL(BASE_URL).origin) {
      return null; // External
    }
    // Normalize path: strip trailing slash except root
    let pathname = resolved.pathname;
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    return `${resolved.origin}${pathname}${resolved.search}`;
  } catch (e) {
    return null;
  }
}

// Function to inspect a local static route
function inspectRoute(urlStr) {
  const parsed = new URL(urlStr);
  const cleanPath = parsed.pathname.replace(/^\/+|\/+$/g, '');
  
  // Non-HTML check
  const ext = path.extname(cleanPath).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.css', '.js', '.json', '.xml', '.txt'].includes(ext)) {
    return {
      url: urlStr,
      httpStatus: 200,
      finalUrl: urlStr,
      canonicalUrl: '',
      title: '',
      indexability: 'Non-Indexable',
      pageType: 'Non-HTML Resource',
      uniquePage: 'No',
      exclusionReason: 'Static Asset / Non-HTML',
      htmlContent: ''
    };
  }

  // Trailing slash redirect check:
  if (urlStr !== `${BASE_URL}/` && urlStr.endsWith('/')) {
    const target = urlStr.slice(0, -1);
    return {
      url: urlStr,
      httpStatus: 301,
      finalUrl: target,
      canonicalUrl: target,
      title: '',
      indexability: 'Non-Indexable',
      pageType: 'Redirect (Trailing Slash)',
      uniquePage: 'No',
      exclusionReason: '301 Redirect to non-trailing slash URL',
      htmlContent: ''
    };
  }

  // Check physical file in dist/
  let filePath = path.join(DIST_DIR, cleanPath, 'index.html');
  if (!cleanPath) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    // Check if it's a known client-side only route
    const knownClientRoutes = ['trending', 'search', 'favorites', 'play-html5-games', 'free-browser-games', 'cloud-gaming-unblocked', 'poki-alternative', 'unblocked-racing-games', 'admin/login', 'admin/blog'];
    if (knownClientRoutes.some(r => cleanPath === r || cleanPath.startsWith(r + '/'))) {
      const isNoindex = cleanPath.startsWith('admin') || cleanPath === 'search' || cleanPath === 'favorites';
      return {
        url: urlStr,
        httpStatus: 200,
        finalUrl: urlStr,
        canonicalUrl: isNoindex ? '' : `${BASE_URL}/${cleanPath}`,
        title: isNoindex ? 'Noindex / Private' : `Client SPA Route: ${cleanPath}`,
        indexability: isNoindex ? 'Non-Indexable (noindex)' : 'Indexable (Client Rendered)',
        pageType: cleanPath.startsWith('admin') ? 'Admin / Private' : 'Client SPA Route',
        uniquePage: isNoindex ? 'No' : 'Yes',
        exclusionReason: isNoindex ? 'Disallowed / Admin / Dynamic Query' : '',
        htmlContent: fs.existsSync(path.join(DIST_DIR, 'index.html')) ? fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8') : ''
      };
    }

    return {
      url: urlStr,
      httpStatus: 404,
      finalUrl: urlStr,
      canonicalUrl: '',
      title: '404 Not Found',
      indexability: 'Non-Indexable',
      pageType: 'Error Page (404)',
      uniquePage: 'No',
      exclusionReason: 'HTTP 404 File Not Found',
      htmlContent: ''
    };
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Extract Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract Canonical
  const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"/i) || html.match(/<link\s+href="([\s\S]*?)"\s+rel="canonical"/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Extract Robots
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([\s\S]*?)"/i);
  const robots = robotsMatch ? robotsMatch[1].toLowerCase() : '';
  const isNoindex = robots.includes('noindex');

  // Determine Page Type
  let pageType = 'Standard Page';
  if (!cleanPath) pageType = 'Homepage';
  else if (cleanPath.startsWith('game/')) pageType = 'Game Page';
  else if (cleanPath.startsWith('category/')) pageType = 'Category Page';
  else if (cleanPath.startsWith('blog/')) pageType = 'Blog Post';
  else if (cleanPath === 'blog') pageType = 'Blog Index';
  else if (cleanPath === 'categories') pageType = 'Categories Directory';
  else if (['privacy', 'terms', 'about', 'contact', 'disclaimer', 'dmca'].includes(cleanPath)) pageType = 'Legal & Trust Page';

  // Determine Indexability & Canonicalization
  const isCanonicalizedAway = canonical && canonical !== urlStr && canonical !== `${urlStr}/`;
  let indexability = 'Indexable';
  let exclusionReason = '';
  let uniquePage = 'Yes';

  if (isNoindex) {
    indexability = 'Non-Indexable (noindex)';
    exclusionReason = 'Meta robots noindex directive';
    uniquePage = 'No';
  } else if (isCanonicalizedAway) {
    indexability = 'Non-Indexable (canonicalized)';
    exclusionReason = `Canonical points to ${canonical}`;
    uniquePage = 'No';
  }

  return {
    url: urlStr,
    httpStatus: 200,
    finalUrl: urlStr,
    canonicalUrl: canonical,
    title,
    indexability,
    pageType,
    uniquePage,
    exclusionReason,
    htmlContent: html
  };
}

// Extract internal links from HTML
function extractInternalLinks(html, sourceUrl) {
  if (!html) return [];
  const hrefMatches = [...html.matchAll(/href=["']([\s\S]*?)["']/gi)];
  const links = [];
  for (const match of hrefMatches) {
    const raw = match[1];
    const normalized = normalizeUrl(raw, sourceUrl);
    if (normalized) {
      links.push(normalized);
    }
  }
  return links;
}

// 1. Crawl simulation starting from homepage
const crawlQueue = [`${BASE_URL}/`];
discoveredUrls.add(`${BASE_URL}/`);

// Also seed with all sitemap URLs
for (const sUrl of allSitemapUrls) {
  const norm = normalizeUrl(sUrl);
  if (norm) {
    crawlQueue.push(norm);
    discoveredUrls.add(norm);
  }
}

// Also seed with known navigation and footer routes
const initialSeeds = [
  '/',
  '/categories',
  '/category/action-games',
  '/category/puzzle-games',
  '/category/arcade-games',
  '/category/racing-games',
  '/category/shooting-games',
  '/category/sports-games',
  '/category/multiplayer-games',
  '/category/adventure-games',
  '/category/fighting-games',
  '/category/hypercasual-games',
  '/category/girls-games',
  '/category/clicker-games',
  '/category/3d-games',
  '/category/io-games',
  '/trending',
  '/search',
  '/favorites',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/dmca',
  '/play-html5-games',
  '/free-browser-games',
  '/cloud-gaming-unblocked',
  '/poki-alternative',
  '/unblocked-racing-games',
  '/admin/login'
];

for (const seed of initialSeeds) {
  const norm = normalizeUrl(`${BASE_URL}${seed}`);
  if (norm) {
    crawlQueue.push(norm);
    discoveredUrls.add(norm);
  }
}

console.log(`🕷️ Starting crawler queue with ${crawlQueue.length} seed targets...`);

const auditResults = new Map(); // url -> inspection result
const visited = new Set();

while (crawlQueue.length > 0) {
  const currentUrl = crawlQueue.shift();
  if (visited.has(currentUrl)) continue;
  visited.add(currentUrl);

  const inspected = inspectRoute(currentUrl);
  auditResults.set(currentUrl, inspected);

  // Extract internal links from HTML if available
  if (inspected.htmlContent) {
    const links = extractInternalLinks(inspected.htmlContent, currentUrl);
    internalLinkGraph.set(currentUrl, new Set(links));

    for (const link of links) {
      // Track inbound count
      inboundLinkCount.set(link, (inboundLinkCount.get(link) || 0) + 1);

      if (!discoveredUrls.has(link)) {
        discoveredUrls.add(link);
        crawlQueue.push(link);
      }
    }
  }
}

console.log(`🏁 Crawl finished. Discovered ${discoveredUrls.size} unique URLs.`);

// Convert to array and analyze
const records = Array.from(auditResults.values());

const totalDiscovered = records.length;
const totalSuccessHtml = records.filter(r => r.httpStatus === 200 && r.pageType !== 'Non-HTML Resource').length;
const totalUniqueIndexable = records.filter(r => r.uniquePage === 'Yes' && r.indexability.startsWith('Indexable')).length;
const totalUniqueNonIndexable = records.filter(r => r.uniquePage === 'No' && r.indexability.includes('Non-Indexable') && r.httpStatus === 200).length;
const totalRedirects = records.filter(r => r.httpStatus >= 300 && r.httpStatus < 400).length;
const totalErrors = records.filter(r => r.httpStatus >= 400).length;
const totalDuplicatesOrCanonicalized = records.filter(r => r.exclusionReason.includes('Canonical points to') || r.exclusionReason.includes('Duplicate')).length;
const totalExcluded = totalDiscovered - totalUniqueIndexable;

// Check sitemap discrepancies
const sitemapOnlyOrphans = [];
for (const sUrl of allSitemapUrls) {
  const inbound = inboundLinkCount.get(sUrl) || 0;
  if (inbound === 0) {
    sitemapOnlyOrphans.push(sUrl);
  }
}

const internallyLinkedNotInSitemap = [];
for (const [url, count] of inboundLinkCount.entries()) {
  if (count > 0 && !allSitemapUrls.has(url) && !url.includes('/admin') && !url.includes('/search') && !url.includes('/favorites')) {
    internallyLinkedNotInSitemap.push(url);
  }
}

// Generate CSV
const csvHeader = 'URL,HTTP Status,Final URL,Canonical URL,Page Title,Indexability,Page Type,Unique Page (Yes/No),Exclusion Reason\n';
const csvRows = records.map(r => {
  const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
  return [
    escapeCsv(r.url),
    r.httpStatus,
    escapeCsv(r.finalUrl),
    escapeCsv(r.canonicalUrl),
    escapeCsv(r.title),
    escapeCsv(r.indexability),
    escapeCsv(r.pageType),
    escapeCsv(r.uniquePage),
    escapeCsv(r.exclusionReason)
  ].join(',');
}).join('\n');

fs.writeFileSync('dist/url-audit-report.csv', csvHeader + csvRows, 'utf8');
fs.writeFileSync('url-audit-report.csv', csvHeader + csvRows, 'utf8');
console.log('📄 Exported complete URL Audit CSV to dist/url-audit-report.csv and url-audit-report.csv');

// Output summary object for report
const summary = {
  totalDiscovered,
  totalSuccessHtml,
  totalUniqueIndexable,
  totalUniqueNonIndexable,
  totalRedirects,
  totalDuplicatesOrCanonicalized,
  totalErrors,
  totalExcluded,
  sitemapCount: allSitemapUrls.size,
  sitemapOrphansCount: sitemapOnlyOrphans.length,
  missingFromSitemapCount: internallyLinkedNotInSitemap.length,
  sitemapOrphans: sitemapOnlyOrphans.slice(0, 10),
  missingFromSitemap: internallyLinkedNotInSitemap.slice(0, 10)
};

fs.writeFileSync('audit-summary.json', JSON.stringify(summary, null, 2), 'utf8');
console.log('📊 Summary written to audit-summary.json:');
console.log(JSON.stringify(summary, null, 2));
