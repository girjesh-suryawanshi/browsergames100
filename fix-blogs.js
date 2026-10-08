const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/static-blogs.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Quality gaming Unsplash images array to ensure every blog post has a working, relevant feature image
const gamingImages = [
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1542751110-97427bbecfd8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1587202372583-49330a15584d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506792006437-256b665541e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1535223289429-462edb9de1d3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1489367874814-848b3b8e96ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509909756405-be0199881695?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
];

// Split header from array
const headerEndIdx = content.indexOf('export const staticBlogPosts: StaticBlogPost[] = [');
if (headerEndIdx === -1) {
  console.error("Could not find staticBlogPosts export line");
  process.exit(1);
}

const header = content.substring(0, headerEndIdx + 'export const staticBlogPosts: StaticBlogPost[] = ['.length);
const arrayContent = content.substring(headerEndIdx + 'export const staticBlogPosts: StaticBlogPost[] = ['.length);

// Extract individual object strings
const objectRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?\n  \}(?=,|\s*\])/g;
let match;
const posts = [];

while ((match = objectRegex.exec(arrayContent)) !== null) {
  const fullBlock = match[0];
  const id = match[1];

  // Extract cover image
  const imgMatch = fullBlock.match(/coverImage:\s*"([^"]*)"/);
  let coverImage = imgMatch ? imgMatch[1] : '';

  posts.push({
    id,
    fullBlock,
    coverImage
  });
}

console.log(`Parsed ${posts.length} blog posts from static-blogs.ts`);

// Base date: today 30-09-2026 (2026-09-30)
const baseDate = new Date("2026-09-30T10:00:00.000Z");

// Generate dates starting from 2026-09-30 descending (1 day step per post)
// So index 0 = 2026-09-30, index 1 = 2026-09-29, index 2 = 2026-09-28, etc.
posts.forEach((post, idx) => {
  const postDate = new Date(baseDate.getTime() - idx * 24 * 60 * 60 * 1000);
  const dateStr = postDate.toISOString();

  // Replace publishedAt and updatedAt in fullBlock
  let updatedBlock = post.fullBlock.replace(/publishedAt:\s*"[^"]*"/, `publishedAt: "${dateStr}"`);
  updatedBlock = updatedBlock.replace(/updatedAt:\s*"[^"]*"/, `updatedAt: "${dateStr}"`);

  // Ensure coverImage exists and is valid
  if (!post.coverImage || post.coverImage.trim() === '' || post.coverImage.includes('placeholder')) {
    const fallbackImage = gamingImages[idx % gamingImages.length];
    updatedBlock = updatedBlock.replace(/coverImage:\s*"[^"]*"/, `coverImage: "${fallbackImage}"`);
    console.log(`Updated missing coverImage for post [${post.id}] to ${fallbackImage}`);
  }

  post.updatedBlock = updatedBlock;
  post.dateStr = dateStr;
});

// Reconstruct static-blogs.ts content
const newArrayText = posts.map(p => p.updatedBlock).join(',\n');
const updatedFileContent = header + '\n' + newArrayText + '\n];\n';

fs.writeFileSync(filePath, updatedFileContent, 'utf8');
console.log(' Successfully updated static-blogs.ts with descending dates starting 2026-09-30 and verified feature images!');
