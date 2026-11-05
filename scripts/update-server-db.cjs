const fs = require('fs');
const path = require('path');

const dbTsPath = path.join(__dirname, '..', 'server', 'src', 'lib', 'db.ts');
let code = fs.readFileSync(dbTsPath, 'utf8');

// Add imports if missing
if (!code.includes("import fs from 'fs';")) {
  code = "import fs from 'fs';\nimport path from 'path';\n" + code;
}

// Find syncInitialBlogPosts start
const idx = code.indexOf('export async function syncInitialBlogPosts');
if (idx === -1) {
  console.error('Could not find syncInitialBlogPosts in db.ts');
  process.exit(1);
}

const newFunc = `export async function syncInitialBlogPosts() {
  try {
    let posts: any[] = [];
    const possiblePaths = [
      path.join(__dirname, '..', 'data', 'blog-posts.json'),
      path.join(__dirname, 'data', 'blog-posts.json'),
      path.join(__dirname, '..', 'src', 'data', 'blog-posts.json'),
      path.join(process.cwd(), 'server', 'src', 'data', 'blog-posts.json'),
      path.join(process.cwd(), 'server', 'dist', 'data', 'blog-posts.json')
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        try {
          posts = JSON.parse(fs.readFileSync(p, 'utf8'));
          if (posts && posts.length > 0) break;
        } catch (e) {
          // continue
        }
      }
    }

    if (!posts || posts.length === 0) {
      console.warn('⚠️ No blog-posts.json found to sync to MySQL');
      return;
    }

    const categoryMap: Record<string, string> = {
      'Game Guides': 'cat-1',
      'Top Picks': 'cat-2',
      'Unblocked Picks': 'cat-3',
      'Game Updates': 'cat-4',
    };

    for (const post of posts) {
      const catName = post.category?.name || post.category || 'Top Picks';
      const catId = categoryMap[catName] || 'cat-2';
      const isPublished = post.isPublished === false ? 0 : 1;
      const isFeatured = post.isFeatured ? 1 : 0;
      const pubDate = post.publishedAt ? new Date(post.publishedAt) : new Date();
      const updDate = post.updatedAt ? new Date(post.updatedAt) : pubDate;

      await pool.query(
        \`INSERT INTO BlogPost (id, title, slug, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription, content, categoryId, publishedAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           slug = VALUES(slug),
           excerpt = VALUES(excerpt),
           authorName = VALUES(authorName),
           readingTime = VALUES(readingTime),
           isPublished = VALUES(isPublished),
           isFeatured = VALUES(isFeatured),
           coverImage = VALUES(coverImage),
           seoTitle = VALUES(seoTitle),
           seoDescription = VALUES(seoDescription),
           content = VALUES(content),
           categoryId = VALUES(categoryId),
           publishedAt = VALUES(publishedAt),
           updatedAt = VALUES(updatedAt)\`,
        [
          post.id, post.title, post.slug, post.excerpt || null, post.authorName || 'Marcus Vance',
          post.readingTime || '5 min', isPublished, isFeatured, post.coverImage || null,
          post.seoTitle || post.title, post.seoDescription || post.excerpt, post.content || '',
          catId, pubDate, updDate
        ]
      );
    }

    console.log(\`✅ Synchronized \${posts.length} enriched blog posts into MySQL database\`);
  } catch (err) {
    console.warn('MySQL syncInitialBlogPosts warning:', err);
  }
}
`;

code = code.slice(0, idx) + newFunc;
fs.writeFileSync(dbTsPath, code, 'utf8');
console.log('Successfully updated server/src/lib/db.ts');

