const fs = require('fs');

const content = fs.readFileSync('./src/data/static-blogs.ts', 'utf8');

// Match each post object by looking for `id: "..."`
const postRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"[\s\S]*?coverImage:\s*"([^"]*)"/g;

let match;
let count = 0;
let missing = 0;

console.log("--- BLOG POSTS VERIFICATION ---");
while ((match = postRegex.exec(content)) !== null) {
  count++;
  const id = match[1];
  const title = match[2];
  const publishedAt = match[3];
  const coverImage = match[4];

  const hasImg = coverImage && coverImage.trim().length > 0;
  if (!hasImg) missing++;

  console.log(`Post ${count} [${id}] Date: ${publishedAt.substring(0, 10)} | Image: ${hasImg ? '✅ ' + coverImage.substring(0, 50) + '...' : '❌ MISSING'}`);
}

console.log(`\nTotal verified posts: ${count}`);
console.log(`Posts with missing feature image: ${missing}`);
