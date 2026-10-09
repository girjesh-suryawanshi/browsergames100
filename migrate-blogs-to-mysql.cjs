/**
 * migrate-blogs-to-mysql.cjs  (v2 — fast, line-boundary parser)
 * 
 * Splits static-blogs.ts into per-post blocks using known id: line numbers,
 * then regex-extracts each field. Generates server/migrate-blogs.sql
 *
 * Run: node migrate-blogs-to-mysql.cjs
 */
'use strict';
const fs = require('fs');

// ─── Post boundaries (id line → next id line or EOF) ─────────────────────────
// Derived from grep: line numbers where each post starts (1-indexed)
const POST_START_LINES = [
  22, 87, 131, 172, 212, 248, 280, 311, 347, 382,
  413, 443, 477, 501, 522, 543, 564, 591, 612, 638,
  659, 680, 701, 722,  // post-1 … post-24
  746, 818, 870, 912, 955, 998, 1041, 1083, 1124, 1166,
  1209, 1251, 1286, 1328, 1370, 1411, 1446, 1487, 1529, 1571,
  1613, 1655, 1697, 1741, 1786, // seo-post-1 … seo-post-25
  1837 + 1  // sentinel = total lines + 1
];

const categoryMap = {
  'Game Guides':    'cat-1',
  'Top Picks':      'cat-2',
  'Unblocked Picks':'cat-3',
  'Game Updates':   'cat-4',
};

function sqlStr(v) {
  if (v === null || v === undefined) return 'NULL';
  return "'" + String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') + "'";
}

// ─── Read source file as lines ────────────────────────────────────────────────
const allLines = fs.readFileSync('./src/data/static-blogs.ts', 'utf8').split('\n');

const posts = [];

for (let i = 0; i < POST_START_LINES.length - 1; i++) {
  const startLine = POST_START_LINES[i] - 1;     // 0-indexed
  const endLine   = POST_START_LINES[i + 1] - 1; // 0-indexed exclusive
  const block     = allLines.slice(startLine, endLine).join('\n');

  // ── Simple field extractors ──
  const g = (re) => { const m = block.match(re); return m ? m[1] : null; };

  const id            = g(/id:\s*"([^"]+)"/);
  const title         = g(/title:\s*"([^"]+)"/);
  const slug          = g(/slug:\s*"([^"]+)"/);
  const excerpt       = g(/excerpt:\s*"([^"]+)"/);
  const authorName    = g(/authorName:\s*"([^"]+)"/);
  const readingTime   = g(/readingTime:\s*"([^"]+)"/);
  const publishedAt   = g(/publishedAt:\s*"([^"]+)"/);
  const updatedAt     = g(/updatedAt:\s*"([^"]+)"/);
  const coverImage    = g(/coverImage:\s*"([^"]+)"/);
  const seoTitle      = g(/seoTitle:\s*"([^"]+)"/);
  const seoDesc       = g(/seoDescription:\s*"([^"]+)"/);
  const tags          = g(/tags:\s*"([^"]+)"/);
  const isPublished   = /isPublished:\s*true/.test(block) ? 1 : 0;
  const isFeatured    = /isFeatured:\s*true/.test(block)  ? 1 : 0;
  const catName       = g(/category:\s*\{\s*name:\s*"([^"]+)"/);
  const categoryId    = catName ? (categoryMap[catName] || null) : null;

  // ── Template-literal content (between first ` and last `) ──
  const tickStart = block.indexOf('content: `');
  const tickEnd   = block.lastIndexOf('`');
  const content   = (tickStart !== -1 && tickEnd > tickStart + 10)
    ? block.slice(tickStart + 10, tickEnd).trim()
    : '';

  if (!id || !title || !slug) {
    console.warn(`  ⚠️  Skipping block ${i + 1} — missing id/title/slug`);
    continue;
  }

  posts.push({ id, title, slug, excerpt, authorName, readingTime,
               publishedAt, updatedAt, coverImage, seoTitle, seoDesc,
               tags, isPublished, isFeatured, categoryId, content });
}

console.log(`✅ Parsed ${posts.length} blog posts`);

