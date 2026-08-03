const fs = require('fs');
const path = require('path');

// Ensure correct domain (https://browsergames100.com)
const BASE_URL = 'https://browsergames100.com';
// Use full ISO string for more precise lastmod, similar to reference sitemap
const dateNow = new Date().toISOString();

const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(publicDir, 'data');

const staticPages = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/unblocked-games-for-school',
  '/chromebook-games',
  '/free-browser-games',
  '/games-to-play-at-school',
  '/unblocked-racing-games',
  '/unblocked-puzzle-games',
  '/unblocked-2-player-games',
  '/multiplayer-games'
];

function generate() {
  console.log('Starting SEO-optimized sitemap generation...');
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Home Page (Highest Priority)
  xml += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${dateNow}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // 2. Static / SEO Landing Pages (High Priority)
  staticPages.forEach(page => {
    xml += `  <url>\n    <loc>${BASE_URL}${page}</loc>\n    <lastmod>${dateNow}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // 3. Category Pages (Medium-High Priority)
  if (fs.existsSync(path.join(dataDir, 'categories.json'))) {
    const categoriesRaw = fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8');
    const categories = JSON.parse(categoriesRaw);
    categories.forEach(cat => {
      xml += `  <url>\n    <loc>${BASE_URL}/category/${cat.slug}</loc>\n    <lastmod>${dateNow}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
  }

  // 4. Individual Game Pages (High Priority - These are the money pages)
  if (fs.existsSync(path.join(dataDir, 'slug-map.json'))) {
    const slugMapRaw = fs.readFileSync(path.join(dataDir, 'slug-map.json'), 'utf8');
    const slugMap = JSON.parse(slugMapRaw);
    Object.keys(slugMap).forEach(slug => {
      // Changed priority from 0.6 to 0.9 to match cpsspeedtest game priorities
      xml += `  <url>\n    <loc>${BASE_URL}/game/${slug}</loc>\n    <lastmod>${dateNow}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });
    console.log(`Included ${Object.keys(slugMap).length} games in sitemap.`);
  }

  xml += '</urlset>';

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log(`Sitemap generated successfully in public/sitemap.xml`);
}

try {
  generate();
} catch (err) {
  console.error('Error generating sitemap:', err);
  process.exit(1);
}
