const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/static-blogs.ts');
let content = fs.readFileSync(filePath, 'utf8');

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

// Match every blog post object in the file
// A post object starts with `{` and contains `id:`
const postsRaw = content.split(/(\{\s*id:\s*"[^"]+"[\s\S]*?\n  \})/g);

let postCount = 0;
let updatedContent = '';

// Base date: today is 30-09-2026 (2026-09-30)
const startDate = new Date('2026-09-30T10:00:00.000Z');

// We collect all parsed post blocks
const postBlocks = [];
for (let i = 0; i < postsRaw.length; i++) {
  const chunk = postsRaw[i];
  if (chunk.startsWith('{') && chunk.includes('id:')) {
    postBlocks.push(chunk);
  }
}

console.log(`Found ${postBlocks.length} total blog posts`);

// We assign descending dates starting from today 2026-09-30 downwards
// So post #0 (first post in array) gets 2026-09-30
// post #1 gets 2026-09-29, post #2 gets 2026-09-28 ...
const processedBlocks = postBlocks.map((block, idx) => {
  const postDate = new Date(startDate.getTime() - idx * 24 * 60 * 60 * 1000);
  const dateStr = postDate.toISOString();

  // 1. Update publishedAt & updatedAt
  let newBlock = block.replace(/publishedAt:\s*"[^"]*"/, `publishedAt: "${dateStr}"`);
  newBlock = newBlock.replace(/updatedAt:\s*"[^"]*"/, `updatedAt: "${dateStr}"`);

  // 2. Check coverImage
  const coverMatch = newBlock.match(/coverImage:\s*"([^"]*)"/);
  const currentImg = coverMatch ? coverMatch[1] : '';

  if (!currentImg || currentImg.trim() === '' || currentImg.includes('placeholder')) {
    const assignedImg = gamingImages[idx % gamingImages.length];
    newBlock = newBlock.replace(/coverImage:\s*"[^"]*"/, `coverImage: "${assignedImg}"`);
    console.log(`Assigned feature image for post #${idx + 1}: ${assignedImg}`);
  }

  return newBlock;
});

// Now replace all post blocks in the original file content
let finalCode = content;
postBlocks.forEach((oldBlock, idx) => {
  finalCode = finalCode.replace(oldBlock, processedBlocks[idx]);
});

fs.writeFileSync(filePath, finalCode, 'utf8');
console.log(`DONE: Updated ${postBlocks.length} blog posts with descending dates starting from 2026-09-30 down to earlier dates and verified cover images!`);
