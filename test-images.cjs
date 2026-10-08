const fs = require('fs');
const https = require('https');
const http = require('http');

const content = fs.readFileSync('./src/data/static-blogs.ts', 'utf8');

// Extract all post IDs, titles, and coverImages
const postRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?coverImage:\s*"([^"]*)"/g;

const posts = [];
let match;
while ((match = postRegex.exec(content)) !== null) {
  posts.push({
    id: match[1],
    title: match[2],
    coverImage: match[3]
  });
}

console.log(`Found ${posts.length} posts. Testing image URLs...`);

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) {
      return resolve({ ok: false, status: 0, reason: 'Invalid or empty URL' });
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        resolve({ ok: true, status: res.statusCode });
      } else {
        resolve({ ok: false, status: res.statusCode });
      }
    });

    req.on('error', (err) => {
      resolve({ ok: false, status: 0, reason: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 0, reason: 'Timeout' });
    });

    req.end();
  });
}

async function run() {
  let brokenCount = 0;
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const res = await checkUrl(post.coverImage);
    if (!res.ok) {
      brokenCount++;
      console.log(`❌ BROKEN IMAGE [Post ${i+1}] (${post.id}): "${post.title}"`);
      console.log(`   URL: ${post.coverImage} (Status: ${res.status}, ${res.reason || 'Failed'})\n`);
    } else {
      console.log(`✅ OK [Post ${i+1}] (${post.id}): Status ${res.status}`);
    }
  }
  console.log(`\nSUMMARY: ${posts.length - brokenCount}/${posts.length} images OK. ${brokenCount} broken images.`);
}

run();