// ─── Build SQL ────────────────────────────────────────────────────────────────
let sql = `-- =============================================================================
-- BrowserGames100 — Blog Posts Migration to MySQL
-- Generated: ${new Date().toISOString()}
-- Total posts: ${posts.length}
--
-- HOW TO USE:
--   1. Open Hostinger hPanel → Databases → phpMyAdmin
--   2. Select your database (u235459051_browsergames)
--   3. Click Import → Choose File → select this file → click Go
--   Safe to re-run: uses INSERT ... ON DUPLICATE KEY UPDATE
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Ensure categories exist
INSERT INTO \`Category\` (\`id\`, \`name\`, \`description\`) VALUES
  ('cat-1', 'Game Guides',     'In-depth strategy guides and walkthroughs for popular unblocked games.'),
  ('cat-2', 'Top Picks',       'Curated roundups and top 10 lists of the best browser games.'),
  ('cat-3', 'Unblocked Picks', 'Games tested and verified to run on school Chromebooks and restricted networks.'),
  ('cat-4', 'Game Updates',    'Latest news, balance updates, and patch notes for browser games.')
ON DUPLICATE KEY UPDATE \`name\` = \`name\`;

`;

posts.forEach((p, i) => {
  const pub = (p.publishedAt || new Date().toISOString()).replace('T', ' ').replace(/\.\d{3}Z$/, '');
  const upd = (p.updatedAt   || pub).replace('T', ' ').replace(/\.\d{3}Z$/, '');

  sql += `-- [${i + 1}/${posts.length}] ${p.title}\n`;
  sql += `INSERT INTO \`BlogPost\`
  (\`id\`,\`title\`,\`slug\`,\`content\`,\`excerpt\`,\`authorName\`,\`readingTime\`,
   \`isPublished\`,\`isFeatured\`,\`publishedAt\`,\`updatedAt\`,\`coverImage\`,
   \`seoTitle\`,\`seoDescription\`,\`tags\`,\`categoryId\`,
   \`schemaType\`,\`twitterCard\`,\`indexing\`,\`follow\`,\`tocEnabled\`,\`ctaType\`)
VALUES (
  ${sqlStr(p.id)},
  ${sqlStr(p.title)},
  ${sqlStr(p.slug)},
  ${sqlStr(p.content)},
  ${sqlStr(p.excerpt)},
  ${sqlStr(p.authorName)},
  ${sqlStr(p.readingTime)},
  ${p.isPublished},
  ${p.isFeatured},
  '${pub}',
  '${upd}',
  ${sqlStr(p.coverImage)},
  ${sqlStr(p.seoTitle)},
  ${sqlStr(p.seoDesc)},
  ${sqlStr(p.tags)},
  ${p.categoryId ? sqlStr(p.categoryId) : 'NULL'},
  'BlogPosting','summary_large_image','index','follow',1,'none'
) ON DUPLICATE KEY UPDATE
  \`title\`          = VALUES(\`title\`),
  \`content\`        = VALUES(\`content\`),
  \`excerpt\`        = VALUES(\`excerpt\`),
  \`coverImage\`     = VALUES(\`coverImage\`),
  \`seoTitle\`       = VALUES(\`seoTitle\`),
  \`seoDescription\` = VALUES(\`seoDescription\`),
  \`isPublished\`    = VALUES(\`isPublished\`),
  \`publishedAt\`    = VALUES(\`publishedAt\`);

`;
});

sql += `SET FOREIGN_KEY_CHECKS = 1;\n-- DONE: ${posts.length} posts migrated.\n-- Verify: SELECT COUNT(*) FROM BlogPost;\n`;

fs.writeFileSync('./server/migrate-blogs.sql', sql, 'utf8');
const kb = Math.round(Buffer.byteLength(sql, 'utf8') / 1024);
console.log(`✅ SQL file written → server/migrate-blogs.sql (${kb} KB)`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Open Hostinger hPanel → phpMyAdmin`);
console.log(`   2. Select database: u235459051_browsergames`);
console.log(`   3. Click Import → Choose File → server/migrate-blogs.sql → Go`);
