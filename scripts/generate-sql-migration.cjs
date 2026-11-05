/**
 * scripts/generate-sql-migration.cjs
 * Generates an up-to-date server/migrate-blogs.sql and server/src/data/blog-posts.json
 * containing all 57 fully-enriched blog posts from src/data/static-blogs.ts
 */

const fs = require('fs');
const path = require('path');

const blogsFilePath = path.join(__dirname, '..', 'src', 'data', 'static-blogs.ts');
const fileContent = fs.readFileSync(blogsFilePath, 'utf8');

const marker = 'export const staticBlogPosts: StaticBlogPost[] = ';
const markerIdx = fileContent.indexOf(marker);
const jsonStart = fileContent.indexOf('[', markerIdx + marker.length - 2);
const jsonEnd = fileContent.lastIndexOf(']');
const posts = JSON.parse(fileContent.slice(jsonStart, jsonEnd + 1));

console.log(`Loaded ${posts.length} blog posts from static-blogs.ts`);

// Ensure server/src/data directory exists
const serverDataDir = path.join(__dirname, '..', 'server', 'src', 'data');
if (!fs.existsSync(serverDataDir)) {
  fs.mkdirSync(serverDataDir, { recursive: true });
}

// Write server/src/data/blog-posts.json
const jsonOutputPath = path.join(serverDataDir, 'blog-posts.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(posts, null, 2), 'utf8');
console.log(`✅ Saved ${jsonOutputPath}`);

// Also copy to server/dist/data/blog-posts.json if dist exists
const serverDistDataDir = path.join(__dirname, '..', 'server', 'dist', 'data');
if (!fs.existsSync(serverDistDataDir)) {
  fs.mkdirSync(serverDistDataDir, { recursive: true });
}
fs.writeFileSync(path.join(serverDistDataDir, 'blog-posts.json'), JSON.stringify(posts, null, 2), 'utf8');

// Build SQL Migration File
function sqlStr(v) {
  if (v === null || v === undefined) return 'NULL';
  return "'" + String(v)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, '\\n') + "'";
}

function formatDate(isoStr) {
  if (!isoStr) return '2026-10-01 10:00:00';
  const d = new Date(isoStr);
  return d.toISOString().replace('T', ' ').substring(0, 19);
}

const categoryMap = {
  'Game Guides': 'cat-1',
  'Top Picks': 'cat-2',
  'Unblocked Picks': 'cat-3',
  'Game Updates': 'cat-4',
};

let sql = `-- =============================================================================
-- BrowserGames100 — Complete Blog Posts Migration to MySQL
-- Generated: ${new Date().toISOString()}
-- Total posts: ${posts.length}
--
-- HOW TO USE IN HOSTINGER:
--   1. Open Hostinger hPanel → Databases → phpMyAdmin
--   2. Select your database (u235459051_browsergames)
--   3. Click Import → Choose File → select this file (server/migrate-blogs.sql) → click Go
--   Safe to re-run anytime: uses INSERT ... ON DUPLICATE KEY UPDATE
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Ensure Category table and categories exist
CREATE TABLE IF NOT EXISTS \`Category\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`name\` VARCHAR(191) NOT NULL,
  \`description\` TEXT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`Category\` (\`id\`, \`name\`, \`description\`) VALUES
  ('cat-1', 'Game Guides',     'In-depth strategy guides and walkthroughs for popular unblocked games.'),
  ('cat-2', 'Top Picks',       'Curated roundups and top lists of the best browser games.'),
  ('cat-3', 'Unblocked Picks', 'Games tested and verified to run on school Chromebooks and restricted networks.'),
  ('cat-4', 'Game Updates',    'Latest news, balance updates, and patch notes for browser games.')
ON DUPLICATE KEY UPDATE \`name\` = VALUES(\`name\`);

-- Ensure BlogPost table structure
CREATE TABLE IF NOT EXISTS \`BlogPost\` (
  \`id\` VARCHAR(191) NOT NULL,
  \`title\` VARCHAR(191) NOT NULL,
  \`slug\` VARCHAR(191) NOT NULL,
  \`content\` MEDIUMTEXT NOT NULL,
  \`excerpt\` TEXT NULL,
  \`authorName\` VARCHAR(191) NOT NULL DEFAULT 'Admin',
  \`readingTime\` VARCHAR(191) NULL,
  \`isPublished\` TINYINT(1) NOT NULL DEFAULT 1,
  \`isFeatured\` TINYINT(1) NOT NULL DEFAULT 0,
  \`publishedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  \`coverImage\` VARCHAR(500) NULL,
  \`seoTitle\` VARCHAR(191) NULL,
  \`seoDescription\` VARCHAR(500) NULL,
  \`tags\` VARCHAR(500) NULL,
  \`categoryId\` VARCHAR(191) NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`BlogPost_slug_key\` (\`slug\`),
  KEY \`BlogPost_categoryId_fkey\` (\`categoryId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migrate all ${posts.length} enriched blog posts
`;

posts.forEach((p, index) => {
  const catName = p.category?.name || p.category || 'Top Picks';
  const catId = categoryMap[catName] || 'cat-2';
  const isPub = p.isPublished === false ? 0 : 1;
  const isFeat = p.isFeatured ? 1 : 0;
  const pubDate = formatDate(p.publishedAt);
  const upDate = formatDate(p.updatedAt || p.publishedAt);

  sql += `
-- [${index + 1}/${posts.length}] ${p.title}
INSERT INTO \`BlogPost\`
  (\`id\`, \`title\`, \`slug\`, \`content\`, \`excerpt\`, \`authorName\`, \`readingTime\`,
   \`isPublished\`, \`isFeatured\`, \`publishedAt\`, \`updatedAt\`, \`coverImage\`,
   \`seoTitle\`, \`seoDescription\`, \`tags\`, \`categoryId\`)
VALUES (
  ${sqlStr(p.id)},
  ${sqlStr(p.title)},
  ${sqlStr(p.slug)},
  ${sqlStr(p.content)},
  ${sqlStr(p.excerpt)},
  ${sqlStr(p.authorName || 'Marcus Vance')},
  ${sqlStr(p.readingTime || '5 min')},
  ${isPub},
  ${isFeat},
  '${pubDate}',
  '${upDate}',
  ${sqlStr(p.coverImage)},
  ${sqlStr(p.seoTitle || p.title)},
  ${sqlStr(p.seoDescription || p.excerpt)},
  ${sqlStr(p.tags || '')},
  '${catId}'
)
ON DUPLICATE KEY UPDATE
  \`title\` = VALUES(\`title\`),
  \`slug\` = VALUES(\`slug\`),
  \`content\` = VALUES(\`content\`),
  \`excerpt\` = VALUES(\`excerpt\`),
  \`authorName\` = VALUES(\`authorName\`),
  \`readingTime\` = VALUES(\`readingTime\`),
  \`isPublished\` = VALUES(\`isPublished\`),
  \`isFeatured\` = VALUES(\`isFeatured\`),
  \`publishedAt\` = VALUES(\`publishedAt\`),
  \`updatedAt\` = VALUES(\`updatedAt\`),
  \`coverImage\` = VALUES(\`coverImage\`),
  \`seoTitle\` = VALUES(\`seoTitle\`),
  \`seoDescription\` = VALUES(\`seoDescription\`),
  \`tags\` = VALUES(\`tags\`),
  \`categoryId\` = VALUES(\`categoryId\`);
`;
});

sql += `
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- Migration complete: ${posts.length} posts inserted/updated.
-- =============================================================================
`;

const sqlFilePath = path.join(__dirname, '..', 'server', 'migrate-blogs.sql');
fs.writeFileSync(sqlFilePath, sql, 'utf8');
console.log(`✅ Generated ${sqlFilePath} (${(sql.length / 1024).toFixed(1)} KB)`);

